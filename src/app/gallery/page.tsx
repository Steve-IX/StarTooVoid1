'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const allImages = [
  '482186732_620467077530366_934932819465751880_n.jpg',
  '486482742_17920000407067378_4646285862738113285_n.jpg',
  '487441564_17920367064067378_4263634804547572256_n.jpg',
  '488404777_17921147061067378_3794147560447595116_n.jpg',
  '488923356_17921261412067378_466637951355208427_n.jpg',
  '503890690_17929039440067378_6620287650168654245_n.jpg',
  '505446978_17929203849067378_2835039758125551416_n.jpg',
  '509775392_17930573259067378_2703781126997003268_n.jpg',
  '520516738_4171063706545555_1465236064259124240_n.jpg',
  '526840168_2564320510577508_5811984130644436459_n.jpg',
  '527288873_17934834885067378_2177271641979458323_n.jpg',
  '529750655_17935342737067378_7497063670914447413_n.jpg',
  '534315247_17936123802067378_315628121686362631_n.jpg',
  '541227754_1154487286568277_1737867561512602885_n.jpg',
  '541949387_17938755099067378_9030969826378101040_n.jpg',
  '542524856_17938486443067378_4678976999229578613_n.jpg',
  '553386371_837120111978340_2708358981697409388_n.jpg',
  '553478898_17941021863067378_3826214925574080798_n.jpg',
  '555062606_17941033638067378_6884414366850346687_n.jpg',
  '580805197_2631934740507195_3730478941454607819_n.jpg',
  '581088467_17946642003067378_6627539611297992071_n.jpg',
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handlePrevious = () => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage === 0 ? allImages.length - 1 : selectedImage - 1);
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage === allImages.length - 1 ? 0 : selectedImage + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') setSelectedImage(null);
  };

  return (
    <div className="page-transition min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="font-heading text-xs tracking-[0.3em] text-white/50 mb-4 block">
            THE VISION
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide mb-4 glow-text">
            GALLERY
          </h1>
          <p className="font-body text-white/60 max-w-xl mx-auto">
            A visual journey through StarTooVoid. Moments captured, creativity expressed, 
            and the spirit of shining from darkness.
          </p>
        </motion.div>
      </section>

      {/* Masonry Gallery */}
      <section ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="masonry-grid">
          {allImages.map((image, index) => (
            <motion.div
              key={image}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="masonry-item"
            >
              <button
                onClick={() => setSelectedImage(index)}
                className="relative w-full img-zoom rounded-lg overflow-hidden group cursor-pointer"
              >
                <Image
                  src={`/images/${image}`}
                  alt={`StarTooVoid Gallery ${index + 1}`}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 lightbox-overlay flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-modal="true"
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={`/images/${allImages[selectedImage]}`}
                alt={`StarTooVoid Gallery ${selectedImage + 1}`}
                width={1200}
                height={1600}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg"
              />
            </motion.div>

            {/* Image counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-sm text-white/60">
              {selectedImage + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

