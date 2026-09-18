import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { SchemeAILogo } from './SchemeAILogo';
import { Sparkles, CheckCircle2, Cpu } from 'lucide-react';

interface AIAnalysisAnimationProps {
  language: Language;
  onComplete: () => void;
}

export function AIAnalysisAnimation({ language, onComplete }: AIAnalysisAnimationProps) {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = language === 'ta'
    ? [
        'சுயவிவர உள்ளீடுகள் சரிபார்க்கப்படுகின்றன...',
        '38 மாவட்டங்களுக்கான நலத்திட்ட விதிகள் ஒப்பிடப்படுகின்றன...',
        'வருமான வரம்பு & துறைத் தகுதிகள் பகுப்பாய்வு செய்யப்படுகின்றன...',
        'AI பொருத்தம் & தகுதிப் பட்டியல்கள் உருவாக்கப்படுகின்றன...'
      ]
    : [
        'Validating citizen profile inputs...',
        'Evaluating rules across 38 Tamil Nadu districts...',
        'Screening department criteria & income caps...',
        'Synthesizing AI match scores & personalized reasons...'
      ];

  useEffect(() => {
    const timer1 = setTimeout(() => setStepIndex(1), 380);
    const timer2 = setTimeout(() => setStepIndex(2), 750);
    const timer3 = setTimeout(() => setStepIndex(3), 1100);
    const timerFinal = setTimeout(() => onComplete(), 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timerFinal);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-slate-900 text-white rounded-3xl p-8 border border-teal-500/30 shadow-2xl text-center relative overflow-hidden"
      >
        {/* Ambient background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl" />

        <div className="relative flex justify-center mb-6">
          <div className="relative">
            <SchemeAILogo size="lg" showText={false} />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="absolute -inset-2 rounded-2xl border border-teal-400/40 border-t-transparent"
            />
          </div>
        </div>

        <h3 className="relative text-xl font-bold tracking-tight text-white mb-1 flex items-center justify-center gap-2">
          <Cpu size={20} className="text-teal-400 animate-pulse" />
          <span>{language === 'ta' ? 'AI திட்ட பொருத்தம் பகுப்பாய்வு' : 'AI Scheme Matching Engine'}</span>
        </h3>

        <p className="text-xs text-slate-400 mb-6">
          {language === 'ta' ? 'தமிழ்நாடு நலத்திட்ட விதிகளுடன் ஒப்பிடுதல்' : 'Evaluating against Tamil Nadu Government Welfare Database'}
        </p>

        {/* Dynamic step ticker */}
        <div className="bg-slate-950/70 rounded-2xl p-4 border border-slate-800 space-y-2.5 text-left mb-6">
          {steps.map((text, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2.5 text-xs transition-colors duration-200 ${
                idx === stepIndex
                  ? 'text-teal-300 font-semibold'
                  : idx < stepIndex
                  ? 'text-slate-400 line-through opacity-60'
                  : 'text-slate-600'
              }`}
            >
              {idx < stepIndex ? (
                <CheckCircle2 size={15} className="text-teal-400 shrink-0" />
              ) : idx === stepIndex ? (
                <Sparkles size={15} className="text-amber-400 shrink-0 animate-spin" />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0" />
              )}
              <span className="truncate">{text}</span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-teal-400 via-amber-400 to-teal-400"
          />
        </div>
      </motion.div>
    </div>
  );
}
