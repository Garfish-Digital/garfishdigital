"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navigation from "../../components/Navigation";
import Logo from "../../components/Logo";
import { useClientAuth } from "../../contexts/ClientAuthContext";
import "./contact.css";

export default function Contact() {
  const { isClientAuthenticated } = useClientAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    message: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  //   const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [validation, setValidation] = useState({});
  const [placeholders, setPlaceholders] = useState({
    name: "Your name",
    email: "your@email.com",
    business: "Your business (optional)",
    message: "Tell us about your project...",
  });
  const [placeholderKeys, setPlaceholderKeys] = useState({
    name: 0,
    email: 0,
    business: 0,
    message: 0,
  });
  const [showModal, setShowModal] = useState(null);

  // Separate cycling for each field with staggered timing
  useEffect(() => {
    // Cycling placeholder text
    const placeholderOptions = {
      name: [`What\'s your name`, "A nickname?", "Who are you?"],
      email: [
        "your@email.com",
        "Where do you get messages?",
        "How do we reach you?",
      ],
      business: [
        "Your business (optional)",
        "What type of work do you do?",
        "Who you bust your a$$ for",
      ],
      message: [
        "What are you building?",
        "Do you have wild ideas?",
        "What can we do?",
      ],
    };

    let nameIndex = 0;
    let emailIndex = 0;
    let businessIndex = 0;
    let messageIndex = 0;

    const nameInterval = setInterval(() => {
      nameIndex = (nameIndex + 1) % placeholderOptions.name.length;
      setPlaceholders((prev) => ({
        ...prev,
        name: placeholderOptions.name[nameIndex],
      }));
      setPlaceholderKeys((prev) => ({ ...prev, name: prev.name + 1 }));
    }, 12600);

    const emailInterval = setInterval(() => {
      emailIndex = (emailIndex + 1) % placeholderOptions.email.length;
      setPlaceholders((prev) => ({
        ...prev,
        email: placeholderOptions.email[emailIndex],
      }));
      setPlaceholderKeys((prev) => ({ ...prev, email: prev.email + 1 }));
    }, 18000);

    const businessInterval = setInterval(() => {
      businessIndex = (businessIndex + 1) % placeholderOptions.business.length;
      setPlaceholders((prev) => ({
        ...prev,
        business: placeholderOptions.business[businessIndex],
      }));
      setPlaceholderKeys((prev) => ({ ...prev, business: prev.business + 1 }));
    }, 20500);

    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % placeholderOptions.message.length;
      setPlaceholders((prev) => ({
        ...prev,
        message: placeholderOptions.message[messageIndex],
      }));
      setPlaceholderKeys((prev) => ({ ...prev, message: prev.message + 1 }));
    }, 15000);

    return () => {
      clearInterval(nameInterval);
      clearInterval(emailInterval);
      clearInterval(businessInterval);
      clearInterval(messageInterval);
    };
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowModal(null);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  // Smart validation
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value) return "";
        if (value.length < 2) return "A bit short for a name...";
        if (value.length > 50) return "That's quite a name!";
        return "Perfect ✓";

      case "email":
        if (!value) return "";
        if (!value.includes("@")) return "Missing the @ symbol";
        if (!value.includes(".")) return "Needs a domain ending";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Email format seems off";
        return "Looking good ✓";

      case "message":
        if (!value) return "";
        if (value.length < 10) return "Can you give us a bit more...?";
        if (value.length > 1000) return "Whoa, that's detailed!";
        return `${value.length} characters of brilliance!`;

      default:
        return "";
    }
  };

  // Success modal timeout and navigation
//   useEffect(() => {
//     if (showSuccessModal) {
//       const timer = setTimeout(() => {
//         window.location.href = '/';
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [showSuccessModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formElement = e.currentTarget;
    console.log('formElement: ', formElement);
    const formData = new FormData(formElement);
    console.log('formData: ', formData);

    try {
      const response = await fetch(formElement.action || '/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        setShowSuccessModal(true);
        setFormData({ name: "", email: "", business: "", message: "" });
        setValidation({});
      } else {
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setShowErrorModal(true);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", business: "", message: "" });
    setValidation({});
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('name & value: ', name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    const validationMessage = validateField(name, value);
    setValidation((prev) => ({
      ...prev,
      [name]: validationMessage,
    }));
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };


  return (
    <div className="h-screen overflow-hidden text-black contact-page-container">
      {/* Static Logo - Upper Left */}
      <Logo />

      <div className="flex items-start justify-center min-h-screen px-4 py-24">
        <div className="w-full max-w-lg overflow-y-auto max-h-[calc(100vh-12rem)] contact-form-container">
          <div className="w-80 mt-8 mb-8 sm:w-96 md:w-[420px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-lg font-bold mt-4 mb-2 text-[color:var(--color-gray-shadow)] font-arial">
                How Do I Get Started?
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="text-[color:var(--color-gray-dark)] font-arial leading-relaxed">
                Use the form below to let us know you're thinking about a
                website. We'll do the rest.
              </p>
            </motion.div>
          </div>

          <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        name="contact"
                        data-netlify="true"
                          data-netlify-honeypot="bot-field"
            method="POST"
            action="/__forms.html"
                    >

            <input type="hidden" name="form-name" value="contact" />
            <input type="text" name="bot-field" style={{ display: 'none' }} className="visually-hidden-bot-field" />

            <fieldset>
              <legend>Contact Us</legend>
              {/* <div className="grid md:grid-cols-2 gap-6 contact-form-grid mb-6"> */}
              <div className="relative">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus("name")}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-3 contact-form-field text-black transition-all duration-300 ${
                      focusedField === "name" ? "focus-bounce" : ""
                    }`}
                    placeholder=" "
                  />
                  {!formData.name && (
                    <div className="absolute left-3 top-3 pointer-events-none overflow-hidden h-6">
                      <motion.div
                        key={placeholderKeys.name}
                        className="text-[var(--color-gray-faint)] font-arial"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        {placeholders.name}
                      </motion.div>
                    </div>
                  )}
                </div>
                {/* {validation.name && (
                  <div
                    className={`text-xs mt-1 transition-all duration-300 ${
                      validation.name.includes("Perfect") ||
                      validation.name.includes("✓")
                        ? "text-user-green"
                        : validation.name.includes("short") ||
                            validation.name.includes("quite")
                          ? "text-user-yellow"
                          : "text-white/60"
                    }`}
                  >
                    {validation.name}
                  </div>
                )} */}
              </div>

              <div className="relative">
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus("email")}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-3 contact-form-field transition-all duration-300 ${
                      focusedField === "email" ? "focus-bounce" : ""
                    }`}
                    placeholder=" "
                  />
                  {!formData.email && (
                    <div className="absolute left-3 top-3 pointer-events-none overflow-hidden h-6">
                      <motion.div
                        key={placeholderKeys.email}
                        className="text-[var(--color-gray-faint)] font-arial"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        {placeholders.email}
                      </motion.div>
                    </div>
                  )}
                </div>
                {validation.email && (
                  <div
                    className={`text-xs mb-1 transition-all duration-300 ${
                      validation.email.includes("Perfect") ||
                      validation.email.includes("✓")
                        ? "text-user-green"
                        : validation.email.includes("Missing") ||
                            validation.email.includes("Needs") ||
                            validation.email.includes("format")
                          ? "text-user-yellow"
                          : "text-white/60"
                    }`}
                  >
                    {validation.email}
                  </div>
                )}
              </div>
              {/* </div> */}

              <div className="relative">
                <div className="relative">
                  <input
                    type="text"
                    id="business"
                    name="business"
                    required
                    value={formData.business}
                    onChange={handleChange}
                    onFocus={() => handleFocus("business")}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-3 contact-form-field transition-all duration-300 ${
                      focusedField === "business" ? "focus-bounce" : ""
                    }`}
                    placeholder=" "
                  />
                  {!formData.business && (
                    <div className="absolute left-3 top-3 pointer-events-none overflow-hidden h-6">
                      <motion.div
                        key={placeholderKeys.business}
                        className="text-[var(--color-gray-faint)] font-arial"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        {placeholders.business}
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative mb-4">
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={2}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus("message")}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-3 contact-form-field resize-none transition-all duration-300 ${
                      focusedField === "message" ? "focus-bounce" : ""
                    }`}
                    placeholder=" "
                  />
                  {!formData.message && (
                    <div className="absolute left-3 top-3 pointer-events-none overflow-hidden h-6">
                      <motion.div
                        key={placeholderKeys.message}
                        className="text-[var(--color-gray-faint)] font-arial"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        {placeholders.message}
                      </motion.div>
                    </div>
                  )}
                </div>
                {/* {validation.message && (
                  <div
                    className={`text-xs mt-1 transition-all duration-300 ${
                      validation.message.includes("brilliance")
                        ? "text-user-green"
                        : validation.message.includes("more") ||
                            validation.message.includes("detailed")
                          ? "text-user-yellow"
                          : "text-white/60"
                    }`}
                  >
                    {validation.message}
                  </div>
                )} */}
              </div>

              {/* reCAPTCHA */}
              {/* <div className="flex justify-center">
                <div
                  data-netlify-recaptcha="true"
                  className="g-recaptcha"
                ></div>
              </div> */}

              <motion.button
                type="submit"
                className="inline-block garfish-button text-lg transition-all duration-300 transform font-arial"
              >
                Send
              </motion.button>
            </fieldset>
          {/* </form> */}
          </motion.form>
        </div>
      </div>

      {/* Legal Links - Bottom Left */}
      <div className="fixed bottom-4 left-8 z-40 flex gap-4 text-xs">
        <motion.button
          onClick={() => setShowModal("privacy")}
          className="text-[var(--color-gray-faint)] hover:text-[var(--color-gray-dark)] transition-colors duration-200 underline decoration-dotted underline-offset-2 font-primary"
          initial={{ opacity: 0, x: -30, y: 30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        >
          Privacy
        </motion.button>
        <motion.button
          onClick={() => setShowModal("terms")}
          className="text-[var(--color-gray-faint)] hover:text-[var(--color-gray-dark)] transition-colors duration-200 underline decoration-dotted underline-offset-2 font-primary"
          initial={{ opacity: 0, x: -30, y: 30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
        >
          Terms
        </motion.button>
      </div>

      {/* Navigation Icons - Bottom Right */}
      <Navigation
        currentPage="contact"
        isClientAuthenticated={isClientAuthenticated}
      />

      {/* Hip & Soothing Modal for Privacy/Terms */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setShowModal(null)}
          >
            <motion.div
              className="w-full max-w-4xl mx-4 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden contact-modal-background"
              initial={{ opacity: 0, scale: 0.8, y: 20, rotate: -1 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20, rotate: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <motion.div
                className="flex items-center justify-between p-6 border-b border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-white font-primary">
                  {showModal === "privacy"
                    ? "Privacy Policy"
                    : "Terms of Service"}
                </h2>
                <motion.button
                  onClick={() => setShowModal(null)}
                  className="text-white/60 hover:text-white transition-colors p-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
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
              </motion.div>

              {/* Content */}
              <motion.div
                className="p-6 max-h-[60vh] overflow-y-auto text-white/80 leading-relaxed font-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {showModal === "privacy" ? (
                  <div className="space-y-4">
                    {[
                      {
                        title: "Information Collection",
                        content:
                          "We collect information you provide directly to us, such as when you fill out our contact form or communicate with us.",
                      },
                      {
                        title: "Use of Information",
                        content:
                          "We use the information we collect to respond to your inquiries, provide our services, and improve your experience.",
                      },
                      {
                        title: "Information Sharing",
                        content:
                          "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.",
                      },
                      {
                        title: "Data Security",
                        content:
                          "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
                      },
                      {
                        title: "Contact Us",
                        content:
                          "If you have questions about this Privacy Policy, please contact us through our contact form.",
                      },
                    ].map((section, index) => (
                      <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                      >
                        <h3 className="text-lg font-semibold text-white">
                          {section.title}
                        </h3>
                        <p>{section.content}</p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {[
                      {
                        title: "Acceptance of Terms",
                        content:
                          "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
                      },
                      {
                        title: "Services",
                        content:
                          "Garfish Digital provides web design, development, and digital consulting services. Specific terms for each project will be outlined in separate agreements.",
                      },
                      {
                        title: "Intellectual Property",
                        content:
                          "The content, organization, graphics, design, and other matters related to this website are protected under applicable copyrights and other proprietary laws.",
                      },
                      {
                        title: "Limitation of Liability",
                        content:
                          "Garfish Digital shall not be liable for any damages arising from the use of this website or our services, except as required by law.",
                      },
                      {
                        title: "Changes to Terms",
                        content:
                          "We reserve the right to modify these terms at any time. Continued use of the website constitutes acceptance of any changes.",
                      },
                    ].map((section, index) => (
                      <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                      >
                        <h3 className="text-lg font-semibold text-white">
                          {section.title}
                        </h3>
                        <p>{section.content}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Footer */}
              <motion.div
                className="p-6 border-t border-white/10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <p className="text-white/50 text-sm font-primary">
                  Last updated: January 2025
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="w-full max-w-md mx-4 bg-[color:var(--color-white)] border border-[color:var(--color-gray-light)] rounded-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="p-8 text-center">
                <div className="text-6xl mb-6 text-[color:var(--color-green-dark)]">✓</div>
                <h2 className="text-2xl font-bold mb-4 text-[color:var(--color-black)] font-mono">
                  Message Sent
                </h2>
                <p className="text-[color:var(--color-gray-dark)] mb-6 font-arial">
                  We'll get back to you within 24 hours.
                </p>
                {/* <p className="text-sm text-[color:var(--color-gray-shadow)] font-arial">
                  Redirecting to home in 3 seconds...
                </p> */}
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
            onClick={handleErrorModalClose}
          >
            <motion.div
              className="w-full max-w-md mx-4 bg-[color:var(--color-white)] border border-[color:var(--color-gray-light)] rounded-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-[color:var(--color-gray-light)]">
                <h2 className="text-2xl font-bold text-[color:var(--color-black)] font-mono">
                  Submission Failed
                </h2>
                <motion.button
                  onClick={handleErrorModalClose}
                  className="text-[color:var(--color-gray-shadow)] hover:text-[color:var(--color-black)] transition-colors p-2"
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
              <div className="p-6">
                <div className="text-6xl mb-6 text-[color:var(--color-gray-dark)] text-center">⚠️</div>
                <p className="text-[color:var(--color-gray-dark)] mb-6 font-arial text-center">
                  There was an error sending your message. Please try again or contact us directly.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={handleErrorModalClose}
                    className="garfish-button font-arial"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}