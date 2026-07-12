"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[color:var(--color-black)] flex flex-col justify-center px-8">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src="/Garfish-Logo-Master.svg"
          alt="Garfish Digital"
          width={415}
          height={88}
          className="w-72 md:w-96 h-auto"
          priority
        />
      </motion.div>

      <motion.div
        className="mt-16"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        <p className="text-[color:var(--color-gray-light)] font-primary text-4xl font-normal">
          404
        </p>
        <p className="text-[color:var(--color-gray-light)] font-primary text-4xl font-normal mt-2">
          nothing here.
        </p>
      </motion.div>

      <motion.div
        className="mt-12"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
      >
        <Link
          href="/"
          className="font-primary text-lg text-[color:var(--color-gray-light)] hover:text-[color:var(--color-cyan-light)] transition-colors duration-300"
        >
          go home →
        </Link>
      </motion.div>
    </div>
  );
}
