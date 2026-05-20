# 前后端分离（API 镜像 + 独立静态资源）

根目录 **`docker-compose.yml`** 默认采用 **方案 A（同源网关）**：新版 Default 主题的 **`spa`** 与 Classic 主题的 **`classic-spa`** 均使用同一套 **`deploy/split/nginx.spa.conf`**，在各自端口提供静态页，并把 **`/api/`、`/v1/`、`/pg/`、`/mj/`** 反代到 **`new-api`**（容器内 `:3000`）。浏览器请求的 API 路径与页面同域，可避免控制台跨域/CORS、POST 打在纯静态页上得到 **405** 等问题。

镜像构建时 **不要写入 API 端口**。Default 镜像用 **`SPA_BAKED_API_ORIGIN`**（可缺省），Classic 用 **`SPA_CLASSIC_BAKED_API_ORIGIN`**（可缺省）；二者都不会再读宿主 **`VITE_REACT_APP_SERVER_URL`** 以免误带进镜像。**`web/default`** 与 **`web/classic`** 在未配置烘焙地址时均以 **`window.location.origin`**（或 Axios 等价同源）对接 API——见 `web/default/src/lib/api.ts`、`web/classic/src/helpers/api.js`。若某套静态站点与 API **不同域名**，在 `.env` 里写对应 **`SPA_*_BAKED_API_ORIGIN`** 并重建镜像。

## Docker Desktop：每容器独立一行

若你不希望 MySQL / Redis / API / 两个 SPA 叠在同一个 Compose 项目目录下，请用 **`deploy/compose-instances/`** + **`.\scripts\compose-instances-up.ps1 -Build`**（说明见该目录 **`README.md`**）。  
合并单栈仍可用 **`docker compose -f docker-compose.monolith.yml up -d`**.

## Docker 一键前后端拆分（推荐）

项目根目录：

```bash
docker compose up -d --build
```

- **控制台 Default：** `http://localhost:${SPA_HOST_PORT:-3000}`  
- **控制台 Classic：** `http://localhost:${SPA_CLASSIC_HOST_PORT:-3001}`
- **直连后端（可选，给 CLI/调试）：** `http://localhost:3002`（宿主映射到容器内 `:3000`）

### 同源（方案 A，`docker-compose` 默认）

一般 **无需** 在 `.env` 里配置 `SPA_BAKED_API_ORIGIN` / `SPA_CLASSIC_BAKED_API_ORIGIN`（留空同源）。`nginx.spa.conf` 已按路径反代后端。

若只起一个主题，也可用 Compose 按需关闭另一个服务（不推荐改 yaml 时：**`docker compose up -d new-api mysql redis spa`** 不包含 `classic-spa`）。

后端仍建议配置（与控制台公网入口一致时可减少重定向偏差）：

```env
FRONTEND_BASE_URL=http://localhost:3000
```

CORS：同源主路径不走跨域；保留 `CORS_ALLOWED_ORIGINS` 仍有利于本地 `rsbuild dev`、其他端口 SPA 或直接访问 `:3002` 的场景。

### 跨域（静态站点与 API 不同源）

构建 SPA 时写入 **浏览器能访问到的 API 根地址**，例如在项目根 `.env`（勿提交）：

```env
SPA_BAKED_API_ORIGIN=https://api.example.com
SPA_CLASSIC_BAKED_API_ORIGIN=https://api.example.com
FRONTEND_BASE_URL=https://static.example.com
CORS_ALLOWED_ORIGINS=https://static.example.com
SPA_HOST_PORT=3000
SPA_CLASSIC_HOST_PORT=3001
```

分别改 **`SPA_BAKED_API_ORIGIN` / `SPA_CLASSIC_BAKED_API_ORIGIN`** 后，对应对 **`docker compose build spa`**、**`docker compose build classic-spa`**。

### 自备 Nginx（本机已装 nginx、方案 A）

把 **`deploy/split/nginx.spa.conf`** 里的 `proxy_pass http://new-api:3000` 改为 **`http://127.0.0.1:3002`**（或你的 API 监听地址），并让站点根目录指向 **`web/default/dist`**（Default）或 **`web/classic/dist`**（Classic）。同源网关下 **`SPA_*_BAKED_API_ORIGIN` 留空**，由 **`window.location.origin`** + **`/api` 等路径**转发。

也可用主题的 **`public/runtime-config.js`**：`window.__RUNTIME__.API_BASE_URL`，挂载后可在不重编镜像时切换 API。

## 仅起 API + 本地 dev 控制台

1. 启动数据库与 API（不启 SPA 容器）：

   ```bash
   docker compose up -d --build new-api redis mysql
   ```

   默认 API：`http://localhost:3002`。

2. 启动新版控制台（`web/default`，Rsbuild 默认端口 **3000**）：

   ```bash
   cd web/default
   bun install
   set VITE_REACT_APP_SERVER_URL=http://localhost:3002
   bun run dev
   ```

   PowerShell：

   ```powershell
   $env:VITE_REACT_APP_SERVER_URL="http://localhost:3002"; bun run dev
   ```

3. 浏览器打开 **`http://localhost:3000`**（页面访问 API 为跨域，已由 `CORS_ALLOWED_ORIGINS` 放行）。

Classic 主题：`cd web/classic`，同样设置 `VITE_REACT_APP_SERVER_URL` 后 `bun run dev`。Vite 默认多为 **5173**，需在 API 的 `CORS_ALLOWED_ORIGINS` 里加上 `http://localhost:5173`（可在项目根 `.env` 里覆盖，见下节）。

## 覆盖环境变量（可选）

在 **`docker-compose.yml` 同目录** 创建 `.env`（勿提交密钥），Compose 会自动用于变量替换，例如：

```env
FRONTEND_BASE_URL=https://static.example.com
CORS_ALLOWED_ORIGINS=https://static.example.com
SESSION_COOKIE_SAMESITE=none
SESSION_COOKIE_SECURE=true
SESSION_COOKIE_DOMAIN=.example.com
```

生产环境静态站与 API 不同域名时，通常需要上述 Cookie 与 HTTPS。

可选：API 若在 `spa` Nginx / 负载均衡后方，按需配置 **`TRUSTED_PROXIES`**（见后端环境变量注释），便于限流/IP 日志识别 **`X-Forwarded-For`**。

## 上线静态资源

1. **同源网关**：站点 Nginx 与上面 `nginx.spa.conf` 同理反代 **`/api` 等**。**Default**：`Dockerfile.web` + `SPA_BAKED_API_ORIGIN`；**Classic**：`Dockerfile.web.classic` + `SPA_CLASSIC_BAKED_API_ORIGIN`；二者默认为空即同源烘焙，勿依赖宿主 **`VITE_*`**。

2. **跨域静态站**：为镜像设置 **`SPA_BAKED_API_ORIGIN` / `SPA_CLASSIC_BAKED_API_ORIGIN`**（推荐），或直接：

   ```bash
   docker build -f Dockerfile.web -t your/spa:latest --build-arg VITE_REACT_APP_SERVER_URL=https://api.example.com .
   docker build -f Dockerfile.web.classic -t your/classic-spa:latest --build-arg VITE_REACT_APP_SERVER_URL=https://api.example.com .
   ```

   本地：`cd web/default` / `web/classic` 后按需设置 **`VITE_REACT_APP_SERVER_URL`** 再 `bun run build`。

3. API 上设置 `FRONTEND_BASE_URL`、`CORS_ALLOWED_ORIGINS` 与 Cookie 相关变量（见上）。

也可在各主题的 **`public/runtime-config.js`** 中替换 **`API_BASE_URL`**。

## 仍要使用「嵌入式前端」一体镜像

将 `docker-compose.yml` 里 `new-api` 的 `dockerfile` 改回 `Dockerfile`，`image` 改回你的一体式标签；**删除整段 `spa` 与 `classic-spa` 服务**；并去掉或改写 `SERVE_EMBEDDED_FRONTEND` / `FRONTEND_BASE_URL` / `CORS_ALLOWED_ORIGINS` 等分离相关 env（或改用旧版 compose 备份）。
