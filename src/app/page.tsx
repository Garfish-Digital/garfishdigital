'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div 
      className="min-h-screen text-white overflow-hidden scrollbar-hide"
      style={{
        background: `
          radial-gradient(at 40% 80%, #4A4A4A 0px, transparent 50%),
          radial-gradient(at 80% 20%, #2F4538 0px, transparent 70%),
          radial-gradient(at 0% 50%, #5A5A5A 0px, transparent 90%),
          #0A0A0A
        `
      }}
    >
      <div className="p-8 space-y-32">
        {/* Logo and Byline */}
        <div className="pt-4">
          <motion.h1 
            className="logo-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Garfish
          </motion.h1>
          <motion.h2 
            className="logo-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Digital
          </motion.h2>
          <motion.div
            className="mt-20 pr-40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight px-20">
              Experiences
              <span className="text-white/70"> for the rest of us</span>
            </h3>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="space-y-32">
          {/* Gallery Section */}
          <div style={{ paddingTop: '40vh' }}>
            <div className="flex items-start justify-between ps-20 pe-8">
              <motion.div
                className="text-left whitespace-nowrap"
                style={{ marginTop: '-20vh' }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <p className="text-xl text-white/80 font-medium leading-relaxed">
                  Your Business Doesn't Fit the Mold. Neither Do We.
                </p>
              </motion.div>
              <motion.div
                className="flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <Link href="/gallery">
                  <button className="embossed-btn">
                    <span className="btn-text">GALLERY</span>
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Contact Section */}
          <div style={{ paddingTop: '40vh' }}>
            <div className="flex items-start justify-between ps-20 pe-8">
              <motion.div
                className="text-left whitespace-nowrap"
                style={{ marginTop: '-20vh' }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <p className="text-xl text-white/80 font-medium leading-relaxed">
                  Not feeling corporate? Tell us your idea.
                </p>
              </motion.div>
              <motion.div
                className="flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
              >
                <Link href="/contact">
                  <button className="embossed-btn contact-btn">
                    <span className="btn-text">CONTACT</span>
                    <div className="btn-glow"></div>
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-32 pb-8 text-center">
          <p className="text-white/40 text-sm">
            © 2024 Garfish Digital. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
