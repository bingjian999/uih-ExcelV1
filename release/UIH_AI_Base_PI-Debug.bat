@echo off
title UIH_AI_Base_PI Debug Launcher

echo ============================================================
echo   UIH_AI_Base_PI Debug Launcher
echo ============================================================
echo.
echo This window will stay open even if the program crashes.
echo Please screenshot this window and send to the developer.
echo.
echo Log file location: %LOCALAPPDATA%\UIH_AI_Base_PI\server.log
echo.
echo ------------------------------------------------------------
echo.

REM Run the EXE and capture exit code
"%~dp0UIH_AI_Base_PI-v1.1.0.exe" 2>&1
set EXITCODE=%ERRORLEVEL%

echo.
echo ------------------------------------------------------------
echo.
if %EXITCODE% NEQ 0 (
  echo [ERROR] Program exited with code: %EXITCODE%
  echo.
  echo Please screenshot this window and attach the log file:
  echo   %LOCALAPPDATA%\UIH_AI_Base_PI\server.log
  echo.
  echo Send to developer for diagnosis.
) else (
  echo [OK] Program exited normally with code: 0
)

echo.
echo Press any key to close this window...
pause >nul
