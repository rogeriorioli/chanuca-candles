import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Shamash = ({ onDrag, onDragEnd, isLit = true }) => {
  const controls = useAnimation();
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      drag={isLit} // Only draggable if lit? Or always draggable but only lights if lit? User said "so fica acesso" (only stays lit). Usually you can't light candles if Shamash is off. Let's disable drag if not lit too, makes sense.
      dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
      dragElastic={0.1}
      dragMomentum={false}
      whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 50 }}
      onDrag={(event, info) => onDrag && onDrag(info)}
      onDragEnd={(event, info) => {
        controls.start({ x: 0, y: 0 });
        if (onDragEnd) onDragEnd(info);
      }}
      animate={controls}
      className={`relative flex flex-col items-center ${isLit ? 'cursor-grab' : 'cursor-default'} touch-none`}
      style={{ zIndex: 20 }}
    >
      {/* Flame */}
      <div className={`absolute -top-6 w-5 h-7 transition-opacity duration-1000 ${isLit ? 'opacity-100' : 'opacity-0'}`}>
        {isLit && (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-flame-outer rounded-full blur-[2px] animate-pulse" />
            <div className="absolute inset-1 bg-flame-middle rounded-full blur-[1px] animate-bounce" />
            <div className="absolute inset-2 bg-flame-inner rounded-full blur-[1px]" />
          </div>
        )}
      </div>

      {/* Wick */}
      <div className="w-1 h-2 bg-gray-800" />

      {/* Body */}
      <div className="w-8 h-40 bg-gold-500 rounded-sm shadow-xl relative overflow-hidden border-2 border-gold-600">
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
      </div>

      <div className="mt-2 text-xs font-bold text-gold-200 uppercase tracking-wider">Shamash</div>
    </motion.div>
  );
};

export default Shamash;
