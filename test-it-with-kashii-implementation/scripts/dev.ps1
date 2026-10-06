# Local Development Orchestrator for Windows PowerShell
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  TEST IT WITH KASHII -- LOCAL RUNNER (WINDOWS)" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootDir = Split-Path -Parent $scriptDir

Set-Location $rootDir

Write-Host "`n1. Checking shared contracts and types..." -ForegroundColor Yellow
node packages/contracts/index.js
if ($LASTEXITCODE -ne 0) { Write-Error "Contracts check failed"; exit 1 }

Write-Host "`n2. Running test suites across services..." -ForegroundColor Yellow
$env:PYTHONPATH = "services/kashii-engine/src"
python -m pytest services/kashii-engine/tests
if ($LASTEXITCODE -ne 0) { Write-Error "Engine tests failed"; exit 1 }

$env:PYTHONPATH = "services/browser-worker/src"
python -m pytest services/browser-worker/tests
if ($LASTEXITCODE -ne 0) { Write-Error "Browser worker tests failed"; exit 1 }

$env:PYTHONPATH = "services/ai-gateway/src"
python -m pytest services/ai-gateway/tests
if ($LASTEXITCODE -ne 0) { Write-Error "AI gateway tests failed"; exit 1 }

Write-Host "`n3. Running Laravel API tests..." -ForegroundColor Yellow
Push-Location apps/api
php vendor/phpunit/phpunit/phpunit
Pop-Location
if ($LASTEXITCODE -ne 0) { Write-Error "API tests failed"; exit 1 }

Write-Host "`n[OK] All local service test suites passed successfully!" -ForegroundColor Green
Write-Host "`nTo start all services in Docker containers, run:" -ForegroundColor White
Write-Host "   docker compose up --build" -ForegroundColor Cyan
