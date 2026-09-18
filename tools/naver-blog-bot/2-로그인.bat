@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo ============================================
echo  네이버 로그인 (최초 1회)
echo ============================================
echo.
echo 잠시 후 브라우저가 열립니다.
echo 네이버에 직접 로그인해 주세요.
echo 2단계 인증이 나오면 끝까지 진행하세요.
echo.
node login.js
echo.
pause
