"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
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
      gradient: "from-[#3E2723] to-[#FFA000] via-[#1B3A1B]/60",
      text: "text-[#FFD54F]",
    },
  },
  cell2: {
    title: "Obsidian Peaks",
    subtitle: "Snowboarding Lessons & Tours",
    url: "https://obsidian-peaks.netlify.app",
    effects: "Blurbs goes here.",
    // effects: ['CLI automation', 'Code generation', 'Testing frameworks'],
    hoverColors: {
      border: "hover:border-purple-500/50",
      shadow: "hover:shadow-purple-500/20",
      gradient: "from-purple-500/20 to-purple-500/10",
      text: "text-purple-500",
    },
  },

  cell3: {
    title: "Inferno Ink",
    subtitle: "Hell Hath No Fury",
    url: "https://inferno-ink.netlify.app",
    effects:
      "A demonstration on scroll animations, cursor visuals, and fiery effects.",
    // effects: ['Fire particles', 'Custom cursor', 'Animated scrolling'],
    hoverColors: {
      border: "hover:border-red-500/50",
      shadow: "hover:shadow-red-500/20",
      gradient: "from-[#0A0A0A] to-[#FFD23F] via-[#CC0000]/60",
      text: "text-[#FF8C42]",
    },
  },
  cell4: {
    title: "Cryptic Elixir",
    subtitle: "Rare and Ancient Occult Literature",
    url: "https://cryptic-elixir.netlify.app",
    effects:
      "A demonstration on skeleton screens, layered, textures, and vapor effects.",
    // effects: ['Custom frameworks', 'Enterprise scale', 'Security focused'],
    hoverColors: {
      border: "hover:border-teal-500/50",
      shadow: "hover:shadow-teal-500/20",
      gradient: "from-teal-500/20 to-teal-500/10",
      text: "text-teal-500",
    },
  },
  cell6: {
    title: "Hearth & Harrow",
    subtitle: "Divination Tools & Supplies",
    url: "https://hearth-and-harrow.netlify.app",
    effects:
      "A demonstration on Bento boxes, flowing animation, and noise effects.",
    // effects: ['WebGL shaders', 'AI integration', 'Real-time effects'],
    hoverColors: {
      border: "hover:border-yellow-500/50",
      shadow: "hover:shadow-yellow-500/20",
      gradient: "from-yellow-500/20 to-yellow-500/10",
      text: "text-yellow-500",
    },
  },
  cell7: {
    title: "Via Mortis",
    subtitle: "Digital Craftsmen",
    url: "https://via-mortis.netlify.app",
    effects: "Blurbs goes here.",
    // effects: ['User-centered design', 'Agile methodology', 'Continuous learning'],
    hoverColors: {
      border: "hover:border-orange-500/50",
      shadow: "hover:shadow-orange-500/20",
      gradient: "from-orange-500/20 to-orange-500/10",
      text: "text-orange-500",
    },
  },
  cell8: {
    title: "Velvet Quill",
    subtitle: "Start Your Project",
    url: "https://velvet-quill.netlify.app",
    effects: "Blurbs goes here.",
    // effects: ['Free consultation', 'Project planning', 'Custom solutions'],
    hoverColors: {
      border: "hover:border-slate-500/50",
      shadow: "hover:shadow-slate-500/20",
      gradient: "from-slate-500/20 to-slate-500/10",
      text: "text-slate-500",
    },
  },
  cell9: {
    title: "The Scrap Pit",
    subtitle: "Divination Supplies",
    url: "https://the-scrap-pit.netlify.app",
    effects: "Blurbs goes here.",
    // effects: ['Technical deep-dives', 'Industry trends', 'Best practices'],
    hoverColors: {
      border: "hover:border-gray-500/50",
      shadow: "hover:shadow-gray-500/20",
      gradient: "from-gray-500/20 to-gray-500/10",
      text: "text-gray-500",
    },
  },
};

export default function Gallery() {
  const { isClientAuthenticated } = useClientAuth();
  const [currentPage, setCurrentPage] = useState("cell5");
  const [showTechCard, setShowTechCard] = useState(false);

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
          "Floating navigation with smooth scroll triggers",
          "Gradient colors on backgrounds and hero font",
          "Particle system for fireflies and beer & foam fizz",
          "Animated beer-fill elements",
          "Scroll-triggered data updates",
          "Liquid card animation",
          "Background image parallax scrolling",
          "Interactive map interface",
        ],
      },
      cell2: {
        title: "Experiment Techniques",
        items: [
          "Lorem ipsum dolor",
          "Sit amet consectetur",
          "Adipiscing elit sed",
          "Do eiusmod tempor",
          "Incididunt ut labore",
          "Et dolore magna",
          "Aliqua enim ad",
          "Minim veniam quis",
        ],
      },
      cell3: {
        title: "Interactive Demo Techniques",
        items: [
          "Lorem ipsum dolor",
          "Sit amet consectetur",
          "Adipiscing elit sed",
          "Do eiusmod tempor",
          "Incididunt ut labore",
          "Et dolore magna",
          "Aliqua enim ad",
          "Minim veniam quis",
        ],
      },
      cell4: {
        title: "Client Work Techniques",
        items: [
          "Lorem ipsum dolor",
          "Sit amet consectetur",
          "Adipiscing elit sed",
          "Do eiusmod tempor",
          "Incididunt ut labore",
          "Et dolore magna",
          "Aliqua enim ad",
          "Minim veniam quis",
        ],
      },
      cell6: {
        title: "Tools Techniques",
        items: [
          "Lorem ipsum dolor",
          "Sit amet consectetur",
          "Adipiscing elit sed",
          "Do eiusmod tempor",
          "Incididunt ut labore",
          "Et dolore magna",
          "Aliqua enim ad",
          "Minim veniam quis",
        ],
      },
      cell7: {
        title: "About Techniques",
        items: [
          "Lorem ipsum dolor",
          "Sit amet consectetur",
          "Adipiscing elit sed",
          "Do eiusmod tempor",
          "Incididunt ut labore",
          "Et dolore magna",
          "Aliqua enim ad",
          "Minim veniam quis",
        ],
      },
      cell8: {
        title: "Contact Techniques",
        items: [
          "Lorem ipsum dolor",
          "Sit amet consectetur",
          "Adipiscing elit sed",
          "Do eiusmod tempor",
          "Incididunt ut labore",
          "Et dolore magna",
          "Aliqua enim ad",
          "Minim veniam quis",
        ],
      },
      cell9: {
        title: "Blog Techniques",
        items: [
          "Lorem ipsum dolor",
          "Sit amet consectetur",
          "Adipiscing elit sed",
          "Do eiusmod tempor",
          "Incididunt ut labore",
          "Et dolore magna",
          "Aliqua enim ad",
          "Minim veniam quis",
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

  // 3D Tilt Effect using Framer Motion
  const tiltTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  };

  const renderDemoCard = (cardData) => {
    return (
      <div className="h-full p-4 sm:p-6 md:p-8 flex flex-col items-center justify-start mt-64">
        <motion.div
          className={`group relative bg-black backdrop-blur-sm rounded-lg border border-white/10 p-4 sm:p-6 md:p-8 transition-colors duration-300 ${cardData.hoverColors.border} w-80 sm:w-96 md:w-[420px]`}
          style={{ boxShadow: "0px 10px 12px rgba(0, 0, 0, 0.3)" }}
          whileHover={{
            boxShadow: "0px 20px 25px rgba(0, 0, 0, 0.4)",
            transition: { duration: 0.2, ease: "easeOut" },
          }}
        >
          {/* Glow effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${cardData.hoverColors.gradient} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
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
                  className="w-6 h-6 ml-2 text-[var(--color-gray-light)] hover:text-[var(--color-white)] transform group-hover:translate-x-1 transition-all duration-300"
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
              className="flex items-center group-hover:text-white transition-colors mt-auto cursor-pointer"
            >
              <span className="text-xs sm:text-sm text-[var(--color-white)] font-medium font-primary">
                {cardData.url.startsWith("http") ? "View Live Demo" : "Explore"}
              </span>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="w-6 h-6 ml-2 text-[var(--color-gray-light)] group-hover:text-[var(--color-white)] transform group-hover:translate-x-1 transition-all duration-300"
              />
              <FontAwesomeIcon
                icon={faWindow}
                className="w-6 h-6 ml-1 text-[var(--color-gray-light)] hover:text-[var(--color-white)] transform group-hover:scale-110 transition-all duration-500 ease-out delay-200"
              />
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
              <h2 className="text-lg font-bold mt-12 mb-2 text-[color:var(--color-gray-shadow)] font-primary">
                Explore our Gallery
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="text-[color:var(--color-gray-dark)] font-primary leading-relaxed">
                Visit live demo sites to view detailed examples of our work.
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

      <div className="w-screen h-screen overflow-hidden gallery-wrapper">
        <div
          className={`grid relative gallery-grid gallery-grid-${currentPage}`}
        >
          {pages.map((page) => (
            <div
              key={page.id}
              className={`flex items-center justify-center text-black gallery-page-item gallery-page-${page.id}`}
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
              className="w-full max-w-4xl mx-4 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden"
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
                  {getTechCardData(currentPage)?.title || "Techniques Involved"}
                </h2>
                <motion.button
                  onClick={handleTechCardClose}
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
                <div className="space-y-4">
                  <ul className="text-white space-y-3">
                    {getTechCardData(currentPage)?.items.map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                      >
                        <span className="text-white/60 mr-3">•</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Footer */}
              <motion.div
                className="p-6 border-t border-white/10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <p className="text-white/50 text-sm font-primary">
                  Technical implementation details
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
