param(
    [string]$IMAGE_NAME = "react-scenario-lab",
    [string]$TAG = "latest",
    [string]$TAR_FILE = "$IMAGE_NAME.tar"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Docker Build with Pre-checks" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor DarkGray
Write-Host ""

# Step 1: Type check (only this can break the build)
Write-Host "[1/2] Running type check..." -ForegroundColor Yellow
$checkResult = pnpm run type-check 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "Type check FAILED!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "Please fix TypeScript errors before building." -ForegroundColor Yellow
    Write-Host "Run 'pnpm run type-check' to see details." -ForegroundColor Gray
    exit 1
}
Write-Host "Type check PASSED" -ForegroundColor Green
Write-Host ""

# Step 2: Build Docker image
Write-Host "[2/2] Building Docker image: ${IMAGE_NAME}:${TAG}" -ForegroundColor Yellow
Write-Host ""

$startTime = Get-Date
docker build -t "${IMAGE_NAME}:${TAG}" ..
$buildExitCode = $LASTEXITCODE
$endTime = Get-Date
$duration = $endTime - $startTime

if ($buildExitCode -ne 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "Docker build FAILED!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor DarkGray
    Write-Host "Time: $($duration.TotalMinutes.ToString('0.0')) minutes" -ForegroundColor Gray
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Docker build SUCCESS!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor DarkGray
Write-Host "Time: $($duration.TotalMinutes.ToString('0.0')) minutes" -ForegroundColor Cyan
Write-Host ""

# Save image
Write-Host "Saving as tar file: $TAR_FILE" -ForegroundColor Cyan
docker save -o "$TAR_FILE" "${IMAGE_NAME}:${TAG}"

if ($LASTEXITCODE -eq 0) {
    $fileSize = (Get-Item "$TAR_FILE").Length / 1MB
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "Build completed!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor DarkGray
    Write-Host "Image: ${IMAGE_NAME}:${TAG}" -ForegroundColor Yellow
    Write-Host "File: $TAR_FILE" -ForegroundColor Yellow
    Write-Host "Size: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To run:" -ForegroundColor Cyan
    Write-Host "  docker load -i $TAR_FILE" -ForegroundColor Gray
    Write-Host "  docker run -p 3000:3000 ${IMAGE_NAME}:${TAG}" -ForegroundColor Gray
}
