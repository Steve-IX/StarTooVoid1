# Push StarTooVoid to GitHub
Write-Host "Checking git status..." -ForegroundColor Yellow
git status

Write-Host "`nAdding all files..." -ForegroundColor Yellow
git add -A

Write-Host "`nChecking what will be committed..." -ForegroundColor Yellow
git status --short

Write-Host "`nCreating commit..." -ForegroundColor Yellow
git commit -m "Initial commit: StarTooVoid website - Next.js, Tailwind CSS, Framer Motion"

Write-Host "`nPushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host "`nDone! Check https://github.com/Steve-IX/StarTooVoid" -ForegroundColor Green

