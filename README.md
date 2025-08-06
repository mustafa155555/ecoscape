# Link Thumbnail Generator

A modern, clean web application that converts any URL into a beautiful thumbnail link preview. Perfect for creating attractive link previews for social media, blogs, or any web content.

## Features

- **Clean, Modern UI**: Beautiful gradient design with smooth animations
- **Instant Thumbnail Generation**: Converts any URL into a thumbnail preview
- **Metadata Extraction**: Automatically fetches page title and description
- **Multiple Export Options**: Copy HTML code or download the thumbnail image
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Example Links**: Quick test with popular websites
- **Error Handling**: Graceful error handling with user-friendly messages

## How to Use

1. **Enter a URL**: Paste any website URL into the input field
2. **Generate Thumbnail**: Click "Generate Thumbnail" or press Enter
3. **View Result**: See your beautiful thumbnail preview
4. **Export Options**:
   - **Copy HTML**: Get the HTML code to embed the thumbnail
   - **Download Image**: Save the thumbnail as a JPEG file
   - **New Link**: Start over with a different URL

## Quick Start

1. Open `index.html` in your web browser
2. Enter a URL (e.g., `https://github.com`)
3. Click "Generate Thumbnail"
4. Use the generated thumbnail in your projects!

## Example URLs to Try

- GitHub: `https://github.com`
- Stack Overflow: `https://stackoverflow.com`
- Medium: `https://medium.com`
- Dev.to: `https://dev.to`

## Technical Details

### Screenshot Service
The application uses [APIFlash](https://apiflash.com/) (free demo version) to generate website screenshots. For production use, you may want to:
- Sign up for a free APIFlash account
- Replace the demo access key with your own
- Or use alternative services like:
  - [Microlink](https://microlink.io/)
  - [Urlbox](https://urlbox.io/)
  - [Cloudinary](https://cloudinary.com/)

### Metadata Extraction
Page metadata is fetched using the [AllOrigins](https://allorigins.win/) CORS proxy to avoid cross-origin issues.

### Browser Compatibility
- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Styling
Modify `styles.css` to customize:
- Colors and gradients
- Typography
- Layout and spacing
- Animations and transitions

### Functionality
Edit `script.js` to:
- Change screenshot service
- Modify thumbnail dimensions
- Add new export formats
- Customize error handling

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## Browser Security Notes

- The application uses external APIs for screenshot generation and metadata extraction
- Some websites may block screenshot services
- CORS policies may affect metadata extraction for certain sites
- For production use, consider implementing a backend service

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the application!

---

**Note**: This is a client-side application that uses free demo services. For production use, consider implementing proper API keys and rate limiting.