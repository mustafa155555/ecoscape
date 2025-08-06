// Example configuration file for AI Image Generator
// Copy this file to config.js and add your actual API keys

const config = {
    // OpenAI DALL-E API Configuration
    openai: {
        apiKey: 'YOUR_OPENAI_API_KEY_HERE',
        model: 'dall-e-3', // or 'dall-e-2'
        maxTokens: 1000
    },

    // Stability AI (Stable Diffusion) Configuration
    stability: {
        apiKey: 'YOUR_STABILITY_API_KEY_HERE',
        model: 'stable-diffusion-xl-1024-v1-0',
        engine: 'stable-diffusion-xl-1024-v1-0'
    },

    // Hugging Face Configuration
    huggingface: {
        apiKey: 'YOUR_HUGGING_FACE_TOKEN_HERE',
        model: 'runwayml/stable-diffusion-v1-5'
    },

    // Unsplash Configuration (for fallback images)
    unsplash: {
        accessKey: 'YOUR_UNSPLASH_ACCESS_KEY_HERE',
        secretKey: 'YOUR_UNSPLASH_SECRET_KEY_HERE'
    },

    // Application Settings
    app: {
        defaultSize: '1024x1024',
        maxPromptLength: 1000,
        supportedSizes: ['512x512', '1024x1024', '1024x768', '768x1024'],
        supportedStyles: ['realistic', 'artistic', 'cartoon', 'abstract', 'vintage'],
        rateLimit: {
            requestsPerMinute: 10,
            requestsPerHour: 100
        }
    },

    // UI Configuration
    ui: {
        theme: 'light', // 'light' or 'dark'
        language: 'en',
        enableNotifications: true,
        enableSound: false
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else {
    // For browser usage
    window.config = config;
}

// Usage example:
// 1. Copy this file to config.js
// 2. Replace 'YOUR_API_KEY_HERE' with your actual API keys
// 3. Import this config in your script.js file
// 4. Use config.openai.apiKey, config.stability.apiKey, etc.

/*
Example integration in script.js:

// At the top of script.js
import config from './config.js';

// Then in your API call method:
async callImageGenerationAPI(prompt, style, size) {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.openai.apiKey}`,
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
*/