@echo off
setlocal

REM Always run from this project folder.
cd /d "%~dp0"

if /I "%1"=="--force-install" (
  echo Installing dependencies...
  call npm.cmd install
  if errorlevel 1 exit /b %errorlevel%
) else (
  if not exist node_modules (
    echo Installing dependencies...
    call npm.cmd install
    if errorlevel 1 exit /b %errorlevel%
  ) else (
    echo Dependencies already installed. Use --force-install to reinstall.
  )
)

echo Starting website...
call npm.cmd start
