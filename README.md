# StarTooVoid Website

A stunning visual website for the StarTooVoid streetwear brand. Built with Next.js 14, Tailwind CSS, and Framer Motion.

## Features

- **Video Hero Section** - Muted background videos creating an immersive experience
- **Animated Star Field** - Cosmic particles floating across the screen
- **Multi-page Structure** - Home, About, Gallery, Collection, and Contact pages
- **Masonry Gallery** - Beautiful grid layout with lightbox modal
- **Smooth Animations** - Scroll-triggered animations and micro-interactions
- **Responsive Design** - Optimized for all screen sizes
- **Dark Cosmic Theme** - Black and white aesthetic with star/space elements

## Getting Started

### Quick Setup

Run the setup script to copy assets and install dependencies:

```bash
# Windows
setup.bat

# Or manually:
npm install
```

### Copy Assets Manually

If the setup script doesn't work, copy the assets manually:

1. Copy all files from `photos/` to `public/images/`
2. Copy all files from `vids/` to `public/videos/`

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Build for production:

```bash
npm run build
npm start
```

## Project Structure

```
startoovoid/
├── public/
│   ├── images/          # Brand photos
│   └── videos/          # Background videos
├── src/
│   ├── app/
│   │   ├── about/       # About page
│   │   ├── collection/  # Collection/Shop page
│   │   ├── contact/     # Contact page
│   │   ├── gallery/     # Gallery page
│   │   ├── globals.css  # Global styles
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Home page
│   └── components/
│       ├── BrandStatement.tsx
│       ├── FeaturedGallery.tsx
│       ├── Footer.tsx
│       ├── Navbar.tsx
│       ├── StarField.tsx
│       └── VideoHero.tsx
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Pages

1. **Home** (`/`) - Video hero with logo, featured gallery strip, brand statement
2. **About** (`/about`) - Brand philosophy, values, timeline
3. **Gallery** (`/gallery`) - Masonry grid of all brand photos with lightbox
4. **Collection** (`/collection`) - Product showcase linking to external store
5. **Contact** (`/contact`) - Contact form and social links

## Brand Colors

- **Void Black**: `#000000` - Primary background
- **Star White**: `#FFFFFF` - Primary text and accents
- **Nebula Gray**: `#888888` - Secondary elements

## Fonts

- **Orbitron** - Headers (space/futuristic feel)
- **Syne** - Body text (modern streetwear aesthetic)

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide React](https://lucide.dev/) - Icons

## Brand

**StarTooVoid** - A streetwear brand for creators.

*"Shining from darkness - finding a way to shine and be the best version of yourself regardless of the circumstance."*

Est. 2023 | Manchester, UK

---

For the creators. ✦

