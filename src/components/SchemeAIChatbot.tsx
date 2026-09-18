import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  X,
  Send,
  Mic,
  Square,
  Volume2,
  VolumeX,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Trash2,
  CheckCircle2,
  HelpCircle,
  Compass
} from 'lucide-react';
import { Scheme, Language, UserProfile } from '../types';
import { SchemeAILogo } from './SchemeAILogo';
import { AudioVoiceBubble } from './AudioVoiceBubble';
import { SchemeAIChatbotService, ChatMessage } from '../services/chatbotService';

interface SchemeAIChatbotProps {
  language: Language;
  currentUser: UserProfile;
  onViewSchemeDetails?: (scheme: Scheme) => void;
}

export function SchemeAIChatbot({
  language,
  currentUser,
  onViewSchemeDetails
}: SchemeAIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'msg-welcome',
        sender: 'assistant',
        text:
          language === 'ta'
            ? 'வணக்கம்! நான் Scheme AI வழிகாட்டி உதவியாளர். தமிழ்நாடு மற்றும் மத்திய அரசு நலத்திட்டங்கள், தேவையான ஆவணங்கள் மற்றும் விண்ணப்பிக்கும் முறைகள் பற்றி என்னிடம் தமிழில் அல்லது ஆங்கிலத்தில் கேளுங்கள். நீங்கள் குரல் குறிப்பு (Voice Note) அனுப்பலாம்!'
            : 'Hello! I am your Scheme AI welfare guide assistant. Ask me about Tamil Nadu & Central Government schemes, required certificates, or how to apply in English or Tamil. You can also send voice notes!',
        timestamp: new Date(),
        language: language
      }
    ];
  });

  // Voice recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordTimerRef = useRef<number | null>(null);
  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef<string>('');

  // Speech synthesis (TTS - Read Aloud) states
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Clean speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (recordTimerRef.current) clearInterval(recordTimerRef.current);
    };
  }, []);

  // Quick suggestion prompts
  const suggestions = language === 'ta'
    ? [
        'எனக்கு என்ன திட்டம்?',
        'நான் கோயம்புத்தூரைச் சேர்ந்த 19 வயது மாணவன்',
        'கலைஞர் மகளிர் உரிமைத் திட்ட ஆவணங்கள் என்ன?',
        'Pudhumai Penn திட்டத்திற்கு எப்படி விண்ணப்பிப்பது?',
        'விவசாயிகளுக்கு என்ன உதவி இருக்கு?'
      ]
    : [
        'Which schemes may be relevant to me?',
        'I am a 19 year old student from Coimbatore',
        'What documents are required for Kalaignar Magalir Urimai Thittam?',
        'How can I apply for Pudhumai Penn Scheme?',
        'What schemes exist for farmers?'
      ];

  // Send a text or voice query to the chatbot engine
  const handleSendQuery = async (queryText: string, voiceData?: { url: string; duration: number }) => {
    if (!queryText.trim() && !voiceData) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      text: queryText,
      timestamp: new Date(),
      language: SchemeAIChatbotService.detectLanguage(queryText) || language,
      isVoiceNote: !!voiceData,
      audioUrl: voiceData?.url,
      audioDuration: voiceData?.duration
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      // Simulate natural thinking delay
      await new Promise((res) => setTimeout(res, 600));

      const response = await SchemeAIChatbotService.processQuery(
        queryText,
        currentUser,
        language
      );

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: response.reply,
        timestamp: new Date(),
        language: SchemeAIChatbotService.detectLanguage(response.reply) || language,
        matchedSchemes: response.matchedSchemes,
        officialLinks: response.officialLinks
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('AI chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'assistant',
        text:
          language === 'ta'
            ? 'மன்னிக்கவும், தகவலைப் பெறுவதில் சிறிய சிக்கல் ஏற்பட்டது. தயவுசெய்து உங்கள் கேள்வியை மீண்டும் கேளுங்கள்.'
            : 'Sorry, there was a temporary issue retrieving the details. Please try asking your question again.',
        timestamp: new Date(),
        language: language
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Start Voice Note Recording
  const startRecording = async () => {
    try {
      transcriptRef.current = '';
      audioChunksRef.current = [];

      // 1. Initialize Speech Recognition if supported
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = language === 'ta' ? 'ta-IN' : 'en-IN';

        recognition.onresult = (event: any) => {
          let current = '';
          for (let i = 0; i < event.results.length; i++) {
            current += event.results[i][0].transcript;
          }
          transcriptRef.current = current;
        };

        recognition.onerror = (e: any) => {
          console.warn('Speech recognition warning:', e);
        };

        recognitionRef.current = recognition;
        recognition.start();
      }

      // 2. Request user microphone audio stream
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.start(100);
      }

      setIsRecording(true);
      setRecordDuration(0);
      recordTimerRef.current = window.setInterval(() => {
        setRecordDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone access denied or unsupported:', err);
      // Fallback: prompt user for voice query via direct transcription input
      setIsRecording(false);
      const sampleTamil = 'எனக்கு என்ன திட்டம்?';
      const sampleEn = 'I am a 19 year old student from Coimbatore. Which schemes may be relevant to me?';
      setInputText(language === 'ta' ? sampleTamil : sampleEn);
    }
  };

  // Stop Recording and Send Voice Note
  const stopRecordingAndSend = () => {
    if (recordTimerRef.current) clearInterval(recordTimerRef.current);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn(e);
      }
    }

    const duration = recordDuration;
    setIsRecording(false);
    setRecordDuration(0);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);

        // Get transcribed text or fallback query
        let transcribed = transcriptRef.current.trim();
        if (!transcribed) {
          transcribed =
            language === 'ta'
              ? 'எனக்கு தகுதியான அரசு திட்டங்கள் என்ன?'
              : 'Which government welfare schemes may match my profile?';
        }

        // Clean audio tracks
        mediaRecorderRef.current?.stream.getTracks().forEach((track) => track.stop());

        handleSendQuery(transcribed, {
          url: audioUrl,
          duration: Math.max(duration, 2)
        });
      };

      mediaRecorderRef.current.stop();
    } else {
      // Fallback voice note if MediaRecorder not fully initialized
      let transcribed = transcriptRef.current.trim();
      if (!transcribed) {
        transcribed =
          language === 'ta'
            ? 'எனக்கு என்ன திட்டம்?'
            : 'Which schemes may be relevant to me?';
      }
      handleSendQuery(transcribed, {
        url: '',
        duration: Math.max(duration, 3)
      });
    }
  };

  // Cancel Recording
  const cancelRecording = () => {
    if (recordTimerRef.current) clearInterval(recordTimerRef.current);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn(e);
      }
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setRecordDuration(0);
    audioChunksRef.current = [];
    transcriptRef.current = '';
  };

  // Read Aloud (Text-to-Speech)
  const handleToggleSpeak = (messageId: string, text: string, msgLang: 'ta' | 'en') => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMessageId === messageId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    setSpeakingMessageId(messageId);

    // Strip markdown formatting characters for clean speech
    const cleanSpeech = text
      .replace(/[*#_`\[\]()]/g, ' ')
      .replace(/https?:\/\/\S+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Pick appropriate voice if available
    const voices = window.speechSynthesis.getVoices();
    if (msgLang === 'ta') {
      const tamilVoice = voices.find((v) => v.lang.includes('ta') || v.lang.includes('IN'));
      if (tamilVoice) utterance.voice = tamilVoice;
      utterance.lang = 'ta-IN';
    } else {
      const engVoice = voices.find((v) => v.lang.includes('en-IN') || v.lang.includes('en-US'));
      if (engVoice) utterance.voice = engVoice;
      utterance.lang = 'en-IN';
    }

    utterance.onend = () => {
      setSpeakingMessageId(null);
    };

    utterance.onerror = () => {
      setSpeakingMessageId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Reset conversation
  const handleResetChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeakingMessageId(null);
    setMessages([
      {
        id: `msg-welcome-${Date.now()}`,
        sender: 'assistant',
        text:
          language === 'ta'
            ? 'வணக்கம்! நான் Scheme AI வழிகாட்டி உதவியாளர். தமிழ்நாடு மற்றும் மத்திய அரசு நலத்திட்டங்கள், தேவையான ஆவணங்கள் மற்றும் விண்ணப்பிக்கும் முறைகள் பற்றி என்னிடம் தமிழில் அல்லது ஆங்கிலத்தில் கேளுங்கள்.'
            : 'Hello! I am your Scheme AI welfare guide assistant. Ask me about Tamil Nadu & Central Government schemes, required certificates, or how to apply in English or Tamil.',
        timestamp: new Date(),
        language: language
      }
    ]);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <>
      {/* Floating Action Button at Bottom-Right */}
      <div className="fixed bottom-5 right-5 z-40">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open Scheme AI Chatbot"
          className={`group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full text-white shadow-2xl transition-all duration-300 cursor-pointer ${
            isOpen
              ? 'bg-slate-900 border border-teal-500/40 ring-4 ring-teal-500/20'
              : 'bg-gradient-to-r from-teal-700 via-teal-600 to-slate-900 hover:from-teal-600 hover:to-slate-800 ring-4 ring-teal-500/20'
          }`}
        >
          {/* Subtle breathing glow */}
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-teal-400 to-amber-400 opacity-30 blur-xs group-hover:opacity-60 transition duration-500 -z-10" />

          {isOpen ? (
            <ChevronDown size={22} className="text-teal-300" />
          ) : (
            <div className="relative">
              <MessageSquare size={22} className="text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400" />
            </div>
          )}

          <div className="flex flex-col text-left">
            <span className="text-xs font-bold tracking-wide text-white flex items-center gap-1.5">
              <span>Scheme AI Assistant</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-teal-400/20 text-teal-300 font-mono border border-teal-400/30">
                AI
              </span>
            </span>
            <span className="text-[10px] text-teal-200/90 font-medium hidden sm:inline">
              {language === 'ta' ? 'குரல் & உரை வழிகாட்டி' : 'Voice & Text Guide'}
            </span>
          </div>
        </motion.button>
      </div>

      {/* Modern Messaging Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-x-3 bottom-20 sm:inset-x-auto sm:right-6 sm:bottom-20 z-50 w-auto sm:w-[410px] max-h-[85vh] sm:h-[600px] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden font-sans"
          >
            {/* 1. Header with Scheme AI Branding */}
            <div className="px-4 py-3.5 bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 text-white flex items-center justify-between border-b border-teal-500/30 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <SchemeAILogo size="sm" showText={false} />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold tracking-tight text-white">
                      {language === 'ta' ? 'திட்டம் AI உதவியாளர்' : 'Scheme AI Assistant'}
                    </h3>
                  </div>
                  <p className="text-[11px] text-teal-300 flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{language === 'ta' ? 'தமிழ் & ஆங்கிலம் • குரல் ஆதரவு' : 'Tamil & English • Voice Enabled'}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-slate-300">
                <button
                  onClick={handleResetChat}
                  title={language === 'ta' ? 'அரட்டையை மீட்டமைக்க' : 'Clear Chat'}
                  className="p-1.5 rounded-lg hover:bg-slate-800/80 hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title={language === 'ta' ? 'மூடுக' : 'Close'}
                  className="p-1.5 rounded-lg hover:bg-slate-800/80 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* 2. Chat Message List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60 text-slate-900">
              {/* Trust Badge at top of conversation */}
              <div className="p-2.5 rounded-xl bg-teal-50/80 border border-teal-200/70 text-[11px] text-teal-950 flex items-start gap-2">
                <Sparkles size={14} className="text-teal-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {language === 'ta'
                    ? 'Scheme AI அரசு நலத்திட்ட வழிகாட்டி. அரசு விதிமுறைகளின் அடிப்படையில் மட்டுமே பதிலளிக்கிறது.'
                    : 'Scheme AI welfare guide answering solely from public verified government scheme data.'}
                </p>
              </div>

              {/* Messages */}
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                const isSpeaking = speakingMessageId === msg.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    {/* If Voice Note Message */}
                    {isUser && msg.isVoiceNote ? (
                      <AudioVoiceBubble
                        audioUrl={msg.audioUrl}
                        duration={msg.audioDuration}
                        transcribedText={msg.text}
                        timestamp={msg.timestamp}
                        language={msg.language}
                      />
                    ) : (
                      <div
                        className={`relative max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                          isUser
                            ? 'bg-gradient-to-r from-teal-700 to-teal-800 text-white rounded-tr-xs'
                            : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                        }`}
                      >
                        {/* Text Content */}
                        <div className="whitespace-pre-line font-normal space-y-1">
                          {msg.text}
                        </div>

                        {/* Matched Scheme Cards Inside Chat Message */}
                        {!isUser && msg.matchedSchemes && msg.matchedSchemes.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2">
                            <span className="text-[11px] font-bold text-teal-800 flex items-center gap-1">
                              <Compass size={13} className="text-teal-600" />
                              <span>{language === 'ta' ? 'பரிந்துரைக்கப்பட்ட திட்டங்கள்:' : 'Relevant Schemes:'}</span>
                            </span>
                            <div className="space-y-1.5">
                              {msg.matchedSchemes.map((scheme) => (
                                <div
                                  key={scheme.id}
                                  onClick={() => onViewSchemeDetails && onViewSchemeDetails(scheme)}
                                  className="p-2 rounded-xl bg-slate-50 hover:bg-teal-50/70 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center justify-between cursor-pointer transition-colors"
                                >
                                  <span className="truncate pr-2">
                                    {language === 'ta' ? scheme.name_ta : scheme.name_en}
                                  </span>
                                  <span className="text-[10px] text-teal-700 shrink-0 font-bold">
                                    {language === 'ta' ? 'விவரங்கள் →' : 'View →'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Official Links Inside Message */}
                        {!isUser && msg.officialLinks && msg.officialLinks.length > 0 && (
                          <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                            {msg.officialLinks.map((link, idx) => (
                              <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 text-[11px] font-semibold hover:bg-teal-100 transition-colors"
                              >
                                <span>{link.title}</span>
                                <ExternalLink size={11} />
                              </a>
                            ))}
                          </div>
                        )}

                        {/* AI Message Footer: 🔊 Listen Button + Timestamp */}
                        <div className="mt-2 pt-1 flex items-center justify-between text-[10px] text-slate-400 gap-2">
                          {!isUser && (
                            <button
                              onClick={() => handleToggleSpeak(msg.id, msg.text, msg.language)}
                              aria-label={isSpeaking ? 'Stop read aloud' : 'Read response aloud'}
                              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full font-semibold transition-colors cursor-pointer ${
                                isSpeaking
                                  ? 'bg-amber-100 text-amber-900 animate-pulse'
                                  : 'bg-slate-100 hover:bg-teal-50 text-slate-600 hover:text-teal-800'
                              }`}
                            >
                              {isSpeaking ? (
                                <>
                                  <VolumeX size={12} className="text-amber-700" />
                                  <span>{language === 'ta' ? 'நிறுத்து' : 'Stop'}</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 size={12} className="text-teal-600" />
                                  <span>{language === 'ta' ? '🔊 கேட்க' : '🔊 Listen'}</span>
                                </>
                              )}
                            </button>
                          )}

                          <span className={isUser ? 'text-teal-200 text-[10px]' : 'text-slate-400 text-[10px]'}>
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-slate-200 w-20 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* 3. Quick Suggestions Pill Carousel (When conversation is fresh) */}
            {messages.length <= 2 && (
              <div className="px-3 py-2 bg-slate-100/80 border-t border-slate-200/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                <span className="text-[10px] text-slate-500 font-bold shrink-0">
                  {language === 'ta' ? 'கேட்கலாம்:' : 'Suggestions:'}
                </span>
                {suggestions.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendQuery(sug)}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-teal-50 border border-slate-200 text-[11px] text-slate-700 hover:text-teal-800 shrink-0 transition-colors whitespace-nowrap shadow-2xs font-medium cursor-pointer"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* 4. Bottom Input Controls (Text + Microphone Voice Note) */}
            <div className="p-3 bg-white border-t border-slate-200 shrink-0">
              {/* Voice Recording Active State */}
              {isRecording ? (
                <div className="flex items-center justify-between gap-3 p-2 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
                    <span className="w-3 h-3 rounded-full bg-rose-600" />
                    <span className="text-xs font-mono font-bold text-rose-700">
                      {formatTimer(recordDuration)}
                    </span>
                    <span className="text-xs font-medium text-rose-900 hidden sm:inline">
                      {language === 'ta' ? 'குரல் பதிவு செய்யப்படுகிறது...' : 'Recording voice note...'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={cancelRecording}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-rose-100 transition-colors cursor-pointer"
                    >
                      {language === 'ta' ? 'ரத்து' : 'Cancel'}
                    </button>
                    <button
                      onClick={stopRecordingAndSend}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
                    >
                      <Square size={13} className="fill-white" />
                      <span>{language === 'ta' ? 'நிறுத்தி அனுப்பு' : 'Stop & Send'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Normal Text + Mic Input Bar */
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendQuery(inputText);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={
                      language === 'ta'
                        ? 'கேள்வியைக் கேளுங்கள் அல்லது பேசவும்...'
                        : 'Ask a question or tap mic to speak...'
                    }
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                  />

                  {/* 🎤 Microphone Button */}
                  <button
                    type="button"
                    onClick={startRecording}
                    title={language === 'ta' ? 'குரல் குறிப்பு பதிவு செய்' : 'Record voice note'}
                    className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700 flex items-center justify-center shrink-0 transition-colors border border-slate-200 cursor-pointer active:scale-95"
                  >
                    <Mic size={18} className="text-teal-700" />
                  </button>

                  {/* Send Button ➤ */}
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                      inputText.trim()
                        ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-xs cursor-pointer active:scale-95'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
