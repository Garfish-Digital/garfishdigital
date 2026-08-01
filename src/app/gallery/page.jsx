"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Minimap from "../../components/Minimap";
import Icon from "../../components/Icon";
import Navigation from "../../components/Navigation";
import Logo from "../../components/Logo";
import "./gallery.css";

const pages = [
  { id: "upperLeft",  title: "Black Lodge Brews", gridColumn: "1/2", gridRow: "1/2" },
  { id: "upperRight", title: "Inferno Ink",       gridColumn: "3/4", gridRow: "1/2" },
  { id: "center",     title: "Home",              gridColumn: "2/3", gridRow: "2/3" },
  { id: "lowerLeft",  title: "Veilburner",        gridColumn: "1/2", gridRow: "3/4" },
  { id: "lowerRight", title: "The Scrap Pit",     gridColumn: "3/4", gridRow: "3/4" },
];

const demoCards = {
  upperLeft: {
    title: "Black Lodge Brews",
    subtitle: "Micro Brewery Taproom",
    url: "https://black-lodge-brews.netlify.app",
    effects:
      "Mist drifts, glasses fill, the pour never stops. The taproom after dark.",
    hoverColors: {
      border: "hover:border-green-500/50",
      shadow: "hover:shadow-green-500/20",
      gradient: "from-[var(--color-black)] to-[#FFA000]/90 via-[#1B3A1B]/60",
      text: "text-[#FFD54F]",
    },
  },
  upperRight: {
    title: "Inferno Ink",
    subtitle: "Tattoo & Body Modification Shop",
    url: "https://inferno-ink.netlify.app",
    effects:
      "The cursor trails fire and every click throws sparks. It burns.",
    hoverColors: {
      border: "hover:border-[#FF8C42]/50",
      shadow: "hover:shadow-[#FF8C42]",
      gradient: "from-[var(--color-black)] to-[#FFD23F]/90 via-[#CC0000]/60",
      text: "text-[#FF8C42]",
    },
  },
  lowerLeft: {
    title: "Veilburner",
    subtitle: "Avant-Garde Metal Band",
    url: "https://veilburner.band",
    effects:
      "Eight albums, a listening room, a press vault. A real band's whole world.",
    hoverColors: {
      border: "hover:border-[#8B0000]/50",
      shadow: "hover:shadow-[#8B0000]",
      gradient: "from-[var(--color-black)] to-[#8B0000]/90 via-[#5a3a2a]/60",
      text: "text-[#8b7355]",
    },
  },
  lowerRight: {
    title: "The Scrap Pit",
    subtitle: "MMA Gym & Fighter Training Program",
    url: "https://the-scrap-pit.netlify.app",
    effects:
      "Big type. Hard hits. Monochrome until it swings to color.",
    hoverColors: {
      border: "hover:border-[#CC9900]/50",
      shadow: "hover:shadow-[#CC9900]",
      gradient: "from-[var(--color-black)] to-[#F8F8FF]/90 via-[#E00000]/60",
      text: "text-[#CC9900]",
    },
  },
};

export default function Gallery() {
  const [currentPage, setCurrentPage] = useState("center");
  const [showTechCard, setShowTechCard] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [minimapTopPosition, setMinimapTopPosition] = useState(0);

  // Detect mobile/small screen devices
  useEffect(() => {
    const checkDevice = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Viewport height measurement and positioning calculations
  useEffect(() => {
    const updateViewportHeight = () => {
      const height = window.innerHeight;
      const headerHeight = 100;
      const availableSpace = height - headerHeight;

      const demoCardTop = headerHeight + 0.3 * availableSpace;
      const calculatedMinimapTop = headerHeight + 0.55 * availableSpace;
      setMinimapTopPosition(calculatedMinimapTop);
      document.documentElement.style.setProperty(
        "--demo-card-top",
        `${demoCardTop}px`
      );
    };

    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);
    return () => window.removeEventListener("resize", updateViewportHeight);
  }, []);

  const scrollToPage = (pageId) => {
    const page = pages.find((p) => p.id === pageId);
    if (!page) return;
    setCurrentPage(pageId);
  };

  // ESC closes the techniques modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showTechCard) {
        setShowTechCard(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showTechCard]);

  const getTechCardData = (cellId) => {
    const techData = {
      upperLeft: {
        title: "Black Lodge Brews",
        items: [
          "Gradient beer and woods-themed palette",
          "Floating navigation with smooth scroll triggers",
          "Particle system for fireflies and beer & foam fizz",
          "Animated beer-fill elements",
          "Scroll-triggered data updates",
          "Liquid card animation",
          "Background image parallax scrolling",
          "Interactive map interface",
        ],
      },
      upperRight: {
        title: "Inferno Ink",
        items: [
          "fire/metal color palette",
          "Random fire particle system",
          "Custom fire trail cursor",
          "Animated ember gradient buttons",
          "Staggered scroll animations",
          "Particle spark explosions on click/tap",
          "Animated flicker hero",
          "Explosive mobile menu trigger",
        ],
      },
      lowerLeft: {
        title: "Veilburner",
        items: [
          "Full-bleed parallax hero with layered gradients",
          "Scroll-triggered image reveals",
          "Data-driven discography with per-album listening pages",
          "Press, review, and interview archive",
          "Streaming-service integration",
          "Installable PWA with web manifest",
          "Editorial monospace typography system",
          "Built for a real band, with their blessing",
        ],
      },
      lowerRight: {
        title: "The Scrap Pit",
        items: [
          "Brutalist aesthetic with big text, big content, big spaces",
          "Chromatic displacement glitches",
          "Duotone/tritone image filter activation on click/tap",
          "Monochrome-to-color scroll reveal",
          "Impact flash button effects",
          "Grit cursor with impact particles",
          "Dynamic cursor hover awareness",
          "Scroll-triggered navigation states",
        ],
      },
    };
    return techData[cellId] || null;
  };

  const handleTechCardOpen = () => {
    if (currentPage !== "center") {
      setShowTechCard(true);
    }
  };

  const handleTechCardClose = () => {
    setShowTechCard(false);
  };

  const renderDemoCard = (cardData) => {
    const mobileHoverClasses = isMobileDevice ? "mobile-force-hover" : "";

    return (
      <div
        className="h-full p-4 sm:p-6 md:p-8 flex flex-col items-center justify-start"
        style={{ marginTop: "var(--demo-card-top, 264px)" }}
      >
        <motion.div
          className={`group relative bg-black backdrop-blur-sm rounded-lg border border-white/10 p-4 sm:p-6 md:p-8 transition-colors duration-300 ${cardData.hoverColors.border} ${mobileHoverClasses} w-80 sm:w-96 md:w-[420px]`}
          style={
            isMobileDevice
              ? { boxShadow: "0px 7px 10px var(--color-gray-shadow)" }
              : {}
          }
          whileHover={{
            boxShadow: "0px 7px 15px var(--color-gray-shadow)",
            transition: { duration: 0.2, ease: "easeOut" },
          }}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${cardData.hoverColors.gradient} rounded-lg opacity-100 group-hover:opacity-100 transition-opacity duration-300`}
          />

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-white)] leading-tight font-primary">
                {cardData.title}
              </h3>

              <div className="flex justify-end">
                <Icon
                  name="flask"
                  size={32}
                  onClick={handleTechCardOpen}
                  title="how we built this"
                  className="ml-2 cursor-pointer text-[var(--color-gray-light)] hover:text-[var(--color-white)] transition-colors duration-200"
                />
              </div>
            </div>

            <p
              className={`${cardData.hoverColors.text} font-medium mb-4 sm:mb-6 italic text-base sm:text-lg leading-relaxed font-primary`}
            >
              {cardData.subtitle}
            </p>

            <div className="space-y-2 mb-6 sm:mb-8 flex-1">
              <ul className="text-white/80 text-xs sm:text-sm space-y-1 font-primary">
                {cardData.effects}
              </ul>
            </div>

            <a
              href={cardData.url}
              target={cardData.url.startsWith("http") ? "_blank" : undefined}
              rel={
                cardData.url.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="group/link flex items-center transition-colors duration-200 mt-auto cursor-pointer"
            >
              <span className="text-xs sm:text-sm text-[var(--color-gray-light)] group-hover/link:text-[var(--color-white)] font-medium font-primary">
                {cardData.url.startsWith("http") ? "View Live Demo" : "Explore"}
              </span>
              <motion.div
                animate={{
                  x: [0, 4, 4, 0],
                  color: [
                    "var(--color-gray-light)",
                    "var(--color-white)",
                    "var(--color-white)",
                    "var(--color-gray-light)",
                  ],
                }}
                style={{ color: "var(--color-white)" }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  times: [0, 0.05, 0.1, 1],
                  ease: "easeIn",
                }}
              >
                <Icon
                  name="externalLink"
                  className="w-6 h-6 ml-2 group-hover/link:text-[var(--color-white)]"
                />
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1, 1.3, 1],
                }}
                style={{ color: "var(--color-white)" }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  times: [0, 0.05, 0.15, 1],
                  ease: "easeOut",
                }}
              >
                <Icon
                  name="window"
                  className="w-6 h-6 ml-1 group-hover/link:text-[var(--color-white)]"
                />
              </motion.div>
            </a>
          </div>
        </motion.div>
      </div>
    );
  };

  const getPageContent = (pageId) => {
    if (pageId === "center") {
      return (
        <div className="h-full p-4 sm:p-6 md:p-8 flex flex-col items-center justify-start mt-24 gallery-page-content">
          <div className="w-80 sm:w-96 md:w-[420px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-lg font-bold mt-12 mb-2 text-[color:var(--color-white)] font-primary">
                Explore our Gallery
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="text-[color:var(--color-gray-light)] font-primary leading-relaxed">
                Four live demos.<br/>Let the minimap take you there.
              </p>
            </motion.div>
          </div>
        </div>
      );
    }

    const cardData = demoCards[pageId];
    if (cardData) {
      return renderDemoCard(cardData);
    }
    return null;
  };

  return (
    <>
      {/* Fixed Logo - Always Visible */}
      <Logo />

      {/* Navigation Icons - Bottom Right */}
      <Navigation
        currentPage="gallery"
        galleryCurrentPage={currentPage}
      />

      <div className="w-screen h-screen overflow-hidden gallery-wrapper bg-[color:var(--color-black)]">
        <div
          className={`grid relative gallery-grid gallery-grid-${currentPage}`}
        >
          {pages.map((page) => (
            <div
              key={page.id}
              className={`flex items-center justify-center text-[color:var(--color-white)] gallery-page-item gallery-page-${page.id}`}
            >
              {getPageContent(page.id)}
            </div>
          ))}
        </div>
      </div>

      <Minimap
        currentPage={currentPage}
        onPageClick={scrollToPage}
        minimapTop={minimapTopPosition}
      />

      {/* Hip & Soothing Tech Card Modal */}
      <AnimatePresence>
        {showTechCard && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleTechCardClose}
          >
            <motion.div
              className="w-full max-w-4xl mx-4 bg-[color:var(--color-black)]/90 backdrop-blur-sm border border-[color:var(--color-white)]/20 rounded-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: 20, rotate: -1 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20, rotate: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <motion.div
                className="flex items-center justify-between p-6 border-b border-[color:var(--color-white)]/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-[color:var(--color-white)] font-primary">
                  {`How ${getTechCardData(currentPage)?.title} is built` || "Techniques Involved"}
                </h2>
                <motion.button
                  onClick={handleTechCardClose}
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
                className="p-6 max-h-[60vh] overflow-y-auto text-[color:var(--color-gray-light)] leading-relaxed font-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="space-y-4">
                  <ul className="text-[color:var(--color-gray-light)] space-y-3">
                    {getTechCardData(currentPage)?.items.map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                      >
                        <span className="text-[color:var(--color-white)]/60 mr-3">
                          •
                        </span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Footer */}
              <motion.div
                className="p-6 border-t border-[color:var(--color-white)]/10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <p className="text-[color:var(--color-gray-faint)] text-sm font-primary">
                  Technical details of site features and animations
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
