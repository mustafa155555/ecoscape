// Global variables
let currentFile = null;
let processedImageData = null;

// DOM elements
const uploadArea = document.getElementById('uploadArea');
const processingArea = document.getElementById('processingArea');
const resultArea = document.getElementById('resultArea');
const fileInput = document.getElementById('fileInput');
const originalImage = document.getElementById('originalImage');
const processedImage = document.getElementById('processedImage');

// Navigation functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll functions for hero buttons
function scrollToTool() {
    document.getElementById('tool').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// File input change handler
fileInput.addEventListener('change', handleFileSelect);

// Drag and drop functionality
uploadArea.addEventListener('dragover', handleDragOver);
uploadArea.addEventListener('dragleave', handleDragLeave);
uploadArea.addEventListener('drop', handleDrop);
uploadArea.addEventListener('click', () => fileInput.click());

function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showError('Please select a valid image file.');
        return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
        showError('File size must be less than 10MB.');
        return;
    }

    currentFile = file;
    showProcessing();
    processImage(file);
}

function showProcessing() {
    uploadArea.style.display = 'none';
    processingArea.style.display = 'block';
    resultArea.style.display = 'none';
}

function showResult() {
    uploadArea.style.display = 'none';
    processingArea.style.display = 'none';
    resultArea.style.display = 'block';
}

function resetTool() {
    uploadArea.style.display = 'block';
    processingArea.style.display = 'none';
    resultArea.style.display = 'none';
    currentFile = null;
    processedImageData = null;
    fileInput.value = '';
}

function processImage(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // Display original image
            originalImage.src = e.target.result;
            
            // Simulate AI processing with a delay
            setTimeout(() => {
                // Create a canvas to process the image
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = img.width;
                canvas.height = img.height;
                
                // Draw the original image
                ctx.drawImage(img, 0, 0);
                
                // Get image data for processing
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                
                // Apply professional background removal
                const processedData = professionalBackgroundRemoval(imageData);
                
                // Put the processed image data back
                ctx.putImageData(processedData, 0, 0);
                
                // Convert to data URL
                processedImageData = canvas.toDataURL('image/png');
                processedImage.src = processedImageData;
                
                // Show result
                showResult();
                
                // Add success animation
                resultArea.classList.add('success');
                setTimeout(() => {
                    resultArea.classList.remove('success');
                }, 2000);
                
            }, 3000); // 3 second processing time
        };
        img.src = e.target.result;
    };
    
    reader.readAsDataURL(file);
}

// Professional Background Removal Algorithm
function professionalBackgroundRemoval(imageData) {
    const { width, height, data } = imageData;
    
    // Step 1: Convert to different color spaces for better analysis
    const labData = rgbToLab(data, width, height);
    const hsvData = rgbToHsv(data, width, height);
    
    // Step 2: Create multiple masks using different techniques
    const brightnessMask = createBrightnessMask(data, width, height);
    const colorMask = createColorMask(labData, width, height);
    const edgeMask = createEdgeMask(data, width, height);
    const saturationMask = createSaturationMask(hsvData, width, height);
    const watershedMask = createWatershedMask(data, width, height);
    
    // Step 3: Combine masks using weighted voting with adaptive weights
    const masks = [brightnessMask, colorMask, edgeMask, saturationMask, watershedMask];
    const weights = calculateAdaptiveWeights(data, width, height);
    const combinedMask = combineMasksAdaptive(masks, weights, width, height);
    
    // Step 4: Apply advanced morphological operations for cleanup
    const cleanedMask = advancedMorphologicalOperations(combinedMask, width, height);
    
    // Step 5: Apply edge refinement
    const refinedMask = refineEdges(data, cleanedMask, width, height);
    
    // Step 6: Apply the mask to create transparent background with feathering
    const result = applyMaskWithFeathering(data, refinedMask, width, height);
    
    return new ImageData(result, width, height);
}

// Color space conversions
function rgbToLab(data, width, height) {
    const labData = new Float32Array(width * height * 3);
    
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i] / 255;
        const g = data[i + 1] / 255;
        const b = data[i + 2] / 255;
        
        // Convert to XYZ
        let x = r * 0.4124 + g * 0.3576 + b * 0.1805;
        let y = r * 0.2126 + g * 0.7152 + b * 0.0722;
        let z = r * 0.0193 + g * 0.1192 + b * 0.9505;
        
        // Normalize
        x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
        y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
        z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);
        
        // Convert to Lab
        const l = (116 * y) - 16;
        const a = 500 * (x - y);
        const b_val = 200 * (y - z);
        
        const idx = i / 4 * 3;
        labData[idx] = l;
        labData[idx + 1] = a;
        labData[idx + 2] = b_val;
    }
    
    return labData;
}

function rgbToHsv(data, width, height) {
    const hsvData = new Float32Array(width * height * 3);
    
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i] / 255;
        const g = data[i + 1] / 255;
        const b = data[i + 2] / 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const diff = max - min;
        
        let h = 0;
        if (diff === 0) {
            h = 0;
        } else if (max === r) {
            h = ((g - b) / diff) % 6;
        } else if (max === g) {
            h = (b - r) / diff + 2;
        } else {
            h = (r - g) / diff + 4;
        }
        
        h = h * 60;
        if (h < 0) h += 360;
        
        const s = max === 0 ? 0 : diff / max;
        const v = max;
        
        const idx = i / 4 * 3;
        hsvData[idx] = h;
        hsvData[idx + 1] = s;
        hsvData[idx + 2] = v;
    }
    
    return hsvData;
}

// Advanced mask creation techniques
function createBrightnessMask(data, width, height) {
    const mask = new Uint8Array(width * height);
    
    // Calculate global statistics
    let totalBrightness = 0;
    let brightnessValues = [];
    
    for (let i = 0; i < data.length; i += 4) {
        const brightness = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
        brightnessValues.push(brightness);
        totalBrightness += brightness;
    }
    
    const meanBrightness = totalBrightness / (width * height);
    const sortedBrightness = brightnessValues.sort((a, b) => a - b);
    const percentile95 = sortedBrightness[Math.floor(sortedBrightness.length * 0.95)];
    const percentile5 = sortedBrightness[Math.floor(sortedBrightness.length * 0.05)];
    
    for (let i = 0; i < data.length; i += 4) {
        const brightness = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
        const pixelIndex = i / 4;
        
        // Adaptive thresholding based on local and global statistics
        const localThreshold = Math.min(percentile95, meanBrightness * 1.2);
        const isBackground = brightness > localThreshold && brightness > 200;
        
        mask[pixelIndex] = isBackground ? 0 : 255;
    }
    
    return mask;
}

function createColorMask(labData, width, height) {
    const mask = new Uint8Array(width * height);
    
    // Analyze color distribution in Lab space
    const colorStats = analyzeColorDistribution(labData, width, height);
    
    for (let i = 0; i < width * height; i++) {
        const l = labData[i * 3];
        const a = labData[i * 3 + 1];
        const b = labData[i * 3 + 2];
        
        // Detect achromatic (gray/white) pixels
        const chroma = Math.sqrt(a * a + b * b);
        const isAchromatic = chroma < 15; // Low chroma indicates gray/white
        
        // Check if pixel is in the background color cluster
        const isBackgroundColor = isInBackgroundCluster(l, a, b, colorStats);
        
        mask[i] = (isAchromatic || isBackgroundColor) ? 0 : 255;
    }
    
    return mask;
}

function createEdgeMask(data, width, height) {
    const mask = new Uint8Array(width * height);
    const edges = detectEdges(data, width, height);
    
    // Use edges to refine the mask
    for (let i = 0; i < width * height; i++) {
        const x = i % width;
        const y = Math.floor(i / width);
        
        // If pixel is near an edge, it's likely foreground
        const isNearEdge = checkNearEdge(edges, x, y, width, height);
        mask[i] = isNearEdge ? 255 : 0;
    }
    
    return mask;
}

function createSaturationMask(hsvData, width, height) {
    const mask = new Uint8Array(width * height);
    
    for (let i = 0; i < width * height; i++) {
        const saturation = hsvData[i * 3 + 1];
        const value = hsvData[i * 3 + 2];
        
        // Low saturation and high value often indicate background
        const isBackground = saturation < 0.15 && value > 0.8;
        mask[i] = isBackground ? 0 : 255;
    }
    
    return mask;
}

// Advanced edge detection using Canny algorithm
function detectEdges(data, width, height) {
    const grayData = new Uint8Array(width * height);
    
    // Convert to grayscale
    for (let i = 0; i < data.length; i += 4) {
        grayData[i / 4] = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    }
    
    // Apply Gaussian blur
    const blurred = gaussianBlur(grayData, width, height, 1.0);
    
    // Apply Sobel operators
    const sobelX = applySobelX(blurred, width, height);
    const sobelY = applySobelY(blurred, width, height);
    
    // Calculate gradient magnitude and direction
    const magnitude = new Float32Array(width * height);
    const direction = new Float32Array(width * height);
    
    for (let i = 0; i < width * height; i++) {
        magnitude[i] = Math.sqrt(sobelX[i] * sobelX[i] + sobelY[i] * sobelY[i]);
        direction[i] = Math.atan2(sobelY[i], sobelX[i]);
    }
    
    // Non-maximum suppression
    const suppressed = nonMaxSuppression(magnitude, direction, width, height);
    
    // Double thresholding
    const edges = doubleThreshold(suppressed, width, height);
    
    return edges;
}

function gaussianBlur(data, width, height, sigma) {
    const kernel = createGaussianKernel(sigma);
    const result = new Uint8Array(width * height);
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let sum = 0;
            let weightSum = 0;
            
            for (let ky = -2; ky <= 2; ky++) {
                for (let kx = -2; kx <= 2; kx++) {
                    const px = Math.max(0, Math.min(width - 1, x + kx));
                    const py = Math.max(0, Math.min(height - 1, y + ky));
                    const weight = kernel[(ky + 2) * 5 + (kx + 2)];
                    
                    sum += data[py * width + px] * weight;
                    weightSum += weight;
                }
            }
            
            result[y * width + x] = sum / weightSum;
        }
    }
    
    return result;
}

function createGaussianKernel(sigma) {
    const kernel = new Float32Array(25);
    let sum = 0;
    
    for (let y = -2; y <= 2; y++) {
        for (let x = -2; x <= 2; x++) {
            const exponent = -(x * x + y * y) / (2 * sigma * sigma);
            const value = Math.exp(exponent) / (2 * Math.PI * sigma * sigma);
            kernel[(y + 2) * 5 + (x + 2)] = value;
            sum += value;
        }
    }
    
    // Normalize
    for (let i = 0; i < 25; i++) {
        kernel[i] /= sum;
    }
    
    return kernel;
}

function applySobelX(data, width, height) {
    const result = new Float32Array(width * height);
    
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const gx = 
                -data[(y - 1) * width + (x - 1)] + data[(y - 1) * width + (x + 1)] +
                -2 * data[y * width + (x - 1)] + 2 * data[y * width + (x + 1)] +
                -data[(y + 1) * width + (x - 1)] + data[(y + 1) * width + (x + 1)];
            
            result[y * width + x] = gx;
        }
    }
    
    return result;
}

function applySobelY(data, width, height) {
    const result = new Float32Array(width * height);
    
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const gy = 
                -data[(y - 1) * width + (x - 1)] + data[(y + 1) * width + (x - 1)] +
                -2 * data[(y - 1) * width + x] + 2 * data[(y + 1) * width + x] +
                -data[(y - 1) * width + (x + 1)] + data[(y + 1) * width + (x + 1)];
            
            result[y * width + x] = gy;
        }
    }
    
    return result;
}

function nonMaxSuppression(magnitude, direction, width, height) {
    const result = new Float32Array(width * height);
    
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const angle = direction[y * width + x];
            const mag = magnitude[y * width + x];
            
            // Quantize angle to 0, 45, 90, or 135 degrees
            let angleDeg = (angle * 180 / Math.PI + 180) % 180;
            if (angleDeg < 22.5 || angleDeg >= 157.5) angleDeg = 0;
            else if (angleDeg < 67.5) angleDeg = 45;
            else if (angleDeg < 112.5) angleDeg = 90;
            else angleDeg = 135;
            
            let neighbor1, neighbor2;
            
            switch (angleDeg) {
                case 0:
                    neighbor1 = magnitude[y * width + (x - 1)];
                    neighbor2 = magnitude[y * width + (x + 1)];
                    break;
                case 45:
                    neighbor1 = magnitude[(y - 1) * width + (x + 1)];
                    neighbor2 = magnitude[(y + 1) * width + (x - 1)];
                    break;
                case 90:
                    neighbor1 = magnitude[(y - 1) * width + x];
                    neighbor2 = magnitude[(y + 1) * width + x];
                    break;
                case 135:
                    neighbor1 = magnitude[(y - 1) * width + (x - 1)];
                    neighbor2 = magnitude[(y + 1) * width + (x + 1)];
                    break;
            }
            
            result[y * width + x] = (mag >= neighbor1 && mag >= neighbor2) ? mag : 0;
        }
    }
    
    return result;
}

function doubleThreshold(data, width, height) {
    const highThreshold = 50;
    const lowThreshold = 20;
    const result = new Uint8Array(width * height);
    
    for (let i = 0; i < width * height; i++) {
        if (data[i] >= highThreshold) {
            result[i] = 255; // Strong edge
        } else if (data[i] >= lowThreshold) {
            result[i] = 128; // Weak edge
        } else {
            result[i] = 0; // No edge
        }
    }
    
    return result;
}

// Helper functions
function analyzeColorDistribution(labData, width, height) {
    const lValues = [];
    const aValues = [];
    const bValues = [];
    
    for (let i = 0; i < width * height; i++) {
        lValues.push(labData[i * 3]);
        aValues.push(labData[i * 3 + 1]);
        bValues.push(labData[i * 3 + 2]);
    }
    
    return {
        lMean: lValues.reduce((a, b) => a + b) / lValues.length,
        aMean: aValues.reduce((a, b) => a + b) / aValues.length,
        bMean: bValues.reduce((a, b) => a + b) / bValues.length,
        lStd: calculateStd(lValues),
        aStd: calculateStd(aValues),
        bStd: calculateStd(bValues)
    };
}

function calculateStd(values) {
    const mean = values.reduce((a, b) => a + b) / values.length;
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
}

function isInBackgroundCluster(l, a, b, stats) {
    const lDiff = Math.abs(l - stats.lMean);
    const aDiff = Math.abs(a - stats.aMean);
    const bDiff = Math.abs(b - stats.bMean);
    
    // Check if pixel is within 2 standard deviations of background cluster
    return lDiff < 2 * stats.lStd && aDiff < 2 * stats.aStd && bDiff < 2 * stats.bStd;
}

function checkNearEdge(edges, x, y, width, height) {
    const radius = 3;
    
    for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
            const px = x + dx;
            const py = y + dy;
            
            if (px >= 0 && px < width && py >= 0 && py < height) {
                if (edges[py * width + px] > 0) {
                    return true;
                }
            }
        }
    }
    
    return false;
}

// Mask combination using weighted voting (legacy function)
function combineMasks(masks, width, height) {
    const weights = [0.3, 0.3, 0.25, 0.15]; // Brightness, Color, Edge, Saturation
    const result = new Uint8Array(width * height);
    
    for (let i = 0; i < width * height; i++) {
        let weightedSum = 0;
        let totalWeight = 0;
        
        for (let j = 0; j < masks.length; j++) {
            weightedSum += (masks[j][i] / 255) * weights[j];
            totalWeight += weights[j];
        }
        
        const confidence = weightedSum / totalWeight;
        result[i] = confidence > 0.5 ? 255 : 0;
    }
    
    return result;
}

// Morphological operations for cleanup (legacy function)
function morphologicalOperations(mask, width, height) {
    // Erosion to remove noise
    let eroded = erosion(mask, width, height);
    
    // Dilation to restore object boundaries
    let dilated = dilation(eroded, width, height);
    
    // Closing (dilation followed by erosion) to fill small holes
    let closed = erosion(dilation(dilated, width, height), width, height);
    
    return closed;
}

function erosion(mask, width, height) {
    const result = new Uint8Array(width * height);
    
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const center = mask[y * width + x];
            let min = center;
            
            // Check 8-neighborhood
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    const neighbor = mask[(y + dy) * width + (x + dx)];
                    min = Math.min(min, neighbor);
                }
            }
            
            result[y * width + x] = min;
        }
    }
    
    return result;
}

function dilation(mask, width, height) {
    const result = new Uint8Array(width * height);
    
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const center = mask[y * width + x];
            let max = center;
            
            // Check 8-neighborhood
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    const neighbor = mask[(y + dy) * width + (x + dx)];
                    max = Math.max(max, neighbor);
                }
            }
            
            result[y * width + x] = max;
        }
    }
    
    return result;
}

// Advanced mask creation techniques
function createWatershedMask(data, width, height) {
    const grayData = new Uint8Array(width * height);
    
    // Convert to grayscale
    for (let i = 0; i < data.length; i += 4) {
        grayData[i / 4] = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    }
    
    // Apply watershed segmentation
    const watershed = watershedSegmentation(grayData, width, height);
    
    return watershed;
}

function watershedSegmentation(data, width, height) {
    const markers = new Uint8Array(width * height);
    const result = new Uint8Array(width * height);
    
    // Create markers for background and foreground
    for (let i = 0; i < width * height; i++) {
        const x = i % width;
        const y = Math.floor(i / width);
        
        // Mark corners as background
        if ((x < 10 && y < 10) || (x > width - 10 && y < 10) || 
            (x < 10 && y > height - 10) || (x > width - 10 && y > height - 10)) {
            markers[i] = 1; // Background marker
        }
        // Mark center region as foreground
        else if (x > width * 0.3 && x < width * 0.7 && y > height * 0.3 && y < height * 0.7) {
            markers[i] = 2; // Foreground marker
        }
    }
    
    // Apply watershed algorithm
    const labels = watershedAlgorithm(data, markers, width, height);
    
    // Convert labels to mask
    for (let i = 0; i < width * height; i++) {
        result[i] = labels[i] === 2 ? 255 : 0;
    }
    
    return result;
}

function watershedAlgorithm(data, markers, width, height) {
    const labels = new Uint8Array(width * height);
    const queue = [];
    
    // Initialize labels
    for (let i = 0; i < width * height; i++) {
        labels[i] = markers[i];
        if (markers[i] > 0) {
            queue.push({ index: i, label: markers[i] });
        }
    }
    
    // Sort queue by intensity
    queue.sort((a, b) => data[a.index] - data[b.index]);
    
    // Process queue
    while (queue.length > 0) {
        const current = queue.shift();
        const x = current.index % width;
        const y = Math.floor(current.index / width);
        
        // Check neighbors
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;
                
                const nx = x + dx;
                const ny = y + dy;
                
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                    const neighborIndex = ny * width + nx;
                    
                    if (labels[neighborIndex] === 0) {
                        labels[neighborIndex] = current.label;
                        queue.push({ index: neighborIndex, label: current.label });
                    }
                }
            }
        }
    }
    
    return labels;
}

// Calculate adaptive weights based on image characteristics
function calculateAdaptiveWeights(data, width, height) {
    const stats = analyzeImageStatistics(data, width, height);
    
    // Adjust weights based on image characteristics
    let weights = [0.25, 0.25, 0.2, 0.15, 0.15]; // Base weights
    
    // If image has high contrast, increase edge weight
    if (stats.contrast > 50) {
        weights[2] += 0.1; // Increase edge weight
        weights[0] -= 0.05; // Decrease brightness weight
        weights[1] -= 0.05; // Decrease color weight
    }
    
    // If image has low saturation, increase brightness weight
    if (stats.saturation < 0.3) {
        weights[0] += 0.1; // Increase brightness weight
        weights[3] -= 0.1; // Decrease saturation weight
    }
    
    // Normalize weights
    const sum = weights.reduce((a, b) => a + b, 0);
    weights = weights.map(w => w / sum);
    
    return weights;
}

function analyzeImageStatistics(data, width, height) {
    let totalBrightness = 0;
    let totalSaturation = 0;
    let minBrightness = 255;
    let maxBrightness = 0;
    let colorVariance = 0;
    
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        const brightness = (r + g + b) / 3;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const saturation = max === 0 ? 0 : (max - min) / max;
        
        totalBrightness += brightness;
        totalSaturation += saturation;
        minBrightness = Math.min(minBrightness, brightness);
        maxBrightness = Math.max(maxBrightness, brightness);
        
        // Calculate color variance
        const mean = (r + g + b) / 3;
        colorVariance += Math.pow(r - mean, 2) + Math.pow(g - mean, 2) + Math.pow(b - mean, 2);
    }
    
    const pixelCount = width * height;
    
    return {
        meanBrightness: totalBrightness / pixelCount,
        meanSaturation: totalSaturation / pixelCount,
        contrast: maxBrightness - minBrightness,
        colorVariance: colorVariance / pixelCount
    };
}

// Adaptive mask combination
function combineMasksAdaptive(masks, weights, width, height) {
    const result = new Uint8Array(width * height);
    
    for (let i = 0; i < width * height; i++) {
        let weightedSum = 0;
        let totalWeight = 0;
        
        for (let j = 0; j < masks.length; j++) {
            weightedSum += (masks[j][i] / 255) * weights[j];
            totalWeight += weights[j];
        }
        
        const confidence = weightedSum / totalWeight;
        
        // Apply sigmoid function for smoother transitions
        const sigmoid = 1 / (1 + Math.exp(-10 * (confidence - 0.5)));
        result[i] = sigmoid * 255;
    }
    
    return result;
}

// Advanced morphological operations
function advancedMorphologicalOperations(mask, width, height) {
    // Opening (erosion followed by dilation) to remove noise
    let opened = dilation(erosion(mask, width, height), width, height);
    
    // Closing (dilation followed by erosion) to fill holes
    let closed = erosion(dilation(opened, width, height), width, height);
    
    // Area opening to remove small objects
    let areaOpened = areaOpening(closed, width, height, 100);
    
    return areaOpened;
}

function areaOpening(mask, width, height, minArea) {
    const labels = connectedComponents(mask, width, height);
    const areas = calculateAreas(labels, width, height);
    const result = new Uint8Array(width * height);
    
    for (let i = 0; i < width * height; i++) {
        const label = labels[i];
        if (label > 0 && areas[label] >= minArea) {
            result[i] = mask[i];
        } else {
            result[i] = 0;
        }
    }
    
    return result;
}

function connectedComponents(mask, width, height) {
    const labels = new Uint8Array(width * height);
    let currentLabel = 1;
    
    for (let i = 0; i < width * height; i++) {
        if (mask[i] > 0 && labels[i] === 0) {
            floodFillLabel(mask, labels, i, currentLabel, width, height);
            currentLabel++;
        }
    }
    
    return labels;
}

function floodFillLabel(mask, labels, startIndex, label, width, height) {
    const stack = [startIndex];
    
    while (stack.length > 0) {
        const current = stack.pop();
        const x = current % width;
        const y = Math.floor(current / width);
        
        if (labels[current] === 0 && mask[current] > 0) {
            labels[current] = label;
            
            // Add neighbors to stack
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    const nx = x + dx;
                    const ny = y + dy;
                    
                    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                        const neighborIndex = ny * width + nx;
                        if (labels[neighborIndex] === 0 && mask[neighborIndex] > 0) {
                            stack.push(neighborIndex);
                        }
                    }
                }
            }
        }
    }
}

function calculateAreas(labels, width, height) {
    const areas = {};
    
    for (let i = 0; i < width * height; i++) {
        const label = labels[i];
        if (label > 0) {
            areas[label] = (areas[label] || 0) + 1;
        }
    }
    
    return areas;
}

// Edge refinement
function refineEdges(data, mask, width, height) {
    const edges = detectEdges(data, width, height);
    const result = new Uint8Array(width * height);
    
    for (let i = 0; i < width * height; i++) {
        const x = i % width;
        const y = Math.floor(i / width);
        
        // If pixel is near an edge, refine the mask
        if (edges[i] > 0) {
            // Use edge information to improve mask
            const edgeStrength = edges[i] / 255;
            const maskValue = mask[i] / 255;
            
            // Blend edge and mask information
            result[i] = Math.max(maskValue, edgeStrength) * 255;
        } else {
            result[i] = mask[i];
        }
    }
    
    return result;
}

// Apply mask with feathering for smooth edges
function applyMaskWithFeathering(data, mask, width, height) {
    const result = new Uint8ClampedArray(data.length);
    const featheredMask = applyFeathering(mask, width, height);
    
    for (let i = 0; i < data.length; i += 4) {
        const pixelIndex = i / 4;
        const maskValue = featheredMask[pixelIndex] / 255;
        
        result[i] = data[i];     // R
        result[i + 1] = data[i + 1]; // G
        result[i + 2] = data[i + 2]; // B
        result[i + 3] = data[i + 3] * maskValue; // A (transparency)
    }
    
    return result;
}

function applyFeathering(mask, width, height) {
    const feathered = new Uint8Array(width * height);
    const featherRadius = 3;
    
    for (let i = 0; i < width * height; i++) {
        const x = i % width;
        const y = Math.floor(i / width);
        
        let sum = 0;
        let count = 0;
        
        // Calculate average in neighborhood
        for (let dy = -featherRadius; dy <= featherRadius; dy++) {
            for (let dx = -featherRadius; dx <= featherRadius; dx++) {
                const nx = x + dx;
                const ny = y + dy;
                
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                    sum += mask[ny * width + nx];
                    count++;
                }
            }
        }
        
        feathered[i] = sum / count;
    }
    
    return feathered;
}

// Apply final mask to create transparent background
function applyMask(data, mask, width, height) {
    const result = new Uint8ClampedArray(data.length);
    
    for (let i = 0; i < data.length; i += 4) {
        const pixelIndex = i / 4;
        const maskValue = mask[pixelIndex] / 255;
        
        result[i] = data[i];     // R
        result[i + 1] = data[i + 1]; // G
        result[i + 2] = data[i + 2]; // B
        result[i + 3] = data[i + 3] * maskValue; // A (transparency)
    }
    
    return result;
}

function downloadImage() {
    if (!processedImageData) {
        showError('No processed image available.');
        return;
    }
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.download = `processed_${currentFile.name.replace(/\.[^/.]+$/, '')}.png`;
    link.href = processedImageData;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    showSuccess('Image downloaded successfully!');
}

function showError(message) {
    // Create error notification
    const notification = document.createElement('div');
    notification.className = 'notification error';
    notification.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function showSuccess(message) {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Contact form handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        showError('Please fill in all fields.');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showSuccess('Message sent successfully! We\'ll get back to you soon.');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .step');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add notification styles
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    }
    
    .notification.success {
        background: linear-gradient(45deg, #00ff88, #00d4ff);
        box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
    }
    
    .notification.error {
        background: linear-gradient(45deg, #ff4444, #ff0080);
        box-shadow: 0 0 20px rgba(255, 68, 68, 0.5);
    }
    
    .notification button {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
    }
    
    .notification button:hover {
        opacity: 0.8;
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);



// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(() => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
}, 10));

// Add loading states to buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn') && !e.target.disabled) {
        e.target.classList.add('loading');
        setTimeout(() => {
            e.target.classList.remove('loading');
        }, 1000);
    }
});

// Initialize tooltips for better UX
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.getAttribute('data-tooltip');
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTooltips();
    
    // Add some interactive elements
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) rotateX(10deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals or menus
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}