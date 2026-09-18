@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo ============================================
echo  블로그 글 발행
echo ============================================
echo.
node post.js
echo.
pause
