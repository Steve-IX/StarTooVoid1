import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarField from '@/components/StarField';

export const metadata: Metadata = {
  title: 'StarTooVoid | Shining From Darkness',
  description: 'StarTooVoid - A streetwear brand for creators. Shining from darkness, becoming the best version of yourself. Est. 2023, Manchester UK.',
  keywords: ['streetwear', 'fashion', 'startoovoid', 'clothing', 'urban', 'creators'],
  authors: [{ name: 'StarTooVoid' }],
  openGraph: {
    title: 'StarTooVoid | Shining From Darkness',
    description: 'A streetwear brand for creators. Find your light in the void.',
    type: 'website',
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
        <StarField count={80} />
        <Navbar />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

