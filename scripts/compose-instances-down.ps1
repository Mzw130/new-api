$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

$composeBase = "deploy/compose-instances"
# Old split stack used PostgreSQL; after switching repo to MySQL, `down` must still remove project "1router-postgres".
$legacyPg = Join-Path $Root "$composeBase/postgres.legacy-down.yml"
if (Test-Path $legacyPg) {
    Write-Host "=== docker compose (legacy Postgres stack) down ===" -ForegroundColor Cyan
    docker compose -f $legacyPg down
}

$files = @(
    "$composeBase/spa-classic.yml",
    "$composeBase/spa-default.yml",
    "$composeBase/api.yml",
    "$composeBase/redis.yml",
    "$composeBase/mysql.yml"
)

foreach ($f in $files) {
    Write-Host "=== docker compose -f $f down ===" -ForegroundColor Cyan
    docker compose -f $f down
}

Write-Host "Network new-api-network left in place (remove with: docker network rm new-api-network if unused)." -ForegroundColor Yellow
