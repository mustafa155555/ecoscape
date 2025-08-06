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
                const data = imageData.data;
                
                // Simple background removal simulation
                // This is a basic implementation - in a real app, you'd use AI/ML
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    
                    // Simple background detection (white/light backgrounds)
                    const brightness = (r + g + b) / 3;
                    const colorDiff = Math.max(r, g, b) - Math.min(r, g, b);
                    
                    // If pixel is likely background (bright and low color variation)
                    if (brightness > 200 && colorDiff < 30) {
                        data[i + 3] = 0; // Make transparent
                    }
                    
                    // Alternative: detect edges and create a mask
                    // This is a very basic edge detection
                    if (i > 0 && i < data.length - 4) {
                        const currentBrightness = (r + g + b) / 3;
                        const nextBrightness = (data[i + 4] + data[i + 5] + data[i + 6]) / 3;
                        
                        if (Math.abs(currentBrightness - nextBrightness) < 10) {
                            // Reduce opacity for similar pixels (potential background)
                            data[i + 3] *= 0.8;
                        }
                    }
                }
                
                // Put the processed image data back
                ctx.putImageData(imageData, 0, 0);
                
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

// Enhanced background removal algorithm (more sophisticated)
function enhancedBackgroundRemoval(imageData) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    
    // Create a mask for background detection
    const mask = new Uint8Array(width * height);
    
    // Step 1: Detect edges using Sobel operator
    const edges = detectEdges(data, width, height);
    
    // Step 2: Flood fill from edges to create background mask
    const backgroundMask = floodFill(edges, width, height);
    
    // Step 3: Apply mask to original image
    for (let i = 0; i < data.length; i += 4) {
        const pixelIndex = i / 4;
        const x = pixelIndex % width;
        const y = Math.floor(pixelIndex / width);
        
        if (backgroundMask[y * width + x]) {
            data[i + 3] = 0; // Make background transparent
        }
    }
    
    return imageData;
}

function detectEdges(data, width, height) {
    const edges = new Uint8Array(width * height);
    
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const idx = (y * width + x) * 4;
            
            // Sobel operators
            const gx = 
                -data[idx - 4 - width * 4] + data[idx + 4 - width * 4] +
                -2 * data[idx - 4] + 2 * data[idx + 4] +
                -data[idx - 4 + width * 4] + data[idx + 4 + width * 4];
            
            const gy = 
                -data[idx - width * 4 - 4] + data[idx + width * 4 - 4] +
                -2 * data[idx - width * 4] + 2 * data[idx + width * 4] +
                -data[idx - width * 4 + 4] + data[idx + width * 4 + 4];
            
            const magnitude = Math.sqrt(gx * gx + gy * gy);
            edges[y * width + x] = magnitude > 50 ? 255 : 0;
        }
    }
    
    return edges;
}

function floodFill(edges, width, height) {
    const visited = new Uint8Array(width * height);
    const queue = [];
    
    // Start from corners
    const corners = [0, width - 1, (height - 1) * width, width * height - 1];
    
    corners.forEach(corner => {
        if (!visited[corner] && edges[corner] === 0) {
            queue.push(corner);
            visited[corner] = 1;
        }
    });
    
    while (queue.length > 0) {
        const current = queue.shift();
        const x = current % width;
        const y = Math.floor(current / width);
        
        // Check neighbors
        const neighbors = [
            current - 1, current + 1,
            current - width, current + width
        ];
        
        neighbors.forEach(neighbor => {
            const nx = neighbor % width;
            const ny = Math.floor(neighbor / width);
            
            if (nx >= 0 && nx < width && ny >= 0 && ny < height &&
                !visited[neighbor] && edges[neighbor] === 0) {
                visited[neighbor] = 1;
                queue.push(neighbor);
            }
        });
    }
    
    return visited;
}

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