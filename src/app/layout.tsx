import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarField from '@/components/StarField';
import { MusicPlayerProvider } from '@/contexts/MusicPlayerContext';
import MusicPlayer from '@/components/MusicPlayer';

export const metadata: Metadata = {
  title: 'StarTooVoid | Shining From Darkness',
  description: 'StarTooVoid - A streetwear brand for creators. Shining from darkness, becoming the best version of yourself. Est. 2023, Manchester UK.',
  keywords: ['streetwear', 'fashion', 'startoovoid', 'clothing', 'urban', 'creators'],
  authors: [{ name: 'StarTooVoid' }],
  icons: {
    icon: '/images/555062606_17941033638067378_6884414366850346687_n.jpg',
    apple: '/images/555062606_17941033638067378_6884414366850346687_n.jpg',
  },
  openGraph: {
    title: 'StarTooVoid | Shining From Darkness',
    description: 'A streetwear brand for creators. Find your light in the void.',
    type: 'website',
    images: ['/images/555062606_17941033638067378_6884414366850346687_n.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-void text-star antialiased">
        <MusicPlayerProvider>
          <StarField count={80} />
          <Navbar />
          <main className="relative z-10">
            {children}
          </main>
          <Footer />
          <MusicPlayer />
        </MusicPlayerProvider>
      </body>
    </html>
  );
}

