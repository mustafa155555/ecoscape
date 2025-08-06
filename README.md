# AI Image Generator - Professional Website

A complete, professional website featuring an AI-powered text-to-image generation tool. This project combines modern web design with cutting-edge AI technology to create a seamless user experience.

## 🌟 Features

### Core Functionality
- **AI Image Generation**: Convert text descriptions into stunning images
- **Multiple Styles**: Choose from realistic, artistic, cartoon, abstract, and vintage styles
- **Customizable Sizes**: Generate images in various resolutions (512x512, 1024x1024, etc.)
- **Download & Share**: Save generated images and share them easily
- **Real-time Processing**: Live feedback during image generation

### Website Features
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Hover effects, scroll animations, and smooth transitions
- **Contact Form**: Built-in contact system for user inquiries
- **Professional Sections**: Hero, features, about, and contact sections

## 🚀 Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. **Clone or download the project files**
   ```bash
   git clone <repository-url>
   cd ai-image-generator
   ```

2. **Open the website**
   - Simply open `index.html` in your web browser
   - Or serve the files using a local web server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Access the website**
   - Navigate to `http://localhost:8000` (if using a server)
   - Or open `index.html` directly in your browser

## 🔧 AI Integration

### Current Implementation
The current version uses placeholder images for demonstration purposes. To integrate with real AI image generation services, you have several options:

### Option 1: Stable Diffusion API
```javascript
// Replace the callImageGenerationAPI method in script.js
async callImageGenerationAPI(prompt, style, size) {
    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY',
        },
        body: JSON.stringify({
            text_prompts: [
                {
                    text: `${prompt} ${style} style`,
                    weight: 1
                }
            ],
            cfg_scale: 7,
            height: parseInt(size.split('x')[1]),
            width: parseInt(size.split('x')[0]),
            samples: 1,
            steps: 30,
        })
    });
    
    const data = await response.json();
    return data.artifacts[0].base64; // Convert base64 to image URL
}
```

### Option 2: DALL-E API
```javascript
async callImageGenerationAPI(prompt, style, size) {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
        },
        body: JSON.stringify({
            prompt: `${prompt} ${style} style`,
            n: 1,
            size: size,
            response_format: 'url'
        })
    });
    
    const data = await response.json();
    return data.data[0].url;
}
```

### Option 3: Hugging Face API
```javascript
async callImageGenerationAPI(prompt, style, size) {
    const response = await fetch('https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_HUGGING_FACE_TOKEN',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            inputs: `${prompt} ${style} style`,
        })
    });
    
    const blob = await response.blob();
    return URL.createObjectURL(blob);
}
```

## 📁 Project Structure

```
ai-image-generator/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
├── README.md           # This file
└── assets/             # Optional: Add images, icons, etc.
```

## 🎨 Customization

### Styling
- Modify `styles.css` to change colors, fonts, and layout
- The website uses CSS custom properties for easy theming
- All animations and transitions are customizable

### Functionality
- Edit `script.js` to modify the AI integration
- Add new features or modify existing ones
- Customize the notification system and user feedback

### Content
- Update `index.html` to change text content
- Modify the hero section, features, and about content
- Add or remove sections as needed

## 🔒 Security Considerations

### API Keys
- Never expose API keys in client-side code for production
- Use environment variables or a backend service
- Implement proper rate limiting and authentication

### CORS
- Ensure your AI API provider allows CORS requests
- Consider using a proxy server for production deployments

## 🌐 Deployment

### Static Hosting
- **Netlify**: Drag and drop the project folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Push to a GitHub repository and enable Pages
- **AWS S3**: Upload files to an S3 bucket with static website hosting

### Backend Integration
For production use, consider adding a backend service:
- **Node.js/Express**: Handle API calls server-side
- **Python/Flask**: Process requests and manage API keys
- **Serverless Functions**: Use AWS Lambda or Vercel Functions

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure all files are in the same directory
3. Verify your internet connection
4. Try using a local web server instead of opening the file directly

## 🔮 Future Enhancements

- [ ] User authentication and image history
- [ ] Advanced prompt engineering tools
- [ ] Batch image generation
- [ ] Image editing and manipulation
- [ ] Social sharing integration
- [ ] Premium features and subscription model
- [ ] Mobile app version
- [ ] API rate limiting and usage tracking

---

**Note**: This is a demonstration project. For production use, ensure you comply with the terms of service of any AI APIs you integrate with, and implement proper security measures.