"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Logo() {
  return (
    <motion.div
      className="fixed top-8 left-8 z-20"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Link href="/" className="block">
        <div className="text-[color:var(--color-black)] font-mono text-3xl font-bold text-left">
          Garfish Digital
        </div>
      </Link>
    </motion.div>
  );
}