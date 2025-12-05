import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const PrayerModal = ({ isOpen, onClose }) => {
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
            className="relative w-full max-w-lg bg-slate-900 border border-gold-700 rounded-xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl md:text-3xl font-bold text-gold-500 mb-6 text-center font-serif">
              Bênçãos de Chanucá
            </h2>

            <div className="space-y-6 text-center">
              {/* Blessing 1 */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gold-200">1. Ao acender as velas</h3>
                <p className="text-xl md:text-2xl font-serif text-white leading-relaxed" dir="rtl">
                  בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ לְהַדְלִיק נֵר שֶׁל חֲנֻכָּה
                </p>
                <p className="text-slate-300 italic text-sm">
                  Baruch atah Adonai, Eloheinu Melech ha'olam, asher kid'shanu b'mitzvotav v'tzivanu l'hadlik ner shel Chanukah.
                </p>
                <p className="text-slate-400 text-sm">
                  Bendito és Tu, Adonai nosso Deus, Rei do Universo, que nos santificaste com Teus mandamentos e nos ordenaste acender a vela de Chanucá.
                </p>
              </div>

              <div className="w-full h-px bg-slate-800" />

              {/* Blessing 2 */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gold-200">2. Pelos milagres</h3>
                <p className="text-xl md:text-2xl font-serif text-white leading-relaxed" dir="rtl">
                  בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם שֶׁעָשָׂה נִסִּים לַאֲבוֹתֵינוּ בַּיָּמִים הָהֵם בַּזְּמַן הַזֶּה
                </p>
                <p className="text-slate-300 italic text-sm">
                  Baruch atah Adonai, Eloheinu Melech ha'olam, she-asah nisim la-avoteinu bayamim hahem bazman hazeh.
                </p>
                <p className="text-slate-400 text-sm">
                  Bendito és Tu, Adonai nosso Deus, Rei do Universo, que realizaste milagres para nossos antepassados, naqueles dias, nesta época.
                </p>
              </div>

              <div className="w-full h-px bg-slate-800" />

              {/* Blessing 3 */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gold-200">3. Shehecheyanu (Apenas na primeira noite)</h3>
                <p className="text-xl md:text-2xl font-serif text-white leading-relaxed" dir="rtl">
                  בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם שֶׁהֶחֱיָנוּ וְקִיְּמָנוּ וְהִגִּיעָנוּ לַזְּמַן הַזֶּה
                </p>
                <p className="text-slate-300 italic text-sm">
                  Baruch atah Adonai, Eloheinu Melech ha'olam, shehecheyanu v'kiy'manu v'higiyanu lazman hazeh.
                </p>
                <p className="text-slate-400 text-sm">
                  Bendito és Tu, Adonai nosso Deus, Rei do Universo, que nos deste vida, nos mantiveste e nos permitiste chegar a esta época.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-slate-900 font-bold rounded-full transition-colors"
              >
                Amém
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PrayerModal;
