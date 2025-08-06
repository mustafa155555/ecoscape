# Deployment Guide - AI Image Generator

This guide will help you deploy your AI Image Generator website to various hosting platforms.

## 🚀 Quick Deployment Options

### 1. Netlify (Recommended for beginners)

**Step 1: Prepare your files**
- Ensure all files are in a single folder
- Make sure `index.html` is in the root directory

**Step 2: Deploy**
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with your GitHub account
3. Click "New site from Git"
4. Choose your repository
5. Click "Deploy site"

**Step 3: Configure**
- Your site will be live at `https://your-site-name.netlify.app`
- You can customize the domain name in the site settings

### 2. Vercel

**Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

**Step 2: Deploy**
```bash
# Navigate to your project directory
cd ai-image-generator

# Deploy
vercel

# Follow the prompts
# - Link to existing project? No
# - Project name: ai-image-generator
# - Directory: ./
```

**Step 3: Access**
- Your site will be live at `https://your-project.vercel.app`

### 3. GitHub Pages

**Step 1: Create Repository**
1. Create a new repository on GitHub
2. Name it `ai-image-generator`

**Step 2: Upload Files**
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote
git remote add origin https://github.com/yourusername/ai-image-generator.git

# Push
git push -u origin main
```

**Step 3: Enable Pages**
1. Go to your repository on GitHub
2. Click "Settings"
3. Scroll to "Pages" section
4. Select "Deploy from a branch"
5. Choose "main" branch
6. Click "Save"

**Step 4: Access**
- Your site will be live at `https://yourusername.github.io/ai-image-generator`

### 4. AWS S3 Static Website Hosting

**Step 1: Create S3 Bucket**
1. Go to AWS S3 Console
2. Click "Create bucket"
3. Name your bucket (e.g., `ai-image-generator`)
4. Uncheck "Block all public access"
5. Click "Create bucket"

**Step 2: Configure for Static Website**
1. Select your bucket
2. Go to "Properties" tab
3. Scroll to "Static website hosting"
4. Click "Edit"
5. Enable static website hosting
6. Set index document to `index.html`
7. Click "Save changes"

**Step 3: Upload Files**
1. Go to "Objects" tab
2. Click "Upload"
3. Select all your project files
4. Click "Upload"

**Step 4: Set Permissions**
1. Select all files
2. Click "Actions" → "Make public using ACL"
3. Confirm

**Step 5: Access**
- Your site will be live at the provided S3 website endpoint

## 🔧 Production Configuration

### 1. Environment Variables

For production, never expose API keys in client-side code. Use environment variables:

**Netlify:**
1. Go to Site Settings → Environment Variables
2. Add your API keys:
   - `OPENAI_API_KEY`
   - `STABILITY_API_KEY`
   - `HUGGINGFACE_TOKEN`

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Add your API keys with the same names

### 2. Backend Integration

For better security, create a backend API:

**Node.js/Express Example:**
```javascript
// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate-image', async (req, res) => {
    const { prompt, style, size } = req.body;
    
    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                prompt: `${prompt} ${style} style`,
                n: 1,
                size: size,
                response_format: 'url'
            })
        });
        
        const data = await response.json();
        res.json({ success: true, imageUrl: data.data[0].url });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

**Update your frontend:**
```javascript
// In script.js, replace the API call
async callImageGenerationAPI(prompt, style, size) {
    const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, style, size })
    });
    
    const data = await response.json();
    return data.imageUrl;
}
```

### 3. Domain Configuration

**Custom Domain Setup:**

**Netlify:**
1. Go to Site Settings → Domain management
2. Click "Add custom domain"
3. Enter your domain
4. Follow DNS configuration instructions

**Vercel:**
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS records as instructed

## 🔒 Security Best Practices

### 1. API Key Protection
- Never commit API keys to version control
- Use environment variables
- Implement rate limiting
- Use API key rotation

### 2. CORS Configuration
```javascript
// Backend CORS setup
app.use(cors({
    origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
    methods: ['GET', 'POST'],
    credentials: true
}));
```

### 3. Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## 📊 Monitoring and Analytics

### 1. Google Analytics
Add to your `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Error Tracking
```javascript
// Add to script.js
window.addEventListener('error', function(e) {
    // Send error to your analytics service
    console.error('Error:', e.error);
});
```

## 🚀 Performance Optimization

### 1. Image Optimization
- Compress images before uploading
- Use WebP format when possible
- Implement lazy loading

### 2. Caching
```html
<!-- Add to your HTML head -->
<meta http-equiv="Cache-Control" content="max-age=31536000">
```

### 3. CDN
- Use a CDN for static assets
- Consider Cloudflare for global distribution

## 🔄 Continuous Deployment

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy to Netlify

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: './'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 🆘 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Ensure your backend allows requests from your frontend domain
   - Check that API endpoints are properly configured

2. **API Key Issues**
   - Verify API keys are correctly set in environment variables
   - Check API key permissions and quotas

3. **Build Errors**
   - Ensure all file paths are correct
   - Check for syntax errors in JavaScript/CSS

4. **Performance Issues**
   - Optimize images and assets
   - Implement caching strategies
   - Use CDN for static content

## 📞 Support

If you encounter deployment issues:
1. Check the platform's documentation
2. Review error logs in your hosting platform
3. Test locally first
4. Ensure all dependencies are properly configured

---

**Remember**: Always test your deployment in a staging environment before going live with production changes.