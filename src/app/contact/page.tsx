"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { useClientAuth } from "@/hooks/useClientAuth";

export default function Contact() {
    const { isClientAuthenticated } = useClientAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

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
            }
        } catch (error) {
            console.error('Form error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl mb-4">Message Sent ✓</h1>
                    <Link href="/" className="text-blue-600">← Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white p-8">
            <h1 className="text-3xl mb-8">Contact Us</h1>
            
            <form
                onSubmit={handleSubmit}
                className="max-w-md"
                name="contact"
                method="POST"
                data-netlify="true"
            >
                <input type="hidden" name="form-name" value="contact" />
                
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="w-full p-2 mb-4 border"
                />
                
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="w-full p-2 mb-4 border"
                />
                
                <textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    className="w-full p-2 mb-4 border"
                    rows={4}
                />
                
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-black text-white"
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
            </form>
            
            <Navigation
                currentPage="contact"
                isClientAuthenticated={isClientAuthenticated}
            />
        </div>
    );
}