import { Scheme, SchemeCategory, NLPSearchResult } from '../types';

interface IntentPattern {
  keywords: string[];
  categories: SchemeCategory[];
  intent_en: string;
  intent_ta: string;
  weight?: number;
}

export class NLPSearchService {
  private static patterns: IntentPattern[] = [
    // Education & Student Support
    {
      keywords: [
        'படிப்பு', 'கல்வி', 'மாணவர்', 'மாணவி', 'கல்லூரி', 'பள்ளி', 'ஸ்காலர்ஷிப்', 'உதவித்தொகை',
        'education', 'student', 'scholarship', 'college', 'school', 'tuition', 'study'
      ],
      categories: ['Education & Scholarships', 'Student Support', 'Girl Child Welfare'],
      intent_en: 'Education grants, student monthly aid, and higher education scholarships',
      intent_ta: 'உயர்கல்வி உதவித்தொகை, பள்ளி/கல்லூரி மாணவ-மாணவிகள் மாதாந்திர உதவி'
    },
    // Agriculture & Farmers
    {
      keywords: [
        'விவசாயி', 'விவசாய', 'விவசாயிகளுக்கு', 'பயிர்', 'நிலம்', 'உழவர்', 'பாதுகாப்பு', 'விதை', 'உரம்',
        'farmer', 'agriculture', 'farm', 'crop', 'kisan', 'land'
      ],
      categories: ['Agriculture & Farmers'],
      intent_en: 'Farmer financial support, social security, and agricultural subsidies',
      intent_ta: 'விவசாயிகள் மாதாந்திர/வருடாந்திர நிதி உதவி மற்றும் உழவர் சமூகப் பாதுகாப்பு'
    },
    // Women Welfare
    {
      keywords: [
        'பெண்', 'பெண்களுக்கு', 'மகளிர்', 'தாய்', 'கர்ப்பிணி', 'விதவை', 'திருமணம்',
        'women', 'female', 'girl', 'maternity', 'widow', 'marriage', 'mother'
      ],
      categories: ['Women Welfare', 'Girl Child Welfare', 'Family Welfare'],
      intent_en: 'Women financial empowerment, basic income, and maternity welfare schemes',
      intent_ta: 'மகளிர் உரிமைத் தொகை, கர்ப்பிணித் தாய்மார்கள் நிதி மற்றும் திருமண உதவி'
    },
    // Employment & Jobs
    {
      keywords: [
        'வேலை', 'வேலைவாய்ப்பு', 'வேலை இல்லா', 'வேலையற்ற', 'பணி', 'இளைஞர்',
        'job', 'employment', 'unemployed', 'career', 'work'
      ],
      categories: ['Employment', 'Skill Development'],
      intent_en: 'Employment generation, career opportunities, and placement programs',
      intent_ta: 'வேலைவாய்ப்பு உருவாக்கம் மற்றும் இளைஞர்களுக்கான வேலை வாய்ப்புகள்'
    },
    // Skill Development
    {
      keywords: [
        'திறன்', 'பயிற்சி', 'கற்றல்', 'கம்ப்யூட்டர்', 'நான் முதல்வன்', 'ஆடை', 'தையல்',
        'skill', 'training', 'learn', 'course', 'certification'
      ],
      categories: ['Skill Development', 'Employment'],
      intent_en: 'Free industrial skill training, emerging tech certifications, and placement',
      intent_ta: 'இலவச தொழில்நுட்பப் பயிற்சிகள் மற்றும் தொழில் திறன் மேம்பாடு'
    },
    // Entrepreneurship & Business
    {
      keywords: [
        'தொழில்', 'தொழில் தொடங்க', 'வியாபாரம்', 'ஸ்டார்ட்அப்', 'மானியம்', 'சுயதொழில்', 'கடன்',
        'business', 'entrepreneur', 'startup', 'subsidy', 'msme', 'loan', 'enterprise'
      ],
      categories: ['Entrepreneurship', 'Employment'],
      intent_en: 'Capital subsidy, soft loans, and support for setting up micro/small businesses',
      intent_ta: 'புதிய தொழில் தொடங்க மூலதன மானியம் மற்றும் குறைந்த வட்டி தொழில் கடன்'
    },
    // Housing
    {
      keywords: [
        'வீடு', 'குடிசை', 'வீட்டு வசதி', 'கான்கிரீட்', 'கனவு இல்லம்', 'ஆவாஸ்',
        'house', 'housing', 'home', 'hut', 'pucca', 'awas', 'shelter'
      ],
      categories: ['Housing'],
      intent_en: 'Free housing grants and financial assistance for pucca concrete home construction',
      intent_ta: 'குடிசைகளை மாற்றி கான்கிரீட் வீடு கட்ட அரசு மானிய நிதி உதவி'
    },
    // Health & Medical
    {
      keywords: [
        'மருத்துவம்', 'சுகாதாரம்', 'காப்பீடு', 'சிகிச்சை', 'மருத்துவமனை', 'நோய்',
        'health', 'medical', 'insurance', 'hospital', 'cashless', 'treatment'
      ],
      categories: ['Health & Medical Assistance'],
      intent_en: 'Cashless medical insurance, surgical coverage, and treatment relief',
      intent_ta: 'முதலமைச்சரின் விரிவான மருத்துவக் காப்பீடு மற்றும் இலவச மருத்துவ சிகிச்சை'
    },
    // Senior Citizens
    {
      keywords: [
        'முதியோர்', 'வயதான', 'ஓய்வூதியம்', 'பென்ஷன்', 'தாத்தா', 'பாட்டி',
        'senior', 'elderly', 'old age', 'pension', 'oap', 'aged'
      ],
      categories: ['Senior Citizens', 'Social Security'],
      intent_en: 'Old age monthly destitute pension and free welfare foodgrain provisions',
      intent_ta: 'ஆதரவற்ற முதியோருக்கான மாதாந்திர ஓய்வூதியம் மற்றும் இலவச அரிசி'
    },
    // Disability Welfare
    {
      keywords: [
        'மாற்றுத்திறனாளி', 'ஊனம்', 'உடல் ஊனமுற்ற', 'பார்வை', 'செவித்திறன்',
        'disability', 'handicapped', 'differently abled', 'wheelchair', 'special need'
      ],
      categories: ['Disability Welfare'],
      intent_en: 'Monthly maintenance assistance and assistive aids for differently-abled persons',
      intent_ta: 'மாற்றுத்திறனாளிகளுக்கான மாத உதவித்தொகை மற்றும் உபகரணங்கள்'
    },
    // Financial Assistance / Distress
    {
      keywords: [
        'நிதி உதவி', 'பணம்', 'நிவாரணம்', 'விபத்து', 'துயர்', 'பேரிடர்',
        'financial assistance', 'relief', 'emergency', 'distress', 'grant', 'aid'
      ],
      categories: ['Financial Assistance', 'Social Security', 'Family Welfare'],
      intent_en: 'Immediate emergency financial assistance and calamity relief',
      intent_ta: 'அவசர துயர் துடைப்பு நிதி உதவி மற்றும் பேரிடர் நிவாரணம்',
      weight: 1
    }
  ];

  public static search(query: string, allSchemes: Scheme[]): NLPSearchResult {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) {
      return {
        query: '',
        detectedIntent_en: 'Browse all available schemes',
        detectedIntent_ta: 'அனைத்து அரசு திட்டங்களையும் காண்க',
        matchedSchemes: allSchemes,
        confidence: 1.0
      };
    }

    // Check query against intent patterns
    let bestMatch: IntentPattern | null = null;
    let maxMatchCount = 0;

    for (const pattern of this.patterns) {
      let matches = 0;
      for (const kw of pattern.keywords) {
        if (cleanQuery.includes(kw.toLowerCase())) {
          matches++;
        }
      }
      if (matches > maxMatchCount) {
        maxMatchCount = matches;
        bestMatch = pattern;
      }
    }

    // Direct text search score across scheme fields
    const scoredSchemes = allSchemes.map(scheme => {
      let relevance = 0;

      // Check if scheme category aligns with best detected intent
      if (bestMatch && bestMatch.categories.includes(scheme.category)) {
        relevance += 40;
      }

      // Check scheme name match
      if (scheme.name_ta.toLowerCase().includes(cleanQuery) || scheme.name_en.toLowerCase().includes(cleanQuery)) {
        relevance += 50;
      }

      // Check description & benefits match
      if (scheme.description_ta.toLowerCase().includes(cleanQuery) || scheme.description_en.toLowerCase().includes(cleanQuery)) {
        relevance += 25;
      }
      if (scheme.department_ta.toLowerCase().includes(cleanQuery) || scheme.department_en.toLowerCase().includes(cleanQuery)) {
        relevance += 20;
      }

      // Check individual keyword tokens in query
      const tokens = cleanQuery.split(/\s+/);
      for (const token of tokens) {
        if (token.length > 2) {
          if (scheme.name_ta.includes(token) || scheme.name_en.toLowerCase().includes(token)) relevance += 15;
          if (scheme.description_ta.includes(token) || scheme.description_en.toLowerCase().includes(token)) relevance += 10;
          if (scheme.targetBeneficiaries_ta.includes(token) || scheme.targetBeneficiaries_en.toLowerCase().includes(token)) relevance += 10;
        }
      }

      return { scheme, relevance };
    });

    const filtered = scoredSchemes
      .filter(item => item.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance)
      .map(item => item.scheme);

    // If nothing matched via token/intent, fallback to search in title/desc
    const results = filtered.length > 0 ? filtered : allSchemes.filter(s =>
      s.name_en.toLowerCase().includes(cleanQuery) ||
      s.name_ta.includes(cleanQuery) ||
      s.category.toLowerCase().includes(cleanQuery)
    );

    return {
      query,
      detectedCategory: bestMatch?.categories[0],
      detectedIntent_en: bestMatch
        ? bestMatch.intent_en
        : `Search results for "${query}" across Tamil Nadu & Central schemes`,
      detectedIntent_ta: bestMatch
        ? bestMatch.intent_ta
        : `"${query}" தொடர்பான தமிழ்நாடு மற்றும் மத்திய அரசு திட்டங்கள்`,
      matchedSchemes: results.length > 0 ? results : allSchemes.slice(0, 6),
      confidence: maxMatchCount > 0 ? Math.min(0.95, 0.6 + maxMatchCount * 0.15) : 0.4
    };
  }
}
