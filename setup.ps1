# StarTooVoid Website Setup Script
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "     StarTooVoid Website Setup Script" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Create directories
Write-Host "Creating directories..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "public\images" | Out-Null
New-Item -ItemType Directory -Force -Path "public\videos" | Out-Null
Write-Host "Done!" -ForegroundColor Green

# Copy images
Write-Host "Copying images to public folder..." -ForegroundColor Yellow
Copy-Item -Path "photos\*" -Destination "public\images\" -Force
Write-Host "Done!" -ForegroundColor Green

# Copy videos
Write-Host "Copying videos to public folder..." -ForegroundColor Yellow
Copy-Item -Path "vids\*" -Destination "public\videos\" -Force
Write-Host "Done!" -ForegroundColor Green

# Install dependencies
Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install
Write-Host "Done!" -ForegroundColor Green

Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "Setup complete! Run 'npm run dev' to start" -ForegroundColor Cyan
Write-Host "the development server." -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

