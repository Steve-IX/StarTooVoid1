# StarTooVoid Website

A stunning visual website for the StarTooVoid streetwear brand. Built with Next.js 14, Tailwind CSS, and Framer Motion.

**Live Site:** [https://star-too-void.vercel.app/](https://star-too-void.vercel.app/)

## Features

### Core Features
- **Video Hero Section** - Muted background videos creating an immersive experience
- **Animated Star Field** - Cosmic particles floating across the screen
- **Multi-page Structure** - Home, About, Gallery, Collection, and Contact pages
- **Masonry Gallery** - Beautiful grid layout with lightbox modal
- **Smooth Animations** - Scroll-triggered animations and micro-interactions
- **Responsive Design** - Optimized for all screen sizes
- **Dark Cosmic Theme** - Black and white aesthetic with star/space elements

### Music Player
- **Full-Featured Media Player** - Compact, floating music player with minimize/maximize
- **Track Details Modal** - Click cover art to view detailed track information
- **Cover Art Display** - Automatic extraction from MP3 metadata or fallback to brand logo
- **Playlist Management** - Add, remove, and manage tracks
- **Audio Visualizer** - Real-time animated frequency bars
- **Local Storage** - Tracks stored in IndexedDB for offline access
- **File Upload** - Users can upload their own MP3 files

### Additional Features
- **Visitor Counter** - Clean, minimal visitor tracking display
- **Contact Form** - Dark-themed form with dropdown styling
- **Vercel Ready** - Optimized for deployment on Vercel

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
3. Copy music files from `music/` to `public/music/`

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

### Deployment

The project is configured for Vercel deployment. Simply connect your GitHub repository to Vercel:

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

## Project Structure

```
startoovoid/
├── public/
│   ├── images/          # Brand photos
│   ├── videos/          # Background videos
│   └── music/           # Default music tracks
├── src/
│   ├── app/
│   │   ├── about/       # About page
│   │   ├── collection/  # Collection/Shop page
│   │   ├── contact/     # Contact page
│   │   ├── gallery/     # Gallery page
│   │   ├── globals.css  # Global styles
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Home page
│   ├── components/
│   │   ├── BrandStatement.tsx
│   │   ├── FeaturedGallery.tsx
│   │   ├── Footer.tsx
│   │   ├── MusicPlayer.tsx
│   │   ├── Navbar.tsx
│   │   ├── StarField.tsx
│   │   ├── VideoHero.tsx
│   │   └── VisitorCounter.tsx
│   ├── contexts/
│   │   └── MusicPlayerContext.tsx  # Music player state management
│   └── lib/
│       └── indexedDB.ts  # IndexedDB utilities for track storage
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
└── LICENSE
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
- [music-metadata](https://www.npmjs.com/package/music-metadata) - MP3 metadata extraction

## Music Player Features

- **Track Management**: Add, remove, and organize tracks
- **Cover Art**: Automatic extraction from MP3 files or fallback to brand logo
- **Playlist**: View and manage your music collection
- **Visualizer**: Animated frequency bars when playing
- **Track Details**: Click cover art for detailed track information
- **Local Storage**: All tracks stored in browser IndexedDB
- **Minimize/Maximize**: Compact floating player that can be minimized

## License

This project is licensed under a **Proprietary License** - see the [LICENSE](LICENSE) file for details.

**All Rights Reserved.** This software, code, website, and all associated intellectual property are the exclusive property of StarTooVoid and are protected by copyright, trademark, and other intellectual property laws.

**Unauthorized use, reproduction, distribution, modification, or creation of derivative works is strictly prohibited and may result in legal action.**

For licensing inquiries or authorized use requests, contact: contact@startoovoid.com

## Brand

**StarTooVoid** - A streetwear brand for creators.

*"Shining from darkness - finding a way to shine and be the best version of yourself regardless of the circumstance."*

Est. 2023 | Manchester, UK

**Website:** [https://star-too-void.vercel.app/](https://star-too-void.vercel.app/)

---

For the creators. ✦
