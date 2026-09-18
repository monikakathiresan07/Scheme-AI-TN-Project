export type Language = 'en' | 'ta';

export type GovernmentLevel = 'Tamil Nadu Government' | 'Central Government';

export type SchemeCategory =
  | 'Education & Scholarships'
  | 'Women Welfare'
  | 'Girl Child Welfare'
  | 'Agriculture & Farmers'
  | 'Employment'
  | 'Skill Development'
  | 'Entrepreneurship'
  | 'Housing'
  | 'Health & Medical Assistance'
  | 'Social Security'
  | 'Senior Citizens'
  | 'Disability Welfare'
  | 'Student Support'
  | 'Family Welfare'
  | 'Financial Assistance';

export interface UserProfile {
  id: string;
  name: string;
  emailOrMobile: string;
  language: Language;
  age: number;
  gender: 'female' | 'male' | 'transgender' | 'other';
  state: 'Tamil Nadu';
  district: string;
  occupation: 'student' | 'farmer' | 'unemployed' | 'salaried' | 'self_employed' | 'daily_wage' | 'homemaker' | 'retired' | 'other';
  annualIncome: number; // in INR
  educationLevel: 'none' | 'school' | 'higher_secondary' | 'diploma' | 'graduate' | 'post_graduate' | 'vocational';
  beneficiaryCategory: 'general' | 'bc' | 'mbc' | 'sc' | 'st' | 'minority';
  isStudent: boolean;
  isFarmer: boolean;
  hasDisability: boolean;
  isGuest?: boolean;
}

export interface Scheme {
  id: string;
  name_en: string;
  name_ta: string;
  government_level: GovernmentLevel;
  department_en: string;
  department_ta: string;
  category: SchemeCategory;
  targetBeneficiaries_en: string;
  targetBeneficiaries_ta: string;
  districtAvailability: string[] | 'All';
  description_en: string;
  description_ta: string;
  benefits_en: string[];
  benefits_ta: string[];
  eligibility_en: string[];
  eligibility_ta: string[];
  // Recommendation match criteria
  incomeLimit?: number; // max income allowed (e.g. 250000)
  ageMin?: number;
  ageMax?: number;
  requiredGender?: 'female' | 'male' | 'all' | 'transgender';
  requiredStudent?: boolean;
  requiredFarmer?: boolean;
  requiredDisability?: boolean;
  requiredOccupation?: string[];
  requiredEducation?: string[];
  educationLevel?: string;
  requiredCategory?: string[];
  documents_en: string[];
  documents_ta: string[];
  applicationMethod_en: string;
  applicationMethod_ta: string;
  officialUrl: string;
  lastUpdated: string;
  status: 'Active' | 'Demo Data';
  iconType: 'graduation' | 'leaf' | 'women' | 'briefcase' | 'heart' | 'home' | 'wheelchair' | 'user-check' | 'coins' | 'sparkles' | 'building' | 'shield';
}

export interface MatchEvaluation {
  schemeId: string;
  matchScore: number; // 0 to 100
  matchLevel: 'Strong Profile Match' | 'Potential Match' | 'Needs Verification';
  matchLevel_ta: string;
  reasons_en: string[];
  reasons_ta: string[];
  unmetCriteria_en?: string[];
  unmetCriteria_ta?: string[];
}

export interface SavedScheme {
  id: string;
  userId: string;
  schemeId: string;
  savedAt: string;
}

export interface NLPSearchResult {
  query: string;
  detectedCategory?: SchemeCategory;
  detectedIntent_en: string;
  detectedIntent_ta: string;
  matchedSchemes: Scheme[];
  confidence: number;
}
