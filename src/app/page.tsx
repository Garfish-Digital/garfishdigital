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
          <motion.h1
            className="logo-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            garfish
          </motion.h1>
          <motion.h2
            className="logo-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          > 
            digital
          </motion.h2>
        </div>

        {/* Spacer for layout */}
        <div></div>
        {/* Copyright */}
        <div>
          <p className="home-copyright">
            © 2024 Garfish Digital. All rights reserved.
          </p>
        </div>
      </div>

      {/* Navigation Icons - Bottom Right */}
      <div className="bottom-nav-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
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
