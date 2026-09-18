import { useState } from 'react';
import { Scheme, Language, MatchEvaluation } from '../types';
import { UI_STRINGS, CATEGORY_NAMES } from '../translations';
import { SchemeIcon } from './SchemeIcon';
import { Bookmark, BookmarkCheck, ChevronDown, ChevronUp, Sparkles, Building2, ExternalLink, ShieldCheck, MapPin } from 'lucide-react';

interface SchemeCardProps {
  scheme: Scheme;
  language: Language;
  evaluation?: MatchEvaluation;
  isSaved?: boolean;
  onToggleSave: (schemeId: string) => void;
  onViewDetails: (scheme: Scheme) => void;
}

export function SchemeCard({
  scheme,
  language,
  evaluation,
  isSaved = false,
  onToggleSave,
  onViewDetails
}: SchemeCardProps) {
  const [showReasons, setShowReasons] = useState(false);
  const t = UI_STRINGS[language];

  const schemeTitle = language === 'ta' ? scheme.name_ta : scheme.name_en;
  const secondaryTitle = language === 'ta' ? scheme.name_en : scheme.name_ta;
  const description = language === 'ta' ? scheme.description_ta : scheme.description_en;
  const department = language === 'ta' ? scheme.department_ta : scheme.department_en;
  const categoryLabel = CATEGORY_NAMES[scheme.category]?.[language] || scheme.category;

  const isTnGovt = scheme.government_level === 'Tamil Nadu Government';
  const govtBadgeLabel = isTnGovt
    ? (language === 'ta' ? 'தமிழ்நாடு அரசு திட்டம்' : 'Tamil Nadu Government')
    : (language === 'ta' ? 'மத்திய அரசு திட்டம் (TN)' : 'Central Government Scheme');

  const matchScore = evaluation?.matchScore ?? 85;
  const matchLevel = language === 'ta'
    ? (evaluation?.matchLevel_ta || 'வலுவான பொருத்தம்')
    : (evaluation?.matchLevel || 'Strong Profile Match');

  const matchReasons = language === 'ta' ? evaluation?.reasons_ta : evaluation?.reasons_en;
  const unmetReasons = language === 'ta' ? evaluation?.unmetCriteria_ta : evaluation?.unmetCriteria_en;

  return (
    <div className="group relative bg-white rounded-3xl border border-slate-200/90 hover:border-teal-500/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Accent bar based on Government level */}
      <div
        className={`h-1.5 w-full ${
          isTnGovt
            ? 'bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-500'
            : 'bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600'
        }`}
      />

      <div className="p-6 md:p-7 flex-1 flex flex-col">
        {/* Top Badges: Govt Level & Department & Category */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            {/* Government Level Badge */}
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                isTnGovt
                  ? 'bg-teal-50 text-teal-800 border-teal-200'
                  : 'bg-amber-50 text-amber-900 border-amber-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isTnGovt ? 'bg-teal-500' : 'bg-amber-500'}`} />
              {govtBadgeLabel}
            </span>

            {/* Category Tag */}
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {categoryLabel}
            </span>
          </div>

          {/* AI Match Score Badge */}
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-teal-500/10 to-teal-600/10 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-bold text-teal-800 shadow-2xs">
            <Sparkles size={13} className="text-amber-500" />
            <span>{t.matchScore} {matchScore}%</span>
          </div>
        </div>

        {/* Scheme Header: Unique Vector Icon & Name */}
        <div className="flex items-start gap-4 mb-3">
          <SchemeIcon type={scheme.iconType} size="md" className="shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug group-hover:text-teal-700 transition-colors">
              {schemeTitle}
            </h3>
            <p className="text-xs text-slate-400 font-medium truncate mt-0.5">
              {secondaryTitle}
            </p>
          </div>
        </div>

        {/* Responsible Department Display */}
        <div className="mb-3 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs">
          <Building2 size={15} className="text-slate-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-700 block text-[11px] uppercase tracking-wide">
              {t.department}
            </span>
            <span className="text-slate-600 font-medium leading-tight">
              {department}
            </span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4 flex-1">
          {description}
        </p>

        {/* AI Match & Why this matches you toggle */}
        <div className="mt-auto pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-700">
                {matchLevel}
              </span>
              {scheme.districtAvailability !== 'All' && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                  <MapPin size={11} />
                  <span>
                    {language === 'ta' ? 'குறிப்பிட்ட மாவட்டங்கள்' : 'District Specific'}
                  </span>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowReasons(!showReasons)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors cursor-pointer"
            >
              <span>{t.whyMatches}</span>
              {showReasons ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          {/* Expandable Reasons Drawer */}
          {showReasons && (
            <div className="mb-4 p-3.5 rounded-2xl bg-teal-50/50 border border-teal-200/80 text-xs space-y-2 text-slate-700 animate-in fade-in duration-150">
              <span className="font-semibold text-teal-950 block">
                {language === 'ta' ? 'சுயவிவர பொருத்தம் விளக்கம்:' : 'Profile Match Explanation:'}
              </span>
              <ul className="space-y-1.5 pl-1">
                {matchReasons && matchReasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-teal-600 font-bold">✓</span>
                    <span>{reason}</span>
                  </li>
                ))}
                {unmetReasons && unmetReasons.map((unmet, idx) => (
                  <li key={`unmet-${idx}`} className="flex items-start gap-1.5 text-amber-700">
                    <span className="font-bold">!</span>
                    <span>{unmet}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-slate-500 italic pt-1 border-t border-teal-200/60">
                {language === 'ta'
                  ? 'உங்கள் சுயவிவரம் இத்திட்டத்தின் முக்கிய அளவுகோல்களுடன் பொருந்துகிறது. விண்ணப்பிக்கும் முன் அதிகாரப்பூர்வ தளத்தை சரிபார்க்கவும்.'
                  : 'Criteria matched against provided profile variables. Verify full guidelines on the official portal.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Card Actions Footer: View Details & Save */}
      <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onViewDetails(scheme)}
          className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>{t.viewDetails}</span>
        </button>

        <button
          type="button"
          onClick={() => onToggleSave(scheme.id)}
          className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs font-semibold ${
            isSaved
              ? 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
          }`}
          title={isSaved ? t.savedBadge : t.saveScheme}
        >
          {isSaved ? (
            <>
              <BookmarkCheck size={16} className="text-amber-600 fill-amber-500" />
              <span className="hidden sm:inline">{t.savedBadge}</span>
            </>
          ) : (
            <>
              <Bookmark size={16} className="text-slate-500" />
              <span className="hidden sm:inline">{t.saveScheme}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
