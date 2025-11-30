'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const featuredImages = [
  '553478898_17941021863067378_3826214925574080798_n.jpg',
  '534315247_17936123802067378_315628121686362631_n.jpg',
  '527288873_17934834885067378_2177271641979458323_n.jpg',
  '541949387_17938755099067378_9030969826378101040_n.jpg',
  '542524856_17938486443067378_4678976999229578613_n.jpg',
  '503890690_17929039440067378_6620287650168654245_n.jpg',
  '505446978_17929203849067378_2835039758125551416_n.jpg',
  '529750655_17935342737067378_7497063670914447413_n.jpg',
];

export default function FeaturedGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-void-deep relative overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4"
        >
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-wide mb-2">
              THE VISION
            </h2>
            <p className="font-body text-white/60 max-w-md">
              Capturing moments of creativity and self-expression. For the creators who shine from darkness.
            </p>
          </div>
          <Link
            href="/gallery"
            className="group flex items-center gap-2 font-body text-sm text-white/70 hover:text-white transition-colors"
          >
            View All
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Horizontal Scrolling Gallery */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="horizontal-scroll gap-4 px-6 pb-4"
      >
        {featuredImages.map((image, index) => (
          <motion.div
            key={image}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="img-zoom relative flex-shrink-0 w-72 md:w-80 aspect-[3/4] rounded-lg overflow-hidden group"
          >
            <Image
              src={`/images/${image}`}
              alt={`StarTooVoid Gallery ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 288px, 320px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <span className="font-heading text-xs tracking-widest text-white/80">
                STARTOOVOID
              </span>
            </div>
          </motion.div>
        ))}
        
        {/* View More Card */}
        <Link
          href="/gallery"
          className="flex-shrink-0 w-72 md:w-80 aspect-[3/4] rounded-lg border border-white/20 flex flex-col items-center justify-center gap-4 hover:border-white/40 hover:bg-white/5 transition-all duration-300 group"
        >
          <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white/50 group-hover:scale-110 transition-all duration-300">
            <ArrowRight size={24} className="text-white/70 group-hover:text-white" />
          </div>
          <span className="font-body text-white/70 group-hover:text-white transition-colors">
            View Full Gallery
          </span>
        </Link>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
    </section>
  );
}

