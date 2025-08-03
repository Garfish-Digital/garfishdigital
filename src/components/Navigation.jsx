"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getSortedNavigationItems,
  getIconEnabledState,
  getActiveNavigationItem,
} from "../config/navigation";

const NavigationIconComponent = ({
  item,
  isActive,
  isEnabled,
  delay,
  onClick,
}) => {
  // Color mapping based on current design
  const getIconClasses = () => {
    const baseClasses =
      "drop-shadow-lg nav-icon-offset w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 transition-all duration-300";

    if (!isEnabled) {
      return `${baseClasses} text-[color:var(--color-gray-light)] cursor-not-allowed`;
    }

    if (isActive) {
      return `${baseClasses} text-[color:var(--color-black)]`;
    }

    return `${baseClasses} text-[color:var(--color-gray-light)] hover:text-[color:var(--color-gray-dark)]`;
  };

  const motionProps = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut", delay },
    whileTap: !isActive && isEnabled ? { scale: 0.95 } : {},
  };

  const iconElement = (
    <FontAwesomeIcon icon={item.icon} className={getIconClasses()} />
  );

  // Handle click events
  const handleClick = () => {
    if (!isEnabled) return;
    if (onClick) {
      onClick();
    }
  };

  // Always use consistent motion wrapper for unified animation behavior
  if (item.href && !onClick) {
    return (
      <motion.div {...motionProps}>
        <Link href={item.href} className="" title={item.title}>
          {iconElement}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div {...motionProps}>
      <button
        onClick={handleClick}
        disabled={!isEnabled}
        className=""
        title={item.title}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: isEnabled ? "pointer" : "not-allowed",
        }}
      >
        {iconElement}
      </button>
    </motion.div>
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
  const activeItemId = getActiveNavigationItem(actualCurrentPage);
  const sortedItems = getSortedNavigationItems();

  return (
    <div className={`bottom-nav-container ${className}`}>
      {sortedItems
        .filter((item) =>
          getIconEnabledState(
            item,
            actualCurrentPage,
            galleryCurrentPage,
            isClientAuthenticated
          )
        )
        .map((item, index) => {
          const isActive = item.id === activeItemId;
          const delay = index * 0.1; // Staggered animation delay

          return (
            <NavigationIconComponent
              key={item.id}
              item={item}
              isActive={isActive}
              isEnabled={true}
              delay={delay}
            />
          );
        })}
    </div>
  );
};

export default Navigation;
