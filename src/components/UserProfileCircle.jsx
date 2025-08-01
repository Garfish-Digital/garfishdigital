"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UserProfileCircle({ isLoggedIn, clientName, clientProject, onSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Debug logging
  console.log('UserProfileCircle render:', { isLoggedIn, clientName });

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Don't render if not logged in
  if (!isLoggedIn || !clientName) {
    return null;
  }

  // Get first letter of client name
  const firstLetter = clientName.charAt(0).toUpperCase() || 'U';

  const handleSignOut = () => {
    onSignOut();
    setIsMenuOpen(false);
    window.location.href = '/';
  };

  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log('Edit profile clicked');
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed top-8 right-8 z-50" ref={menuRef}>
      {/* Profile Circle */}
      <motion.button
        className="w-8 h-8 rounded-full bg-[var(--color-green-light)] hover:bg-[var(--green-dark)] active:bg-[var(--green-dark)] flex items-center justify-center transition-colors duration-200"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-[var(--color-white)] font-arial text-xl">
          {firstLetter}
        </span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[120px]"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <p
              onClick={handleEdit}
              className="w-full px-4 py-2 text-left text-sm text-[var(--color-green-dark)] transition-colors font-arial font-bold"
            >
              {clientProject}
            </p>
            <hr className="text-[var(--color-gray-faint)]"></hr>
            <button
              onClick={handleEdit}
              className="w-full px-4 py-2 text-left text-sm text-[var(--color-gray-light)] hover:text-[var(--color-green-light)] transition-colors font-arial font-bold"
            >
              Edit
            </button>
            <hr className="text-[var(--color-gray-faint)]"></hr>
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 text-left text-sm text-[var(--color-gray-light)] hover:text-[var(--color-green-light)] transition-colors font-arial font-bold"
            >
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}