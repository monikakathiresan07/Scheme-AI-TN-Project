import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Mic, User } from 'lucide-react';

interface AudioVoiceBubbleProps {
  audioUrl?: string;
  duration?: number;
  transcribedText?: string;
  timestamp?: Date;
  language?: 'ta' | 'en';
}

export function AudioVoiceBubble({
  audioUrl,
  duration = 4,
  transcribedText,
  timestamp = new Date(),
  language = 'ta'
}: AudioVoiceBubbleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(duration);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Setup actual audio or fallback progress simulation
  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onloadedmetadata = () => {
        if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
          setTotalDuration(Math.round(audio.duration));
        }
      };

      audio.ontimeupdate = () => {
        setCurrentTime(Math.round(audio.currentTime));
      };

      audio.onended = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };

      return () => {
        audio.pause();
        audio.src = '';
      };
    }
  }, [audioUrl]);

  // Clean interval timer fallback if needed
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // If browser audio blocked, simulate timeline
          simulatePlayback();
        });
      }
    } else {
      simulatePlayback();
    }
  };

  const simulatePlayback = () => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    let curr = currentTime >= totalDuration ? 0 : currentTime;
    setCurrentTime(curr);

    intervalRef.current = window.setInterval(() => {
      curr += 1;
      if (curr >= totalDuration) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsPlaying(false);
        setCurrentTime(0);
      } else {
        setCurrentTime(curr);
      }
    }, 1000);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  // 18 pseudo waveform bar heights
  const bars = [
    30, 60, 40, 85, 55, 95, 70, 45, 80, 100, 65, 45, 90, 75, 40, 60, 30, 50
  ];

  return (
    <div className="flex flex-col items-end gap-1.5 max-w-[290px] sm:max-w-[320px]">
      {/* WhatsApp-style voice note bubble */}
      <div className="relative p-3 rounded-2xl rounded-tr-xs bg-gradient-to-br from-teal-800 to-teal-900 text-white shadow-md border border-teal-700/60 w-full">
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause voice message' : 'Play voice message'}
            className="w-10 h-10 rounded-full bg-teal-500 hover:bg-teal-400 active:scale-95 text-slate-950 flex items-center justify-center shrink-0 transition-transform shadow-sm cursor-pointer"
          >
            {isPlaying ? (
              <Pause size={17} className="fill-slate-950" />
            ) : (
              <Play size={17} className="fill-slate-950 ml-0.5" />
            )}
          </button>

          {/* Waveform Visualization */}
          <div className="flex-1 flex flex-col justify-center gap-1.5">
            <div className="flex items-center gap-1 h-7">
              {bars.map((height, i) => {
                const barProgress = (i / bars.length) * 100;
                const isPassed = barProgress <= progressPercent;
                return (
                  <div
                    key={i}
                    style={{ height: `${height}%` }}
                    className={`w-1 rounded-full transition-all duration-150 ${
                      isPassed
                        ? 'bg-amber-400'
                        : 'bg-teal-400/40'
                    } ${isPlaying && isPassed ? 'scale-y-110' : ''}`}
                  />
                );
              })}
            </div>

            {/* Time & Mic Status */}
            <div className="flex items-center justify-between text-[11px] text-teal-200/90 font-mono">
              <span>{formatTime(currentTime > 0 ? currentTime : totalDuration)}</span>
              <div className="flex items-center gap-1 text-[10px] text-teal-300">
                <Mic size={11} className="text-teal-300" />
                <span>{language === 'ta' ? 'குரல் பதிவு' : 'Voice Note'}</span>
              </div>
            </div>
          </div>

          {/* User Avatar */}
          <div className="relative w-8 h-8 rounded-full bg-teal-950/80 border border-teal-600/40 flex items-center justify-center shrink-0">
            <User size={15} className="text-teal-300" />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-teal-400 text-slate-950 flex items-center justify-center text-[8px] font-bold">
              🎤
            </span>
          </div>
        </div>
      </div>

      {/* Transcribed Text Preview */}
      {transcribedText && (
        <div className="px-3.5 py-2 rounded-xl rounded-tr-xs bg-teal-50 border border-teal-200/80 text-xs text-teal-950 font-medium leading-relaxed max-w-full shadow-2xs">
          <span className="text-[10px] text-teal-700 block font-bold mb-0.5 uppercase tracking-wider">
            {language === 'ta' ? 'உரையாக மாற்றப்பட்டது:' : 'Transcribed Query:'}
          </span>
          "{transcribedText}"
        </div>
      )}

      {/* Timestamp */}
      <span className="text-[10px] text-slate-400 mr-1">
        {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
}
