"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";

export default function Client() {
  return (
    <div className="home-page-container">
      <div className="home-page-layout">
        {/* Logo and Byline */}
        <div>
          <motion.div 
            className="fixed top-6 left-8 z-20"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-[color:var(--color-black)] font-mono text-6xl font-bold text-left">
              Garfish
            </div>
            <div className="text-[color:var(--color-black)] font-mono text-6xl font-bold text-left">
              Digital
            </div>
          </motion.div>

          <motion.div 
            className="fixed top-50 left-8 z-20"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <div className="text-[color:var(--color-gray-dark)] font-arial text-4xl font-normal text-left">
              Client Page
            </div>
          </motion.div>
          
        </div>

        {/* Spacer for layout */}
        {/* <div></div> */}
        {/* Copyright */}
        {/* <motion.div
       
            initial={{ opacity: 0, x: -30, y: 30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        >
          <p className="home-copyright text-[color:var(--color-gray-dark)] font-mono font-normal text-left ps-8">
            <small>© 2024 Garfish Digital. All rights reserved.</small>
          </p>
        </motion.div> */}
      </div>

      {/* Navigation Icons - Bottom Right */}
      <Navigation currentPage="home" />
    </div>
  );
}
