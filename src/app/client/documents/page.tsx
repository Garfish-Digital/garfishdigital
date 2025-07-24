"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileContract,
  faWindow,
  faEnvelopeOpenDollar,
} from "@fortawesome/pro-regular-svg-icons";
import Navigation from "@/components/Navigation";
import { useClientAuth } from "@/hooks/useClientAuth";
import "./documents.css";


export default function Documents() {
  const { isClientAuthenticated } = useClientAuth();

  return (
    <div className="min-h-screen text-black documents-success-background">
      {/* Static Logo - Upper Left */}
      <motion.div
        className="fixed top-8 left-8 z-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-[color:var(--color-black)] font-mono text-3xl font-bold text-left">
          Garfish Digital
        </div>
      </motion.div>

      <div className="flex items-start justify-center h-screen px-4 pt-24">
        <div className="w-full max-w-lg documents-content-container">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="text-[color:var(--color-gray-dark)] font-arial leading-relaxed">
                Welcome to your document center. Access contracts, project
                specifications, and important documentation through this secure
                portal.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <button className="garfish-button font-arial w-full">
                View Project Scope Document
              </button>
              <p className="text-[color:var(--color-gray-dark)] font-arial leading-relaxed">
                Review the comprehensive project scope document that outlines deliverables, timelines, and technical requirements. This document serves as the foundation for all project work and defines what will be built.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <button className="garfish-button font-arial w-full">
                View Project Agreement Document
              </button>
              <p className="text-[color:var(--color-gray-dark)] font-arial leading-relaxed">
                Access the formal project agreement document containing contract terms, deliverable specifications, and project timeline commitments. This legal document defines the working relationship and project expectations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <button className="garfish-button font-arial w-full">
                View Project Handoff Document
              </button>
              <p className="text-[color:var(--color-gray-dark)] font-arial leading-relaxed">
                Download the complete project handoff documentation including source code access, hosting credentials, maintenance guidelines, and training materials. This comprehensive package ensures smooth project transition and ongoing management.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Icons - Bottom Right */}
      <Navigation
        currentPage="documents"
        isClientAuthenticated={isClientAuthenticated}
      />
    </div>
  );
}
