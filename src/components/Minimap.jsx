'use client';

import { motion } from 'framer-motion';

const cornerButtons = [
  { id: 'upperLeft',  position: { top: 5, left: 5 } },
  { id: 'upperRight', position: { top: 5, right: 5 } },
  { id: 'lowerLeft',  position: { bottom: 5, left: 5 } },
  { id: 'lowerRight', position: { bottom: 5, right: 5 } },
];

export default function Minimap({ currentPage, onPageClick, minimapTop }) {
  const getMinimapPosition = () => {
    switch (currentPage) {
      case 'upperLeft':
      case 'lowerLeft':
        return { top: `${minimapTop}px`, left: 'calc(25vw - 75px)' };
      case 'upperRight':
      case 'lowerRight':
        return { top: `${minimapTop}px`, right: 'calc(25vw - 75px)' };
      default:
        return { top: `${minimapTop}px`, right: 'calc(50vw - 75px)' };
    }
  };

  return (
    <motion.div
      className="fixed z-50 pointer-events-auto"
      style={getMinimapPosition()}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      layout
    >
      <div
        className="relative rounded-lg backdrop-blur-sm"
        style={{
          width: 150,
          height: 150,
          backgroundColor: 'var(--color-gray-dark)',
        //   border: '1px solid var(--color-cyan-dark)',
        }}
      >
        {cornerButtons.map((corner) => {
          const isActive = currentPage === corner.id;
          return (
            <motion.button
              key={corner.id}
              className="absolute cursor-pointer"
              style={{
                ...corner.position,
                width: 67,
                height: 67,
                backgroundColor: isActive ? 'var(--color-white)' : 'var(--color-black)',
              }}
              onClick={() => onPageClick(corner.id)}
              whileHover={!isActive ? { backgroundColor: 'var(--color-cyan-light)' } : {}}
              whileTap={{ scale: 0.95 }}
            />
          );
        })}

        {/* Ring overlay — visual gap between corners and center; absorbs clicks in the gap */}
        <div
          className="absolute"
          style={{
            top: 42,
            left: 42,
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: 'var(--color-gray-dark)',
          }}
          aria-hidden="true"
        />

        {/* Center button */}
        <motion.button
          className="absolute cursor-pointer"
          style={{
            top: 47,
            left: 47,
            width: 54,
            height: 54,
            borderRadius: '50%',
            backgroundColor: currentPage === 'center' ? 'var(--color-white)' : 'var(--color-black)',
          }}
          onClick={() => onPageClick('center')}
          whileHover={currentPage !== 'center' ? { backgroundColor: 'var(--color-cyan-light)' } : {}}
          whileTap={{ scale: 0.95 }}
        />
      </div>
    </motion.div>
  );
}
