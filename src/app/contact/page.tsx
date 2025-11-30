'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Send, Instagram, Mail, MapPin, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formRef = useRef(null);
  const infoRef = useRef(null);

  const formInView = useInView(formRef, { once: true });
  const infoInView = useInView(infoRef, { once: true });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="page-transition min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="font-heading text-xs tracking-[0.3em] text-white/50 mb-4 block">
            GET IN TOUCH
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide mb-4 glow-text">
            CONTACT US
          </h1>
          <p className="font-body text-white/60 max-w-xl mx-auto">
            Have questions, collaboration ideas, or just want to say hello? 
            We&apos;d love to hear from you.
          </p>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -50 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-xl tracking-wide mb-6">
              SEND A MESSAGE
            </h2>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-lg border border-white/20 bg-white/5 text-center"
              >
                <CheckCircle size={48} className="mx-auto mb-4 text-green-400" />
                <h3 className="font-heading text-lg mb-2">Message Sent!</h3>
                <p className="font-body text-white/60">
                  Thanks for reaching out. We&apos;ll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-body text-sm text-white/70 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg input-cosmic font-body text-white placeholder-white/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-body text-sm text-white/70 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg input-cosmic font-body text-white placeholder-white/30"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block font-body text-sm text-white/70 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg input-cosmic font-body text-white bg-void-deep"
                  >
                    <option value="" disabled>Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="press">Press / Media</option>
                    <option value="wholesale">Wholesale</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-body text-sm text-white/70 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg input-cosmic font-body text-white placeholder-white/30 resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 btn-cosmic px-8 py-4 bg-white text-black font-body font-semibold tracking-wide hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, x: 50 }}
            animate={infoInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Brand Card */}
            <div className="p-8 rounded-lg border border-white/10 bg-void-deep">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src="/images/555062606_17941033638067378_6884414366850346687_n.jpg"
                  alt="StarTooVoid"
                  width={60}
                  height={60}
                  className="rounded"
                />
                <div>
                  <h3 className="font-heading text-lg tracking-wide">STARTOOVOID</h3>
                  <p className="font-heading text-xs tracking-widest text-white/50">
                    FOR THE CREATORS
                  </p>
                </div>
              </div>
              <p className="font-body text-white/60 text-sm leading-relaxed">
                A streetwear brand for those who shine from darkness. 
                We believe in self-improvement, creativity, and the power 
                of finding your light in the void.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <h3 className="font-heading text-sm tracking-widest text-white/50 mb-4">
                CONNECT WITH US
              </h3>

              <a
                href="https://instagram.com/startoovoid"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
                  <Instagram size={20} />
                </div>
                <div>
                  <p className="font-body font-medium">Instagram</p>
                  <p className="font-body text-sm text-white/50">@startoovoid</p>
                </div>
              </a>

              <a
                href="mailto:contact@startoovoid.com"
                className="flex items-center gap-4 p-4 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-body font-medium">Email</p>
                  <p className="font-body text-sm text-white/50">contact@startoovoid.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-lg border border-white/10">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-body font-medium">Location</p>
                  <p className="font-body text-sm text-white/50">Manchester, UK</p>
                </div>
              </div>
            </div>

            {/* Shop Link */}
            <div className="p-6 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
              <h3 className="font-heading text-sm tracking-wide mb-2">
                LOOKING TO SHOP?
              </h3>
              <p className="font-body text-sm text-white/60 mb-4">
                Visit our official store to browse the collection.
              </p>
              <a
                href="https://startoovoidstore.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm text-white hover:text-white/80 transition-colors group"
              >
                startoovoidstore.com
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

