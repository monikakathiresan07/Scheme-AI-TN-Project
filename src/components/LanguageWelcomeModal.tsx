import { motion } from 'motion/react';
import { Language } from '../types';
import { SchemeAILogo } from './SchemeAILogo';
import { Check, ArrowRight, Globe } from 'lucide-react';

interface LanguageWelcomeModalProps {
  onSelectLanguage: (lang: Language) => void;
  isOpen: boolean;
}

export function LanguageWelcomeModal({ onSelectLanguage, isOpen }: LanguageWelcomeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden"
      >
        {/* Top decorative header with subtle Tamil Nadu & AI theme */}
        <div className="relative px-8 pt-8 pb-6 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white text-center border-b border-teal-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
          
          <div className="relative flex justify-center mb-4">
            <SchemeAILogo size="lg" showText={false} />
          </div>

          <h2 className="relative text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
            Welcome to Scheme AI
          </h2>
          <p className="relative text-sm md:text-base text-slate-300 font-normal max-w-md mx-auto">
            Choose your preferred language / உங்கள் விருப்ப மொழியைத் தேர்ந்தெடுக்கவும்
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-teal-300 font-medium bg-teal-950/60 px-2.5 py-1 rounded-full border border-teal-500/30">
            <Globe size={13} />
            <span>Tamil Nadu Citizen Welfare Platform</span>
          </div>
        </div>

        {/* Two Large Language Selection Panels */}
        <div className="p-6 md:p-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tamil Option */}
            <button
              onClick={() => onSelectLanguage('ta')}
              className="group relative flex flex-col items-start p-6 rounded-2xl border-2 border-slate-200 bg-gradient-to-b from-white to-slate-50/60 text-left transition-all duration-200 hover:border-teal-500 hover:shadow-lg hover:shadow-teal-500/10 focus:outline-none focus:ring-4 focus:ring-teal-500/20 active:scale-[0.98] cursor-pointer"
            >
              <div className="flex items-center justify-between w-full mb-3">
                <span className="text-3xl md:text-4xl font-bold text-slate-900 font-serif tracking-wide group-hover:text-teal-700 transition-colors">
                  தமிழ்
                </span>
                <span className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-200 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <ArrowRight size={16} />
                </span>
              </div>
              <p className="text-base font-semibold text-teal-700 mb-1">
                தமிழில் தொடரவும்
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                அனைத்து அரசு திட்டங்களையும் எளிய தமிழில் கண்டறியுங்கள்
              </p>
            </button>

            {/* English Option */}
            <button
              onClick={() => onSelectLanguage('en')}
              className="group relative flex flex-col items-start p-6 rounded-2xl border-2 border-slate-200 bg-gradient-to-b from-white to-slate-50/60 text-left transition-all duration-200 hover:border-teal-500 hover:shadow-lg hover:shadow-teal-500/10 focus:outline-none focus:ring-4 focus:ring-teal-500/20 active:scale-[0.98] cursor-pointer"
            >
              <div className="flex items-center justify-between w-full mb-3">
                <span className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight group-hover:text-teal-700 transition-colors font-sans">
                  English
                </span>
                <span className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-200 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <ArrowRight size={16} />
                </span>
              </div>
              <p className="text-base font-semibold text-teal-700 mb-1">
                Continue in English
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Explore personalized Tamil Nadu & Central schemes with AI matching
              </p>
            </button>
          </div>

          <div className="pt-2 text-center text-xs text-slate-400">
            You can change your preferred language at any time in the navigation menu.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
