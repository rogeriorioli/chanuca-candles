import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Loader2 } from 'lucide-react';

const ChanukahFactsModal = ({ isOpen, onClose, title, content, isLoading }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-slate-900 border border-purple-500 rounded-xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-purple-500/20 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-purple-400" />
              </div>

              {isLoading ? (
                <div className="py-12 flex flex-col items-center gap-4">
                  <Loader2 className="w-10 h-10 text-purple-400 animate-spin" />
                  <p className="text-slate-300">Perguntando ao Gemini...</p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl md:text-3xl font-bold text-purple-400 mb-6 font-serif">
                    {title}
                  </h2>

                  <div className="text-lg text-slate-200 leading-relaxed whitespace-pre-line text-left w-full bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                    {content}
                  </div>
                </>
              )}

              <div className="mt-8">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ChanukahFactsModal;
