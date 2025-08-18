param(
    [string]$IMAGE_NAME = "react-scenario-lab",
    [string]$TAG = "latest",
    [string]$TAR_FILE = "$IMAGE_NAME.tar"
)

Write-Host "Building Docker image: $IMAGE_NAME`:$TAG" -ForegroundColor Cyan

# Build the Docker image
docker build -t "$IMAGE_NAME`:$TAG" .

# Check if build succeeded
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker image build failed" -ForegroundColor Red
    exit 1
}

Write-Host "Image built successfully, saving as tar file: $TAR_FILE" -ForegroundColor Cyan

# Save image as tar file
docker save -o "$TAR_FILE" "$IMAGE_NAME`:$TAG"

# Check if save succeeded
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to save Docker image" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Operation completed! Image saved as $TAR_FILE" -ForegroundColor Green