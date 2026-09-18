import { Scheme, UserProfile, MatchEvaluation } from '../types';

export class RecommendationEngine {
  /**
   * Evaluates a user profile against all schemes and returns ranked matching evaluations.
   * Designed with a clean modular interface so it can be swapped with a deep learning
   * or TensorFlow serving endpoint without changing consumer components.
   */
  public static evaluateSchemes(user: UserProfile, schemes: Scheme[]): Map<string, MatchEvaluation> {
    const results = new Map<string, MatchEvaluation>();

    for (const scheme of schemes) {
      const evaluation = this.evaluateSingleScheme(user, scheme);
      results.set(scheme.id, evaluation);
    }

    return results;
  }

  public static evaluateSingleScheme(user: UserProfile, scheme: Scheme): MatchEvaluation {
    let score = 50; // Base score for Tamil Nadu citizen residency
    const reasons_en: string[] = ['Resident of Tamil Nadu with eligible citizenship background'];
    const reasons_ta: string[] = ['தமிழ்நாடு வாழ்விட உரிமை மற்றும் குடியுரிமை தகுதி பொருந்துகிறது'];
    const unmet_en: string[] = [];
    const unmet_ta: string[] = [];

    // 1. District Availability Check
    if (scheme.districtAvailability !== 'All') {
      const targetDistricts = scheme.districtAvailability.map(d => d.toLowerCase());
      const userDist = (user.district || '').toLowerCase();
      if (targetDistricts.includes(userDist)) {
        score += 12;
        reasons_en.push(`Specifically prioritized for your home district (${user.district})`);
        reasons_ta.push(`உங்கள் சொந்த மாவட்டத்திற்கு (${user.district}) முன்னுரிமை அளிக்கப்பட்ட திட்டம்`);
      } else {
        score -= 25;
        unmet_en.push(`Scheme is targeted primarily at ${scheme.districtAvailability.join(', ')} districts`);
        unmet_ta.push(`இத்திட்டம் முதன்மையாக ${scheme.districtAvailability.join(', ')} மாவட்டங்களைச் சேர்ந்தவர்களுக்கானது`);
      }
    } else {
      score += 5;
      reasons_en.push(`Applicable statewide across all 38 districts including ${user.district || 'Tamil Nadu'}`);
      reasons_ta.push(`${user.district || 'தமிழ்நாடு'} உட்பட அனைத்து 38 மாவட்டங்களுக்கும் பொருந்தும்`);
    }

    // 2. Gender Criteria
    if (scheme.requiredGender && scheme.requiredGender !== 'all') {
      if (user.gender === scheme.requiredGender) {
        score += 15;
        if (scheme.requiredGender === 'female') {
          reasons_en.push('Applicant gender (Female) matches women-centric welfare provisions');
          reasons_ta.push('மகளிர் நலத்திட்ட விதிமுறைகளுக்கு பெண் பாலின தகுதி பொருந்துகிறது');
        } else if (scheme.requiredGender === 'male') {
          reasons_en.push('Applicant gender (Male) qualifies for designated youth scheme criteria');
          reasons_ta.push('குறிப்பிட்ட மாணவர் நலத்திட்ட விதிமுறைகளுக்கு ஆண் பாலின தகுதி பொருந்துகிறது');
        }
      } else {
        score -= 40;
        unmet_en.push(`Requires applicant to be ${scheme.requiredGender}`);
        unmet_ta.push(`விண்ணப்பதாரர் ${scheme.requiredGender === 'female' ? 'பெண்ணாக' : 'ஆணாக'} இருக்க வேண்டும்`);
      }
    }

    // 3. Age Range Check
    const minAge = scheme.ageMin ?? 0;
    const maxAge = scheme.ageMax ?? 120;
    if (user.age >= minAge && user.age <= maxAge) {
      score += 12;
      reasons_en.push(`Age (${user.age} yrs) falls within the qualifying age bracket (${minAge} - ${maxAge} yrs)`);
      reasons_ta.push(`வயது (${user.age} ஆண்டுகள்) தகுதி வரம்பிற்குள் (${minAge} - ${maxAge} ஆண்டுகள்) உள்ளது`);
    } else {
      score -= 20;
      unmet_en.push(`Applicant age (${user.age}) is outside required bracket (${minAge} - ${maxAge} yrs)`);
      unmet_ta.push(`விண்ணப்பதாரர் வயது (${user.age}) நிர்ணயிக்கப்பட்ட தகுதி வரம்பிற்குள் (${minAge} - ${maxAge}) இல்லை`);
    }

    // 4. Annual Income Limit
    if (scheme.incomeLimit) {
      if (user.annualIncome <= scheme.incomeLimit) {
        score += 15;
        const formattedLimit = (scheme.incomeLimit / 100000).toFixed(1) + ' Lakh';
        reasons_en.push(`Family annual income falls well within the scheme ceiling (≤ ₹${formattedLimit})`);
        reasons_ta.push(`குடும்ப ஆண்டு வருமானம் தகுதி உச்சவரம்பிற்குள் (≤ ₹${formattedLimit}) உள்ளது`);
      } else {
        score -= 25;
        const formattedLimit = (scheme.incomeLimit / 100000).toFixed(1) + ' Lakh';
        unmet_en.push(`Income exceeds the scheme threshold of ₹${formattedLimit}`);
        unmet_ta.push(`குடும்ப ஆண்டு வருமானம் அதிகபட்ச உச்சவரம்பைவிட (₹${formattedLimit}) அதிகமாக உள்ளது`);
      }
    }

    // 5. Student Status & Higher Education
    if (scheme.requiredStudent) {
      if (user.isStudent || user.occupation === 'student') {
        score += 18;
        reasons_en.push('Active student enrollment matches education grant stipulations');
        reasons_ta.push('மாணவர் கல்வி சேர்க்கை தகுதி உதவித்தொகை விதிமுறைகளுக்கு பொருந்துகிறது');
      } else {
        score -= 30;
        unmet_en.push('Requires current enrollment in school, college, or technical course');
        unmet_ta.push('தற்போது பள்ளி, கல்லூரி அல்லது தொழிற்கல்வியில் பயில்பவராக இருக்க வேண்டும்');
      }
    }

    // 6. Farmer & Agriculture Status
    if (scheme.requiredFarmer) {
      if (user.isFarmer || user.occupation === 'farmer') {
        score += 20;
        reasons_en.push('Agriculturalist / farmer status qualifies for farm input & crop assistance');
        reasons_ta.push('விவசாயி / வேளாண் தொழிலாளர் தகுதி இத்திட்டத்திற்கு முழுமையாக பொருந்துகிறது');
      } else {
        score -= 30;
        unmet_en.push('Intended specifically for agricultural landholders or farm labourers');
        unmet_ta.push('விவசாய நிலம் வைத்துள்ளவர்கள் அல்லது விவசாய தொழிலாளர்களுக்கு மட்டுமே');
      }
    }

    // 7. Disability Status
    if (scheme.requiredDisability) {
      if (user.hasDisability) {
        score += 25;
        reasons_en.push('Recognized disability card holder qualifies for priority maintenance allowance');
        reasons_ta.push('மாற்றுத்திறனாளி பராமரிப்பு உதவித்தொகைக்கான தகுதி பூர்த்தியாகிறது');
      } else {
        score -= 35;
        unmet_en.push('Requires certified disability of 40% or higher');
        unmet_ta.push('40% அல்லது அதற்கு மேற்பட்ட மாற்றுத்திறன் சான்றிதழ் தேவைப்படுகிறது');
      }
    }

    // 8. Social Category (SC/ST/MBC/etc.)
    if (scheme.requiredCategory && scheme.requiredCategory.length > 0) {
      if (scheme.requiredCategory.includes(user.beneficiaryCategory)) {
        score += 15;
        reasons_en.push(`Community category (${user.beneficiaryCategory.toUpperCase()}) matches affirmative welfare mandate`);
        reasons_ta.push(`சமூகப் பிரிவு (${user.beneficiaryCategory.toUpperCase()}) இத்திட்டத்தின் முன்னுரிமை பிரிவுக்கு பொருந்துகிறது`);
      } else {
        score -= 25;
        unmet_en.push(`Dedicated for ${scheme.requiredCategory.map(c => c.toUpperCase()).join(' / ')} communities`);
        unmet_ta.push(`${scheme.requiredCategory.map(c => c.toUpperCase()).join(' / ')} பிரிவினருக்கு ஒதுக்கப்பட்ட திட்டம்`);
      }
    }

    // 9. Occupation Alignment
    if (user.occupation === 'unemployed' && (scheme.category === 'Skill Development' || scheme.category === 'Employment')) {
      score += 10;
      reasons_en.push('Unemployed citizen profile matches livelihood and skill upgrade priorities');
      reasons_ta.push('வேலை தேடும் இளைஞர்களுக்கு திறன் மேம்பாடு மற்றும் வேலைவாய்ப்பு பொருந்துகிறது');
    }
    if ((user.occupation === 'self_employed' || user.occupation === 'daily_wage') && (scheme.category === 'Entrepreneurship' || scheme.category === 'Financial Assistance')) {
      score += 10;
      reasons_en.push('Micro-business / self-employed profile matches capital subsidy mandate');
      reasons_ta.push('சுயதொழில் மற்றும் குறு வணிக சுயவிவரத்திற்கு மானிய உதவி பொருந்துகிறது');
    }

    // Strict safety clamp: 35% to 94% (NEVER 100% Guaranteed Eligible!)
    const clampedScore = Math.min(94, Math.max(35, Math.round(score)));

    let matchLevel: 'Strong Profile Match' | 'Potential Match' | 'Needs Verification';
    let matchLevel_ta: string;

    if (clampedScore >= 80) {
      matchLevel = 'Strong Profile Match';
      matchLevel_ta = 'வலுவான பொருத்தம்';
    } else if (clampedScore >= 62) {
      matchLevel = 'Potential Match';
      matchLevel_ta = 'சாத்தியமான பொருத்தம்';
    } else {
      matchLevel = 'Needs Verification';
      matchLevel_ta = 'சரிபார்ப்பு தேவை';
    }

    return {
      schemeId: scheme.id,
      matchScore: clampedScore,
      matchLevel,
      matchLevel_ta,
      reasons_en: reasons_en.slice(0, 4),
      reasons_ta: reasons_ta.slice(0, 4),
      unmetCriteria_en: unmet_en.length > 0 ? unmet_en : undefined,
      unmetCriteria_ta: unmet_ta.length > 0 ? unmet_ta : undefined
    };
  }
}
