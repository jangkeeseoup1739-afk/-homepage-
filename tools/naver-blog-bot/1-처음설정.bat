@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo ============================================
echo  네이버 블로그 자동 발행 - 처음 설정
echo ============================================
echo.
echo 필요한 프로그램을 내려받습니다. 3~5분 걸립니다.
echo.
where node > nul 2>&1
if errorlevel 1 (
  echo [X] Node.js 가 설치되어 있지 않습니다.
  echo.
  echo     https://nodejs.org 에서 LTS 버전을 설치한 뒤
  echo     이 파일을 다시 실행해 주세요.
  echo.
  pause
  exit /b 1
)
call npm install
if errorlevel 1 goto fail
call npx playwright install chromium
if errorlevel 1 goto fail
echo.
echo [완료] 이제 "2-로그인" 을 실행하세요.
echo.
pause
exit /b 0
:fail
echo.
echo [X] 설치 중 오류가 발생했습니다. 위 메시지를 복사해서 문의해 주세요.
echo.
pause
exit /b 1
