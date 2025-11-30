'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

export default function BrandStatement() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void-deep to-void" />
      
      {/* Decorative orbital ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="font-heading text-xs tracking-[0.3em] text-white/50">
            FOR THE CREATORS
          </span>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-2xl md:text-3xl lg:text-4xl leading-relaxed text-white/90 mb-12"
        >
          &ldquo;Stars are these crazy cosmic blazes of energy... it&apos;s{' '}
          <span className="text-white font-semibold">selflessness</span>. It&apos;s{' '}
          <span className="text-white font-semibold">sacrifice</span>. So when we say{' '}
          <span className="italic text-white">shining from darkness</span>, it&apos;s finding a way to shine
          and be the best version of yourself regardless of the circumstance.&rdquo;
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          
          <Link
            href="/about"
            className="btn-cosmic px-8 py-4 border border-white/30 font-body tracking-wide hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            Read Our Story
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

