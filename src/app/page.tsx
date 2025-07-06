"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Squares2X2Icon, AtSymbolIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="text-black home-page-container">
      <div className="home-page-layout">
        {/* Logo and Byline */}
        <div>
          <motion.div 
            className="fixed top-8 left-8 z-20"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div 
              className="back-text" 
              style={{ 
                color: '#000000',
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                fontSize: '2.5rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              garfish digital
            </div>
          </motion.div>

          <motion.div 
            className="fixed top-25 left-8 z-20"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <div 
              className="back-text" 
              style={{ 
                color: '#000000',
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                fontSize: '1rem',
                fontWeight: 'normal',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              web design
            </div>
          </motion.div>
          
        </div>

        {/* Spacer for layout */}
        <div></div>
        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <p className="home-copyright" style={{ fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif' }}>
            © 2024 Garfish Digital. All rights reserved.
          </p>
        </motion.div>
      </div>

      {/* Navigation Icons - Bottom Right */}
      <div className="bottom-nav-container">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Link 
            href="/gallery"
            className="transition-all duration-300 hover:brightness-150"
            title="Gallery"
          >
            <Squares2X2Icon className="home-icon home-page-gallery-icon drop-shadow-lg" />
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Link 
            href="/contact"
            className="transition-all duration-300 hover:brightness-150"
            title="Contact"
          >
            <AtSymbolIcon className="home-icon home-page-contact-icon drop-shadow-lg" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
