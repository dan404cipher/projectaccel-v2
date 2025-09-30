@echo off
echo 🔍 Checking for processes on port 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do taskkill /f /pid %%a 2>nul
echo ✅ Port 3000 cleared (if any processes were found)
echo.
echo 🚀 Starting development server...
set PORT=3000
npx nodemon
