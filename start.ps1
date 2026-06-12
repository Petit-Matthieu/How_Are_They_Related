# How Are They Related? - Startup Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  How Are They Related? - Starting..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start Backend
Write-Host "[1/2] Starting Backend Server..." -ForegroundColor Yellow
$backendPath = Join-Path $projectRoot "backend"
Start-Process -FilePath "cmd.exe" -ArgumentList "/k", "cd /d `"$backendPath`" && E:\Python\python.exe main.py" -WindowStyle Normal

Start-Sleep -Seconds 2

# Start Frontend
Write-Host "[2/2] Starting Frontend Dev Server..." -ForegroundColor Yellow
$frontendPath = Join-Path $projectRoot "frontend"
Start-Process -FilePath "cmd.exe" -ArgumentList "/k", "cd /d `"$frontendPath`" && npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  All started! Open your browser:" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Frontend:  http://localhost:5173" -ForegroundColor Cyan
Write-Host "  Backend:   http://localhost:8000" -ForegroundColor Cyan
Write-Host "  API Docs:  http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
