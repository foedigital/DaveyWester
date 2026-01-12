# Davey Wester - Comedy Website

A fun-loving, nature-themed comedian website with a campfire comedy show meets backwoods adventure aesthetic.

## Project Structure

```
DaveyWester/
├── index.html              # Main HTML file
├── css/
│   ├── styles.css          # Main stylesheet with CSS variables
│   └── animations.css      # Keyframe animations
├── js/
│   ├── main.js             # Navigation, forms, interactions
│   └── animations.js       # GSAP & ScrollTrigger setup
├── assets/
│   └── images/             # Site images
└── README.md               # This file
```

## Features

### Design
- Dark woodland theme with warm campfire accents
- Deep forest green background (#0f1a0f)
- Campfire orange accent (#e85d04) and sunset gold (#f4a024)
- Cream/tan text (#e8dcc4) for contrast
- Bebas Neue display font, Source Sans Pro body font
- Noise/grain overlay for rustic texture
- Pine tree silhouettes and mountain dividers

### Sections
1. **Hero** - Full-screen with parallax background, animated text reveal
2. **Marquee** - Scrolling text banner
3. **Tour Dates** - Card layout with staggered animations
4. **Videos** - Swiper.js carousel with coverflow effect
5. **About** - Two-column layout with polaroid-style image, animated counters
6. **Newsletter** - Email signup with campfire glow effect
7. **Contact** - Contact form with social links
8. **Footer** - Pine tree silhouette border

### Animations & Effects
- Smooth scrolling (Lenis)
- GSAP + ScrollTrigger for reveals
- Custom cursor with follower
- Firefly floating particles
- Parallax hero background
- Magnetic buttons
- Card tilt effects (Vanilla Tilt)
- Konami code easter egg

## CDN Libraries Used

```html
<!-- CSS -->
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">

<!-- JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script src="https://unpkg.com/lenis@1.0.42/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="https://unpkg.com/vanilla-tilt@1.8.1/dist/vanilla-tilt.min.js"></script>
```

## Setup Instructions

### Local Development

1. **Clone/Download** the project files to your local machine

2. **Open in Browser**
   - Simply open `index.html` in a modern web browser
   - For best results, use a local server:

   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js (npx)
   npx serve

   # VS Code
   Use the "Live Server" extension
   ```

3. **View the site** at `http://localhost:8000`

### Adding Your Content

#### Images
Replace placeholder images in `assets/images/`:
- `1.png` - Hero/main image of Davey
- `2.png` - Secondary promotional image
- `3.png` - Tertiary image for variety

#### Tour Dates
Edit the tour cards in `index.html`:
```html
<div class="tour-card">
  <div class="tour-date">
    <span class="tour-month">JAN</span>
    <span class="tour-day">15</span>
  </div>
  <div class="tour-info">
    <h3 class="tour-venue">Venue Name</h3>
    <p class="tour-location">City, State</p>
    <p class="tour-time">8:00 PM</p>
  </div>
  <a href="TICKET_URL" class="btn btn-small">Get Tickets</a>
</div>
```

#### Videos
Update video cards with actual YouTube embeds or links in `index.html`:
```html
<div class="video-card">
  <div class="video-thumbnail">
    <img src="YOUR_THUMBNAIL.jpg" alt="Video Title">
    <!-- ... -->
  </div>
  <h3 class="video-title">Your Video Title</h3>
</div>
```

#### Social Links
Update social media URLs throughout the site:
- Instagram: `https://www.instagram.com/daveywester/`
- YouTube: `https://www.youtube.com/@Davidwesrer`
- TikTok: Add your TikTok URL
- Facebook: Add your Facebook URL

#### Bio
Edit the about section text in `index.html` to match Davey's actual story.

#### Stats
Update the counter values:
```html
<span class="stat-number" data-count="500">0</span>
```

## Customization

### Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
  --bg-primary: #0f1a0f;       /* Main background */
  --accent: #e85d04;            /* Primary accent */
  --accent-light: #f4a024;      /* Secondary accent */
  --text-primary: #e8dcc4;      /* Main text */
}
```

### Fonts
Change fonts in the `<head>` of `index.html` and update CSS variables:
```css
:root {
  --font-display: 'Bebas Neue', sans-serif;
  --font-body: 'Source Sans Pro', sans-serif;
}
```

### Animations
- Adjust timing in `css/animations.css`
- Modify GSAP animations in `js/animations.js`

## Easter Egg

Enter the Konami code to reveal a secret:
```
↑ ↑ ↓ ↓ ← → ← → B A
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Performance Tips

1. **Images**: Optimize images before uploading (WebP format recommended)
2. **Lazy Loading**: Images support lazy loading via `data-src` attribute
3. **Animations**: Disabled on mobile for better performance
4. **Prefers Reduced Motion**: Respects user accessibility settings

## Contact Form Setup

The contact form currently simulates submission. To make it functional:

1. **Formspree** (Free option):
   ```html
   <form action="https://formspree.io/f/YOUR_ID" method="POST">
   ```

2. **Netlify Forms**:
   ```html
   <form name="contact" netlify>
   ```

3. **Custom Backend**: Connect to your own server/API

## Deployment

### Static Hosting Options
- **Netlify**: Drag & drop the folder
- **Vercel**: Connect GitHub repo
- **GitHub Pages**: Enable in repo settings
- **Cloudflare Pages**: Connect repo or upload

### Quick Deploy
```bash
# Netlify CLI
netlify deploy --prod

# Vercel CLI
vercel --prod
```

## Credits

- **Design & Development**: Built with Claude Code
- **Libraries**: GSAP, Lenis, Swiper, AOS, Vanilla Tilt
- **Fonts**: Google Fonts (Bebas Neue, Source Sans Pro)

## License

This template is created for Davey Wester. Feel free to customize for personal use.

---

*Built in the woods with questionable WiFi*
