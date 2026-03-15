param(
    [string]$IMAGE_NAME = "react-scenario-lab",
    [string]$TAG = "latest",
    [string]$TAR_FILE = "$IMAGE_NAME.tar"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Docker 镜像构建与保存" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor DarkGray
Write-Host ""

Write-Host "📦 镜像名称: ${IMAGE_NAME}:${TAG}" -ForegroundColor Yellow
Write-Host "💾 输出文件: $TAR_FILE" -ForegroundColor Yellow
Write-Host ""

Write-Host "🚀 开始构建 Docker 镜像..." -ForegroundColor Cyan
Write-Host "构建时间约: 10-14 分钟（首次），2-3 分钟（代码变更后）" -ForegroundColor Gray
Write-Host ""

# 记录开始时间
$startTime = Get-Date

# Build the Docker image (从项目根目录构建)
$buildOutput = docker build -t "${IMAGE_NAME}:${TAG}" .. 2>&1 | Tee-Object -Variable buildLog
Write-Host $buildOutput

# 计算构建时间
$endTime = Get-Date
$duration = $endTime - $startTime
$minutes = [math]::Floor($duration.TotalMinutes)
$seconds = $duration.Seconds

# Check if build succeeded
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "❌ Docker 镜像构建失败" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor DarkGray
    Write-Host "请检查上方的错误信息" -ForegroundColor Gray
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ 镜像构建成功！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor DarkGray
Write-Host "⏱️  构建耗时: ${minutes}分${seconds}秒" -ForegroundColor Cyan
Write-Host ""

# 获取镜像大小
$imageSize = docker images "${IMAGE_NAME}:${TAG}" --format "{{.Size}}"
Write-Host "📊 镜像大小: $imageSize" -ForegroundColor Cyan
Write-Host ""

Write-Host "💾 开始保存镜像为 tar 文件..." -ForegroundColor Cyan
docker save -o "$TAR_FILE" "${IMAGE_NAME}:${TAG}"

# Check if save succeeded
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "❌ 保存镜像失败" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor DarkGray
    exit 1
}

# 获取文件大小
$fileSize = (Get-Item "$TAR_FILE").Length / 1MB

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ 操作完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor DarkGray
Write-Host "📦 镜像名称: ${IMAGE_NAME}:${TAG}" -ForegroundColor Yellow
Write-Host "💾 tar 文件: $TAR_FILE" -ForegroundColor Yellow
Write-Host "📊 文件大小: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Yellow
Write-Host ""
Write-Host "🚀 运行镜像:" -ForegroundColor Cyan
Write-Host "   docker load -i $TAR_FILE" -ForegroundColor Gray
Write-Host "   docker run -p 3000:3000 ${IMAGE_NAME}:${TAG}" -ForegroundColor Gray
Write-Host ""