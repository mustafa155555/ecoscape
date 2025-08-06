class CustomLinkShortener {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.currentShortLink = null;
        this.recentLinks = this.loadRecentLinks();
        this.baseUrl = 'short.ly'; // You can change this to your domain
        this.updateRecentLinksDisplay();
    }

    initializeElements() {
        this.longUrlInput = document.getElementById('longUrl');
        this.customSlugInput = document.getElementById('customSlug');
        this.shortenBtn = document.getElementById('shortenBtn');
        this.resultSection = document.getElementById('resultSection');
        this.shortUrlDisplay = document.getElementById('shortUrlDisplay');
        this.originalUrlDisplay = document.getElementById('originalUrlDisplay');
        this.loading = document.getElementById('loading');
        this.error = document.getElementById('error');
        this.errorMessage = document.getElementById('errorMessage');
        this.copyBtn = document.getElementById('copyBtn');
        this.testBtn = document.getElementById('testBtn');
        this.newLinkBtn = document.getElementById('newLinkBtn');
        this.qrBtn = document.getElementById('qrBtn');
        this.createdDate = document.getElementById('createdDate');
        this.recentLinksSection = document.getElementById('recentLinks');
        this.linksList = document.getElementById('linksList');
        this.qrModal = document.getElementById('qrModal');
        this.closeQrModal = document.getElementById('closeQrModal');
        this.qrCode = document.getElementById('qrCode');
    }

    bindEvents() {
        this.shortenBtn.addEventListener('click', () => this.createShortLink());
        this.longUrlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.createShortLink();
        });
        this.customSlugInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.createShortLink();
        });
        this.copyBtn.addEventListener('click', () => this.copyShortLink());
        this.testBtn.addEventListener('click', () => this.testShortLink());
        this.newLinkBtn.addEventListener('click', () => this.resetForm());
        this.qrBtn.addEventListener('click', () => this.generateQRCode());
        this.closeQrModal.addEventListener('click', () => this.closeModal());
        
        // Close modal when clicking outside
        this.qrModal.addEventListener('click', (e) => {
            if (e.target === this.qrModal) this.closeModal();
        });

        // Auto-generate slug when typing in long URL
        this.longUrlInput.addEventListener('input', () => {
            if (!this.customSlugInput.value) {
                this.generateSlugFromUrl();
            }
        });
    }

    async createShortLink() {
        const longUrl = this.longUrlInput.value.trim();
        const customSlug = this.customSlugInput.value.trim();
        
        if (!longUrl) {
            this.showError('Please enter a valid URL');
            return;
        }

        if (!this.isValidUrl(longUrl)) {
            this.showError('Please enter a valid URL starting with http:// or https://');
            return;
        }

        if (customSlug && !this.isValidSlug(customSlug)) {
            this.showError('Custom slug can only contain letters, numbers, hyphens, and underscores');
            return;
        }

        this.showLoading();
        this.hideError();
        this.hideResult();

        try {
            const slug = customSlug || this.generateRandomSlug();
            const shortUrl = `https://${this.baseUrl}/${slug}`;
            
            // Check if slug already exists
            if (this.slugExists(slug)) {
                if (customSlug) {
                    this.showError('This custom slug is already taken. Please choose a different one.');
                    this.hideLoading();
                    return;
                } else {
                    // Generate a new random slug
                    const newSlug = this.generateRandomSlug();
                    const newShortUrl = `https://${this.baseUrl}/${newSlug}`;
                    this.saveShortLink(longUrl, newShortUrl, newSlug);
                }
            } else {
                this.saveShortLink(longUrl, shortUrl, slug);
            }
            
            this.hideLoading();
        } catch (error) {
            console.error('Error creating short link:', error);
            this.showError('Failed to create short link. Please try again.');
            this.hideLoading();
        }
    }

    saveShortLink(longUrl, shortUrl, slug) {
        const linkData = {
            id: Date.now(),
            longUrl: longUrl,
            shortUrl: shortUrl,
            slug: slug,
            createdAt: new Date().toISOString(),
            clicks: 0
        };

        this.currentShortLink = linkData;
        this.recentLinks.unshift(linkData);
        
        // Keep only the last 10 links
        if (this.recentLinks.length > 10) {
            this.recentLinks = this.recentLinks.slice(0, 10);
        }
        
        this.saveRecentLinks();
        this.displayShortLink();
        this.updateRecentLinksDisplay();
        this.showResult();
    }

    displayShortLink() {
        this.shortUrlDisplay.textContent = this.currentShortLink.shortUrl;
        this.originalUrlDisplay.textContent = this.currentShortLink.longUrl;
        this.createdDate.textContent = new Date(this.currentShortLink.createdAt).toLocaleDateString();
    }

    generateRandomSlug() {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    generateSlugFromUrl() {
        const url = this.longUrlInput.value.trim();
        if (!url) return;
        
        try {
            const urlObj = new URL(url);
            let slug = urlObj.hostname.replace('www.', '').split('.')[0];
            slug = slug.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            
            if (slug.length > 0) {
                this.customSlugInput.value = slug;
            }
        } catch (error) {
            // Invalid URL, ignore
        }
    }

    slugExists(slug) {
        return this.recentLinks.some(link => link.slug === slug);
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    isValidSlug(slug) {
        return /^[a-zA-Z0-9-_]+$/.test(slug);
    }

    copyShortLink() {
        if (!this.currentShortLink) return;
        
        navigator.clipboard.writeText(this.currentShortLink.shortUrl).then(() => {
            this.showCopySuccess();
        }).catch(() => {
            this.fallbackCopyTextToClipboard(this.currentShortLink.shortUrl);
        });
    }

    fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showCopySuccess();
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
            this.showError('Failed to copy link to clipboard');
        }
        
        document.body.removeChild(textArea);
    }

    testShortLink() {
        if (!this.currentShortLink) return;
        
        // Increment click count
        this.currentShortLink.clicks++;
        this.saveRecentLinks();
        this.updateRecentLinksDisplay();
        
        // Open link in new tab
        window.open(this.currentShortLink.longUrl, '_blank');
    }

    generateQRCode() {
        if (!this.currentShortLink) return;
        
        this.qrCode.innerHTML = '';
        QRCode.toCanvas(this.qrCode, this.currentShortLink.shortUrl, {
            width: 200,
            margin: 2,
            color: {
                dark: '#667eea',
                light: '#ffffff'
            }
        }, (error) => {
            if (error) {
                console.error('QR Code generation error:', error);
                this.showError('Failed to generate QR code');
            }
        });
        
        this.qrModal.style.display = 'flex';
    }

    closeModal() {
        this.qrModal.style.display = 'none';
    }

    resetForm() {
        this.longUrlInput.value = '';
        this.customSlugInput.value = '';
        this.hideResult();
        this.hideError();
        this.longUrlInput.focus();
    }

    updateRecentLinksDisplay() {
        if (this.recentLinks.length === 0) {
            this.recentLinksSection.style.display = 'none';
            return;
        }

        this.recentLinksSection.style.display = 'block';
        this.linksList.innerHTML = '';

        this.recentLinks.forEach(link => {
            const linkElement = document.createElement('div');
            linkElement.className = 'recent-link-item';
            linkElement.innerHTML = `
                <div class="recent-link-short">${link.shortUrl}</div>
                <div class="recent-link-original">${link.longUrl}</div>
                <div class="recent-link-stats">
                    <span>${link.clicks} clicks</span>
                    <span>${new Date(link.createdAt).toLocaleDateString()}</span>
                </div>
            `;
            
            linkElement.addEventListener('click', () => {
                this.longUrlInput.value = link.longUrl;
                this.customSlugInput.value = link.slug;
                this.createShortLink();
            });
            
            this.linksList.appendChild(linkElement);
        });
    }

    loadRecentLinks() {
        try {
            const saved = localStorage.getItem('recentLinks');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading recent links:', error);
            return [];
        }
    }

    saveRecentLinks() {
        try {
            localStorage.setItem('recentLinks', JSON.stringify(this.recentLinks));
        } catch (error) {
            console.error('Error saving recent links:', error);
        }
    }

    showLoading() {
        this.loading.style.display = 'block';
    }

    hideLoading() {
        this.loading.style.display = 'none';
    }

    showResult() {
        this.resultSection.style.display = 'block';
        this.resultSection.classList.add('success');
        setTimeout(() => {
            this.resultSection.classList.remove('success');
        }, 600);
    }

    hideResult() {
        this.resultSection.style.display = 'none';
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.error.style.display = 'block';
    }

    hideError() {
        this.error.style.display = 'none';
    }

    showCopySuccess() {
        const originalText = this.copyBtn.innerHTML;
        this.copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        this.copyBtn.style.background = 'var(--success-color)';
        this.copyBtn.style.borderColor = 'var(--success-color)';
        this.copyBtn.style.color = 'white';
        
        setTimeout(() => {
            this.copyBtn.innerHTML = originalText;
            this.copyBtn.style.background = '';
            this.copyBtn.style.borderColor = '';
            this.copyBtn.style.color = '';
        }, 2000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CustomLinkShortener();
});