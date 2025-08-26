"use client";

import { motion } from "framer-motion";
import Navigation from "../../../components/Navigation";
import Logo from "../../../components/Logo";
import { useClientAuth } from "../../../contexts/ClientAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulbOn,
  faFolderCheck,
  faHandHoldingBox,
} from "@fortawesome/pro-regular-svg-icons";
import "./documents.css";

export default function Documents() {
  const { isClientAuthenticated, authenticatedClient } = useClientAuth();

  const handleDocumentClick = (documentType) => {
    if (authenticatedClient && authenticatedClient.documents[documentType]) {
      window.open(authenticatedClient.documents[documentType], "_blank");
    }
  };

  if (!isClientAuthenticated) {
    return (
      <div className="text-[color:var(--color-white)] documents-success-background bg-[color:var(--color-black)] client-scrollbar-hide">
        <Logo />
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 font-primary">
              Access Denied
            </h2>
            <p className="text-[color:var(--color-gray-dark)] font-primary">
              Please log in to access documents.
            </p>
          </div>
        </div>
        <Navigation
          currentPage="documents"
          isClientAuthenticated={isClientAuthenticated}
        />
      </div>
    );
  }

  return (
    <div className="text-[color:var(--color-white)] documents-success-background bg-[color:var(--color-black)] client-scrollbar-hide">
      {/* Static Logo - Upper Left */}
      <Logo />

      <div className="flex items-start justify-center min-h-screen px-4 py-24 documents-page-container">
        <div className="w-full max-w-lg px-4 documents-content-container">
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
              <h2 className="text-lg font-bold mb-4 text-[color:var(--color-cyan-dark)] font-primary">
                Document Center for{" "}
                <strong className="text-[var(--color-white)]">
                  {authenticatedClient?.project || "your project"}
                </strong>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <button
                className="garfish-button font-primary w-75"
                onClick={() => handleDocumentClick("scope")}
              >
                <FontAwesomeIcon
                    icon={faLightbulbOn}
                    className="mr-2"
                />
                Review Project Scope
              </button>
              <p className="pt-2 text-[color:var(--color-gray-light)] font-primary leading-relaxed">
                See what we'll build and when. This document is your guide to
                the project's features, timelines, and technical details, laying
                the groundwork for our work together.{" "}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <button
                className="garfish-button font-primary w-75"
                onClick={() => handleDocumentClick("agreement")}
              >
                <FontAwesomeIcon
                    icon={faFolderCheck}
                    className="mr-2"
                />
                View Project Agreement
              </button>
              <p className="pt-2 text-[color:var(--color-gray-light)] font-primary leading-relaxed">
                Access your formal project contract. This legal document details
                our terms, what we'll deliver, and key project dates, clearly
                defining our partnership.{" "}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <button
                className="garfish-button font-primary w-75"
                onClick={() => handleDocumentClick("handoff")}
              >
                <FontAwesomeIcon
                    icon={faHandHoldingBox}
                    className="mr-2"
                />
                Project Handoff Package
              </button>
              <p className="pt-2 text-[color:var(--color-gray-light)] font-primary leading-relaxed">
                This document outlines your complete project handoff package.
                Upon completion, you'll receive all source code, hosting
                credentials, maintenance guidelines, and training materials for
                seamless transition and confident ongoing management.{" "}
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
