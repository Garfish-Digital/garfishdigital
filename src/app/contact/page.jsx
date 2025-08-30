"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navigation from "../../components/Navigation";
import Logo from "../../components/Logo";
import { useClientAuth } from "../../contexts/ClientAuthContext";
import "./contact.css";

export default function Contact() {
  const { isClientAuthenticated } = useClientAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    message: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [showModal, setShowModal] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formElement = e.currentTarget;
    console.log("formElement: ", formElement);
    const formData = new FormData(formElement);
    console.log("formData: ", Object.fromEntries(formData));
    const businessValue = formData.get("business");
    const messageValue = formData.get("message");
    formData.set("message", `${messageValue}\n\nBusiness: \n${businessValue}`);
    console.log(
      "formData after newline addition: ",
      Object.fromEntries(formData)
    );

    const urlEncodedData = new URLSearchParams(formData).toString();
    console.log("URL encoded body:", urlEncodedData);

    try {
      const response = await fetch(formElement.action || "/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        setShowSuccessModal(true);
        setFormData({ name: "", email: "", business: "", message: "" });
        
        // Auto-dismiss modal and navigate to home after 3000ms
        setTimeout(() => {
          setShowSuccessModal(false);
          router.push("/");
        }, 3000);
      } else {
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setShowErrorModal(true);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", business: "", message: "" });
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name & value: ", name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <div className="text-[color:var(--color-white)] contact-page-container bg-[color:var(--color-black)]">
      {/* Static Logo - Upper Left */}
      <Logo />

      <div className="flex items-start justify-center min-h-screen px-4 py-24">
        <div className="w-full max-w-lg contact-form-container">
          <div className="w-80 mt-8 mb-8 sm:w-96 md:w-[420px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-lg font-bold mt-4 mb-2 text-[color:var(--color-white)] font-primary">
                How Do I Get Started?
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="text-[color:var(--color-gray-light)] font-primary leading-relaxed">
                Tell us about your website needs using the form below. We'll
                take it from here.
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
            <input
              type="text"
              name="bot-field"
              style={{ display: "none" }}
              className="visually-hidden-bot-field"
            />

            <fieldset tabIndex="-1">
              <legend>Contact Us</legend>
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
                    className={`w-full px-3 py-3 contact-form-field text-[color:var(--color-white)] transition-all duration-300 ${
                      focusedField === "name" ? "focus-bounce" : ""
                    }`}
                    placeholder="Your name"
                  />
                </div>
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
                    placeholder="your@email.com"
                  />
                </div>
              </div>

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
                    placeholder="Your business (optional)"
                  />
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
                    placeholder="Tell us about your project..."
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                className="inline-block garfish-button text-lg transition-all duration-300 transform font-primary"
              >
                Send
              </motion.button>
            </fieldset>
          </motion.form>
        </div>
      </div>

      {/* Legal Links - Bottom Left */}
      <div className="fixed bottom-4 left-8 z-40 flex gap-4 text-xs">
        <motion.button
          onClick={() => setShowModal("privacy")}
          className="text-[var(--color-gray-light)] hover:text-[var(--color-white)] transition-colors duration-200 underline decoration-dotted underline-offset-2 font-primary"
          initial={{ opacity: 0, x: -30, y: 30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        >
          Privacy Policy
        </motion.button>
        <motion.button
          onClick={() => setShowModal("terms")}
          className="text-[var(--color-gray-light)] hover:text-[var(--color-white)] transition-colors duration-200 underline decoration-dotted underline-offset-2 font-primary"
          initial={{ opacity: 0, x: -30, y: 30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
        >
          Terms of Service
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
            className="fixed inset-0 z-[100] flex items-center justify-center contact-modal-backdrop"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setShowModal(null)}
          >
            <motion.div
              className="w-full max-w-4xl mx-4 border border-[color:var(--color-white)]/10 bg-[color:var(--color-black)]/90 backdrop-blur-sm rounded-lg overflow-hidden contact-modal-background"
              initial={{ opacity: 0, scale: 0.8, y: 20, rotate: -1 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20, rotate: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <motion.div
                className="flex items-center justify-between p-6 contact-modal-background-header border-b border-[color:var(--color-white)]/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-[color:var(--color-white)] font-primary">
                  {showModal === "privacy"
                    ? "Privacy Policy"
                    : "Terms of Service"}
                </h2>
                <motion.button
                  onClick={() => setShowModal(null)}
                  className="text-[color:var(--color-white)]/60 hover:text-[color:var(--color-white)] transition-colors p-2"
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
                className="p-6 max-h-[60vh] overflow-y-auto text-[color:var(--color-gray-light)] leading-relaxed font-primary modal-scrollbar-hide"
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
                        <h3 className="text-lg font-semibold text-[color:var(--color-white)]">
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
                        <h3 className="text-lg font-semibold text-[color:var(--color-white)]">
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
                className="p-6 border-t border-[color:var(--color-white)]/10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <p className="text-[color:var(--color-gray-faint)] text-sm font-primary">
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
              className="w-full max-w-md mx-4 bg-[color:var(--color-black)]/90 backdrop-blur-sm border border-[color:var(--color-white)]/10 rounded-lg overflow-hidden contact-success-modal-background"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="p-8 text-center">
                <div className="text-6xl mb-6 text-[color:var(--color-green-light)]">
                  ✓
                </div>
                <h2 className="text-2xl font-bold mb-4 text-[color:var(--color-white)] font-primary">
                  Message Sent
                </h2>
                <p className="text-[color:var(--color-gray-dark)] mb-6 font-primary">
                  We'll get back to you within 24 hours.
                </p>
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
              className="w-full max-w-md mx-4 bg-[color:var(--color-black)]/90 backdrop-blur-sm border border-[color:var(--color-white)]/10 rounded-lg overflow-hidden contact-success-modal-background"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end p-6 ">
                <motion.button
                  onClick={handleErrorModalClose}
                  className="text-[color:var(--color-white)]/70 hover:text-[color:var(--color-white)] transition-colors p-2"
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
                <div className="text-6xl mb-6 text-center">
                  ⚠️
                </div>
                <p className="text-[color:var(--color-white)]/70 mb-6 font-primary text-center">
                  There was an error sending your message.<br/>Please try again.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={handleErrorModalClose}
                    className="garfish-button font-primary"
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
