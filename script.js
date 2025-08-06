// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
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

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
});

// AI Image Generation Tool
class AIImageGenerator {
    constructor() {
        this.generateBtn = document.getElementById('generate-btn');
        this.promptInput = document.getElementById('prompt');
        this.styleSelect = document.getElementById('style');
        this.sizeSelect = document.getElementById('size');
        this.loadingDiv = document.getElementById('loading');
        this.resultDiv = document.getElementById('result');
        this.placeholderDiv = document.getElementById('placeholder');
        this.generatedImage = document.getElementById('generated-image');
        this.downloadBtn = document.getElementById('download-btn');
        this.shareBtn = document.getElementById('share-btn');

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.generateBtn.addEventListener('click', () => this.generateImage());
        this.downloadBtn.addEventListener('click', () => this.downloadImage());
        this.shareBtn.addEventListener('click', () => this.shareImage());
        
        // Enable generate button when prompt is entered
        this.promptInput.addEventListener('input', () => {
            this.generateBtn.disabled = !this.promptInput.value.trim();
        });
    }

    async generateImage() {
        const prompt = this.promptInput.value.trim();
        const style = this.styleSelect.value;
        const size = this.sizeSelect.value;

        if (!prompt) {
            this.showNotification('Please enter a description for your image', 'error');
            return;
        }

        this.showLoading();
        this.generateBtn.disabled = true;

        try {
            // Use a free AI image generation service
            const imageUrl = await this.callImageGenerationAPI(prompt, style, size);
            
            if (imageUrl) {
                this.displayResult(imageUrl);
                this.showNotification('Image generated successfully!', 'success');
            } else {
                throw new Error('Failed to generate image');
            }
        } catch (error) {
            console.error('Error generating image:', error);
            this.showNotification('Failed to generate image. Please try again.', 'error');
            this.showPlaceholder();
        } finally {
            this.generateBtn.disabled = false;
        }
    }

    async callImageGenerationAPI(prompt, style, size) {
        // For demonstration purposes, we'll use a placeholder image service
        // In a real implementation, you would integrate with services like:
        // - Stable Diffusion API
        // - DALL-E API
        // - Midjourney API
        // - Or other AI image generation services

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

        // For demo purposes, we'll use Unsplash API to get relevant images
        // This is a fallback since we don't have actual AI API keys
        const searchTerm = this.getSearchTermFromPrompt(prompt, style);
        
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random?query=${encodeURIComponent(searchTerm)}&client_id=YOUR_UNSPLASH_ACCESS_KEY`);
            
            if (response.ok) {
                const data = await response.json();
                return data.urls.regular;
            } else {
                // Fallback to placeholder images
                return this.getPlaceholderImage(prompt, style);
            }
        } catch (error) {
            // Fallback to placeholder images
            return this.getPlaceholderImage(prompt, style);
        }
    }

    getSearchTermFromPrompt(prompt, style) {
        // Extract key terms from the prompt for image search
        const words = prompt.toLowerCase().split(' ').slice(0, 3);
        return words.join(' ') + ' ' + style;
    }

    getPlaceholderImage(prompt, style) {
        // Generate a placeholder image based on the prompt and style
        const baseUrl = 'https://picsum.photos';
        const [width, height] = this.sizeSelect.value.split('x');
        
        // Create a seed based on the prompt for consistent images
        const seed = this.hashCode(prompt + style);
        
        return `${baseUrl}/${width}/${height}?random=${seed}`;
    }

    hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }

    showLoading() {
        this.loadingDiv.classList.remove('hidden');
        this.resultDiv.classList.add('hidden');
        this.placeholderDiv.classList.add('hidden');
    }

    displayResult(imageUrl) {
        this.generatedImage.src = imageUrl;
        this.loadingDiv.classList.add('hidden');
        this.resultDiv.classList.remove('hidden');
        this.placeholderDiv.classList.add('hidden');
    }

    showPlaceholder() {
        this.loadingDiv.classList.add('hidden');
        this.resultDiv.classList.add('hidden');
        this.placeholderDiv.classList.remove('hidden');
    }

    async downloadImage() {
        try {
            const response = await fetch(this.generatedImage.src);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `ai-generated-image-${Date.now()}.jpg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            this.showNotification('Image downloaded successfully!', 'success');
        } catch (error) {
            console.error('Error downloading image:', error);
            this.showNotification('Failed to download image', 'error');
        }
    }

    async shareImage() {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'AI Generated Image',
                    text: 'Check out this amazing AI-generated image!',
                    url: window.location.href
                });
            } else {
                // Fallback: copy to clipboard
                await navigator.clipboard.writeText(window.location.href);
                this.showNotification('Link copied to clipboard!', 'success');
            }
        } catch (error) {
            console.error('Error sharing image:', error);
            this.showNotification('Failed to share image', 'error');
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.background = '#10b981';
                break;
            case 'error':
                notification.style.background = '#ef4444';
                break;
            default:
                notification.style.background = '#6366f1';
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Contact form handling
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.initializeForm();
    }

    initializeForm() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    async handleSubmit() {
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name') || this.form.querySelector('input[type="text"]').value,
            email: formData.get('email') || this.form.querySelector('input[type="email"]').value,
            message: formData.get('message') || this.form.querySelector('textarea').value
        };

        // Simulate form submission
        const submitBtn = this.form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            this.form.reset();
        } catch (error) {
            this.showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AI Image Generator
    const aiGenerator = new AIImageGenerator();
    
    // Initialize Contact Form
    const contactForm = new ContactForm();
    
    // Add some interactive animations
    addScrollAnimations();
});

// Add scroll animations
function addScrollAnimations() {
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
    const animateElements = document.querySelectorAll('.feature-card, .about-content, .contact-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add some fun interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});