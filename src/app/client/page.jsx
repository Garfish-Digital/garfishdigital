"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faWindow,
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
  const [validation, setValidation] = useState("");
  const [placeholder, setPlaceholder] = useState("Your client password");
  const [placeholderKey, setPlaceholderKey] = useState(0);
  const [focusedField, setFocusedField] = useState(null);

  // Cycling placeholder text
  useEffect(() => {
    const placeholderOptions = [
      "Portal code here",
      "Backstage pass",
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

//   const validatePassword = (value) => {
//     if (!value) return "";
//     if (value.length < 5) return "A bit short...";

    // Check if password matches any client
    // const client = clientsData.find((c) => c.password === value);
    // if (client) return "Access granted! ✓";

    // return "Keep on going";
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Find matching client
    const client = clientsData.find((c) => c.password === password);
    if (!client) {
      setValidation("Invalid password");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show modal first, then authenticate after timeout
    setShowModal(true);
    setIsSubmitting(false);
    
    // Auto-dismiss modal and authenticate after 1500ms
    setTimeout(() => {
      setShowModal(false);
      setClientAuthenticated(client);
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

  if (isClientAuthenticated) {
    return (
      <div className="min-h-screen text-black client-success-container">
        <div className="client-success-content">
        {/* Static Logo - Upper Left */}
        <Logo />

        <div className="flex items-start justify-center h-screen px-4 pt-24">
          <div className="w-full max-w-lg overflow-y-auto max-h-[calc(100vh-12rem)] pb-4 client-content-container">
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
                <h2 className="text-lg font-bold mb-6 text-[color:var(--color-gray-shadow)] font-primary">
                  Portal dashboard for {authenticatedClient?.project}
                  {/* Welcome to your portal dashboard for{" "}
                  <strong className="text-[var(--color-gray-dark)]">
                    {authenticatedClient?.project || "your project"}
                  </strong>
                  . */}
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
                  <FontAwesomeIcon icon={faWindow} className="mr-2" />
                  {/* {authenticatedClient?.project || "Your Project"} Website */}
                  Project Overview
                </button>
                <p className="pt-2 text-[color:var(--color-gray-dark)] font-arial leading-relaxed">
                  Keep an eye on development progress by tracking milestones and
                  viewing the current progress on the actual{" "}
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
                <p className="pt-2 text-[color:var(--color-gray-dark)] font-arial leading-relaxed">
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
                <p className="pt-2 text-[color:var(--color-gray-dark)] font-arial leading-relaxed">
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
    <div className="h-screen overflow-hidden text-black client-page-container">
      <div className="flex items-start justify-center h-screen px-4 pt-24 client-page-content">
        <div className="w-full max-w-lg overflow-y-auto max-h-[calc(100vh-12rem)] client-form-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-lg font-bold mt-6 mb-2 text-[color:var(--color-gray-shadow)] font-arial">
              Access Your Dashboard
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8"
          >
            <p className="text-[color:var(--color-gray-dark)] font-arial leading-relaxed">
                Enter your unique portal code to view your project's progress. Don't have a code yet? Find out more below.
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
                    placeholder=" "
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

                  {!password && (
                    <div className="absolute left-3 top-4 pointer-events-none overflow-hidden h-6">
                      <motion.div
                        key={placeholderKey}
                        className="text-[var(--color-gray-faint)] font-arial"
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
              </div>

              <motion.button
                type="submit"
                disabled={!password}
                className={`inline-block ${!password ? "disabled-" : ""}garfish-button`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-sm animate-spin mr-3"></div>
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
            <h2 className="text-lg font-bold mt-12 mb-2 text-[color:var(--color-gray-shadow)] font-arial">
                Ready for Your Project Portal?
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="text-[color:var(--color-gray-dark)] font-arial leading-relaxed">
              Simply send us a message through our{" "}
              <Link
                href="/contact"
                className="text-[var(--color-gray-light)] hover:text-[var(--color-green-light)] transition-colors duration-200 underline decoration-dotted underline-offset-2"
              >
                Contact Page
              </Link>{" "}
              We'll respond within 48 hours with your unique code, giving you access to view your website, project documentation, and payment information.
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
              className="w-full max-w-md mx-4 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden client-modal-background"
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
                {/* <motion.h2
                  className="text-2xl font-bold mb-3 text-white font-arial"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Access Granted
                </motion.h2> */}
                <motion.p
                  className="text-white/70 mb-6 font-arial"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Welcome to the {authenticatedClient?.project} portal.
                  {/* Welcome to your client portal for{" "}
                  {authenticatedClient?.project || "your project"}. All
                  navigation icons are now enabled. */}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
