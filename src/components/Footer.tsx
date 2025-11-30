'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, Mail, ArrowUpRight } from 'lucide-react';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/collection', label: 'Collection' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="relative bg-void-deep border-t border-white/10">
      {/* Decorative star line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/555062606_17941033638067378_6884414366850346687_n.jpg"
                alt="StarTooVoid"
                width={80}
                height={80}
                className="rounded"
              />
            </Link>
            <p className="font-body text-white/60 text-sm leading-relaxed max-w-xs">
              Shining from darkness. A brand for creators who find light in the void and become the best version of themselves.
            </p>
            <p className="font-heading text-xs text-white/40 tracking-widest">
              FOR THE CREATORS
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-heading text-sm tracking-widest text-white/80">
              NAVIGATE
            </h3>
            <nav className="grid grid-cols-2 gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-white/50 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://startoovoidstore.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-white/50 hover:text-white transition-colors duration-300 flex items-center gap-1"
              >
                Shop <ArrowUpRight size={12} />
              </a>
            </nav>
          </div>

          {/* Connect Section */}
          <div className="space-y-6">
            <h3 className="font-heading text-sm tracking-widest text-white/80">
              CONNECT
            </h3>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://instagram.com/startoovoid"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 hover:bg-white/5 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:contact@startoovoid.com"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 hover:bg-white/5 transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={18} />
              </motion.a>
            </div>
            <div className="space-y-2">
              <p className="font-body text-xs text-white/40">
                Manchester, UK
              </p>
              <p className="font-body text-xs text-white/40">
                Est. 2023
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-white/40">
            &copy; {new Date().getFullYear()} StarTooVoid. All rights reserved.
          </p>
          <p className="font-heading text-xs tracking-[0.3em] text-white/30">
            SHINING FROM DARKNESS
          </p>
        </div>
      </div>
    </footer>
  );
}

