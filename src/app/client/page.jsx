"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
  faWindow,
  faEnvelopeOpenDollar,
  faFileContract,
} from "@fortawesome/pro-regular-svg-icons";
import Navigation from "../../components/Navigation";
import { useClientAuth } from "../../contexts/ClientAuthContext";
import clientsData from "../../data/clients.json";
import "./client.css";

export default function Client() {
  const { isClientAuthenticated, authenticatedClient, setClientAuthenticated } = useClientAuth();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [validation, setValidation] = useState("");
  const [placeholder, setPlaceholder] = useState("Your client password");
  const [placeholderKey, setPlaceholderKey] = useState(0);

  // Cycling placeholder text
  useEffect(() => {
    const placeholderOptions = [
      "Your client password",
      "Access code required",
      "Key to the city",
    ];

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % placeholderOptions.length;
      setPlaceholder(placeholderOptions[index]);
      setPlaceholderKey((prev) => prev + 1);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const validatePassword = (value) => {
    if (!value) return "";
    if (value.length < 3) return "A bit short...";
    
    // Check if password matches any client
    const client = clientsData.find(c => c.password === value);
    if (client) return "Access granted! ✓";
    
    return "Invalid password";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Find matching client
    const client = clientsData.find(c => c.password === password);
    if (!client) {
      setValidation("Invalid password");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Set client authentication with full client object
    setClientAuthenticated(client);

    setShowModal(true);
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setPassword(value);

    const validationMessage = validatePassword(value);
    setValidation(validationMessage);
  };

  if (isClientAuthenticated && !showModal) {
    return (
      <div className="min-h-screen text-black client-success-background">
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
          <div className="w-full max-w-lg client-content-container">
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
                {/* <h2 className="text-lg font-bold mb-4 text-[color:var(--color-gray-shadow)] font-arial">
                  Welcome Back
                </h2> */}
                <p className="text-[color:var(--color-gray-dark)] font-arial leading-relaxed">
                  Welcome to your client dashboard for <strong>{authenticatedClient?.project || 'your project'}</strong>. Navigate through your
                  project materials, review contracts, and process payments
                  using the icons in the bottom right corner.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h3 className="text-lg font-bold mb-4 text-[color:var(--color-gray-shadow)] font-arial">
                  <FontAwesomeIcon icon={faWindow} className="mr-2 text-[color:var(--color-gray-faint)]" /> {authenticatedClient?.project || 'Your Project'}
                </h3>
                <p className="text-[color:var(--color-gray-dark)] font-arial leading-relaxed">
                  Access your project files, review development progress, and
                  track milestones for {authenticatedClient?.project || 'your project'}.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <h3 className="text-lg font-semibold mb-3 text-[color:var(--color-gray-shadow)] font-arial">
                  <FontAwesomeIcon icon={faFileContract} className="mr-2 text-[color:var(--color-gray-faint)]" /> Check the Specs
                </h3>
                <p className="text-[color:var(--color-gray-dark)] font-arial leading-relaxed">
                  Review pending contracts and project specifications, all organized in one place for your convenience.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <h3 className="text-lg font-semibold mb-3 text-[color:var(--color-gray-shadow)] font-arial">
                  <FontAwesomeIcon icon={faEnvelopeOpenDollar} className="mr-2 text-[color:var(--color-gray-faint)]" /> Make a Payment
                </h3>
                <p className="text-[color:var(--color-gray-dark)] font-arial leading-relaxed">
                  Review your payment plan, view past payments, or submit a new payment.
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
    );
  }

  return (
    <div className="h-screen overflow-hidden text-black client-page-container">
      <div className="flex items-start justify-center h-screen px-4 pt-24">
        <div className="w-full max-w-lg client-form-container">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={handleChange}
                  className="w-full px-3 py-3 pr-12 bg-white client-form-field focus:outline-none text-black transition-all duration-300"
                  placeholder=" "
                />

                {/* Password Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 garfish-button"
                >
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className={`w-5 h-5 ${
                      showPassword ? "opacity-50" : "opacity-100"
                    }`}
                  />
                </button>

                {!password && (
                  <div className="absolute left-3 top-3 pointer-events-none overflow-hidden h-6">
                    <motion.div
                      key={placeholderKey}
                      className="text-[#AAAAAA] font-mono"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      {placeholder}
                    </motion.div>
                  </div>
                )}
              </div>
              {validation && (
                <div
                  className={`text-xs mt-1 transition-all duration-300 ${
                    validation.includes("✓")
                      ? "text-green-400"
                      : validation.includes("short") ||
                        validation.includes("Invalid")
                      ? "text-red-400"
                      : "text-white/60"
                  }`}
                >
                  {validation}
                </div>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting || !clientsData.find(c => c.password === password)}
              className="inline-block bg-white client-form-button disabled:opacity-50 disabled:cursor-not-allowed text-lg text-black transition-all duration-300 font-mono"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-3"></div>
                  Authenticating...
                </div>
              ) : (
                "Access Client Portal"
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>

      {/* Static Logo - Upper Left */}
      <motion.div
        className="fixed top-8 left-8 z-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-[color:var(--color-black)] font-mono text-3xl font-bold text-left">
          garfish digital
        </div>
      </motion.div>

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
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="w-full max-w-md mx-4 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden client-modal-background"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 text-center">
                <motion.div
                  className="text-6xl mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                >
                  ✓
                </motion.div>
                <motion.h2
                  className="text-2xl font-bold mb-3 text-white font-mono"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Access Granted
                </motion.h2>
                <motion.p
                  className="text-white/70 mb-6 font-mono"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Welcome to your client portal for {authenticatedClient?.project || 'your project'}. Navigation icons are now
                  enabled.
                </motion.p>
                <motion.button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors font-mono text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Continue
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
