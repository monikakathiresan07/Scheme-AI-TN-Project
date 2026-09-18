import { useState } from 'react';
import { Language, UserProfile } from '../types';
import { UI_STRINGS } from '../translations';
import { SchemeAILogo } from './SchemeAILogo';
import {
  Globe,
  Bookmark,
  Sparkles,
  User,
  LogOut,
  LogIn,
  LayoutDashboard,
  Compass,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  currentUser: UserProfile | null;
  savedCount: number;
  currentView: 'explore' | 'dashboard';
  onSelectView: (view: 'explore' | 'dashboard') => void;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  onQuickMatchClick: () => void;
}

export function Navbar({
  language,
  onToggleLanguage,
  currentUser,
  savedCount,
  currentView,
  onSelectView,
  onOpenProfile,
  onOpenAuth,
  onLogout,
  onQuickMatchClick
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = UI_STRINGS[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectView('explore')}
              className="text-left focus:outline-none cursor-pointer"
            >
              <SchemeAILogo language={language} size="md" />
            </button>
          </div>

          {/* Desktop Navigation Links & Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* View Switchers */}
            <button
              onClick={() => onSelectView('explore')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentView === 'explore'
                  ? 'bg-teal-50 text-teal-800 border border-teal-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Compass size={15} />
              <span>{t.navExplore}</span>
            </button>

            {currentUser && !currentUser.isGuest && (
              <button
                onClick={() => onSelectView('dashboard')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'dashboard'
                    ? 'bg-teal-50 text-teal-800 border border-teal-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <LayoutDashboard size={15} />
                <span>{t.navDashboard}</span>
              </button>
            )}

            {/* Prominent Signature "எனக்கு என்ன திட்டம்?" Button */}
            <button
              type="button"
              onClick={onQuickMatchClick}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 via-teal-700 to-slate-900 hover:from-teal-700 hover:to-slate-950 text-white text-xs font-bold shadow-sm shadow-teal-900/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Sparkles size={14} className="text-amber-300" />
              <span>{t.quickHeroTaBtn}</span>
            </button>

            {/* Saved Schemes Counter */}
            <button
              onClick={() => {
                if (currentUser && !currentUser.isGuest) {
                  onSelectView('dashboard');
                } else {
                  onOpenAuth();
                }
              }}
              className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title={t.navSaved}
            >
              <Bookmark size={15} className="text-amber-600" />
              <span>{t.navSaved}</span>
              {savedCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[11px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Language Switch Pill */}
            <button
              type="button"
              onClick={onToggleLanguage}
              className="px-3 py-2 rounded-xl border border-teal-200 bg-teal-50/70 hover:bg-teal-100 text-teal-900 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title={t.changeLanguage}
            >
              <Globe size={14} className="text-teal-700" />
              <span>{language === 'ta' ? 'English' : 'தமிழ்'}</span>
            </button>

            {/* User Account state */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <button
                  type="button"
                  onClick={onOpenProfile}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
                >
                  <User size={14} className="text-teal-700" />
                  <span className="max-w-[110px] truncate">{currentUser.name}</span>
                  {currentUser.isGuest && (
                    <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                      {t.guestBadge}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  title={t.navLogout}
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenAuth}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <LogIn size={15} />
                <span>{t.navLogin}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={onToggleLanguage}
              className="px-2.5 py-1.5 rounded-lg border border-teal-200 bg-teal-50 text-teal-900 text-xs font-semibold flex items-center gap-1"
            >
              <Globe size={13} />
              <span>{language === 'ta' ? 'EN' : 'தமிழ்'}</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 space-y-3">
            <button
              type="button"
              onClick={() => {
                onQuickMatchClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-slate-900 text-white text-xs font-bold flex items-center justify-center gap-2"
            >
              <Sparkles size={15} className="text-amber-300" />
              <span>{t.quickHeroTaBtn}</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onSelectView('explore');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-xs font-semibold text-center border ${
                  currentView === 'explore' ? 'bg-teal-50 border-teal-300 text-teal-900' : 'bg-white border-slate-200'
                }`}
              >
                {t.navExplore}
              </button>

              <button
                onClick={() => {
                  if (currentUser && !currentUser.isGuest) {
                    onSelectView('dashboard');
                  } else {
                    onOpenAuth();
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl text-xs font-semibold text-center bg-white border border-slate-200 flex items-center justify-center gap-1.5"
              >
                <Bookmark size={14} className="text-amber-600" />
                <span>{t.navSaved} ({savedCount})</span>
              </button>
            </div>

            {currentUser ? (
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    onOpenProfile();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xs font-semibold text-slate-800 flex items-center gap-2"
                >
                  <User size={15} className="text-teal-600" />
                  <span>{currentUser.name}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xs font-semibold text-rose-600 flex items-center gap-1"
                >
                  <LogOut size={14} />
                  <span>{t.navLogout}</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onOpenAuth();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold text-center"
              >
                {t.navLogin}
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
