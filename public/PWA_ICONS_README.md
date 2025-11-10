# PWA Icons Required

Please generate the following icons for your PWA and place them in the `public/` directory:

## Required Icons:

1. **pwa-192x192.png** (192x192 pixels)
   - Standard icon for Android home screen
   - Use your logo with padding
   
2. **pwa-512x512.png** (512x512 pixels)
   - High resolution icon for splash screens
   - Use your logo with padding

3. **pwa-maskable-192x192.png** (192x192 pixels)
   - Maskable icon (safe zone in center)
   - Logo should be in the center 80% of the image
   
4. **pwa-maskable-512x512.png** (512x512 pixels)
   - High resolution maskable icon
   - Logo should be in the center 80% of the image

## Screenshots (Optional but recommended):

5. **screenshot-mobile-1.png** (390x844 pixels)
   - Mobile screenshot showing your app
   
6. **screenshot-desktop-1.png** (1280x720 pixels)
   - Desktop screenshot showing your app

## Tools to Generate Icons:

- **Online**: https://realfavicongenerator.net/
- **Online**: https://www.pwabuilder.com/imageGenerator
- **CLI**: `npx pwa-asset-generator your-logo.png ./public --icon-only`

## Design Tips:

- Use solid background color (#fd8c40 - your primary color)
- Center your logo
- Keep logo simple and recognizable
- For maskable icons, ensure logo fits within safe zone (80% of canvas)
- Use high contrast colors

## Current Theme Color:
Primary: #fd8c40 (Orange)
Background: #ffffff (White)
