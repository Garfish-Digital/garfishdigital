"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import { useClientAuth } from "../../contexts/ClientAuthContext";

export default function ContactError() {
  const { isClientAuthenticated } = useClientAuth();

  return (
    <div className="min-h-screen text-white flex items-center justify-center bg-red-900">
      {/* Static Logo - Upper Left */}
      <motion.div
        className="fixed top-8 left-8 z-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-[color:var(--color-white)] font-mono text-3xl font-bold text-left">
          Garfish Digital
        </div>
      </motion.div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-6xl mb-8">⚠️</div>
        <h1 className="text-3xl font-bold mb-4 font-primary">Submission Failed</h1>
        <p className="text-white/70 mb-8 font-primary">
          There was an error sending your message. Please try again or contact us directly.
        </p>
        <div className="space-x-4">
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-primary"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-primary"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>

      {/* Navigation Icons - Bottom Right */}
      <Navigation
        currentPage="contact"
        isClientAuthenticated={isClientAuthenticated}
      />
    </div>
  );
}