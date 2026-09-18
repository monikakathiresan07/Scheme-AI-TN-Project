import { UserProfile, Scheme, Language, MatchEvaluation } from '../types';
import { UI_STRINGS } from '../translations';
import { SchemeCard } from './SchemeCard';
import { User, Bookmark, Sparkles, MapPin, Briefcase, GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';

interface DashboardViewProps {
  currentUser: UserProfile;
  language: Language;
  savedSchemes: Scheme[];
  recommendedSchemes: Scheme[];
  evaluations: Map<string, MatchEvaluation>;
  onToggleSave: (schemeId: string) => void;
  onViewDetails: (scheme: Scheme) => void;
  onOpenProfile: () => void;
  onExploreAll: () => void;
}

export function DashboardView({
  currentUser,
  language,
  savedSchemes,
  recommendedSchemes,
  evaluations,
  onToggleSave,
  onViewDetails,
  onOpenProfile,
  onExploreAll
}: DashboardViewProps) {
  const t = UI_STRINGS[language];

  // Calculate approximate profile completeness
  const fields = [
    currentUser.district,
    currentUser.age,
    currentUser.gender,
    currentUser.occupation,
    currentUser.annualIncome,
    currentUser.educationLevel,
    currentUser.beneficiaryCategory
  ];
  const filledCount = fields.filter(Boolean).length;
  const completenessPercent = Math.min(100, Math.round((filledCount / fields.length) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200 shrink-0">
            <User size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                {t.dashWelcome}, {currentUser.name}
              </h1>
              {currentUser.isGuest ? (
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold border border-slate-200">
                  {t.guestBadge}
                </span>
              ) : (
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck size={12} />
                  <span>{language === 'ta' ? 'உறுதிசெய்யப்பட்டது' : 'Verified'}</span>
                </span>
              )}
            </div>

            {/* Profile Variables Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 font-medium">
                <MapPin size={12} className="text-teal-600" />
                <span>{currentUser.district}, {currentUser.state}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 font-medium">
                <Briefcase size={12} className="text-teal-600" />
                <span className="capitalize">{currentUser.occupation}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 font-medium">
                <GraduationCap size={12} className="text-teal-600" />
                <span className="capitalize">{currentUser.educationLevel}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-medium">
                Age: {currentUser.age}
              </span>
            </div>
          </div>
        </div>

        {/* Edit Profile CTA */}
        <button
          type="button"
          onClick={onOpenProfile}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Sparkles size={15} className="text-amber-400" />
          <span>{t.dashEditProfile}</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider mb-1">
            {t.dashMatchedCount}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-teal-700">
              {recommendedSchemes.length}
            </span>
            <span className="text-xs text-slate-500">
              {language === 'ta' ? 'அரசு திட்டங்கள்' : 'Active Schemes'}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider mb-1">
            {t.dashSavedCount}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600">
              {savedSchemes.length}
            </span>
            <span className="text-xs text-slate-500">
              {language === 'ta' ? 'சேமிக்கப்பட்டவை' : 'Bookmarked'}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider mb-1">
            {t.dashProfileCompleteness}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {completenessPercent}%
            </span>
            <span className="text-xs text-slate-500">
              {language === 'ta' ? 'நிறைவுற்றது' : 'Completed'}
            </span>
          </div>
        </div>
      </div>

      {/* Saved Schemes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark size={20} className="text-amber-600" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {t.navSaved} ({savedSchemes.length})
            </h2>
          </div>
        </div>

        {savedSchemes.length === 0 ? (
          <div className="p-8 bg-white rounded-3xl border border-dashed border-slate-300 text-center space-y-3">
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              {t.dashNoSaved}
            </p>
            <button
              onClick={onExploreAll}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold hover:bg-teal-100 transition-colors"
            >
              <span>{t.dashExploreBtn}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                language={language}
                evaluation={evaluations.get(scheme.id)}
                isSaved={true}
                onToggleSave={onToggleSave}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        )}
      </div>

      {/* Top AI Recommendations for User Profile */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-teal-600" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {language === 'ta' ? 'உங்கள் சுயவிவரத்திற்கான சிறந்த AI பரிந்துரைகள்' : 'Top AI Recommendations for Your Profile'}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedSchemes.slice(0, 6).map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              language={language}
              evaluation={evaluations.get(scheme.id)}
              isSaved={savedSchemes.some(s => s.id === scheme.id)}
              onToggleSave={onToggleSave}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
