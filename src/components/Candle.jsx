import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Candle = forwardRef(({ lit, color = 'bg-blue-400', height = 'h-32', disabled = false }, ref) => {
  return (
    <div className="relative flex flex-col items-center justify-end" ref={ref}>
      {/* Flame */}
      <div className={`absolute -top-6 w-4 h-6 transition-opacity duration-1000 ${lit ? 'opacity-100' : 'opacity-0'}`}>
        {lit && (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-flame-outer rounded-full blur-[2px] animate-pulse" />
            <div className="absolute inset-1 bg-flame-middle rounded-full blur-[1px] animate-bounce" />
            <div className="absolute inset-2 bg-flame-inner rounded-full blur-[1px]" />
          </div>
        )}
      </div>

      {/* Wick */}
      <div className="w-1 h-2 bg-gray-800 mb-0" />

      {/* Candle Body */}
      <div
        className={`w-6 ${height} ${disabled ? 'bg-gray-600 opacity-50' : color} rounded-sm shadow-lg relative overflow-hidden`}
      >
        {/* Wax texture/gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      </div>
    </div>
  );
});

Candle.displayName = 'Candle';

export default Candle;
