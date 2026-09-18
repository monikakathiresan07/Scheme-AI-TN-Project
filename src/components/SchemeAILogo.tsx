interface SchemeAILogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  language?: 'en' | 'ta';
}

export function SchemeAILogo({
  className = '',
  size = 'md',
  showText = true,
  language = 'en'
}: SchemeAILogoProps) {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  }[size];

  const titleSize = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Original Scheme AI Logo: Abstract "S" formed by AI neural nodes, modern geometric flow */}
      <div className={`relative flex items-center justify-center ${iconDimensions} rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white shadow-md shadow-teal-950/20 border border-teal-500/30 p-1.5`}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Subtle neural connecting mesh */}
          <line x1="36" y1="12" x2="24" y2="24" stroke="#14B8A6" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.6" />
          <line x1="12" y1="36" x2="24" y2="24" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.6" />
          <line x1="12" y1="12" x2="24" y2="24" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.4" />
          <line x1="36" y1="36" x2="24" y2="24" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.4" />

          {/* Abstract S curvature paths */}
          <path
            d="M36 12C36 12 34 8 26 8C18 8 13 13 13 19C13 25 21 27 26 29C32 31 35 34 35 39C35 45 28 47 21 47C14 47 11 42 11 42"
            stroke="url(#s-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* AI Neural Nodes */}
          <circle cx="36" cy="12" r="3.5" fill="#14B8A6" className="animate-pulse" />
          <circle cx="13" cy="19" r="3" fill="#38BDF8" />
          <circle cx="24" cy="24" r="3" fill="#FBBF24" />
          <circle cx="35" cy="39" r="3" fill="#2DD4BF" />
          <circle cx="12" cy="36" r="3.5" fill="#F59E0B" />

          <defs>
            <linearGradient id="s-gradient" x1="10" y1="8" x2="38" y2="47" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2DD4BF" />
              <stop offset="0.5" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span className={`font-bold tracking-tight text-slate-900 ${titleSize} font-sans`}>
              SCHEME <span className="text-teal-600">AI</span>
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
              {language === 'ta' ? 'தமிழ்நாடு' : 'TN'}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            {language === 'ta' ? 'சரியான திட்டத்தை அறிந்திடுங்கள்' : 'Smart Discovery. Better Awareness.'}
          </span>
        </div>
      )}
    </div>
  );
}
