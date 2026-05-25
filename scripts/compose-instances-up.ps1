# Start split Compose stacks (separate Docker Desktop project rows).
# Run from repository root:  .\scripts\compose-instances-up.ps1   or with -Build

param(
    [switch]$Build
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

$networkName = "new-api-network"
$prevEap = $ErrorActionPreference
$ErrorActionPreference = "SilentlyContinue"
docker network inspect $networkName 2>$null | Out-Null
$netOk = $LASTEXITCODE
$ErrorActionPreference = $prevEap
if ($netOk -ne 0) {
    Write-Host "Creating Docker network: $networkName"
    docker network create $networkName
}

$volumeName = "new-api_mysql_data"
$ErrorActionPreference = "SilentlyContinue"
docker volume inspect $volumeName 2>$null | Out-Null
$volOk = $LASTEXITCODE
$ErrorActionPreference = $prevEap
if ($volOk -ne 0) {
    Write-Host "Creating Docker volume: $volumeName"
    docker volume create $volumeName
}

$composeBase = "deploy/compose-instances"
$steps = @(
    @{ File = "$composeBase/mysql.yml"; Name = "mysql" },
    @{ File = "$composeBase/redis.yml"; Name = "redis" },
    @{ File = "$composeBase/api.yml"; Name = "api" },
    @{ File = "$composeBase/spa-default.yml"; Name = "spa-default" },
    @{ File = "$composeBase/spa-classic.yml"; Name = "spa-classic" }
)

foreach ($s in $steps) {
    $f = $s.File
    $cf = Join-Path $Root $f
    if (-not (Test-Path $cf)) {
        throw "Missing compose file: $cf"
    }
    Write-Host "`n=== docker compose -f $f up -d $(if ($Build) { '--build ' })===" -ForegroundColor Cyan
    if ($Build) {
        docker compose -f $f up -d --build
    }
    else {
        docker compose -f $f up -d
    }
    if ($s.Name -eq "mysql") {
        Start-Sleep -Seconds 8
    }
    if ($s.Name -eq "redis") {
        Start-Sleep -Seconds 2
    }
}

Write-Host "`nDone. Classic (1router.ai): http://1router.ai:3001  API direct :3002  Default :3003" -ForegroundColor Green
Write-Host "Add hosts entry if needed: 127.0.0.1  1router.ai" -ForegroundColor Yellow
