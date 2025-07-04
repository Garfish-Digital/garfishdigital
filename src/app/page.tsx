"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Squares2X2Icon, AtSymbolIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div
      className="text-black"
      style={{
        background: "#FFFFFF",
        fontFamily: "Courier New, monospace",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
          paddingLeft: "5vw",
          paddingTop: "3vw",
        }}
      >
        {/* Logo and Byline */}
        <div>
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
        </div>

        {/* Gallery Section */}
        <div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <Link href="/gallery">
                <Squares2X2Icon
                  className="w-24 h-24 home-icon drop-shadow-lg"
                  style={{ marginRight: "5rem" }}
                />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              <Link href="/contact">
                <AtSymbolIcon className="w-24 h-24 home-icon drop-shadow-lg" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Copyright */}
        <div>
          <p style={{ fontFamily: "Courier New, monospace", color: "#555555" }}>
            © 2024 Garfish Digital. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
