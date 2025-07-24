"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { useClientAuth } from "@/hooks/useClientAuth";

export default function Success() {
  const { isClientAuthenticated } = useClientAuth();

  return (
    <div className="min-h-screen text-white flex items-center justify-center contact-success-background">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-6xl mb-8">✓</div>
        <h1 className="text-3xl font-bold mb-4 font-primary">Message Sent</h1>
        <p className="text-white/70 mb-8 font-primary">
          We&apos;ll get back to you within 24 hours.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-primary"
        >
          ← Back to Home
        </Link>
      </motion.div>

      {/* Navigation Icons - Bottom Right */}
      <Navigation
        currentPage="contact"
        isClientAuthenticated={isClientAuthenticated}
      />
    </div>
  );
}