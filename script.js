class LinkThumbnailGenerator {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.currentThumbnailData = null;
    }

    initializeElements() {
        this.urlInput = document.getElementById('urlInput');
        this.generateBtn = document.getElementById('generateBtn');
        this.resultSection = document.getElementById('resultSection');
        this.thumbnailContainer = document.getElementById('thumbnailContainer');
        this.loading = document.getElementById('loading');
        this.error = document.getElementById('error');
        this.errorMessage = document.getElementById('errorMessage');
        this.copyBtn = document.getElementById('copyBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.newBtn = document.getElementById('newBtn');
        this.exampleBtns = document.querySelectorAll('.example-btn');
    }

    bindEvents() {
        this.generateBtn.addEventListener('click', () => this.generateThumbnail());
        this.urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.generateThumbnail();
        });
        this.copyBtn.addEventListener('click', () => this.copyHTML());
        this.downloadBtn.addEventListener('click', () => this.downloadImage());
        this.newBtn.addEventListener('click', () => this.resetForm());
        
        this.exampleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const url = btn.getAttribute('data-url');
                this.urlInput.value = url;
                this.generateThumbnail();
            });
        });
    }

    async generateThumbnail() {
        const url = this.urlInput.value.trim();
        
        if (!url) {
            this.showError('Please enter a valid URL');
            return;
        }

        if (!this.isValidUrl(url)) {
            this.showError('Please enter a valid URL starting with http:// or https://');
            return;
        }

        this.showLoading();
        this.hideError();
        this.hideResult();

        try {
            // Use a screenshot service to generate thumbnail
            const thumbnailUrl = await this.getScreenshotUrl(url);
            const metadata = await this.getPageMetadata(url);
            
            this.currentThumbnailData = {
                url: url,
                thumbnailUrl: thumbnailUrl,
                title: metadata.title || this.extractDomain(url),
                description: metadata.description || 'Visit this website',
                domain: this.extractDomain(url)
            };

            this.displayThumbnail();
            this.showResult();
            this.hideLoading();
        } catch (error) {
            console.error('Error generating thumbnail:', error);
            this.showError('Failed to generate thumbnail. Please try again or check if the URL is accessible.');
            this.hideLoading();
        }
    }

    async getScreenshotUrl(url) {
        // Using a free screenshot service (you can replace with your preferred service)
        const encodedUrl = encodeURIComponent(url);
        return `https://api.apiflash.com/v1/urltoimage?access_key=demo&url=${encodedUrl}&width=400&height=200&format=jpeg&quality=85&response_type=image`;
    }

    async getPageMetadata(url) {
        try {
            // Create a proxy request to avoid CORS issues
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
            const data = await response.json();
            
            if (data.contents) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data.contents, 'text/html');
                
                return {
                    title: doc.querySelector('title')?.textContent || '',
                    description: doc.querySelector('meta[name="description"]')?.getAttribute('content') || 
                               doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || ''
                };
            }
        } catch (error) {
            console.warn('Could not fetch metadata:', error);
        }
        
        return { title: '', description: '' };
    }

    displayThumbnail() {
        const { url, thumbnailUrl, title, description, domain } = this.currentThumbnailData;
        
        const thumbnailHTML = `
            <a href="${url}" target="_blank" class="thumbnail-link">
                <div class="thumbnail-card">
                    <div class="thumbnail-image">
                        <img src="${thumbnailUrl}" alt="${title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div style="display: none; align-items: center; justify-content: center; width: 100%; height: 100%; background: #f1f3f4; color: #666; font-size: 0.9rem;">
                            <i class="fas fa-globe" style="font-size: 2rem; margin-right: 0.5rem;"></i>
                            ${domain}
                        </div>
                    </div>
                    <div class="thumbnail-content">
                        <div class="thumbnail-title">${title}</div>
                        <div class="thumbnail-description">${description}</div>
                        <div class="thumbnail-url">${domain}</div>
                    </div>
                </div>
            </a>
        `;
        
        this.thumbnailContainer.innerHTML = thumbnailHTML;
    }

    copyHTML() {
        if (!this.currentThumbnailData) return;
        
        const { url, thumbnailUrl, title, description, domain } = this.currentThumbnailData;
        
        const htmlCode = `<a href="${url}" target="_blank" style="display: inline-block; text-decoration: none; color: inherit; transition: transform 0.3s ease;">
    <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 400px; margin: 0 auto;">
        <div style="width: 100%; height: 200px; object-fit: cover; background: #f1f3f4;">
            <img src="${thumbnailUrl}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="padding: 1.5rem; text-align: left;">
            <div style="font-size: 1.1rem; font-weight: 600; color: #333; margin-bottom: 0.5rem; line-height: 1.4;">${title}</div>
            <div style="font-size: 0.9rem; color: #666; margin-bottom: 1rem; line-height: 1.5;">${description}</div>
            <div style="font-size: 0.8rem; color: #999; word-break: break-all;">${domain}</div>
        </div>
    </div>
</a>`;
        
        navigator.clipboard.writeText(htmlCode).then(() => {
            this.showCopySuccess();
        }).catch(() => {
            this.fallbackCopyTextToClipboard(htmlCode);
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
            this.showError('Failed to copy HTML to clipboard');
        }
        
        document.body.removeChild(textArea);
    }

    async downloadImage() {
        if (!this.currentThumbnailData?.thumbnailUrl) return;
        
        try {
            const response = await fetch(this.currentThumbnailData.thumbnailUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `${this.currentThumbnailData.domain}-thumbnail.jpg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading image:', error);
            this.showError('Failed to download image');
        }
    }

    resetForm() {
        this.urlInput.value = '';
        this.hideResult();
        this.hideError();
        this.urlInput.focus();
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
        this.copyBtn.style.background = '#28a745';
        this.copyBtn.style.borderColor = '#28a745';
        this.copyBtn.style.color = 'white';
        
        setTimeout(() => {
            this.copyBtn.innerHTML = originalText;
            this.copyBtn.style.background = '';
            this.copyBtn.style.borderColor = '';
            this.copyBtn.style.color = '';
        }, 2000);
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    extractDomain(url) {
        try {
            const domain = new URL(url).hostname;
            return domain.replace('www.', '');
        } catch {
            return url;
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LinkThumbnailGenerator();
});