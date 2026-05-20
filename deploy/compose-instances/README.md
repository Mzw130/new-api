# 独立 Compose 实例（Docker Desktop 分列）

每个文件顶部有 `name:`，在 Docker Desktop 里会显示为 **不同的 Compose 项目名**（每行一个），而不再是单一 `new-api` 文件夹套所有容器。

共用一个 **外部网络** `new-api-network`，数据库数据卷 **`new-api_mysql_data`**（与根目录 `docker-compose.monolith.yml` 中的命名卷一致）。

## 从 PostgreSQL 换到 MySQL 之后

Docker 里**不会自动**把旧的 `1router-postgres` 换成 MySQL；必须在仓库根目录执行一次 **全套 down 再 up**（或先关旧 Postgres 再启 `mysql.yml`）：

```powershell
.\scripts\compose-instances-down.ps1
.\scripts\compose-instances-up.ps1 -Build
```

`compose-instances-down` 会尝试关闭遗留的 **`postgres.legacy-down.yml`**（项目名 `1router-postgres`）。若你从未用过旧版分列 Postgres，可忽略。

## 启动（仓库根目录）

PowerShell：

```powershell
.\scripts\compose-instances-up.ps1 -Build
```

Bash：

```bash
chmod +x scripts/compose-instances-up.sh
./scripts/compose-instances-up.sh --build
```

## 停止

```powershell
.\scripts\compose-instances-down.ps1
```

或逐个：

```powershell
docker compose -f deploy/compose-instances/spa-classic.yml down
docker compose -f deploy/compose-instances/spa-default.yml down
docker compose -f deploy/compose-instances/api.yml down
docker compose -f deploy/compose-instances/redis.yml down
docker compose -f deploy/compose-instances/mysql.yml down
docker network rm new-api-network
```

**注意**：MySQL 数据在卷 `new-api_mysql_data` 中，除非 `docker volume rm`，数据会保留。从 PostgreSQL 迁移到 MySQL 时需自行导出/导入，旧卷 `new-api_pg_data` 与 MySQL 不通用。

## 从旧「单文件」栈迁移

1. `docker compose -f docker-compose.monolith.yml down`（只停容器，默认不删卷）
2. 若曾用 PostgreSQL，旧数据在 `new-api_pg_data`；新项目使用 MySQL 卷 `new-api_mysql_data`，相当于**新库**。
3. 执行上面的 `compose-instances-up`（脚本会 `docker network create` / `docker volume create` 若不存在）

## 文件一览

| 文件 | Compose 项目名（Docker Desktop） |
|------|-----------------------------------|
| `mysql.yml` | 1router-mysql |
| `redis.yml` | 1router-redis |
| `api.yml` | 1router-api |
| `spa-default.yml` | 1router-spa |
| `spa-classic.yml` | 1router-classic-spa |

## 仍要单文件夹

使用根目录 **`docker-compose.monolith.yml`**（与原 all-in-one 行为相同）。
