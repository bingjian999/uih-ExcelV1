@echo off
chcp 65001 >nul 2>&1
title 联影AI_Base_PI 调试模式

echo ============================================================
echo   联影AI_Base_PI 调试启动器
echo ============================================================
echo.
echo 此窗口会保持打开，即使程序出错也不会关闭。
echo 请将此窗口的内容截图发送给开发人员。
echo.
echo 日志文件位置: %LOCALAPPDATA%\UIH_AI_Base_PI\server.log
echo.
echo ------------------------------------------------------------
echo.

REM Run the EXE and capture exit code
"%~dp0UIH_AI_Base_PI-v1.0.3.exe" 2>&1
set EXITCODE=%ERRORLEVEL%

echo.
echo ------------------------------------------------------------
echo.
if %EXITCODE% NEQ 0 (
  echo [错误] 程序异常退出，退出码: %EXITCODE%
  echo.
  echo 请截图此窗口，并附上日志文件:
  echo   %LOCALAPPDATA%\UIH_AI_Base_PI\server.log
  echo.
  echo 发送给开发人员以便诊断问题。
) else (
  echo [正常] 程序已退出，退出码: 0
)

echo.
echo 按任意键关闭此窗口...
pause >nul
