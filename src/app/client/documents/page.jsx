"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileContract,
  faFileText,
  faHandshake,
} from "@fortawesome/pro-regular-svg-icons";
import Navigation from "../../../components/Navigation";
import Logo from "../../../components/Logo";
import { useClientAuth } from "../../../contexts/ClientAuthContext";
import "./documents.css";

export default function Documents() {
  const { isClientAuthenticated, authenticatedClient } = useClientAuth();

  const handleDocumentClick = (documentType) => {
    if (authenticatedClient && authenticatedClient.documents[documentType]) {
      window.open(authenticatedClient.documents[documentType], '_blank');
    }
  };

  if (!isClientAuthenticated) {
    return (
      <div className="min-h-screen text-black documents-success-background">
        <Logo />
        <div className="flex items-center justify-center h-screen px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 font-primary">Access Denied</h2>
            <p className="text-gray-600 font-primary">Please log in to access documents.</p>
          </div>
        </div>
        <Navigation currentPage="documents" isClientAuthenticated={isClientAuthenticated} />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-black documents-success-background">
      {/* Static Logo - Upper Left */}
      <Logo />

      <div className="flex items-start justify-center min-h-screen px-4 py-24 documents-page-container">
        <div className="w-full max-w-lg overflow-y-auto max-h-[calc(100vh-12rem)] documents-content-container">
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
                <h2 className="text-lg font-bold mb-4 text-[color:var(--color-gray-shadow)] font-arial">
                  Document Center for{" "}
                  <strong className="text-[var(--color-gray-dark)]">
                    {authenticatedClient?.project || "your project"}
                  </strong>.
                </h2>
              </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <button 
                className="garfish-button font-arial w-80"
                onClick={() => handleDocumentClick('scope')}
              >
                View Project Scope Document
              </button>
              <p className="pt-2 text-[color:var(--color-gray-dark)] font-arial leading-relaxed">
                Review the comprehensive project scope document that outlines deliverables, timelines, and technical requirements. This document serves as the foundation for all project work and defines what will be built.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <button 
                className="garfish-button font-arial w-80"
                onClick={() => handleDocumentClick('agreement')}
              >
                View Project Agreement Document
              </button>
              <p className="pt-2 text-[color:var(--color-gray-dark)] font-arial leading-relaxed">
                Access the formal project agreement document containing contract terms, deliverable specifications, and project timeline commitments. This legal document defines the working relationship and project expectations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <button 
                className="garfish-button font-arial w-80"
                onClick={() => handleDocumentClick('handoff')}
              >
                View Project Handoff Document
              </button>
              <p className="pt-2 text-[color:var(--color-gray-dark)] font-arial leading-relaxed">
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
