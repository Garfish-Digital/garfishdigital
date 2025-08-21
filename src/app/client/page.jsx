"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faChartColumn,
  faEnvelopeOpenDollar,
  faFileContract,
} from "@fortawesome/pro-regular-svg-icons";
import Navigation from "../../components/Navigation";
import Logo from "../../components/Logo";
import { useClientAuth } from "../../contexts/ClientAuthContext";
import clientsData from "../../data/clients.json";
import "./client.css";

export default function Client() {
  const { isClientAuthenticated, authenticatedClient, setClientAuthenticated } =
    useClientAuth();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  console.log("Authenticated Client:", authenticatedClient);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);

    // Find matching client
    const client = clientsData.find((c) => c.password === password);

    if (!client) {
      // Show error modal for unsuccessful login
      setShowErrorModal(true);
      setPassword(""); // Clear password field

      // Auto-dismiss error modal after 1500ms
      setTimeout(() => {
        setShowErrorModal(false);
      }, 2000);
      return;
    }

    // Show success modal first, then authenticate after timeout
    setShowModal(true);

    // Auto-dismiss success modal and authenticate after 1500ms
    setTimeout(() => {
      setShowModal(false);
      setClientAuthenticated(client);

      // Show welcome modal 750ms after success modal closes - only for garfish-init
      if (client.password === "garfish-init") {
        setTimeout(() => {
          setShowWelcomeModal(true);
        }, 750);
      }
    }, 1500);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setPassword(value);

    // const validationMessage = validatePassword(value);
    // setValidation(validationMessage);
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  if (isClientAuthenticated && !showWelcomeModal) {
    return (
      <div className="text-[color:var(--color-white)] client-success-container bg-[color:var(--color-black)]">
        <div className="client-success-content">
          {/* Static Logo - Upper Left */}
          <Logo />

          <div className="flex items-start justify-center min-h-screen px-4 client-content-wrapper">
            <div className="w-full max-w-lg pb-4 client-content-container">
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
                  <h2 className="text-lg font-bold mb-6 text-[color:var(--color-cyan-dark)] font-primary">
                    Portal dashboard for{" "}
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
                    onClick={() => router.push("/client/project")}
                    className="garfish-button w-50"
                  >
                    <FontAwesomeIcon icon={faChartColumn} className="mr-2" />
                    Project Overview
                  </button>
                  <p className="pt-2 text-[color:var(--color-gray-light)] font-primary leading-relaxed">
                    Keep an eye on development progress by tracking milestones
                    and viewing the current progress on the actual{" "}
                    {authenticatedClient?.project || "your project"} website.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <button
                    onClick={() => router.push("/client/documents")}
                    className="garfish-button w-50"
                  >
                    <FontAwesomeIcon icon={faFileContract} className="mr-2" />
                    Document Center
                  </button>
                  <p className="pt-2 text-[color:var(--color-gray-light)] font-primary leading-relaxed">
                    Review pending contracts and project specifications, all
                    organized in one place for your convenience.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <button
                    onClick={() => router.push("/client/payment")}
                    className="garfish-button w-50"
                  >
                    <FontAwesomeIcon
                      icon={faEnvelopeOpenDollar}
                      className="mr-2"
                    />
                    Payment Gateway
                  </button>
                  <p className="pt-2 text-[color:var(--color-gray-light)] font-primary leading-relaxed">
                    Watch over your payment plan, view past payments, or even
                    submit a new payment.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Navigation Icons - Bottom Right */}
          <Navigation
            currentPage="client"
            isClientAuthenticated={isClientAuthenticated}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="text-[color:var(--color-white)] client-page-container bg-[color:var(--color-black)]">
      <div className="flex items-start justify-center min-h-screen px-4 pt-24 client-page-content">
        <div className="w-full max-w-lg client-form-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-lg font-bold mt-6 mb-2 text-[color:var(--color-cyan-dark)] font-primary">
              Access Your Dashboard
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8"
          >
            <p className="text-[color:var(--color-gray-light)] font-primary leading-relaxed">
              Enter your unique portal code to view your project's progress.
              Don't have a code yet? Find out more below.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <fieldset tabIndex="-1">
              <legend>See Your Project</legend>
              <div className="relative">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    value={password}
                    onChange={handleChange}
                    onFocus={() => handleFocus("password")}
                    onBlur={handleBlur}
                    className={`w-full client-form-field transition-all duration-300 ${
                      focusedField === "password" ? "focus-bounce" : ""
                    }`}
                    placeholder="Enter your portal code"
                  />

                  {/* Password Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 password-toggle"
                  >
                    {showPassword ? (
                      <FontAwesomeIcon icon={faEye} className={`w-4 h-4`} />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className={`w-4 h-4`}
                      />
                    )}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={!password}
                className={`inline-block ${!password ? "disabled-" : ""}garfish-button`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-[color:var(--color-black)]/30 border-t-[color:var(--color-black)] rounded-full animate-spin mr-3"></div>
                    Authenticating...
                  </div>
                ) : (
                  "Enter Portal"
                )}
              </motion.button>
            </fieldset>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-lg font-bold mt-12 mb-2 text-[color:var(--color-cyan-dark)] font-primary">
              Ready for Your Project Portal?
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="text-[color:var(--color-gray-light)] font-primary leading-relaxed">
              Simply send us a message through our{" "}
              <Link
                href="/contact"
                className="text-[var(--color-gray-light)] hover:text-[var(--color-white)] transition-colors duration-200 underline decoration-dotted underline-offset-2"
              >
                Contact Page
              </Link>{" "}
              We'll respond within 48 hours with your unique code, giving you
              access to view your website, project documentation, and payment
              information.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Static Logo - Upper Left */}
      <Logo />

      {/* Navigation Icons - Bottom Right */}
      <Navigation
        currentPage="client"
        isClientAuthenticated={isClientAuthenticated}
      />

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="w-full max-w-md mx-4 bg-[color:var(--color-black)]/90 backdrop-blur-sm border border-[color:var(--color-white)]/20 rounded-lg overflow-hidden client-modal-background"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 text-center">
                <motion.div
                  className="text-6xl mb-4 text-[var(--color-green-light)]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                >
                  ✓
                </motion.div>
                <motion.p
                  className="text-[color:var(--color-white)]/70 mb-6 font-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Welcome to your {authenticatedClient?.project} portal
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Modal */}
      <AnimatePresence>
        {showErrorModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="w-full max-w-md mx-4 bg-[color:var(--color-black)]/90 backdrop-blur-sm border border-[color:var(--color-white)]/20 rounded-lg overflow-hidden client-modal-background"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 text-center">
                <motion.div
                  className="text-6xl mb-4 text-red-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                >
                  ⚠️
                </motion.div>
                <motion.p
                  className="text-[color:var(--color-white)]/70 mb-6 font-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Sorry, please try your access code again
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome Modal */}
      <AnimatePresence>
        {showWelcomeModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="w-full max-w-md mx-4 bg-[color:var(--color-black)]/90 backdrop-blur-sm border border-[color:var(--color-white)]/20 rounded-lg overflow-hidden client-modal-background"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with close button */}
              <div className="flex items-center justify-between p-6 border-b border-[color:var(--color-white)]/10">
                <motion.h2
                  className="text-2xl font-bold text-[color:var(--color-white)] font-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Welcome!
                </motion.h2>
                <motion.button
                  onClick={() => setShowWelcomeModal(false)}
                  className="text-[color:var(--color-white)]/60 hover:text-[color:var(--color-white)] transition-colors p-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6">
                <motion.p
                  className="text-[color:var(--color-white)]/70 leading-relaxed font-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  This client dashboard would be your future home base for
                  monitoring project progress, reviewing documents, and managing
                  your payments. Feel free to explore your project's details by
                  clicking any of the buttons or newly-added icons.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
