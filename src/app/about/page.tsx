'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Star, Sparkles, Target, Heart } from 'lucide-react';

const milestones = [
  {
    year: '2023',
    title: 'The Beginning',
    description: 'StarTooVoid was born in a spare room with a vision - to create something meaningful for creators.',
  },
  {
    year: '2024',
    title: 'First Drop',
    description: 'Our debut collection launched, bringing the "Shining From Darkness" philosophy to life.',
  },
  {
    year: '2025',
    title: 'Growing Community',
    description: 'Building a movement of creators who believe in becoming their best selves.',
  },
];

const values = [
  {
    icon: Star,
    title: 'Self-Improvement',
    description: 'The journey of becoming the best version of yourself.',
  },
  {
    icon: Sparkles,
    title: 'Creativity',
    description: 'Feeding your soul with that one thing that truly matters.',
  },
  {
    icon: Target,
    title: 'Purpose',
    description: 'Finding meaning in the darkness and creating your own light.',
  },
  {
    icon: Heart,
    title: 'Selflessness',
    description: 'Like the sun, giving without expectation in return.',
  },
];

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const timelineRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const storyInView = useInView(storyRef, { once: true, margin: '-100px' });
  const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const timelineInView = useInView(timelineRef, { once: true, margin: '-100px' });

  return (
    <div ref={containerRef} className="page-transition">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Parallax background elements */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 right-10 w-48 h-48 border border-white/5 rounded-full"
        />
        <motion.div
          style={{ y: y1 }}
          className="absolute top-40 right-1/4 w-2 h-2 bg-white/30 rounded-full"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block font-heading text-xs tracking-[0.3em] text-white/50 mb-6"
          >
            OUR STORY
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide mb-6 glow-text"
          >
            SHINING FROM
            <br />
            <span className="text-white/80">DARKNESS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-lg text-white/60 max-w-2xl mx-auto"
          >
            A streetwear brand born from a vision of self-improvement, creativity, 
            and the cosmic energy that drives us all to become our best selves.
          </motion.p>
        </div>
      </section>

      {/* The Story Section */}
      <section ref={storyRef} className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 border border-white/10 rounded-lg transform rotate-3" />
              <div className="relative h-full rounded-lg overflow-hidden">
                <Image
                  src="/images/541949387_17938755099067378_9030969826378101040_n.jpg"
                  alt="StarTooVoid Brand Story"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-wide">
                WHAT&apos;S STAR TO YOU?
              </h2>

              <div className="space-y-4 font-body text-white/70 leading-relaxed">
                <p>
                  It means so many things now, but if you strip it back to its bare bones, 
                  to when the first designs were made in a spare room, it symbolises 
                  <span className="text-white font-semibold"> self-improvement</span> - 
                  the journey of becoming the best version of yourself.
                </p>

                <p>
                  Stars are these crazy cosmic blazes of energy. The star in our galaxy, 
                  the sun, is the reason we&apos;re able to live. It does so much for us. 
                  Nevertheless, it exists in the empty void of space. It&apos;s selflessness. 
                  It&apos;s sacrifice.
                </p>

                <p>
                  So when we say <span className="text-white italic">shining from darkness</span>, 
                  it&apos;s finding a way to shine and be the best version of yourself 
                  regardless of the circumstance.
                </p>

                <p>
                  You could be in the trenches, like in the trenches. But there&apos;s always 
                  that one little thing you do, that one little passion. And it&apos;s usually 
                  something creative because that&apos;s our natural inclination as humans.
                </p>

                <p className="text-white font-semibold">
                  As long as you do that one thing that feeds your soul, that really feeds 
                  your soul - you&apos;re shining.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-24 bg-void-deep relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="font-heading text-xs tracking-[0.3em] text-white/50 mb-4 block">
              WHAT WE STAND FOR
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-wide">
              OUR VALUES
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 group-hover:scale-110 transition-all duration-300">
                  <value.icon size={24} className="text-white/70 group-hover:text-white" />
                </div>
                <h3 className="font-heading text-sm tracking-wide mb-2">
                  {value.title.toUpperCase()}
                </h3>
                <p className="font-body text-sm text-white/60">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="font-heading text-xs tracking-[0.3em] text-white/50 mb-4 block">
              THE JOURNEY
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-wide">
              OUR TIMELINE
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent -translate-x-1/2" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center gap-8 mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <span className="font-heading text-3xl font-bold text-white/30">
                    {milestone.year}
                  </span>
                  <h3 className="font-heading text-lg tracking-wide mt-2 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="font-body text-sm text-white/60">
                    {milestone.description}
                  </p>
                </div>
                
                <div className="relative z-10 w-4 h-4 bg-void border-2 border-white/50 rounded-full" />
                
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-void-deep">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-wide mb-6">
            JOIN THE MOVEMENT
          </h2>
          <p className="font-body text-white/60 mb-8 max-w-xl mx-auto">
            Explore our collection and become part of the StarTooVoid community. 
            For the creators. For those who shine from darkness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/collection"
              className="btn-cosmic px-8 py-4 bg-white text-black font-body font-semibold tracking-wide hover:bg-white/90 transition-all duration-300"
            >
              View Collection
            </Link>
            <Link
              href="/contact"
              className="btn-cosmic px-8 py-4 border border-white/30 font-body tracking-wide hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

