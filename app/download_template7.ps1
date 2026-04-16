# PowerShell script to download images from Template7

# Define the base URLs and paths
$baseUrl = "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-03-30/"
$publicBasePath = "public"
$template7File = "src/component/template7/Template7.tsx"

# Create public folder for template7 if it doesn't exist
$publicFolder = Join-Path $publicBasePath "template7"
if (!(Test-Path $publicFolder)) {
    New-Item -ItemType Directory -Path $publicFolder -Force | Out-Null
    Write-Host "Created folder: $publicFolder"
}

# Function to download image
function Download-Image {
    param(
        [string]$url,
        [string]$destinationPath
    )
    
    try {
        if (!(Test-Path $destinationPath)) {
            Write-Host "Downloading: $url"
            Invoke-WebRequest -Uri $url -OutFile $destinationPath -ErrorAction Stop
            Write-Host "Saved to: $destinationPath"
            return $true
        } else {
            Write-Host "File already exists: $destinationPath"
            return $true
        }
    } catch {
        Write-Host "Failed to download: $url - Error: $_"
        return $false
    }
}

# Process Template7
if (Test-Path $template7File) {
    Write-Host "`nProcessing: $template7File"
    
    # Read file content
    $content = Get-Content -Path $template7File -Raw
    
    # Find all image URLs in the file
    $pattern = 'https://codia-f2c\.s3\.us-west-1\.amazonaws\.com/image/2026-03-30/([a-zA-Z0-9]+\.png)'
    $matches = [regex]::Matches($content, $pattern)
    
    $downloadedImages = @{}
    
    foreach ($match in $matches) {
        $fullUrl = $match.Value
        $imageName = $match.Groups[1].Value
        $localPath = "$publicBasePath\template7\$imageName"
        
        # Download image if not already downloaded
        if (!$downloadedImages.ContainsKey($imageName)) {
            $success = Download-Image -url $fullUrl -destinationPath $localPath
            if ($success) {
                $downloadedImages[$imageName] = $true
            }
        }
    }
    
    # Update file content with local paths
    $newContent = $content
    foreach ($imageName in $downloadedImages.Keys) {
        $oldUrl = "$baseUrl$imageName"
        $newUrl = "/template7/$imageName"
        $newContent = $newContent -replace [regex]::Escape($oldUrl), $newUrl
    }
    
    # Save updated content
    if ($newContent -ne $content) {
        Set-Content -Path $template7File -Value $newContent -NoNewline
        Write-Host "Updated: $template7File"
    }
}

Write-Host "`nImage download and update complete!"
