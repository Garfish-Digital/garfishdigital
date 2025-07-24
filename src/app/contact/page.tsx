"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { useClientAuth } from "@/hooks/useClientAuth";
import "./contact.css";

export default function Contact() {
    const { isClientAuthenticated } = useClientAuth();
    const [fieldValues, setFieldValues] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [validation, setValidation] = useState<Record<string, string>>({});
    const [placeholders, setPlaceholders] = useState({
        name: "Your name",
        email: "your@email.com",
        company: "Your company (optional)",
        message: "Tell us about your project...",
    });
    const [showModal, setShowModal] = useState<"privacy" | "terms" | null>(null);

    // Separate cycling for each field with staggered timing
    useEffect(() => {
        const placeholderOptions = {
            name: [
                "What&apos;s your name",
                "A nickname?",
                "Who are you?",
            ],
            email: [
                "your@email.com",
                "Where do you get messages?",
                "How do we reach you?",
            ],
            company: [
                "Your company (optional)",
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
        let companyIndex = 0;
        let messageIndex = 0;

        const nameInterval = setInterval(() => {
            nameIndex = (nameIndex + 1) % placeholderOptions.name.length;
            setPlaceholders((prev) => ({
                ...prev,
                name: placeholderOptions.name[nameIndex],
            }));
        }, 12600);

        const emailInterval = setInterval(() => {
            emailIndex = (emailIndex + 1) % placeholderOptions.email.length;
            setPlaceholders((prev) => ({
                ...prev,
                email: placeholderOptions.email[emailIndex],
            }));
        }, 18000);

        const companyInterval = setInterval(() => {
            companyIndex = (companyIndex + 1) % placeholderOptions.company.length;
            setPlaceholders((prev) => ({
                ...prev,
                company: placeholderOptions.company[companyIndex],
            }));
        }, 20500);

        const messageInterval = setInterval(() => {
            messageIndex = (messageIndex + 1) % placeholderOptions.message.length;
            setPlaceholders((prev) => ({
                ...prev,
                message: placeholderOptions.message[messageIndex],
            }));
        }, 15000);

        return () => {
            clearInterval(nameInterval);
            clearInterval(emailInterval);
            clearInterval(companyInterval);
            clearInterval(messageInterval);
        };
    }, []);

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setShowModal(null);
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    // Smart validation
    const validateField = (name: string, value: string) => {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(Array.from(formData.entries()) as [string, string][]).toString()
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setIsSubmitted(true); 
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFieldValues((prev) => ({
            ...prev,
            [name]: value,
        }));

        const validationMessage = validateField(name, value);
        setValidation((prev) => ({
            ...prev,
            [name]: validationMessage,
        }));
    };


    if (isSubmitted) {
        return (
            <div className="min-h-screen text-white flex items-center justify-center contact-success-background">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-6xl mb-8">✓</div>
                    <h1 className="text-3xl font-bold mb-4 font-primary">Message Sent</h1>
                    <p className="text-white/70 mb-8 font-primary">
                        We&apos;ll get back to you within 24 hours.
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-primary"
                    >
                        ← Back to Home
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-black" style={{ backgroundColor: 'white' }}>
            {/* Static Logo - Upper Left */}
            <motion.div
                className="fixed top-8 left-8 z-20"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="text-black font-mono text-3xl font-bold text-left">
                    Garfish Digital
                </div>
            </motion.div>

            <div className="flex items-start justify-center min-h-screen px-4 pt-24">
                <div className="w-full max-w-lg" style={{ backgroundColor: 'rgba(0,0,0,0.05)', padding: '2rem', borderRadius: '8px' }}>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        name="contact"
                        method="POST"
                        data-netlify="true"
                    >
                        <input type="hidden" name="form-name" value="contact" />
                        <p hidden>
                            <label>Don&apos;t fill this out: <input name="bot-field" /></label>
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    defaultValue=""
                                    onChange={handleChange}
                                    className="w-full px-3 py-3 border border-gray-300 rounded-md bg-white text-black"
                                    placeholder=" "
                                />
                                {!fieldValues.name && (
                                    <div className="absolute left-3 top-3 pointer-events-none">
                                        <span className="text-gray-400 font-mono">
                                            {placeholders.name}
                                        </span>
                                    </div>
                                )}
                                {validation.name && (
                                    <div className="text-xs mt-1 text-gray-600">
                                        {validation.name}
                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    defaultValue=""
                                    onChange={handleChange}
                                    className="w-full px-3 py-3 border border-gray-300 rounded-md bg-white text-black"
                                    placeholder=" "
                                />
                                {!fieldValues.email && (
                                    <div className="absolute left-3 top-3 pointer-events-none">
                                        <span className="text-gray-400 font-mono">
                                            {placeholders.email}
                                        </span>
                                    </div>
                                )}
                                {validation.email && (
                                    <div className="text-xs mt-1 text-gray-600">
                                        {validation.email}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                id="company"
                                name="company"
                                defaultValue=""
                                onChange={handleChange}
                                className="w-full px-3 py-3 border border-gray-300 rounded-md bg-white text-black"
                                placeholder=" "
                            />
                            {!fieldValues.company && (
                                <div className="absolute left-3 top-3 pointer-events-none">
                                    <span className="text-gray-400 font-mono">
                                        {placeholders.company}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={4}
                                defaultValue=""
                                onChange={handleChange}
                                className="w-full px-3 py-3 border border-gray-300 rounded-md bg-white text-black resize-none"
                                placeholder=" "
                            />
                            {!fieldValues.message && (
                                <div className="absolute left-3 top-3 pointer-events-none">
                                    <span className="text-gray-400 font-mono">
                                        {placeholders.message}
                                    </span>
                                </div>
                            )}
                            {validation.message && (
                                <div className="text-xs mt-1 text-gray-600">
                                    {validation.message}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 px-6 bg-gray-800 hover:bg-gray-900 text-white rounded-md transition-colors duration-300"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                                    Sending Message...
                                </div>
                            ) : (
                                "Send Message"
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Legal Links - Bottom Left */}
            <div className="fixed bottom-4 left-8 z-40 flex gap-4 text-xs">
                <button
                    onClick={() => setShowModal("privacy")}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200 underline"
                >
                    Privacy
                </button>
                <button
                    onClick={() => setShowModal("terms")}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200 underline"
                >
                    Terms
                </button>
            </div>

            {/* Navigation Icons - Bottom Right */}
            <Navigation
                currentPage="contact"
                isClientAuthenticated={isClientAuthenticated}
            />

            {/* Privacy/Terms Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowModal(null)}
                    >
                        <motion.div
                            className="w-full max-w-2xl mx-4 bg-white rounded-lg overflow-hidden"
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between p-6 border-b">
                                <h2 className="text-2xl font-bold text-black">
                                    {showModal === "privacy" ? "Privacy Policy" : "Terms of Service"}
                                </h2>
                                <button
                                    onClick={() => setShowModal(null)}
                                    className="text-gray-500 hover:text-gray-700 p-2"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="p-6 max-h-[60vh] overflow-y-auto text-gray-700">
                                <p>Legal content would go here...</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}