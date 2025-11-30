'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const videos = [
  '/videos/vid1.mp4',
  '/videos/videoplayback.mp4',
];

// Generate particle positions deterministically to avoid hydration mismatch
function generateParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: ((i * 37) % 100),
    top: ((i * 73 + 17) % 100),
    duration: 2 + ((i * 31) % 30) / 10,
    delay: (i * 17) % 50 / 10,
  }));
}

const particles = generateParticles(30);

export default function VideoHero() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      video.play().catch(() => {
        // Autoplay might be blocked, that's okay
      });
    }
  }, [currentVideo]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="video-bg"
        autoPlay
        muted
        playsInline
        loop={false}
      >
        <source src={videos[currentVideo]} type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-overlay z-10" />

      {/* Animated star particles overlay - only render after mount */}
      {mounted && (
        <div className="absolute inset-0 z-10 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-8"
        >
          <Image
            src="/images/555062606_17941033638067378_6884414366850346687_n.jpg"
            alt="StarTooVoid Logo"
            width={200}
            height={200}
            className="rounded-lg glow-border"
            priority
          />
        </motion.div>

        {/* Tagline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider text-center glow-text mb-4"
        >
          STARTOOVOID
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-heading text-sm md:text-base tracking-[0.3em] text-white/70 mb-12"
        >
          SHINING FROM DARKNESS
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/collection"
            className="btn-cosmic px-8 py-4 bg-white text-black font-body font-semibold tracking-wide hover:bg-white/90 transition-all duration-300"
          >
            Explore Collection
          </Link>
          <Link
            href="/about"
            className="btn-cosmic px-8 py-4 border border-white/50 font-body tracking-wide hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            Our Story
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/50"
        >
          <span className="font-body text-xs tracking-widest">SCROLL</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
