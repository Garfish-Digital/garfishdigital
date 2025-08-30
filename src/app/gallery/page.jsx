"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Minimap from "../../components/Minimap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faWindow,
  faFlaskGear,
} from "@fortawesome/pro-regular-svg-icons";
import Navigation from "../../components/Navigation";
import Logo from "../../components/Logo";
import { useClientAuth } from "../../contexts/ClientAuthContext";
import "./gallery.css";

const pages = [
  {
    id: "cell1",
    title: "Portfolio",
    gridColumn: "1/2",
    gridRow: "1/2",
  },
  {
    id: "cell2",
    title: "Experiments",
    gridColumn: "2/3",
    gridRow: "1/2",
  },
  {
    id: "cell3",
    title: "Interactive Demos",
    gridColumn: "3/4",
    gridRow: "1/2",
  },
  {
    id: "cell4",
    title: "Client Work",
    gridColumn: "1/2",
    gridRow: "2/3",
  },
  {
    id: "cell5",
    title: "Home",
    gridColumn: "2/3",
    gridRow: "2/3",
  },
  {
    id: "cell6",
    title: "Tools",
    gridColumn: "3/4",
    gridRow: "2/3",
  },
  {
    id: "cell7",
    title: "About",
    gridColumn: "1/2",
    gridRow: "3/4",
  },
  {
    id: "cell8",
    title: "Contact",
    gridColumn: "2/3",
    gridRow: "3/4",
  },
  {
    id: "cell9",
    title: "Blog",
    gridColumn: "3/4",
    gridRow: "3/4",
  },
];

const demoCards = {
  cell1: {
    title: "Black Lodge Brews",
    subtitle: "Micro Brewery Taproom",
    url: "https://black-lodge-brews.netlify.app",
    effects:
      "A demonstration on particle animation, floating navs, and liquid transitions.",
    hoverColors: {
      border: "hover:border-green-500/50",
      shadow: "hover:shadow-green-500/20",
      gradient: "from-[var(--color-black)] to-[#FFA000]/90 via-[#1B3A1B]/60",
      text: "text-[#FFD54F]",
    },
  },
  cell2: {
    title: "Obsidian Peaks",
    subtitle: "Snowboarding Lessons & Tours",
    url: "https://obsidian-peaks.netlify.app",
    effects:
      "A demonstration on glassmorphism, CSS filters, and lively zoom animation.",
    hoverColors: {
      border: "hover:border-[#87CEEB]/50",
      shadow: "hover:shadow-[#87CEEB]",
      gradient: "from-[var(--color-black)] to-[#93c5fd]/90 via-[#3b82f6]/60",
      text: "text-[#87CEEB]",
    },
  },

  cell3: {
    title: "Inferno Ink",
    subtitle: "Tattoo & Body Modification Shop",
    url: "https://inferno-ink.netlify.app",
    effects:
      "A demonstration on scroll animations, cursor visuals, and fiery gradient effects.",
    hoverColors: {
      border: "hover:border-[#FF8C42]/50",
      shadow: "hover:shadow-[#FF8C42]",
      gradient: "from-[var(--color-black)] to-[#FFD23F]/90 via-[#CC0000]/60",
      text: "text-[#FF8C42]",
    },
  },
  cell4: {
    title: "Cryptic Elixir",
    subtitle: "Rare & Ancient Occult Literature",
    url: "https://cryptic-elixir.netlify.app",
    effects:
      "A demonstration on skeleton screens, layered textures, and vapor effects.",
    hoverColors: {
      border: "hover:border-[#D4A574]/50",
      shadow: "hover:shadow-[#D4A574]",
      gradient: "from-[var(--color-black)] to-[#B8B8B8]/90 via-[#D4A574]/60",
      text: "text-[#D4A574]",
    },
  },
  cell6: {
    title: "Hearth & Harrow",
    subtitle: "Divination Tools & Supplies",
    url: "https://hearth-and-harrow.netlify.app",
    effects:
      "A demonstration on Bento boxes, flowing animation, and playful visuals.",
    hoverColors: {
      border: "hover:border-[#A855F7]/50",
      shadow: "hover:shadow-[#A855F7]",
      gradient: "from-[var(--color-black)] to-[#22C55E]/90 via-[#A855F7]/60",
      text: "text-[#A855F7]",
    },
  },
  cell7: {
    title: "Via Mortis",
    subtitle: "Morbid Tours & Haunted Attractions",
    url: "https://via-mortis.netlify.app",
    effects: "A demonstration on glitches, displacement, and broken grid.",
    hoverColors: {
      border: "hover:border-[#bbff00]/50",
      shadow: "hover:shadow-[#bbff00]",
      gradient: "from-[var(--color-black)] to-[#e90000]/90 via-[#4b4b01]/60",
      text: "text-[#bbff00]",
    },
  },
  cell8: {
    title: "Velvet Quill",
    subtitle: "Romance & Erotica Literary Collective",
    url: "https://velvet-quill.netlify.app",
    effects:
      "A demonstration on layered textures, subtle animation, and interactive reveals.",
    hoverColors: {
      border: "hover:border-[#D4A5A5]/50",
      shadow: "hover:shadow-[#D4A5A5]",
      gradient: "from-[var(--color-black)] to-[#8B0000]/90 via-[#4A0E4E]/60",
      text: "text-[#D4A5A5]",
    },
  },
  cell9: {
    title: "The Scrap Pit",
    subtitle: "MMA Gym & Fighter Training Program",
    url: "https://the-scrap-pit.netlify.app",
    effects:
      "A demonstration on brutalist aesthetics and CSS color manipulation.",
    hoverColors: {
      border: "hover:border-[#CC9900]/50",
      shadow: "hover:shadow-[#CC9900]",
      gradient: "from-[var(--color-black)] to-[#F8F8FF]/90 via-[#E00000]/60",
      text: "text-[#CC9900]",
    },
  },
};

export default function Gallery() {
  const { isClientAuthenticated } = useClientAuth();
  const [currentPage, setCurrentPage] = useState("cell5");
  const [showTechCard, setShowTechCard] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [minimapTopPosition, setMinimapTopPosition] = useState(0);

  // Detect mobile/small screen devices
  useEffect(() => {
    const checkDevice = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileDevice(isMobile);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Viewport height measurement and positioning calculations
  useEffect(() => {
    const updateViewportHeight = () => {
      const height = window.innerHeight;
      setViewportHeight(height);

      // Calculate positioning values
      const headerHeight = 100;
      const availableSpace = height - headerHeight;

      // Simple top-based positioning
      const demoCardTop = headerHeight + 0.3 * availableSpace;
      const calculatedMinimapTop = headerHeight + 0.55 * availableSpace;
      setMinimapTopPosition(calculatedMinimapTop);
      // Set CSS custom properties
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

    // Just update state - CSS transform will handle the animation
    setCurrentPage(pageId);
  };

  // Navigation helper functions
  const getGridPosition = (cellId) => {
    const cellMap = {
      cell1: { row: 0, col: 0 },
      cell2: { row: 0, col: 1 },
      cell3: { row: 0, col: 2 },
      cell4: { row: 1, col: 0 },
      cell5: { row: 1, col: 1 },
      cell6: { row: 1, col: 2 },
      cell7: { row: 2, col: 0 },
      cell8: { row: 2, col: 1 },
      cell9: { row: 2, col: 2 },
    };
    return cellMap[cellId];
  };

  const getCellFromPosition = (row, col) => {
    if (row < 0 || row > 2 || col < 0 || col > 2) return null;
    const positionMap = {
      "0,0": "cell1",
      "0,1": "cell2",
      "0,2": "cell3",
      "1,0": "cell4",
      "1,1": "cell5",
      "1,2": "cell6",
      "2,0": "cell7",
      "2,1": "cell8",
      "2,2": "cell9",
    };
    return positionMap[`${row},${col}`];
  };

  const navigateByDirection = (direction) => {
    const currentPos = getGridPosition(currentPage);
    if (!currentPos) return;

    let newRow = currentPos.row;
    let newCol = currentPos.col;

    switch (direction) {
      case "up":
        newRow = Math.max(0, currentPos.row - 1);
        break;
      case "down":
        newRow = Math.min(2, currentPos.row + 1);
        break;
      case "left":
        newCol = Math.max(0, currentPos.col - 1);
        break;
      case "right":
        newCol = Math.min(2, currentPos.col + 1);
        break;
    }

    const newCell = getCellFromPosition(newRow, newCol);
    if (newCell && newCell !== currentPage) {
      scrollToPage(newCell);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Close tech card modal with ESC
      if (e.key === "Escape" && showTechCard) {
        setShowTechCard(false);
        return;
      }

      const keyMap = {
        1: "cell1",
        2: "cell2",
        3: "cell3",
        4: "cell4",
        5: "cell5",
        6: "cell6",
        7: "cell7",
        8: "cell8",
        9: "cell9",
      };

      // Arrow key navigation
      const arrowMap = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      };

      if (keyMap[e.key]) {
        scrollToPage(keyMap[e.key]);
      } else if (arrowMap[e.key]) {
        e.preventDefault();
        navigateByDirection(arrowMap[e.key]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showTechCard]);

  // Tech card data for each cell
  const getTechCardData = (cellId) => {
    const techData = {
      cell1: {
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
      cell2: {
        title: "Obsidian Peaks",
        items: [
          "Mountain and snow-inspired palette",
          "Glassmorphic cards and navigation",
          "Scroll-triggered card animations",
          "Lively zoom animation",
          "Hover shimmers on navigation",
          "Floating cursor orb",
          "Background image CSS filtration",
          "Text shadow embossment effects",
        ],
      },
      cell3: {
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
      cell4: {
        title: "Cryptic Elixir",
        items: [
          "Antique library-themed palette",
          "WebGL vapor mist",
          "Skeleton load screen",
          "Libary cards with stacked animations",
          "Interactive item filtering",
          "Shopping satchel functionality",
          "Unfurled scroll and typed text form animation",
          "Mystic form cursor and wax imprint submit",
        ],
      },
      cell6: {
        title: "Hearth & Harrow",
        items: [
          "Crayola-inspired color palette",
          "Scroll animations with staggered effects",
          "Element motion animations",
          "Advanced Bento Box CSS architecture",
          "Modern breadcrumb navigation",
          "Interactive UX with sparkles and gradient borders",
          "Category filtration",
          "Shopping cart functionality",
        ],
      },
      cell7: {
        title: "Via Mortis",
        items: [
          "Horror themed palette for maximum atmospheric impact",
          "Broken monitor load screen and CT-animated scan lines",
          "SVG displacement mapping",
          "Sophisticated random ambient glitch system",
          "Color channel separation glitch transitions",
          "Screech glitches and broken card hover effects",
          "Dripping blood stream effects and blood-filled cards on hover",
          "Full destruction animation on user interaction",
        ],
      },
      cell8: {
        title: "Velvet Quill",
        items: [
          "Sensual velvet and ink theme with neotenic styling",
          "Ink bleed transitions",
          "Secret content reveals",
          "Typewriter text animation",
          "Interactive author cards",
          "Candlelight hover effects",
          "Paper texture overlay effects",
          "Scroll-triggered animations",
        ],
      },
      cell9: {
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
    // Only show tech card if not on center cell
    if (currentPage !== "cell5") {
      setShowTechCard(true);
    }
  };

  const handleTechCardClose = () => {
    setShowTechCard(false);
  };

  const renderDemoCard = (cardData) => {
    console.log("isMobileDevice:", isMobileDevice);
    // Force hover state classes on mobile devices
    const mobileHoverClasses = isMobileDevice ? "mobile-force-hover" : "";
    // const borderClass = isMobileDevice ?
    //   cardData.hoverColors.border.replace('hover:', '') :
    //   cardData.hoverColors.border;

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
            boxShadow: "0px 20px 25px var(--color-gray-shadow)",
            transition: { duration: 0.2, ease: "easeOut" },
          }}
        >
          {/* Glow effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${cardData.hoverColors.gradient} rounded-lg opacity-100 group-hover:opacity-100 transition-opacity duration-300`}
          />

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-white)] leading-tight font-primary">
                {cardData.title}
              </h3>

              <div className="flex justify-end">
                <FontAwesomeIcon
                  icon={faFlaskGear}
                  onClick={handleTechCardOpen}
                  className="!w-8 !h-8 ml-2 cursor-pointer text-[var(--color-gray-light)] hover:text-[var(--color-white)] transition-colors duration-200"
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
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className="w-6 h-6 ml-2 group-hover/link:text-[var(--color-white)]"
                />
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1, 1.3, 1],
                  //   color: [ 'var(--color-white)', 'var(--color-gray-light)', 'var(--color-white)', 'var(--color-white)']
                }}
                style={{ color: "var(--color-white)" }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  times: [0, 0.05, 0.15, 1],
                  ease: "easeOut",
                }}
              >
                <FontAwesomeIcon
                  icon={faWindow}
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
    // Special content for cell5 (Home/Center cell)
    if (pageId === "cell5") {
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
                Use the minimap below to visit live demo sites to view detailed
                examples of our work.
              </p>
            </motion.div>
          </div>
        </div>
      );
    }

    // Regular demo cards for all other cells
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
        // onFlaskGearClick={handleTechCardOpen}
        isClientAuthenticated={isClientAuthenticated}
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
        pages={pages}
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
                  {getTechCardData(currentPage)?.title || "Techniques Involved"}
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
