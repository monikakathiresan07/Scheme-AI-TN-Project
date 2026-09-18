import { useState } from 'react';
import { motion } from 'motion/react';
import { Language, UserProfile } from '../types';
import { UI_STRINGS } from '../translations';
import { SchemeAILogo } from './SchemeAILogo';
import { Mail, Lock, User, ArrowRight, UserCheck, Globe, X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose?: () => void;
  language: Language;
  onToggleLanguage: () => void;
  onSuccess: (user: UserProfile) => void;
  onContinueAsGuest: () => void;
}

export function AuthModal({
  isOpen,
  onClose,
  language,
  onToggleLanguage,
  onSuccess,
  onContinueAsGuest
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const t = UI_STRINGS[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!emailOrMobile.trim() || !password.trim()) {
      setError(language === 'ta' ? 'அனைத்து விவரங்களையும் உள்ளிடவும்' : 'Please fill in all required fields');
      return;
    }

    if (mode === 'register' && !name.trim()) {
      setError(language === 'ta' ? 'உங்கள் பெயரை உள்ளிடவும்' : 'Please enter your full name');
      return;
    }

    // Authenticate or mock profile for MVP
    const existingUsersRaw = localStorage.getItem('scheme_ai_users');
    const users: Array<{ id: string; name: string; emailOrMobile: string }> = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];

    let activeUser: UserProfile;

    if (mode === 'login') {
      const found = users.find(u => u.emailOrMobile.toLowerCase() === emailOrMobile.trim().toLowerCase());
      const userName = found ? found.name : (emailOrMobile.includes('@') ? emailOrMobile.split('@')[0] : 'Citizen User');
      
      activeUser = {
        id: found ? found.id : 'usr_' + Date.now(),
        name: userName,
        emailOrMobile: emailOrMobile.trim(),
        language,
        age: 23,
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
        isGuest: false
      };
    } else {
      const newUser = {
        id: 'usr_' + Date.now(),
        name: name.trim(),
        emailOrMobile: emailOrMobile.trim()
      };
      users.push(newUser);
      localStorage.setItem('scheme_ai_users', JSON.stringify(users));

      activeUser = {
        id: newUser.id,
        name: newUser.name,
        emailOrMobile: newUser.emailOrMobile,
        language,
        age: 22,
        gender: 'female',
        state: 'Tamil Nadu',
        district: 'Coimbatore',
        occupation: 'student',
        annualIncome: 180000,
        educationLevel: 'graduate',
        beneficiaryCategory: 'bc',
        isStudent: true,
        isFarmer: false,
        hasDisability: false,
        isGuest: false
      };
    }

    localStorage.setItem('scheme_ai_current_user', JSON.stringify(activeUser));
    onSuccess(activeUser);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
      >
        {/* Language switch & Close bar */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2 bg-slate-50 border-b border-slate-100">
          <button
            type="button"
            onClick={onToggleLanguage}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 bg-white hover:bg-teal-50 px-3 py-1 rounded-full border border-teal-200 transition-colors cursor-pointer"
          >
            <Globe size={13} />
            <span>{language === 'ta' ? 'Switch to English' : 'தமிழுக்கு மாறவும்'}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
              title={t.closeBtn}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Brand Header */}
        <div className="px-6 pt-6 pb-4 text-center">
          <div className="flex justify-center mb-3">
            <SchemeAILogo size="md" language={language} />
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            {mode === 'login' ? t.loginWelcome : t.registerWelcome}
          </h3>
          <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-xs mx-auto">
            {mode === 'login' ? t.loginSubtitle : t.registerSubtitle}
          </p>
        </div>

        {/* Tab switch */}
        <div className="px-6 mb-4">
          <div className="flex p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.loginBtn}
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.registerBtn}
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3.5">
          {error && (
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {t.fullName}
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Meenakshi Sundaram"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              {t.emailOrMobile}
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={emailOrMobile}
                onChange={(e) => setEmailOrMobile(e.target.value)}
                placeholder="e.g. 9876543210 or user@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              {t.password}
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white text-sm font-semibold shadow-md shadow-teal-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <span>{mode === 'login' ? t.loginBtn : t.registerBtn}</span>
            <ArrowRight size={16} />
          </button>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-slate-400">or</span>
            </div>
          </div>

          {/* Continue as Guest */}
          <button
            type="button"
            onClick={onContinueAsGuest}
            className="w-full py-2.5 px-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserCheck size={15} className="text-teal-600" />
            <span>{t.continueAsGuest}</span>
          </button>

          <p className="text-[11px] text-slate-400 text-center leading-relaxed">
            {t.guestNotice}
          </p>
        </form>
      </motion.div>
    </div>
  );
}
