import { useState, useEffect, useMemo } from 'react';
import {
  Language,
  UserProfile,
  Scheme,
  SchemeCategory,
  MatchEvaluation,
  NLPSearchResult
} from './types';
import { SCHEMES_DATABASE } from './data/schemes';
import { TAMIL_NADU_DISTRICTS } from './data/districts';
import { UI_STRINGS, CATEGORY_NAMES } from './translations';
import { RecommendationEngine } from './services/recommendationEngine';
import { NLPSearchService } from './services/nlpSearch';
import { Navbar } from './components/Navbar';
import { QuickHero } from './components/QuickHero';
import { SchemeCard } from './components/SchemeCard';
import { SchemeDetailModal } from './components/SchemeDetailModal';
import { ProfileModal } from './components/ProfileModal';
import { AuthModal } from './components/AuthModal';
import { LanguageWelcomeModal } from './components/LanguageWelcomeModal';
import { AIAnalysisAnimation } from './components/AIAnalysisAnimation';
import { DashboardView } from './components/DashboardView';
import { SchemeAILogo } from './components/SchemeAILogo';
import { SchemeAIChatbot } from './components/SchemeAIChatbot';
import {
  Sparkles,
  Filter,
  Layers,
  Building,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Search,
  Bookmark,
  ShieldCheck,
  MapPin,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const CATEGORIES_LIST: SchemeCategory[] = [
  'Education & Scholarships',
  'Women Welfare',
  'Girl Child Welfare',
  'Agriculture & Farmers',
  'Employment',
  'Skill Development',
  'Entrepreneurship',
  'Housing',
  'Health & Medical Assistance',
  'Social Security',
  'Senior Citizens',
  'Disability Welfare',
  'Student Support',
  'Family Welfare',
  'Financial Assistance'
];

export default function App() {
  // 1. Language State
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('scheme_ai_language') as Language;
    return saved || 'ta'; // Default to Tamil for strong TN focus
  });

  const [showLanguageWelcome, setShowLanguageWelcome] = useState<boolean>(() => {
    return !localStorage.getItem('scheme_ai_language');
  });

  // 2. User & Profile State
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('scheme_ai_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    // Default Guest Citizen Profile (Tamil Nadu)
    return {
      id: 'guest_citizen',
      name: 'குடிமக்கள் பயனாளி',
      emailOrMobile: 'guest@schemeai.tn.gov',
      language: 'ta',
      age: 22,
      gender: 'female',
      state: 'Tamil Nadu',
      district: 'Chennai',
      occupation: 'student',
      annualIncome: 150000,
      educationLevel: 'graduate',
      beneficiaryCategory: 'bc',
      isStudent: true,
      isFarmer: false,
      hasDisability: false,
      isGuest: true
    };
  });

  // 3. Saved Schemes State
  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('scheme_ai_saved_schemes');
    return saved ? JSON.parse(saved) : ['kmut_001', 'tn_pudhumai_penn'];
  });

  // 4. View & Navigation State
  const [currentView, setCurrentView] = useState<'explore' | 'dashboard'>('explore');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedSchemeForModal, setSelectedSchemeForModal] = useState<Scheme | null>(null);

  // 5. Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SchemeCategory | 'All'>('All');
  const [selectedGovtLevel, setSelectedGovtLevel] = useState<'All' | 'Tamil Nadu Government' | 'Central Government'>('All');
  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState<string>('All');
  const [sortByMatch, setSortByMatch] = useState(true);

  const t = UI_STRINGS[language];

  // Save language preference
  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('scheme_ai_language', lang);
    setShowLanguageWelcome(false);
    if (currentUser) {
      const updated = { ...currentUser, language: lang };
      setCurrentUser(updated);
      localStorage.setItem('scheme_ai_current_user', JSON.stringify(updated));
    }
  };

  const handleToggleLanguage = () => {
    const nextLang = language === 'ta' ? 'en' : 'ta';
    handleSelectLanguage(nextLang);
  };

  // Toggle Save Scheme
  const handleToggleSave = (schemeId: string) => {
    setSavedSchemeIds(prev => {
      const exists = prev.includes(schemeId);
      const updated = exists ? prev.filter(id => id !== schemeId) : [...prev, schemeId];
      localStorage.setItem('scheme_ai_saved_schemes', JSON.stringify(updated));
      return updated;
    });
  };

  // Run AI Recommendation Engine for current user profile
  const evaluations = useMemo(() => {
    return RecommendationEngine.evaluateSchemes(currentUser, SCHEMES_DATABASE);
  }, [currentUser]);

  // Run Natural Language Search (Tamil AI search or English keyword)
  const nlpResult: NLPSearchResult | null = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return NLPSearchService.search(searchQuery, SCHEMES_DATABASE);
  }, [searchQuery]);

  // Filter and Rank Schemes
  const filteredSchemes = useMemo(() => {
    let list: Scheme[] = nlpResult ? nlpResult.matchedSchemes : SCHEMES_DATABASE;

    // Filter by category
    if (selectedCategory !== 'All') {
      list = list.filter((s: Scheme) => s.category === selectedCategory);
    }

    // Filter by government level (Tamil Nadu Govt vs Central Govt)
    if (selectedGovtLevel !== 'All') {
      list = list.filter((s: Scheme) => s.government_level === selectedGovtLevel);
    }

    // Filter by district availability
    if (selectedDistrictFilter !== 'All') {
      list = list.filter((s: Scheme) => {
        if (s.districtAvailability === 'All') return true;
        return s.districtAvailability.map((d: string) => d.toLowerCase()).includes(selectedDistrictFilter.toLowerCase());
      });
    }

    // Sort by AI Match score
    if (sortByMatch) {
      list = [...list].sort((a: Scheme, b: Scheme) => {
        const scoreA = evaluations.get(a.id)?.matchScore ?? 50;
        const scoreB = evaluations.get(b.id)?.matchScore ?? 50;
        return scoreB - scoreA;
      });
    }

    return list;
  }, [nlpResult, selectedCategory, selectedGovtLevel, selectedDistrictFilter, sortByMatch, evaluations]);

  // Saved Schemes Objects
  const savedSchemesList = useMemo(() => {
    return SCHEMES_DATABASE.filter((s: Scheme) => savedSchemeIds.includes(s.id));
  }, [savedSchemeIds]);

  // Recommended Schemes Objects (Sorted by score)
  const recommendedSchemesList = useMemo(() => {
    return [...SCHEMES_DATABASE].sort((a: Scheme, b: Scheme) => {
      const scoreA = evaluations.get(a.id)?.matchScore ?? 50;
      const scoreB = evaluations.get(b.id)?.matchScore ?? 50;
      return scoreB - scoreA;
    });
  }, [evaluations]);

  // Handle Profile Update & AI Animation
  const handleProfileSubmit = (updatedProfile: UserProfile) => {
    setCurrentUser(updatedProfile);
    localStorage.setItem('scheme_ai_current_user', JSON.stringify(updatedProfile));
    setIsProfileOpen(false);
    setIsAnalyzing(true);
  };

  const handleAnalysisComplete = () => {
    setIsAnalyzing(false);
    // Smooth scroll down to scheme recommendations
    const resultsElem = document.getElementById('schemes-section');
    if (resultsElem) {
      resultsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Top Statistics
  const tnGovtSchemesCount = useMemo(() => {
    return SCHEMES_DATABASE.filter((s: Scheme) => s.government_level === 'Tamil Nadu Government').length;
  }, []);

  const centralGovtSchemesCount = useMemo(() => {
    return SCHEMES_DATABASE.filter((s: Scheme) => s.government_level === 'Central Government').length;
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* 1. Language Welcome Screen Modal (first visit) */}
      <LanguageWelcomeModal
        isOpen={showLanguageWelcome}
        onSelectLanguage={handleSelectLanguage}
      />

      {/* 2. Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthOpen(false);
        }}
        onContinueAsGuest={() => {
          setIsAuthOpen(false);
        }}
      />

      {/* 3. Citizen Profile Modal (Tamil Nadu Location Flow) */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        language={language}
        initialProfile={currentUser}
        onSubmit={handleProfileSubmit}
      />

      {/* 4. AI Analysis Loading Animation */}
      {isAnalyzing && (
        <AIAnalysisAnimation
          language={language}
          onComplete={handleAnalysisComplete}
        />
      )}

      {/* 5. Detailed Scheme Modal */}
      <SchemeDetailModal
        scheme={selectedSchemeForModal}
        isOpen={!!selectedSchemeForModal}
        onClose={() => setSelectedSchemeForModal(null)}
        language={language}
        evaluation={selectedSchemeForModal ? evaluations.get(selectedSchemeForModal.id) : undefined}
        isSaved={selectedSchemeForModal ? savedSchemeIds.includes(selectedSchemeForModal.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* Navigation Header */}
      <Navbar
        language={language}
        onToggleLanguage={handleToggleLanguage}
        currentUser={currentUser}
        savedCount={savedSchemeIds.length}
        currentView={currentView}
        onSelectView={setCurrentView}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => {
          localStorage.removeItem('scheme_ai_current_user');
          setCurrentUser({
            id: 'guest_' + Date.now(),
            name: language === 'ta' ? 'விருந்தினர்' : 'Guest Citizen',
            emailOrMobile: 'guest@schemeai.tn.gov',
            language,
            age: 22,
            gender: 'female',
            state: 'Tamil Nadu',
            district: 'Chennai',
            occupation: 'student',
            annualIncome: 150000,
            educationLevel: 'graduate',
            beneficiaryCategory: 'bc',
            isStudent: true,
            isFarmer: false,
            hasDisability: false,
            isGuest: true
          });
        }}
        onQuickMatchClick={() => setIsProfileOpen(true)}
      />

      {/* Main View Router */}
      {currentView === 'dashboard' ? (
        <DashboardView
          currentUser={currentUser}
          language={language}
          savedSchemes={savedSchemesList}
          recommendedSchemes={recommendedSchemesList}
          evaluations={evaluations}
          onToggleSave={handleToggleSave}
          onViewDetails={setSelectedSchemeForModal}
          onOpenProfile={() => setIsProfileOpen(true)}
          onExploreAll={() => setCurrentView('explore')}
        />
      ) : (
        <main className="flex-1">
          {/* Quick Hero Banner with Tamil AI Search & "எனக்கு என்ன திட்டம்?" */}
          <QuickHero
            language={language}
            onOpenProfile={() => setIsProfileOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            nlpResult={nlpResult}
            onSelectCategoryFilter={setSelectedCategory}
            selectedCategory={selectedCategory}
            selectedGovtLevel={selectedGovtLevel}
            onSelectGovtLevel={setSelectedGovtLevel}
          />

          {/* Scheme Discovery & Filter Section */}
          <section id="schemes-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {/* Government Level Distinction Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">
                  {t.govtLevelFilter}:
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedGovtLevel('All')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    selectedGovtLevel === 'All'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t.allGovtLevels} ({SCHEMES_DATABASE.length})
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedGovtLevel('Tamil Nadu Government')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    selectedGovtLevel === 'Tamil Nadu Government'
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-teal-50 text-teal-900 border border-teal-200 hover:bg-teal-100'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  <span>{t.tnGovtOnly} ({tnGovtSchemesCount})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedGovtLevel('Central Government')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    selectedGovtLevel === 'Central Government'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>{t.centralGovtOnly} ({centralGovtSchemesCount})</span>
                </button>
              </div>

              {/* District Filter Dropdown */}
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-teal-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-600 hidden sm:inline">
                  {t.districtFilter}:
                </span>
                <select
                  value={selectedDistrictFilter}
                  onChange={(e) => setSelectedDistrictFilter(e.target.value)}
                  className="text-xs font-medium py-1.5 px-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="All">{t.allDistricts}</option>
                  {TAMIL_NADU_DISTRICTS.map(d => (
                    <option key={d.id} value={d.name_en}>
                      {language === 'ta' ? `${d.name_ta} (${d.name_en})` : d.name_en}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Scheme Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedCategory('All')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                  selectedCategory === 'All'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {language === 'ta' ? 'அனைத்து பிரிவுகள்' : 'All Categories'}
              </button>

              {CATEGORIES_LIST.map((cat) => {
                const label = CATEGORY_NAMES[cat]?.[language] || cat;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Active Citizen Profile Match Status Pill */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 via-sky-50 to-white border border-teal-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-teal-600 text-white">
                  <Sparkles size={16} />
                </div>
                <div>
                  <span className="font-bold text-teal-950 block">
                    {language === 'ta' ? 'சுயவிவர அடிப்படையிலான AI தரவரிசை' : 'Citizen Profile AI Matching Active'}
                  </span>
                  <span className="text-teal-800">
                    {language === 'ta'
                      ? `மாவட்டம்: ${currentUser.district} | வயது: ${currentUser.age} | தொழில்: ${currentUser.occupation} | வருமானம்: ₹${(currentUser.annualIncome / 100000).toFixed(1)}L`
                      : `District: ${currentUser.district} | Age: ${currentUser.age} | Occupation: ${currentUser.occupation} | Income: ₹${(currentUser.annualIncome / 100000).toFixed(1)}L`}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsProfileOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-white border border-teal-300 text-teal-800 font-semibold hover:bg-teal-50 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>{language === 'ta' ? 'சுயவிவரத்தை மாற்றுக' : 'Change Inputs'}</span>
                <ChevronRight size={13} />
              </button>
            </div>

            {/* Scheme Cards Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers size={18} className="text-teal-700" />
                  <h2 className="text-lg font-bold text-slate-900">
                    {language === 'ta' ? 'கிடைக்கக்கூடிய அரசு நலத்திட்டங்கள்' : 'Available Government Welfare Schemes'}
                  </h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold">
                    {filteredSchemes.length}
                  </span>
                </div>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sortByMatch}
                    onChange={(e) => setSortByMatch(e.target.checked)}
                    className="w-3.5 h-3.5 text-teal-600 rounded"
                  />
                  <span>{language === 'ta' ? 'AI பொருத்தம் அடிப்படையில் வரிசைப்படுத்து' : 'Rank by AI Match'}</span>
                </label>
              </div>

              {filteredSchemes.length === 0 ? (
                <div className="p-12 bg-white rounded-3xl border border-dashed border-slate-300 text-center space-y-3">
                  <Search size={32} className="text-slate-400 mx-auto" />
                  <h3 className="text-base font-bold text-slate-800">
                    {language === 'ta' ? 'திட்டங்கள் எதுவும் காணப்படவில்லை' : 'No schemes match the current filters'}
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    {language === 'ta'
                      ? 'தேடல் வினவலை அல்லது வடிகட்டிகளை மாற்றி மீண்டும் முயற்சிக்கவும்.'
                      : 'Try clearing your search query or selecting "All Categories" to view all available welfare schemes.'}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedGovtLevel('All');
                      setSelectedDistrictFilter('All');
                    }}
                    className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700 transition-colors cursor-pointer"
                  >
                    {language === 'ta' ? 'அனைத்து வடிகட்டிகளையும் நீக்கு' : 'Reset All Filters'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSchemes.map((scheme: Scheme) => (
                    <SchemeCard
                      key={scheme.id}
                      scheme={scheme}
                      language={language}
                      evaluation={evaluations.get(scheme.id)}
                      isSaved={savedSchemeIds.includes(scheme.id)}
                      onToggleSave={handleToggleSave}
                      onViewDetails={setSelectedSchemeForModal}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
      )}

      {/* Verified Government Disclaimer & Citizen Trust Footer */}
      <footer className="mt-auto bg-slate-900 text-white border-t border-teal-500/20 pt-10 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <SchemeAILogo language={language} size="md" />
              <p className="text-xs text-slate-400 max-w-md mt-2 leading-relaxed">
                {language === 'ta'
                  ? 'தமிழ்நாடு மற்றும் மத்திய அரசின் அனைத்து நலத்திட்டங்களையும் சாமானிய மக்கள் எளிதாக அறிந்துகொள்ள உதவும் வழிகாட்டுதல் தளம்.'
                  : 'AI-assisted citizen discovery platform to increase awareness and accessibility of welfare schemes across Tamil Nadu.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <span className="font-semibold text-teal-400">
                {language === 'ta' ? 'அதிகாரப்பூர்வ அரசு தளங்கள்:' : 'Official Reference Portals:'}
              </span>
              <a
                href="https://www.tn.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline decoration-slate-600"
              >
                tn.gov.in
              </a>
              <span>•</span>
              <a
                href="https://tnega.tn.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline decoration-slate-600"
              >
                tnega.tn.gov.in
              </a>
              <span>•</span>
              <a
                href="https://www.myscheme.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline decoration-slate-600"
              >
                myscheme.gov.in
              </a>
            </div>
          </div>

          {/* Mandatory Clear Trust Disclaimer */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-teal-400 font-semibold">
              <ShieldCheck size={16} />
              <span>{t.trustIndicatorTitle}</span>
            </div>
            <p className="leading-relaxed">
              {t.disclaimerNotice}
            </p>
            <p className="text-[11px] text-slate-500">
              {language === 'ta'
                ? 'அனைத்து திட்ட தகவல்களும் அரசு அறிவிப்புகள், அரசிதழ்கள் மற்றும் அதிகாரப்பூர்வ இணையதளங்களின் அடிப்படையில் தொகுக்கப்பட்டுள்ளன. உதவித்தொகை மற்றும் தகுதி இறுதி முடிவுகளை தமிழ்நாடு அரசு மற்றும் மத்திய அரசு துறைகளே முடிவு செய்யும்.'
                : 'All scheme details are gathered from public official gazettes and state portals. Final eligibility determinations and approvals rest exclusively with the designated government authorities.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <span>© {new Date().getFullYear()} Scheme AI. {t.tagline}</span>
            <div className="flex items-center gap-4">
              <button onClick={() => setIsProfileOpen(true)} className="hover:text-slate-300">
                {t.profileTitle}
              </button>
              <button onClick={handleToggleLanguage} className="hover:text-slate-300">
                {language === 'ta' ? 'English' : 'தமிழ்'}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* 1. Language Welcome Modal (First-time visitor) */}
      <LanguageWelcomeModal
        isOpen={showLanguageWelcome}
        onSelectLanguage={handleSelectLanguage}
      />

      {/* 2. Citizen Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onSuccess={(user) => {
          setCurrentUser(user);
          localStorage.setItem('scheme_ai_current_user', JSON.stringify(user));
          setIsAuthOpen(false);
        }}
        onContinueAsGuest={() => {
          setIsAuthOpen(false);
        }}
      />

      {/* 3. Citizen Profile Editor Modal ("எனக்கு என்ன திட்டம்?" / Edit Profile) */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        language={language}
        initialProfile={currentUser}
        onSubmit={handleProfileSubmit}
      />

      {/* 4. Comprehensive Scheme Detail Modal with Related Schemes */}
      <SchemeDetailModal
        scheme={selectedSchemeForModal}
        isOpen={!!selectedSchemeForModal}
        onClose={() => setSelectedSchemeForModal(null)}
        language={language}
        evaluation={selectedSchemeForModal ? evaluations.get(selectedSchemeForModal.id) : undefined}
        isSaved={selectedSchemeForModal ? savedSchemeIds.includes(selectedSchemeForModal.id) : false}
        onToggleSave={handleToggleSave}
        allSchemes={SCHEMES_DATABASE}
        onSelectScheme={(s: Scheme) => setSelectedSchemeForModal(s)}
      />

      {/* 5. AI Rules Analysis Animation */}
      {isAnalyzing && (
        <AIAnalysisAnimation
          language={language}
          onComplete={handleAnalysisComplete}
        />
      )}

      {/* 6. Modern Messaging AI Chatbot with Voice Notes and Read Aloud */}
      <SchemeAIChatbot
        language={language}
        currentUser={currentUser}
        onViewSchemeDetails={(s: Scheme) => setSelectedSchemeForModal(s)}
      />
    </div>
  );
}
