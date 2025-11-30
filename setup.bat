@echo off
echo ===============================================
echo     StarTooVoid Website Setup Script
echo ===============================================
echo.

echo Copying images to public folder...
if not exist "public\images" mkdir "public\images"
copy /Y "photos\*" "public\images\" >nul 2>&1
echo Done!

echo Copying videos to public folder...
if not exist "public\videos" mkdir "public\videos"
copy /Y "vids\*" "public\videos\" >nul 2>&1
echo Done!

echo.
echo Installing dependencies...
call npm install
echo Done!

echo.
echo ===============================================
echo Setup complete! Run 'npm run dev' to start
echo the development server.
echo ===============================================
pause

