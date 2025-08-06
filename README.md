# URL Shortener

A simple, clean URL shortener that converts long URLs into short, customizable links. Minimal design focused on functionality.

## Features

- **Simple Interface**: Clean, minimal design without distractions
- **Custom Slugs**: Create memorable short URLs
- **Auto-Slug Generation**: Automatically suggests slugs based on the original URL
- **Recent Links**: Saves your recent links for easy access
- **Click Tracking**: Track how many times your links are clicked
- **Copy & Test**: Easy copy to clipboard and test functionality
- **Responsive**: Works on desktop and mobile devices

## How to Use

1. **Enter a URL**: Paste any long URL into the input field
2. **Customize (Optional)**: Add a custom slug for your short link
3. **Create Short Link**: Click "Shorten URL" or press Enter
4. **Use Your Link**: Copy, test, or create another link

## Quick Start

1. Open `index.html` in your web browser
2. Enter a long URL (e.g., `https://example.com/very-long-url`)
3. Optionally add a custom slug (e.g., `my-link`)
4. Click "Shorten URL"
5. Use your new short link: `short.ly/my-link`

## Features in Detail

### Custom Slug Creation
- Create memorable short links like `short.ly/my-brand`
- Auto-suggestions based on the original URL domain
- Validation for allowed characters (letters, numbers, hyphens, underscores)

### Recent Links
- Automatically saves your last 10 created links
- Click on any recent link to recreate it
- View click statistics and creation dates

### Simple Design
- Clean, minimal interface
- No distracting animations or effects
- Focus on functionality over aesthetics
- Easy to use on any device

## Technical Details

### Local Storage
- Links are stored in browser's localStorage
- No server required - works completely offline
- Data persists between browser sessions

### URL Validation
- Validates proper URL format
- Supports HTTP and HTTPS protocols
- Prevents duplicate custom slugs

### Browser Compatibility
- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Domain Configuration
Change the base domain in `script.js`:
```javascript
this.baseUrl = 'your-domain.com'; // Change this to your domain
```

### Styling
Modify `styles.css` to customize:
- Colors and fonts
- Layout and spacing
- Mobile breakpoints

### Functionality
Edit `script.js` to:
- Change slug generation logic
- Modify link storage behavior
- Add new features
- Customize validation rules

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## Browser Security Notes

- Uses localStorage for data persistence
- No external API calls required
- Works completely client-side
- No data sent to external servers

## Future Enhancements

Potential features to add:
- Analytics dashboard
- Link expiration dates
- Password protection for links
- Bulk link creation
- API integration for server-side storage

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the application!

---

**Note**: This is a client-side application that works completely offline. For production use with real URL redirection, you'll need to implement server-side functionality to handle the short URL routing.