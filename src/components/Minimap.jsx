'use client';

import { motion } from 'framer-motion';

// interface Page {
//   id: string;
//   title: string;
//   gridColumn: string;
//   gridRow: string;
//   color: string;
// }

// interface MinimapProps {
//   currentPage: string;
//   onPageClick: (pageId: string) => void;
//   pages: Page[];
// }

export default function Minimap({ currentPage, onPageClick, pages }) {

  // Fixed positioning logic - minimap always in upper right corner
  const getMinimapPosition = () => {
    // Always position in upper right corner regardless of current page
    // return { top: 'calc(2rem + 72px)', right: '2rem' };
    return currentPage === 'cell5' ? { top: 'calc(50vh - 75px)', right: 'calc(50vw - 75px)' } : { top: 'calc(2rem + 72px)', right: '2rem' };
  };

  // Map page IDs to their 3x3 grid positions
  const getGridPosition = (pageId) => {
    const positions = {
      'cell1': { row: 1, col: 1 },
      'cell2': { row: 1, col: 2 },
      'cell3': { row: 1, col: 3 },
      'cell4': { row: 2, col: 1 },
      'cell5': { row: 2, col: 2 }, // Home in center
      'cell6': { row: 2, col: 3 },
      'cell7': { row: 3, col: 1 },
      'cell8': { row: 3, col: 2 },
      'cell9': { row: 3, col: 3 },
    };
    return positions[pageId] || { row: 2, col: 2 };
  };

  const position = getMinimapPosition();

  return (
    <motion.div
      className="fixed z-50 pointer-events-auto"
      style={position}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      layout
    >
      {/* 3x3 Grid Container */}
      <div 
        className="relative p-2 rounded-lg backdrop-blur-sm"
        style={{
          width: '150px',
          height: '150px',
          backgroundColor: '#ffffff',
        //   border: '1px solid rgba(170, 170, 170, 0.25)',
        }}
      >
        
        {/* 3x3 Grid */}
        <div 
          className="grid gap-1 h-full relative z-10"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)',
          }}
        >
          {Array.from({ length: 9 }).map((_, index) => {
            const row = Math.floor(index / 3) + 1;
            const col = (index % 3) + 1;
            
            // Find page that matches this grid position
            const page = pages.find(p => {
              const pos = getGridPosition(p.id);
              return pos.row === row && pos.col === col;
            });
            
            const isActive = page && currentPage === page.id;
            
            return (
              <motion.button
                key={`${row}-${col}`}
                className={`
                  relative cursor-pointer rounded-sm
                  flex items-center justify-center transition-all duration-50
                  ${isActive ? '' : ''}
                `}
                style={{
                    border : '1px solid rgba(170, 170, 170, 0.5)',
                  backgroundColor: isActive 
                    ? 'rgba(170, 170, 170, 1)'
                    : 'rgba(255, 255, 255, 1)',
                }}
                onClick={() => page && onPageClick(page.id)}
                disabled={!page}
                whileHover={page && !isActive ? { 
                  backgroundColor: 'rgba(170, 170, 170, 0.3)',
                } : {}}
                whileTap={page ? { scale: 0.9 } : {}}
              >
                {/* No text content - just empty buttons */}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}