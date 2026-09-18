import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Language, UserProfile } from '../types';
import { UI_STRINGS } from '../translations';
import { TAMIL_NADU_DISTRICTS } from '../data/districts';
import { MapPin, X, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialProfile?: UserProfile;
  onSubmit: (profile: UserProfile) => void;
}

export function ProfileModal({
  isOpen,
  onClose,
  language,
  initialProfile,
  onSubmit
}: ProfileModalProps) {
  const t = UI_STRINGS[language];

  const [state] = useState<'Tamil Nadu'>('Tamil Nadu');
  const [district, setDistrict] = useState(initialProfile?.district || 'Chennai');
  const [age, setAge] = useState<number>(initialProfile?.age || 22);
  const [gender, setGender] = useState<'female' | 'male' | 'transgender' | 'other'>(initialProfile?.gender || 'female');
  const [occupation, setOccupation] = useState<UserProfile['occupation']>(initialProfile?.occupation || 'student');
  const [annualIncome, setAnnualIncome] = useState<number>(initialProfile?.annualIncome || 150000);
  const [educationLevel, setEducationLevel] = useState<UserProfile['educationLevel']>(initialProfile?.educationLevel || 'graduate');
  const [beneficiaryCategory, setBeneficiaryCategory] = useState<UserProfile['beneficiaryCategory']>(initialProfile?.beneficiaryCategory || 'bc');
  const [isStudent, setIsStudent] = useState<boolean>(initialProfile?.isStudent ?? true);
  const [isFarmer, setIsFarmer] = useState<boolean>(initialProfile?.isFarmer ?? false);
  const [hasDisability, setHasDisability] = useState<boolean>(initialProfile?.hasDisability ?? false);

  useEffect(() => {
    if (initialProfile) {
      setDistrict(initialProfile.district);
      setAge(initialProfile.age);
      setGender(initialProfile.gender);
      setOccupation(initialProfile.occupation);
      setAnnualIncome(initialProfile.annualIncome);
      setEducationLevel(initialProfile.educationLevel);
      setBeneficiaryCategory(initialProfile.beneficiaryCategory);
      setIsStudent(initialProfile.isStudent);
      setIsFarmer(initialProfile.isFarmer);
      setHasDisability(initialProfile.hasDisability);
    }
  }, [initialProfile]);

  // Keep student/farmer checkboxes synced with occupation selection
  const handleOccupationChange = (val: UserProfile['occupation']) => {
    setOccupation(val);
    if (val === 'student') setIsStudent(true);
    if (val === 'farmer') setIsFarmer(true);
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProfile: UserProfile = {
      id: initialProfile?.id || 'usr_' + Date.now(),
      name: initialProfile?.name || (language === 'ta' ? 'தமிழ் குடிமகன்' : 'TN Citizen'),
      emailOrMobile: initialProfile?.emailOrMobile || 'guest@schemeai.tn.gov',
      language,
      age: Number(age) || 20,
      gender,
      state: 'Tamil Nadu',
      district,
      occupation,
      annualIncome: Number(annualIncome) || 120000,
      educationLevel,
      beneficiaryCategory,
      isStudent,
      isFarmer,
      hasDisability,
      isGuest: initialProfile?.isGuest ?? true
    };

    onSubmit(updatedProfile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold tracking-tight text-white">
                {t.profileTitle}
              </h3>
              <p className="text-xs text-slate-400">
                {t.profileSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-slate-800">
          {/* Location Flow Banner */}
          <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200/80 flex items-start gap-3">
            <MapPin size={20} className="text-teal-700 shrink-0 mt-0.5" />
            <div className="text-xs text-teal-950 space-y-1">
              <span className="font-semibold text-teal-900 block">
                {language === 'ta' ? 'தமிழ்நாடு இருப்பிடத் தேர்வு' : 'Tamil Nadu Location Focus'}
              </span>
              <p className="text-teal-800 leading-relaxed">
                {language === 'ta'
                  ? 'திட்டங்கள் உங்கள் மாவட்டத்திற்கேற்ப முன்னுரிமைப்படுத்தப்படும். 38 மாவட்டங்களில் உள்ள திட்டங்களை நேரடியாகப் பொருத்தும்.'
                  : 'Schemes with district-specific eligibility will be prioritized for your selected district across all 38 Tamil Nadu districts.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* State (Default: Tamil Nadu) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.stateLabel}
              </label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value="Tamil Nadu (தமிழ்நாடு)"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-100 text-slate-700 font-medium cursor-not-allowed"
                />
                <ShieldCheck size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-600" />
              </div>
            </div>

            {/* District Dropdown (All 38 TN Districts) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.districtLabel} <span className="text-teal-600 font-normal">({TAMIL_NADU_DISTRICTS.length} Districts)</span>
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                {TAMIL_NADU_DISTRICTS.map((d) => (
                  <option key={d.id} value={d.name_en}>
                    {language === 'ta' ? `${d.name_ta} (${d.name_en})` : `${d.name_en} - ${d.name_ta}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Age */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.ageLabel}
              </label>
              <input
                type="number"
                min={1}
                max={105}
                required
                value={age}
                onChange={(e) => setAge(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.genderLabel}
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                <option value="female">{t.genderFemale}</option>
                <option value="male">{t.genderMale}</option>
                <option value="transgender">{t.genderTransgender}</option>
                <option value="other">{t.genderOther}</option>
              </select>
            </div>

            {/* Social Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.categoryLabel}
              </label>
              <select
                value={beneficiaryCategory}
                onChange={(e) => setBeneficiaryCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                <option value="bc">{t.catBC}</option>
                <option value="mbc">{t.catMBC}</option>
                <option value="sc">{t.catSC}</option>
                <option value="st">{t.catST}</option>
                <option value="minority">{t.catMinority}</option>
                <option value="general">{t.catGeneral}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Primary Occupation */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.occupationLabel}
              </label>
              <select
                value={occupation}
                onChange={(e) => handleOccupationChange(e.target.value as any)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                <option value="student">{t.occStudent}</option>
                <option value="farmer">{t.occFarmer}</option>
                <option value="unemployed">{t.occUnemployed}</option>
                <option value="homemaker">{t.occHomemaker}</option>
                <option value="self_employed">{t.occSelfEmployed}</option>
                <option value="daily_wage">{t.occDailyWage}</option>
                <option value="salaried">{t.occSalaried}</option>
                <option value="retired">{t.occRetired}</option>
                <option value="other">{t.occOther}</option>
              </select>
            </div>

            {/* Annual Family Income */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.annualIncomeLabel}
              </label>
              <input
                type="number"
                min={0}
                step={10000}
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                {t.incomeHint} (₹{(annualIncome / 100000).toFixed(2)} Lakhs)
              </span>
            </div>
          </div>

          {/* Education Level */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.educationLabel}
            </label>
            <select
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value as any)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              <option value="school">{t.eduSchool}</option>
              <option value="higher_secondary">{t.eduHigherSecondary}</option>
              <option value="diploma">{t.eduDiploma}</option>
              <option value="graduate">{t.eduGraduate}</option>
              <option value="post_graduate">{t.eduPostGraduate}</option>
              <option value="vocational">{t.eduVocational}</option>
              <option value="none">{t.eduNone}</option>
            </select>
          </div>

          {/* Citizen status checkboxes */}
          <div className="pt-2 border-t border-slate-100 space-y-2.5">
            <label className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={isStudent}
                onChange={(e) => setIsStudent(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
              />
              <span className="text-xs font-medium text-slate-800">
                {t.checkStudent}
              </span>
            </label>

            <label className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={isFarmer}
                onChange={(e) => setIsFarmer(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
              />
              <span className="text-xs font-medium text-slate-800">
                {t.checkFarmer}
              </span>
            </label>

            <label className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={hasDisability}
                onChange={(e) => setHasDisability(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
              />
              <span className="text-xs font-medium text-slate-800">
                {t.checkDisability}
              </span>
            </label>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-teal-600 via-teal-700 to-slate-900 hover:from-teal-700 hover:to-slate-950 text-white text-sm font-semibold shadow-lg shadow-teal-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <Sparkles size={18} />
              <span>{t.submitProfileBtn}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
