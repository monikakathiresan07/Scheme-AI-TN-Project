import { useState } from 'react';
import { Language, SchemeCategory, NLPSearchResult } from '../types';
import { UI_STRINGS } from '../translations';
import { Search, Sparkles, ArrowRight, CheckCircle2, Cpu, Filter, Compass } from 'lucide-react';

interface QuickHeroProps {
  language: Language;
  onOpenProfile: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  nlpResult: NLPSearchResult | null;
  onSelectCategoryFilter: (category: SchemeCategory | 'All') => void;
  selectedCategory: SchemeCategory | 'All';
  selectedGovtLevel: 'All' | 'Tamil Nadu Government' | 'Central Government';
  onSelectGovtLevel: (level: 'All' | 'Tamil Nadu Government' | 'Central Government') => void;
}

export const TAMIL_PROMPT_SUGGESTIONS = [
  {
    ta: 'எனக்கு படிப்புக்கு உதவி வேண்டும்',
    en: 'I need financial assistance for education',
    category: 'Education & Scholarships' as SchemeCategory
  },
  {
    ta: 'விவசாயிகளுக்கு என்ன திட்டம் இருக்கு?',
    en: 'What welfare schemes exist for farmers?',
    category: 'Agriculture & Farmers' as SchemeCategory
  },
  {
    ta: 'பெண்களுக்கு தொழில் தொடங்க உதவி இருக்கா?',
    en: 'Is there startup/business support for women?',
    category: 'Entrepreneurship' as SchemeCategory
  },
  {
    ta: 'வேலை இல்லாதவர்களுக்கு ஏதாவது உதவி இருக்கா?',
    en: 'What skill or employment schemes are for job seekers?',
    category: 'Employment' as SchemeCategory
  }
];

export function QuickHero({
  language,
  onOpenProfile,
  searchQuery,
  onSearchChange,
  nlpResult,
  onSelectCategoryFilter,
  selectedCategory,
  selectedGovtLevel,
  onSelectGovtLevel
}: QuickHeroProps) {
  const t = UI_STRINGS[language];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-teal-500/20">
      {/* Background Neural Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center space-y-6">
        {/* State Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-300 text-xs font-semibold shadow-inner">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span>
            {language === 'ta'
              ? 'தமிழ்நாடு அரசு & மத்திய அரசு நலத்திட்டங்கள் தகவல் தளம்'
              : 'Tamil Nadu & Central Welfare Schemes Citizen Platform'}
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          {language === 'ta' ? (
            <>
              உங்களுக்கான அரசு திட்டங்களை <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-teal-300 via-teal-200 to-amber-300 bg-clip-text text-transparent">
                எளிதாக கண்டறியுங்கள்
              </span>
            </>
          ) : (
            <>
              Discover Tamil Nadu Welfare Schemes <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-teal-300 via-teal-200 to-amber-300 bg-clip-text text-transparent">
                Tailored for Your Citizen Profile
              </span>
            </>
          )}
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          {t.quickHeroSub}
        </p>

        {/* Prominent Quick Entry Action: "எனக்கு என்ன திட்டம்?" */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onOpenProfile}
            className="group px-7 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold text-sm sm:text-base shadow-xl shadow-teal-500/25 transition-all duration-200 flex items-center gap-3 cursor-pointer active:scale-98 border border-teal-300/30"
          >
            <Sparkles size={18} className="text-amber-300 group-hover:rotate-12 transition-transform" />
            <span>{t.quickHeroTaBtn}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Natural Language / Tamil AI Search Input */}
        <div className="pt-4 max-w-3xl mx-auto text-left">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-teal-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 shadow-xl"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white text-xs font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick NLP Suggestion Pills (Tamil and English Citizen queries) */}
          <div className="mt-3 space-y-1.5">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
              <Cpu size={12} className="text-amber-400" />
              <span>{t.tamilQueryExamplesTitle}</span>
            </span>

            <div className="flex flex-wrap gap-2">
              {TAMIL_PROMPT_SUGGESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSearchChange(language === 'ta' ? item.ta : item.en)}
                  className="text-xs px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-teal-200 hover:text-white border border-slate-700/80 transition-all text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>{language === 'ta' ? `"${item.ta}"` : `"${item.en}"`}</span>
                </button>
              ))}
            </div>
          </div>

          {/* NLP Detected Intent Pill */}
          {nlpResult && searchQuery.trim() && (
            <div className="mt-3 p-3 rounded-xl bg-teal-950/70 border border-teal-500/40 text-xs flex items-center gap-2.5 text-teal-200 animate-in fade-in">
              <CheckCircle2 size={16} className="text-teal-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-white">
                  {language === 'ta' ? 'AI அடையாளம் கண்ட தேவை: ' : 'AI Identified Need: '}
                </span>
                <span className="text-teal-300">
                  {language === 'ta' ? nlpResult.detectedIntent_ta : nlpResult.detectedIntent_en}
                </span>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {nlpResult.matchedSchemes.length} {language === 'ta' ? 'திட்டங்கள்' : 'schemes'}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
