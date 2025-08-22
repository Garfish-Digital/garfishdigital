"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import {
  getSortedNavigationItems,
  getIconEnabledState,
  getActiveNavigationItem,
} from "../config/navigation";

// Shared function for generating link classes
function getLinkClasses(isActive) {
  return `
      ${isActive ? 'hover:text-[color:var(--color-cyan-light)]' : 'hover:text-[color:var(--color-gray-light)]'} 
      active:text-[color:var(--color-green-light)]
      transition-all duration-300 
      font-primary font-normal text-lg
      ${isActive ? 'text-[color:var(--color-cyan-light)]' : 'text-[color:var(--color-gray-faint)]'}
  `;
}

const DesktopNavigation = ({
  currentPage,
  galleryCurrentPage,
  isClientAuthenticated,
  className,
}) => {
  const activeItemId = getActiveNavigationItem(currentPage);
  const sortedItems = getSortedNavigationItems();

  return (
    <div className={`hidden lg:flex gap-6 ${className}`}>
      {sortedItems
        .filter((item) =>
          getIconEnabledState(
            item,
            currentPage,
            galleryCurrentPage,
            isClientAuthenticated
          )
        )
        .map((item, index) => {
          const isActive = item.id === activeItemId;
          const delay = index * 0.1;

          const linkClasses = getLinkClasses(isActive);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay }}
            >
              {item.href ? (
                <Link href={item.href} className={linkClasses} title={item.title}>
                  {item.label}
                </Link>
              ) : (
                <span className={linkClasses} title={item.title}>
                  {item.label}
                </span>
              )}
            </motion.div>
          );
        })}
    </div>
  );
};

const MobileNavigation = ({
  currentPage,
  galleryCurrentPage,
  isClientAuthenticated,
  className,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const activeItemId = getActiveNavigationItem(currentPage);
  const sortedItems = getSortedNavigationItems();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu on ESC key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, []);

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={`lg:hidden ${className}`} ref={menuRef}>
      {/* Animated Hamburger Button */}
      <motion.button
        className="relative w-8 h-8 focus:outline-none group"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          {/* Top line */}
          <motion.div
            className="w-8 h-1 mb-1 bg-[color:var(--color-gray-faint)] group-hover:bg-[color:var(--color-cyan-light)] transition-colors duration-200 rounded-full"
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 2 : -2,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          {/* Middle line */}
          <motion.div
            className="w-8 h-1 mb-1 bg-[color:var(--color-gray-faint)] group-hover:bg-[color:var(--color-cyan-light)] transition-colors duration-200 rounded-full"
            animate={{
              opacity: isMenuOpen ? 0 : 1,
              scale: isMenuOpen ? 0 : 1,
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
          {/* Bottom line */}
          <motion.div
            className="w-8 h-1 mb-1 bg-[color:var(--color-gray-faint)] group-hover:bg-[color:var(--color-cyan-light)] transition-colors duration-200 rounded-full"
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              y: isMenuOpen ? -2 : 2,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Connecting line for visual continuity */}
            <motion.div
              className="absolute top-8 right-4 w-0.5 h-4 bg-[color:var(--color-black)]"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 0.6, height: 16 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
            <motion.div
              className="absolute top-12 right-0 bg-[var(--color-black)] rounded-lg shadow-lg border border-[var(--color-cyan-dark)] py-2 min-w-[120px] z-50"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.16, 1, 0.3, 1],
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
            {sortedItems
              .filter((item) =>
                getIconEnabledState(
                  item,
                  currentPage,
                  galleryCurrentPage,
                  isClientAuthenticated
                )
              )
              .map((item, index) => {
                const isActive = item.id === activeItemId;

                const linkClasses = getLinkClasses(isActive);

                return (
                  <div key={item.id} className="ps-2">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={linkClasses}
                        onClick={handleMenuItemClick}
                        title={item.title}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        className={linkClasses}
                        onClick={handleMenuItemClick}
                        title={item.title}
                      >
                        {item.label}
                      </button>
                    )}
                    {index < sortedItems.filter((item) =>
                      getIconEnabledState(
                        item,
                        currentPage,
                        galleryCurrentPage,
                        isClientAuthenticated
                      )
                    ).length - 1 && (
                      <hr className="border-[color:var(--color-gray-shadow)]" />
                    )}
                  </div>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navigation = ({
  currentPage = "home",
  galleryCurrentPage,
  isClientAuthenticated = false,
  className = "",
}) => {
  const pathname = usePathname();

  // Auto-detect current page from pathname if not provided
  const detectedPage = () => {
    if (pathname === "/") return "home";
    if (pathname === "/gallery") return "gallery";
    if (pathname === "/contact") return "contact";
    if (pathname === "/client") return "client";
    if (pathname === "/client/project") return "project";
    if (pathname === "/client/documents") return "documents";
    if (pathname === "/client/payment") return "payment";
    return currentPage;
  };

  const actualCurrentPage = currentPage || detectedPage();

  return (
    <div className={`fixed top-8 right-8 z-50 ${className}`}>
      <DesktopNavigation
        currentPage={actualCurrentPage}
        galleryCurrentPage={galleryCurrentPage}
        isClientAuthenticated={isClientAuthenticated}
      />
      <MobileNavigation
        currentPage={actualCurrentPage}
        galleryCurrentPage={galleryCurrentPage}
        isClientAuthenticated={isClientAuthenticated}
      />
    </div>
  );
};

export default Navigation;