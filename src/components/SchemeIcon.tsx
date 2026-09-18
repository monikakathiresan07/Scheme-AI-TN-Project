import {
  GraduationCap,
  Sprout,
  Heart,
  Home,
  Briefcase,
  Sparkles,
  Accessibility,
  UserCheck,
  Coins,
  ShieldAlert,
  Building,
  Users
} from 'lucide-react';

interface SchemeIconProps {
  type: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function SchemeIcon({ type, className = '', size = 'md' }: SchemeIconProps) {
  const containerDimensions = {
    sm: 'w-8 h-8 rounded-lg text-sm',
    md: 'w-11 h-11 rounded-xl text-base',
    lg: 'w-14 h-14 rounded-2xl text-xl'
  }[size];

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 26
  }[size];

  // Visual identity styling by category archetype
  switch (type) {
    case 'graduation':
      return (
        <div className={`flex items-center justify-center ${containerDimensions} bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-xs ${className}`}>
          <GraduationCap size={iconSizes} strokeWidth={2.2} />
        </div>
      );
    case 'leaf':
      return (
        <div className={`flex items-center justify-center ${containerDimensions} bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs ${className}`}>
          <Sprout size={iconSizes} strokeWidth={2.2} />
        </div>
      );
    case 'women':
      return (
        <div className={`flex items-center justify-center ${containerDimensions} bg-rose-50 text-rose-700 border border-rose-200/80 shadow-xs ${className}`}>
          <Users size={iconSizes} strokeWidth={2.2} />
        </div>
      );
    case 'heart':
      return (
        <div className={`flex items-center justify-center ${containerDimensions} bg-red-50 text-red-700 border border-red-200/80 shadow-xs ${className}`}>
          <Heart size={iconSizes} strokeWidth={2.2} />
        </div>
      );
    case 'home':
      return (
        <div className={`flex items-center justify-center ${containerDimensions} bg-amber-50 text-amber-700 border border-amber-200/80 shadow-xs ${className}`}>
          <Home size={iconSizes} strokeWidth={2.2} />
        </div>
      );
    case 'briefcase':
      return (
        <div className={`flex items-center justify-center ${containerDimensions} bg-teal-50 text-teal-700 border border-teal-200/80 shadow-xs ${className}`}>
          <Briefcase size={iconSizes} strokeWidth={2.2} />
        </div>
      );
    case 'sparkles':
      return (
        <div className={`flex items-center justify-center ${containerDimensions} bg-violet-50 text-violet-700 border border-violet-200/80 shadow-xs ${className}`}>
          <Sparkles size={iconSizes} strokeWidth={2.2} />
        </div>
      );
    case 'wheelchair':
      return (
        <div className={`flex items-center justify-center ${containerDimensions} bg-sky-50 text-sky-700 border border-sky-200/80 shadow-xs ${className}`}>
          <Accessibility size={iconSizes} strokeWidth={2.2} />
        </div>
      );
    case 'user-check':
      return (
        <div className={`flex items-center justify-center ${containerDimensions} bg-amber-50 text-amber-800 border border-amber-200/80 shadow-xs ${className}`}>
          <UserCheck size={iconSizes} strokeWidth={2.2} />
        </div>
      );
    case 'coins':
      return (
        <div className={`flex items-center justify-center ${containerDimensions} bg-yellow-50 text-yellow-800 border border-yellow-200/80 shadow-xs ${className}`}>
          <Coins size={iconSizes} strokeWidth={2.2} />
        </div>
      );
    case 'shield':
    default:
      return (
        <div className={`flex items-center justify-center ${containerDimensions} bg-slate-100 text-slate-700 border border-slate-200 shadow-xs ${className}`}>
          <ShieldAlert size={iconSizes} strokeWidth={2.2} />
        </div>
      );
  }
}
