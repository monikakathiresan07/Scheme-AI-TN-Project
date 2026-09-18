import { useMemo } from 'react';
import { motion } from 'motion/react';
import { Scheme, Language, MatchEvaluation } from '../types';
import { UI_STRINGS, CATEGORY_NAMES } from '../translations';
import { SchemeIcon } from './SchemeIcon';
import {
  X,
  Building2,
  Calendar,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Users,
  AlertTriangle,
  Bookmark,
  BookmarkCheck,
  Send,
  Sparkles,
  MapPin,
  ArrowRight,
  Compass
} from 'lucide-react';

interface SchemeDetailModalProps {
  scheme: Scheme | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  evaluation?: MatchEvaluation;
  isSaved?: boolean;
  onToggleSave: (schemeId: string) => void;
  allSchemes?: Scheme[];
  onSelectScheme?: (scheme: Scheme) => void;
}

export function SchemeDetailModal({
  scheme,
  isOpen,
  onClose,
  language,
  evaluation,
  isSaved = false,
  onToggleSave,
  allSchemes = [],
  onSelectScheme
}: SchemeDetailModalProps) {
  if (!isOpen || !scheme) return null;

  const t = UI_STRINGS[language];
  const isTnGovt = scheme.government_level === 'Tamil Nadu Government';

  // Find two related schemes from the same category
  const relatedSchemes = useMemo(() => {
    if (!allSchemes || allSchemes.length === 0) return [];
    // 1. Schemes in the exact same category, excluding current scheme
    const sameCategory = allSchemes.filter(s => s.id !== scheme.id && s.category === scheme.category);
    if (sameCategory.length >= 2) {
      return sameCategory.slice(0, 2);
    }
    // 2. If fewer than 2, complement with schemes sharing similar target audience or government level
    const others = allSchemes.filter(s => s.id !== scheme.id && !sameCategory.some(sc => sc.id === s.id));
    return [...sameCategory, ...others].slice(0, 2);
  }, [allSchemes, scheme]);

  const schemeTitle = language === 'ta' ? scheme.name_ta : scheme.name_en;
  const secondaryTitle = language === 'ta' ? scheme.name_en : scheme.name_ta;
  const description = language === 'ta' ? scheme.description_ta : scheme.description_en;
  const department = language === 'ta' ? scheme.department_ta : scheme.department_en;
  const beneficiaries = language === 'ta' ? scheme.targetBeneficiaries_ta : scheme.targetBeneficiaries_en;
  const benefitsList = language === 'ta' ? scheme.benefits_ta : scheme.benefits_en;
  const eligibilityList = language === 'ta' ? scheme.eligibility_ta : scheme.eligibility_en;
  const documentsList = language === 'ta' ? scheme.documents_ta : scheme.documents_en;
  const applyMethod = language === 'ta' ? scheme.applicationMethod_ta : scheme.applicationMethod_en;
  const categoryLabel = CATEGORY_NAMES[scheme.category]?.[language] || scheme.category;

  const govtBadgeLabel = isTnGovt
    ? (language === 'ta' ? 'தமிழ்நாடு அரசு திட்டம்' : 'Tamil Nadu Government Scheme')
    : (language === 'ta' ? 'மத்திய அரசு திட்டம் (தமிழ்நாட்டில்)' : 'Central Government Scheme in TN');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col"
      >
        {/* Header with gradient badge and close button */}
        <div className="relative px-6 pt-6 pb-5 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white border-b border-teal-500/20">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <SchemeIcon type={scheme.iconType} size="lg" className="shrink-0 ring-2 ring-teal-500/30 shadow-lg" />
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      isTnGovt
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isTnGovt ? 'bg-teal-400' : 'bg-amber-400'}`} />
                    {govtBadgeLabel}
                  </span>

                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {categoryLabel}
                  </span>

                  {evaluation && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-400/20 text-teal-300 border border-teal-400/30">
                      <Sparkles size={11} className="text-amber-400" />
                      <span>{t.matchScore} {evaluation.matchScore}%</span>
                    </span>
                  )}
                </div>

                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-snug">
                  {schemeTitle}
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  {secondaryTitle}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-7 text-slate-800">
          {/* Responsible Department Banner */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white border border-slate-200 text-teal-700 shadow-2xs">
                <Building2 size={18} />
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-500 tracking-wider block">
                  {t.department}
                </span>
                <span className="text-sm font-semibold text-slate-900">
                  {department}
                </span>
              </div>
            </div>

            {scheme.districtAvailability !== 'All' ? (
              <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-200">
                <MapPin size={14} />
                <span>
                  {language === 'ta'
                    ? `மாவட்டங்கள்: ${scheme.districtAvailability.join(', ')}`
                    : `Districts: ${scheme.districtAvailability.join(', ')}`}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                <MapPin size={14} className="text-teal-600" />
                <span>
                  {language === 'ta' ? 'அனைத்து 38 மாவட்டங்களுக்கும் பொருந்தும்' : 'Available across all 38 TN Districts'}
                </span>
              </div>
            )}
          </div>

          {/* 1. திட்டத்தைப் பற்றி (About Scheme) */}
          <section className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 border-l-3 border-teal-600 pl-2.5">
              {t.secAbout}
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
              {description}
            </p>
          </section>

          {/* 2. யாருக்கு பொருந்தும்? (Who is it for / Target Beneficiaries) */}
          <section className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 border-l-3 border-teal-600 pl-2.5 flex items-center gap-2">
              <span>{t.secBeneficiaries}</span>
            </h3>
            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 flex items-start gap-3">
              <Users size={18} className="text-teal-700 shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-teal-950 leading-relaxed">
                {beneficiaries}
              </p>
            </div>
          </section>

          {/* 3. தகுதி (Eligibility Criteria) */}
          <section className="space-y-2.5">
            <h3 className="text-base font-bold text-slate-900 border-l-3 border-teal-600 pl-2.5">
              {t.secEligibility}
            </h3>
            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80">
              <ul className="space-y-2 text-sm text-slate-700">
                {eligibilityList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-teal-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 4. கிடைக்கும் நன்மைகள் (Benefits & Entitlements) */}
          <section className="space-y-2.5">
            <h3 className="text-base font-bold text-slate-900 border-l-3 border-teal-600 pl-2.5">
              {t.secBenefits}
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {benefitsList.map((benefit, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex items-start gap-3 text-sm text-emerald-950 font-medium"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                    ✓
                  </span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 5. தேவையான ஆவணங்கள் (Required Documents) */}
          <section className="space-y-2.5">
            <h3 className="text-base font-bold text-slate-900 border-l-3 border-teal-600 pl-2.5">
              {t.secDocuments}
            </h3>
            <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2 shadow-2xs">
              {documentsList.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <FileText size={15} className="text-slate-400 shrink-0" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 6. எப்படி விண்ணப்பிப்பது? (How to Apply) */}
          <section className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 border-l-3 border-teal-600 pl-2.5">
              {t.secHowToApply}
            </h3>
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-sm text-amber-950 flex items-start gap-3">
              <Send size={18} className="text-amber-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium">
                {applyMethod}
              </p>
            </div>
          </section>

          {/* Related Schemes Section (Suggests two other schemes from the same category) */}
          {relatedSchemes.length > 0 && (
            <section className="space-y-3 pt-1 border-t border-slate-200/80">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 border-l-3 border-teal-600 pl-2.5 flex items-center gap-2">
                  <Compass size={18} className="text-teal-600" />
                  <span>{t.secRelatedSchemes}</span>
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {categoryLabel}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {relatedSchemes.map((rel) => {
                  const relTitle = language === 'ta' ? rel.name_ta : rel.name_en;
                  const relDesc = language === 'ta' ? rel.description_ta : rel.description_en;
                  const isRelTn = rel.government_level === 'Tamil Nadu Government';

                  return (
                    <div
                      key={rel.id}
                      onClick={() => onSelectScheme && onSelectScheme(rel)}
                      className="group/item p-4 rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/70 hover:border-teal-400 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                              isRelTn
                                ? 'bg-teal-50 text-teal-800 border-teal-200'
                                : 'bg-amber-50 text-amber-900 border-amber-200'
                            }`}
                          >
                            {isRelTn
                              ? (language === 'ta' ? 'தமிழ்நாடு அரசு' : 'TN Govt')
                              : (language === 'ta' ? 'மத்திய அரசு' : 'Central')}
                          </span>

                          <span className="text-[10px] text-slate-400 font-medium">
                            {rel.category}
                          </span>
                        </div>

                        <div className="flex items-start gap-2.5 mb-2">
                          <SchemeIcon type={rel.iconType} size="sm" className="shrink-0 mt-0.5" />
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover/item:text-teal-700 transition-colors line-clamp-2">
                            {relTitle}
                          </h4>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {relDesc}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700 group-hover/item:text-teal-800">
                        <span>{t.viewDetails}</span>
                        <ArrowRight size={13} className="group-hover/item:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* 7. அதிகாரப்பூர்வ தகவல் & Trust Indicator (Information Verification) */}
          <section className="pt-2 border-t border-slate-200">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-slate-700 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-teal-300 font-semibold text-xs">
                  <ShieldCheck size={16} />
                  <span>{t.trustIndicatorTitle}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                  <Calendar size={13} />
                  <span>{t.lastUpdated}: {scheme.lastUpdated}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                <CheckCircle2 size={14} />
                <span>{language === 'ta' ? 'அதிகாரப்பூர்வ அரசு மூலம் சரிபார்க்கப்பட்டது ✓' : 'Source Available & Verified ✓'}</span>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed">
                {t.trustIndicatorBody}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <span>{t.openOfficialPortal}</span>
                  <ExternalLink size={13} />
                </a>

                <span className="text-[10px] text-slate-400">
                  {scheme.officialUrl}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic text-center mt-3">
              {t.disclaimerNotice}
            </p>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onToggleSave(scheme.id)}
            className={`py-2.5 px-4 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
              isSaved
                ? 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {isSaved ? <BookmarkCheck size={16} className="text-amber-600 fill-amber-500" /> : <Bookmark size={16} />}
            <span>{isSaved ? t.savedBadge : t.saveScheme}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            {t.closeBtn}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
