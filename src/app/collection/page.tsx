'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, ShoppingBag } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Classic Logo Tee',
    description: 'The signature StarTooVoid logo tee in premium black cotton.',
    image: '553478898_17941021863067378_3826214925574080798_n.jpg',
    category: 'T-Shirts',
  },
  {
    id: 2,
    name: 'Orbital Print Tee',
    description: 'Featuring the iconic orbital design that started it all.',
    image: '534315247_17936123802067378_315628121686362631_n.jpg',
    category: 'T-Shirts',
  },
  {
    id: 3,
    name: 'Space School Tee',
    description: 'Part of the Space School collection - for the cosmic creators.',
    image: '541949387_17938755099067378_9030969826378101040_n.jpg',
    category: 'T-Shirts',
  },
  {
    id: 4,
    name: 'Manchester Print',
    description: 'Representing the city where it all began.',
    image: '527288873_17934834885067378_2177271641979458323_n.jpg',
    category: 'T-Shirts',
  },
  {
    id: 5,
    name: 'Creator Series',
    description: 'Designed for those who create their own light.',
    image: '505446978_17929203849067378_2835039758125551416_n.jpg',
    category: 'T-Shirts',
  },
  {
    id: 6,
    name: 'Void Black Tee',
    description: 'The essential black tee with subtle branding.',
    image: '503890690_17929039440067378_6620287650168654245_n.jpg',
    category: 'T-Shirts',
  },
];

const lookbookImages = [
  '529750655_17935342737067378_7497063670914447413_n.jpg',
  '542524856_17938486443067378_4678976999229578613_n.jpg',
  '580805197_2631934740507195_3730478941454607819_n.jpg',
  '520516738_4171063706545555_1465236064259124240_n.jpg',
];

export default function CollectionPage() {
  const heroRef = useRef(null);
  const productsRef = useRef(null);
  const lookbookRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const productsInView = useInView(productsRef, { once: true, margin: '-100px' });
  const lookbookInView = useInView(lookbookRef, { once: true, margin: '-100px' });

  return (
    <div className="page-transition min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/581088467_17946642003067378_6627539611297992071_n.jpg"
            alt="StarTooVoid Collection"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-heading text-xs tracking-[0.3em] text-white/50 mb-4 block"
          >
            FOR THE CREATORS
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide mb-6 glow-text"
          >
            THE COLLECTION
          </motion.h1>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            href="https://startoovoidstore.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-cosmic px-8 py-4 bg-white text-black font-body font-semibold tracking-wide hover:bg-white/90 transition-all duration-300"
          >
            <ShoppingBag size={20} />
            Shop Now
            <ArrowUpRight size={16} />
          </motion.a>
        </div>
      </section>

      {/* Products Grid */}
      <section ref={productsRef} className="py-24 bg-void-deep">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-wide mb-4">
              FEATURED PIECES
            </h2>
            <p className="font-body text-white/60 max-w-xl mx-auto">
              Each piece tells a story. Crafted for those who dare to shine from darkness.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={productsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <a
                  href="https://startoovoidstore.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {/* Product Image */}
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4 img-zoom">
                    <Image
                      src={`/images/${product.image}`}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="flex items-center gap-2 px-6 py-3 bg-white text-black font-body text-sm font-semibold rounded">
                        View Product
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                    {/* Category tag */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-sm font-heading text-xs tracking-wider">
                      {product.category}
                    </span>
                  </div>

                  {/* Product Info */}
                  <h3 className="font-heading text-lg tracking-wide mb-1 group-hover:text-white/80 transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-body text-sm text-white/60">
                    {product.description}
                  </p>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook Section */}
      <section ref={lookbookRef} className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={lookbookInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="font-heading text-xs tracking-[0.3em] text-white/50 mb-4 block">
              STYLE INSPIRATION
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-wide">
              LOOKBOOK
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {lookbookImages.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={lookbookInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-[3/4] rounded-lg overflow-hidden img-zoom"
              >
                <Image
                  src={`/images/${image}`}
                  alt={`Lookbook ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-void-deep border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <h3 className="font-heading text-xl md:text-2xl font-bold tracking-wide mb-2">
                READY TO SHINE?
              </h3>
              <p className="font-body text-white/60">
                Visit our official store to get your pieces.
              </p>
            </div>
            <a
              href="https://startoovoidstore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 btn-cosmic px-8 py-4 bg-white text-black font-body font-semibold tracking-wide hover:bg-white/90 transition-all duration-300 whitespace-nowrap"
            >
              <ShoppingBag size={20} />
              Shop at startoovoidstore.com
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

