import React, { useState, useEffect, useRef } from 'react';
import Candle from './Candle';
import Shamash from './Shamash';
import PrayerModal from './PrayerModal';
import { getChanukahDay, getDaysUntilChanukah, CHANUKAH_DAYS } from '../utils/chanukahDate';
import { BookOpen, Sparkles } from 'lucide-react';
import ChanukahFactsModal from './ChanukahFactsModal';
import { fetchChanukahContent } from '../utils/gemini';

const Hanukia = () => {
  const [currentDay, setCurrentDay] = useState(0);
  const [daysUntil, setDaysUntil] = useState(0);
  const [litCandles, setLitCandles] = useState(Array(8).fill(false));
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);

  // Gemini Facts State
  const [isFactsModalOpen, setIsFactsModalOpen] = useState(false);
  const [factsContent, setFactsContent] = useState({ title: '', content: '' });
  const [isLoadingFacts, setIsLoadingFacts] = useState(false);

  const candleRefs = useRef([]);
  const containerRef = useRef(null);

  // Initialize
  useEffect(() => {
    // Load day
    const day = getChanukahDay();
    setCurrentDay(day);

    if (day === 0) {
      setDaysUntil(getDaysUntilChanukah());
    }

    // Load state
    const saved = localStorage.getItem('hanukia-state');
    if (saved) {
      try {
        setLitCandles(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }
  }, []);

  // Save state
  useEffect(() => {
    localStorage.setItem('hanukia-state', JSON.stringify(litCandles));
  }, [litCandles]);

  const handleReset = () => {
    setLitCandles(Array(8).fill(false));
    localStorage.removeItem('hanukia-state');
  };

  const handleDrag = (info) => {
    if (currentDay === 0) return; // Cannot light before Chanukah

    // info.point is the pointer position (page relative)
    // We need to check collision with candle refs
    // But framer motion info.point might be relative to viewport.

    // Let's use document.elementFromPoint for simplicity if possible, 
    // but the Shamash itself might block it.
    // Better to check bounding boxes.

    const shamashRect = {
      x: info.point.x,
      y: info.point.y
    };

    // We can assume the "hotspot" of the Shamash is the flame tip or bottom.
    // Let's use the pointer position as the hotspot.

    candleRefs.current.forEach((ref, index) => {
      if (!ref) return;

      // Check if candle is enabled for today
      // Candles are 0..7. 
      // 0 is rightmost (Day 1).
      // If currentDay is 3, indices 0, 1, 2 are valid.
      if (index >= currentDay) return;

      if (litCandles[index]) return; // Already lit

      const rect = ref.getBoundingClientRect();

      // Check if pointer is within the candle's flame area (top part)
      // Let's be generous
      if (
        info.point.x >= rect.left &&
        info.point.x <= rect.right &&
        info.point.y >= rect.top - 50 && // Allow slightly above
        info.point.y <= rect.bottom
      ) {
        lightCandle(index);
      }
    });
  };

  const lightCandle = (index) => {
    setLitCandles(prev => {
      const newLit = [...prev];
      newLit[index] = true;
      return newLit;
    });
    // Optional: Play sound
  };

  const handleOpenFacts = async () => {
    setIsFactsModalOpen(true);
    setIsLoadingFacts(true);
    // Reset content/title to blank while loading if desired, or keep previous
    setFactsContent({ title: '', content: '' });

    const data = await fetchChanukahContent();
    setFactsContent(data);
    setIsLoadingFacts(false);
  };

  // Candles are rendered Left to Right in DOM?
  // We want Right to Left positioning visually.
  // Flex-row-reverse? Or just map 7..0?
  // Prompt: "Da direita para a esquerda para posicionamento"
  // So index 0 (Day 1) should be on the Right.
  // index 7 (Day 8) on the Left.

  // If we use flex-row, index 7 is first (left), index 0 is last (right).
  // So we map [7, 6, 5, 4, 3, 2, 1, 0].

  const candleIndices = [7, 6, 5, 4, 3, 2, 1, 0];

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4" ref={containerRef}>

      <PrayerModal isOpen={isPrayerModalOpen} onClose={() => setIsPrayerModalOpen(false)} />
      <ChanukahFactsModal
        isOpen={isFactsModalOpen}
        onClose={() => setIsFactsModalOpen(false)}
        title={factsContent.title}
        content={factsContent.content}
        isLoading={isLoadingFacts}
      />

      {/* Controls / Info */}
      <div className="mb-12 text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gold-500 drop-shadow-lg font-serif">
          Chanucá Sameach!
        </h1>
        <div className="text-xl text-gold-200">
          {currentDay > 0 ? (
            <>Hoje é o <span className="font-bold text-white">{currentDay}º dia</span> de Chanucá</>
          ) : (
            <>Faltam <span className="font-bold text-white">{daysUntil} dias</span> para Chanucá</>
          )}
        </div>

        <div className="flex gap-4 justify-center items-center text-sm">
          {currentDay > 0 && (
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded border border-slate-600 transition-colors"
            >
              Reiniciar Velas
            </button>
          )}

          <button
            onClick={() => setIsPrayerModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gold-900/50 hover:bg-gold-900 text-gold-200 rounded border border-gold-700 transition-colors"
          >
            <BookOpen size={16} />
            Ver Orações
          </button>

          <button
            onClick={handleOpenFacts}
            className="flex items-center gap-2 px-4 py-2 bg-purple-900/50 hover:bg-purple-900 text-purple-200 rounded border border-purple-700 transition-colors"
          >
            <Sparkles size={16} />
            Curiosidades
          </button>
        </div>
      </div>

      {/* Menorah Container */}
      <div className="relative mt-20 mb-20 w-full flex justify-center items-end h-96">

        {/* Base / Branches (Decorative SVG or Divs) */}
        <div className="absolute bottom-0 w-full h-64 flex justify-center items-end pointer-events-none z-0">
          {/* Main Stem */}
          <div className="w-8 h-64 bg-gradient-to-t from-gold-800 to-gold-600 rounded-b-lg shadow-2xl absolute left-1/2 -translate-x-1/2"></div>

          {/* Branches */}
          <div className="w-[90%] h-48 border-b-8 border-l-8 border-r-8 border-gold-700 rounded-b-[100px] absolute bottom-16"></div>
          <div className="w-[70%] h-36 border-b-8 border-l-8 border-r-8 border-gold-700 rounded-b-[100px] absolute bottom-16"></div>
          <div className="w-[50%] h-24 border-b-8 border-l-8 border-r-8 border-gold-700 rounded-b-[100px] absolute bottom-16"></div>
          <div className="w-[30%] h-12 border-b-8 border-l-8 border-r-8 border-gold-700 rounded-b-[100px] absolute bottom-16"></div>
        </div>

        {/* Candles Row */}
        <div className="relative z-10 flex items-end justify-center gap-4 md:gap-8 pb-16">

          {/* Left Side (Indices 7, 6, 5, 4) */}
          {candleIndices.slice(0, 4).map(index => (
            <div key={index} className="relative">
              <Candle
                ref={el => candleRefs.current[index] = el}
                lit={litCandles[index]}
                disabled={index >= currentDay}
                color="bg-blue-500"
                height="h-32 md:h-40"
              />
              {/* Label for debugging/clarity */}
              {/* <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500">{index + 1}</span> */}
            </div>
          ))}

          {/* Shamash (Center) */}
          <div className="relative -mt-16 mx-2 z-20">
            <Shamash onDrag={handleDrag} isLit={currentDay > 0} />
          </div>

          {/* Right Side (Indices 3, 2, 1, 0) */}
          {candleIndices.slice(4).map(index => (
            <div key={index} className="relative">
              <Candle
                ref={el => candleRefs.current[index] = el}
                lit={litCandles[index]}
                disabled={index >= currentDay}
                color="bg-blue-500"
                height="h-32 md:h-40"
              />
            </div>
          ))}
        </div>

        {/* Base Stand */}
        <div className="absolute bottom-0 w-48 h-8 bg-gold-900 rounded-t-lg shadow-lg z-10"></div>

      </div>

      {/* Instructions */}
      <div className="max-w-2xl text-center text-slate-300 bg-slate-900/50 p-6 rounded-xl backdrop-blur-sm border border-slate-800">
        <h2 className="text-xl font-bold text-gold-400 mb-2">Como acender a Hanukiá</h2>
        <p className="mb-4">
          Arraste o <span className="font-bold text-gold-300">Shamash</span> (a vela central) até o topo das outras velas para acendê-las.
        </p>
        <ul className="text-sm text-left list-disc list-inside space-y-1 text-slate-400">
          <li>As velas são colocadas da direita para a esquerda.</li>
          <li>Deve-se acender da esquerda para a direita (começando pela vela mais nova).</li>
          <li>Apenas as velas correspondentes ao dia atual ({currentDay}) ou anteriores podem ser acesas.</li>
        </ul>
      </div>

    </div>
  );
};

export default Hanukia;
