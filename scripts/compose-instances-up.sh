#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
NET="new-api-network"
if ! docker network inspect "$NET" >/dev/null 2>&1; then
  echo "Creating Docker network: $NET"
  docker network create "$NET"
fi
VOL="new-api_mysql_data"
if ! docker volume inspect "$VOL" >/dev/null 2>&1; then
  echo "Creating Docker volume: $VOL"
  docker volume create "$VOL"
fi

BASE="deploy/compose-instances"
FLAGS=(up -d)
if [[ "${1:-}" == "--build" ]]; then
  FLAGS=(up -d --build)
fi

docker compose -f "$BASE/mysql.yml" "${FLAGS[@]}"
sleep 8
docker compose -f "$BASE/redis.yml" "${FLAGS[@]}"
sleep 2
docker compose -f "$BASE/api.yml" "${FLAGS[@]}"
docker compose -f "$BASE/spa-default.yml" "${FLAGS[@]}"
docker compose -f "$BASE/spa-classic.yml" "${FLAGS[@]}"

echo "Done. Default SPA :3000  Classic :3001  API :3002"
