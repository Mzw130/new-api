#!/usr/bin/env python3
"""
OpenAI-compatible gateway load test — mode: target-tpm

用法示例:
  pip install httpx
  set OPENAI_API_KEY=sk-xxx
  python scripts/openai_gateway_target_tpm_loadtest.py ^
    --base-url https://your-gateway.example.com ^
    --model kimi-latest

逻辑对齐:
  - target-tpm: 目标 TPM，用于折算理论请求速率 RPS = target_tpm / 60 / estimate_tokens_per_request
  - 令牌桶: 恒定补充速率 RPS，容量 burst（初始装满 burst）
  - 并发上限: asyncio.Semaphore(max_concurrency)
  - 每请求: 短输入(~80 字) + max_tokens=256（真实 TPM 以响应 usage 为准，可能与 estimate 不一致）

注意:
  - 压测 **POST `/v1/...`** 若走 SPA 外层 Nginx（如 base-url `:3000`），高并发时务必用本镜像里的
    **新版 `deploy/split/nginx.spa.conf`**（对上游启用 keepalive）；或 **直连 API 端口**（Compose 映射为
    `:3002`），例如 `--base-url http://127.0.0.1:3002`，避免双倍代理 + 上游连接枯竭导致 **502**。
  - 「折算目标 req/s」只用了 estimate_tokens_per_request；若实际每请求远小于该估值（如 80 字+256）
    则 TPM(obs) 会远低于 target_tpm，属预期。要逼近 1M TPM 需放大输入/max_tokens 或提高 RPS。

环境变量:
  OPENAI_API_KEY / API_KEY  — 必填（也可用 --api-key）
"""

from __future__ import annotations

import argparse
import asyncio
import json
import os
import sys
import time
from dataclasses import dataclass, field


try:
    import httpx
except ImportError:
    print("需要安装 httpx: pip install httpx", file=sys.stderr)
    sys.exit(1)


def _prompt_chars(n: int) -> str:
    """约 n 个汉字的占位输入（可按需改成英文 repeated）。"""
    unit = "测压占位文本用于网关吞吐观测请勿用于生产环境。"
    if n <= 0:
        return "ping"
    out = []
    while sum(len(x) for x in out) < n:
        out.append(unit)
    s = "".join(out)
    return s[:n]


class AsyncTokenBucket:
    """令牌桶：平均速率 rate_per_sec，峰值 burst。"""

    def __init__(self, rate_per_sec: float, burst: float) -> None:
        self.rate = max(rate_per_sec, 1e-9)
        self.capacity = max(burst, 1e-9)
        self.tokens = min(self.capacity, burst)
        self._updated = time.monotonic()
        self._lock = asyncio.Lock()

    async def acquire(self, n: float = 1.0) -> None:
        while True:
            async with self._lock:
                now = time.monotonic()
                elapsed = now - self._updated
                self._updated = now
                self.tokens = min(self.capacity, self.tokens + elapsed * self.rate)
                if self.tokens >= n:
                    self.tokens -= n
                    return
                deficit = n - self.tokens
                wait = deficit / self.rate
            await asyncio.sleep(wait)


@dataclass
class Stats:
    ok: int = 0
    err: int = 0
    usage_tokens: int = 0
    lock: asyncio.Lock = field(default_factory=asyncio.Lock)

    async def add_ok(self, tokens: int) -> None:
        async with self.lock:
            self.ok += 1
            self.usage_tokens += tokens

    async def add_err(self) -> None:
        async with self.lock:
            self.err += 1


async def one_chat_completion(
    client: httpx.AsyncClient,
    url: str,
    headers: dict[str, str],
    model: str,
    prompt: str,
    max_tokens: int,
    stream: bool,
    timeout_s: float,
    stats: Stats,
) -> None:
    body = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": max_tokens,
        "stream": stream,
    }
    used = 0
    try:
        if stream:
            async with client.stream(
                "POST",
                url,
                headers=headers,
                json=body,
                timeout=timeout_s,
            ) as resp:
                if resp.status_code != 200:
                    await stats.add_err()
                    return
                async for line in resp.aiter_lines():
                    if not line or not line.startswith("data:"):
                        continue
                    data = line[5:].strip()
                    if data == "[DONE]":
                        break
                    try:
                        chunk = json.loads(data)
                        u = chunk.get("usage")
                        if u and isinstance(u, dict):
                            used = int(u.get("total_tokens") or 0)
                    except json.JSONDecodeError:
                        pass
                await stats.add_ok(used)
        else:
            resp = await client.post(
                url,
                headers=headers,
                json=body,
                timeout=timeout_s,
            )
            if resp.status_code != 200:
                await stats.add_err()
                return
            data = resp.json()
            u = data.get("usage")
            if u and isinstance(u, dict):
                used = int(u.get("total_tokens") or 0)
            await stats.add_ok(used)
    except Exception:
        await stats.add_err()


async def reporter(
    stats: Stats,
    start: float,
    interval: float,
    stop_evt: asyncio.Event,
) -> None:
    """与常见报表一致：TPM(obs) = 已累计 usage_tokens / 已过分钟数。"""
    try:
        while not stop_evt.is_set():
            await asyncio.sleep(interval)
            now = time.monotonic()
            elapsed = max(now - start, 1e-6)
            async with stats.lock:
                ok = stats.ok
                err = stats.err
                usage = stats.usage_tokens
            tpm_obs = (usage / elapsed) * 60.0
            print(
                f"[{elapsed:7.1f}s] ok={ok} err={err} "
                f"usage_tokens≈{usage:,} TPM(obs)≈{tpm_obs:,.0f}",
                flush=True,
            )
    except asyncio.CancelledError:
        return


async def run_load(args: argparse.Namespace) -> None:
    base = args.base_url.rstrip("/")
    url = f"{base}/v1/chat/completions"
    api_key = args.api_key or os.getenv("OPENAI_API_KEY") or os.getenv("API_KEY")
    if not api_key:
        print("缺少 API Key: 使用 --api-key 或环境变量 OPENAI_API_KEY", file=sys.stderr)
        sys.exit(2)

    rps = args.target_tpm / 60.0 / max(args.estimate_tokens_per_request, 1)
    bucket = AsyncTokenBucket(rate_per_sec=rps, burst=args.burst)
    sem = asyncio.Semaphore(args.max_concurrency)
    stats = Stats()
    stop_evt = asyncio.Event()

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    prompt = _prompt_chars(args.prompt_chars)

    print(
        f"模式=target-tpm：目标 TPM={args.target_tpm:,}，"
        f"按每请求≈{args.estimate_tokens_per_request:,} token 折算目标 {rps:.2f} req/s。\n"
        f"并发上限={args.max_concurrency}，令牌桶 burst≈{args.burst}；"
        f"输入≈{args.prompt_chars} 字，max_tokens={args.max_tokens}；stream={args.stream}\n"
        f"POST {url} model={args.model}\n",
        flush=True,
    )

    async def worker(client: httpx.AsyncClient) -> None:
        try:
            while not stop_evt.is_set():
                await bucket.acquire(1.0)
                if stop_evt.is_set():
                    break
                async with sem:
                    await one_chat_completion(
                        client,
                        url,
                        headers,
                        args.model,
                        prompt,
                        args.max_tokens,
                        args.stream,
                        args.timeout,
                        stats,
                    )
        except asyncio.CancelledError:
            return

    start = time.monotonic()
    async with httpx.AsyncClient(http2=False) as client:
        rep_task = asyncio.create_task(
            reporter(stats, start, args.report_interval, stop_evt)
        )
        workers = [
            asyncio.create_task(worker(client)) for _ in range(args.max_concurrency)
        ]
        try:
            await asyncio.sleep(args.duration)
        finally:
            stop_evt.set()
            for w in workers:
                w.cancel()
            await asyncio.gather(*workers, return_exceptions=True)
            rep_task.cancel()
            try:
                await rep_task
            except asyncio.CancelledError:
                pass

    elapsed = args.duration
    async with stats.lock:
        ok = stats.ok
        err = stats.err
        usage = stats.usage_tokens
    tpm_final = (usage / elapsed) * 60.0 if elapsed > 0 else 0.0
    print(
        f"\n--- 结束 ({elapsed:.1f}s) ok={ok} err={err} usage_tokens≈{usage:,} "
        f"TPM(obs 全程均值)≈{tpm_final:,.0f} ---",
        flush=True,
    )


def main() -> None:
    p = argparse.ArgumentParser(description="OpenAI gateway target-TPM load test")
    p.add_argument("--base-url", default=os.getenv("OPENAI_BASE_URL", "http://127.0.0.1:3000"))
    p.add_argument("--api-key", default=os.getenv("OPENAI_API_KEY") or os.getenv("API_KEY") or "")
    p.add_argument("--model", required=True, help="上游模型名（网关路由）")
    p.add_argument("--target-tpm", type=int, default=1_000_000)
    p.add_argument("--estimate-tokens-per-request", type=int, default=11_000)
    p.add_argument("--burst", type=float, default=5.0)
    p.add_argument("--max-concurrency", type=int, default=200)
    p.add_argument("--duration", type=float, default=60.0)
    p.add_argument("--report-interval", type=float, default=10.0)
    p.add_argument("--prompt-chars", type=int, default=80)
    p.add_argument("--max-tokens", type=int, default=256)
    p.add_argument("--stream", action="store_true", help="使用流式 SSE（默认关）")
    p.add_argument("--timeout", type=float, default=120.0)
    args = p.parse_args()

    asyncio.run(run_load(args))


if __name__ == "__main__":
    main()
