import { Scheme } from '../types';

export const TAMIL_NADU_SCHEMES: Scheme[] = [
  {
    id: 'tn-kmut-01',
    name_en: 'Kalaignar Magalir Urimai Thittam',
    name_ta: 'கலைஞர் மகளிர் உரிமைத் திட்டம்',
    government_level: 'Tamil Nadu Government',
    department_en: 'Special Programme Implementation & Social Welfare Department',
    department_ta: 'சிறப்பு திட்ட செயலாக்கம் மற்றும் சமூக நலத்துறை',
    category: 'Women Welfare',
    targetBeneficiaries_en: 'Women heads of eligible families in Tamil Nadu',
    targetBeneficiaries_ta: 'தமிழ்நாட்டில் உள்ள குடும்பத் தலைவிகள்',
    districtAvailability: 'All',
    description_en: 'A flagship basic income support scheme providing ₹1,000 per month directly into the bank accounts of women heads of eligible households to ensure social dignity and financial independence.',
    description_ta: 'குடும்பத் தலைவிகளுக்கு மாதந்தோறும் ₹1,000 நேரடி வங்கிப் பரிமாற்றம் மூலம் வழங்கி, பெண்களின் உழைப்பை அங்கீகரித்து சமூக மற்றும் பொருளாதாரப் பாதுகாப்பை உறுதி செய்யும் தமிழ்நாடு அரசின் முன்னோடி திட்டம்.',
    benefits_en: [
      'Direct monthly financial entitlement of ₹1,000 to bank account',
      'No middleman; seamless Aadhaar-linked DBT transfer',
      'Long-term social security and financial independence for women'
    ],
    benefits_ta: [
      'மாதந்தோறும் ₹1,000 நேரடி வங்கிப் பரிமாற்றம் (DBT)',
      'இடைத்தரகர் இல்லாத ஆதார் இணைக்கப்பட்ட பாதுகாப்பான பரிமாற்றம்',
      'குடும்பத் தலைவிகளுக்கு பொருளாதார சுதந்திரம் மற்றும் சுயமரியாதை'
    ],
    eligibility_en: [
      'Applicant must be a female family head aged 21 years or older',
      'Resident of Tamil Nadu holding a valid Smart Family Card (Ration Card)',
      'Annual family income must be below ₹2,50,000',
      'Family must not own four-wheelers (car/jeep for personal use)',
      'Domestic electricity consumption should be below 3,600 units per year'
    ],
    eligibility_ta: [
      'விண்ணப்பதாரர் 21 வயது பூர்த்தியடைந்த குடும்பத் தலைவியாக இருக்க வேண்டும்',
      'செல்லுபடியாகும் குடும்ப அட்டை (Ration Card) வைத்திருக்க வேண்டும்',
      'குடும்ப ஆண்டு வருமானம் ₹2.5 லட்சத்திற்குள் இருக்க வேண்டும்',
      'சொந்த உபயோகத்திற்கு நான்கு சக்கர வாகனம் வைத்திருக்கக் கூடாது',
      'ஆண்டு மின் நுகர்வு 3,600 யூனிட்டுகளுக்குள் இருக்க வேண்டும்'
    ],
    incomeLimit: 250000,
    ageMin: 21,
    ageMax: 65,
    requiredGender: 'female',
    documents_en: [
      'Tamil Nadu Smart Ration Card',
      'Aadhaar Card of the applicant',
      'Aadhaar-linked Bank Passbook / Account details',
      'Electricity Consumer Number (EB Card)'
    ],
    documents_ta: [
      'தமிழ்நாடு ஸ்மார்ட் குடும்ப அட்டை',
      'விண்ணப்பதாரரின் ஆதார் அட்டை',
      'ஆதார் இணைக்கப்பட்ட வங்கிக் கணக்குப் புத்தகம்',
      'மின் இணைப்பு அட்டை / நுகர்வோர் எண்'
    ],
    applicationMethod_en: 'Apply at special village/ward registration camps conducted by Revenue Department or through e-Sevai centres.',
    applicationMethod_ta: 'வருவாய்த்துறை நடத்தும் சிறப்பு முகாம்கள் அல்லது இ-சேவை மையங்கள் மூலம் விண்ணப்பிக்கலாம்.',
    officialUrl: 'https://kmut.tn.gov.in',
    lastUpdated: '2025-01-15',
    status: 'Active',
    iconType: 'women'
  },
  {
    id: 'tn-pudhumai-penn-02',
    name_en: 'Pudhumai Penn Thittam (Moovalur Ramamirtham Higher Education Assurance)',
    name_ta: 'புதுமைப் பெண் திட்டம் (மூவலூர் ராமாமிர்தம் உயர்கல்வி உறுதித் திட்டம்)',
    government_level: 'Tamil Nadu Government',
    department_en: 'Social Welfare and Women Empowerment Department',
    department_ta: 'சமூக நலம் மற்றும் மகளிர் உரிமைத் துறை',
    category: 'Girl Child Welfare',
    targetBeneficiaries_en: 'Female students pursuing undergraduate, diploma, and ITI courses',
    targetBeneficiaries_ta: 'கல்லூரி, பட்டயம், ITI பயிலும் அரசுப் பள்ளி மாணவிகள்',
    districtAvailability: 'All',
    description_en: 'Financial incentive of ₹1,000 per month for female students who studied in Tamil Nadu Government schools (classes 6th to 12th) until they complete their undergraduate degree, diploma, or professional course.',
    description_ta: 'அரசுப் பள்ளிகளில் 6 முதல் 12-ஆம் வகுப்பு வரை பயின்று உயர்கல்வியில் (பட்டப்படிப்பு, பட்டயம், தொழிற்கல்வி) சேரும் மாணவிகளுக்கு மாதம் ₹1,000 உதவித்தொகை வழங்கும் திட்டம்.',
    benefits_en: [
      '₹1,000 deposited every month into student bank account throughout degree duration',
      'Encourages higher education among underprivileged girls',
      'Prevents child marriages and promotes female employment'
    ],
    benefits_ta: [
      'படிப்பு முடியும் வரை மாணவிகளின் வங்கிக் கணக்கில் மாதந்தோறும் ₹1,000',
      'ஏழை மற்றும் நடுத்தர குடும்ப பெண் குழந்தைகளின் உயர்கல்வி ஊக்கம்',
      'இளம்வயது திருமணங்களைத் தடுத்து பெண்களின் வேலைவாய்ப்பை பெருக்குதல்'
    ],
    eligibility_en: [
      'Must be a female student currently enrolled in recognized college/ITI/polytechnic',
      'Must have studied from 6th to 12th standard continuously in Tamil Nadu Government schools',
      'Applicable for full-time regular degree, professional or technical courses'
    ],
    eligibility_ta: [
      'அங்கீகரிக்கப்பட்ட கல்லூரி, பாலிடெக்னிக் அல்லது ஐடிஐ-யில் பயிலும் மாணவி',
      'தமிழ்நாடு அரசுப் பள்ளிகளில் 6 முதல் 12-ஆம் வகுப்பு வரை பயின்றிருக்க வேண்டும்',
      'முழுநேர பட்டப்படிப்பு அல்லது தொழில்நுட்பக் கல்வி பயில்பவராக இருக்க வேண்டும்'
    ],
    ageMin: 17,
    ageMax: 26,
    requiredGender: 'female',
    requiredStudent: true,
    documents_en: [
      'School Study Certificate (Proof of studying 6th to 12th in Govt School)',
      'College Bonafide Certificate / Admission ID Card',
      'Aadhaar Card',
      'Student Savings Bank Account Passbook'
    ],
    documents_ta: [
      'அரசுப் பள்ளியில் 6 முதல் 12 வரை பயின்றதற்கான சான்றிதழ் (EMIS)',
      'கல்லூரி போனாஃபைட் சான்றிதழ் / மாணவர் அடையாள அட்டை',
      'ஆதார் அட்டை',
      'மாணவியின் சொந்த சேமிப்பு வங்கிக் கணக்கு புத்தகம்'
    ],
    applicationMethod_en: 'Apply through your college nodal officer via the official Pen Kalvi portal.',
    applicationMethod_ta: 'கல்லூரி ஒருங்கிணைப்பாளர் (Nodal Officer) மூலமாக penkalvi.tn.gov.in போர்ட்டலில் விண்ணப்பிக்கலாம்.',
    officialUrl: 'https://penkalvi.tn.gov.in',
    lastUpdated: '2025-02-10',
    status: 'Active',
    iconType: 'graduation'
  },
  {
    id: 'tn-tamil-pudhalvan-03',
    name_en: 'Tamil Pudhalvan Thittam',
    name_ta: 'தமிழ்ப் புதல்வன் திட்டம்',
    government_level: 'Tamil Nadu Government',
    department_en: 'Social Welfare and Women Empowerment Department & Higher Education',
    department_ta: 'சமூக நலம் மற்றும் உயர்கல்வித் துறை',
    category: 'Student Support',
    targetBeneficiaries_en: 'Male students from government schools pursuing higher education',
    targetBeneficiaries_ta: 'அரசுப் பள்ளிகளில் பயின்று உயர்கல்வி தொடரும் மாணவர்கள்',
    districtAvailability: 'All',
    description_en: 'Provides ₹1,000 monthly financial assistance to male students from Tamil Nadu government schools joining higher education to cover books, tuition materials, and commute expenses.',
    description_ta: 'அரசுப் பள்ளிகளில் 6 முதல் 12-ஆம் வகுப்பு வரை படித்து உயர்கல்வி பயிலும் ஏழை மாணவர்களுக்கு புத்தகங்கள், உபகரணங்கள் மற்றும் பயணச் செலவுகளுக்காக மாதம் ₹1,000 வழங்கும் திட்டம்.',
    benefits_en: [
      '₹1,000 direct monthly assistance into student bank account',
      'Covers expenses for books, study equipment, and hostel/commute',
      'Drives higher gross enrollment ratio (GER) among rural and urban male youth'
    ],
    benefits_ta: [
      'மாணவரின் வங்கிக் கணக்கில் மாதந்தோறும் ₹1,000 நேரடி உதவித்தொகை',
      'புத்தகங்கள், கல்வி உபகரணங்கள் மற்றும் போக்குவரத்து தேவைகளுக்கான உதவி',
      'அரசு பள்ளி மாணவர்களின் உயர்கல்வி சேர்க்கை விகிதத்தை அதிகரித்தல்'
    ],
    eligibility_en: [
      'Male student enrolled in recognized undergraduate, diploma, or technical program',
      'Must have studied 6th to 12th standard in Tamil Nadu Government or Govt-aided (Tamil medium) schools',
      'Regular full-time student'
    ],
    eligibility_ta: [
      'அங்கீகரிக்கப்பட்ட கல்லூரி அல்லது தொழிற்கல்வி பயிலும் மாணவர்',
      'தமிழ்நாடு அரசுப் பள்ளிகளில் 6 முதல் 12-ஆம் வகுப்பு வரை பயின்றிருக்க வேண்டும்',
      'முழுநேர மாணவராக இருக்க வேண்டும்'
    ],
    ageMin: 17,
    ageMax: 26,
    requiredGender: 'male',
    requiredStudent: true,
    documents_en: [
      'EMIS School Transfer Certificate / Proof of Govt School schooling (6th-12th)',
      'College Bonafide Certificate',
      'Student Aadhaar Card',
      'Bank Account Passbook (Aadhaar Seeded)'
    ],
    documents_ta: [
      'அரசுப் பள்ளி பயின்றதற்கான EMIS பள்ளி சான்றிதழ்',
      'கல்லூரி போனாஃபைட் சான்றிதழ்',
      'மாணவரின் ஆதார் அட்டை',
      'ஆதார் இணைக்கப்பட்ட வங்கிக் கணக்குப் புத்தகம்'
    ],
    applicationMethod_en: 'Apply through college administration through the Tamil Pudhalvan portal.',
    applicationMethod_ta: 'கல்லூரி மூலமாக தமிழ்ப் புதல்வன் பிரத்யேக போர்ட்டலில் விண்ணப்பிக்க வேண்டும்.',
    officialUrl: 'https://tamilpudhalvan.tn.gov.in',
    lastUpdated: '2025-01-20',
    status: 'Active',
    iconType: 'graduation'
  },
  {
    id: 'tn-cmchis-04',
    name_en: "Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS)",
    name_ta: 'முதலமைச்சரின் விரிவான மருத்துவக் காப்பீட்டுத் திட்டம்',
    government_level: 'Tamil Nadu Government',
    department_en: 'Health and Family Welfare Department',
    department_ta: 'மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை',
    category: 'Health & Medical Assistance',
    targetBeneficiaries_en: 'Low and middle income families residing in Tamil Nadu',
    targetBeneficiaries_ta: 'தமிழ்நாட்டில் உள்ள குறைந்த மற்றும் நடுத்தர வருமான குடும்பங்கள்',
    districtAvailability: 'All',
    description_en: 'Provides cashless hospitalization cover up to ₹5,00,000 per family per year for over 1,090 medical and surgical procedures across empanelled government and private hospitals.',
    description_ta: 'அரசு மற்றும் தனியார் மருத்துவமனைகளில் 1,090-க்கும் மேற்பட்ட சிகிச்சைகள் மற்றும் அறுவை சிகிச்சைகளுக்கு ஆண்டுக்கு ₹5,00,000 வரை கட்டணமில்லா பணமில்லா சிகிச்சை வழங்கும் மருத்துவக் காப்பீட்டு திட்டம்.',
    benefits_en: [
      'Cashless hospital coverage up to ₹5 Lakhs per family annually',
      'Covers pre-existing conditions, diagnostic procedures, surgeries, and critical care',
      'Valid at 1,000+ empanelled government and private hospitals statewide'
    ],
    benefits_ta: [
      'ஒரு குடும்பத்திற்கு ஆண்டுக்கு ₹5,00,000 வரை பணமில்லா மருத்துவ சிகிச்சை',
      'பரிசோதனைகள், முக்கிய அறுவை சிகிச்சைகள் மற்றும் அவசர சிகிச்சைகள் உள்ளடக்கம்',
      'மாநிலம் முழுவதும் 1,000-க்கும் மேற்பட்ட அரசு மற்றும் தனியார் மருத்துவமனைகளில் செல்லுபடியாகும்'
    ],
    eligibility_en: [
      'Family holding a valid Tamil Nadu Smart Ration Card',
      'Annual family income should be less than ₹1,20,000 (relaxed criteria for welfare board members)',
      'Sri Lankan Tamil refugees living in rehabilitation camps are eligible without income criteria'
    ],
    eligibility_ta: [
      'தமிழ்நாடு ஸ்மார்ட் குடும்ப அட்டை வைத்திருக்கும் குடும்பங்கள்',
      'குடும்ப ஆண்டு வருமானம் ₹1,20,000-க்குள் இருக்க வேண்டும் (நலவாரிய உறுப்பினர்களுக்கு தளர்வு உண்டு)',
      'மறுவாழ்வு முகாம்களில் வசிக்கும் இலங்கை தமிழர்களுக்கும் பொருந்தும்'
    ],
    incomeLimit: 120000,
    documents_en: [
      'Smart Family Ration Card',
      'Aadhaar Cards of all family members',
      'Income Certificate issued by Revenue Authority (VAO/Tahsildar)',
      'Passport size photographs of family members'
    ],
    documents_ta: [
      'ஸ்மார்ட் குடும்ப அட்டை',
      'குடும்ப உறுப்பினர்கள் அனைவரின் ஆதார் அட்டைகள்',
      'வருவாய்த்துறை வழங்கிய வருமானச் சான்றிதழ்',
      'குடும்ப உறுப்பினர்களின் புகைப்படங்கள்'
    ],
    applicationMethod_en: 'Visit the District Collectorate CMCHIS Kiosk or nearest e-Sevai centre with family card and documents.',
    applicationMethod_ta: 'மாவட்ட ஆட்சியர் அலுவலகத்தில் உள்ள காப்பீட்டு மையங்கள் அல்லது இ-சேவை மையம் மூலம் ஸ்மார்ட் கார்டு பெறலாம்.',
    officialUrl: 'https://cmchis.tn.gov.in',
    lastUpdated: '2025-02-01',
    status: 'Active',
    iconType: 'heart'
  },
  {
    id: 'tn-uzhavar-pathukappu-05',
    name_en: 'Uzhavar Pathukappu Thittam (Farmers Social Security Scheme)',
    name_ta: 'உழவர் பாதுகாப்புத் திட்டம்',
    government_level: 'Tamil Nadu Government',
    department_en: 'Revenue and Disaster Management & Agriculture Department',
    department_ta: 'வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை / வேளாண்மைத்துறை',
    category: 'Agriculture & Farmers',
    targetBeneficiaries_en: 'Farmers, agricultural labourers, and small landholders in Tamil Nadu',
    targetBeneficiaries_ta: 'தமிழ்நாட்டு விவசாயிகள், விவசாயக் கூலித் தொழிலாளர்கள் மற்றும் குத்தகைதாரர்கள்',
    districtAvailability: 'All',
    description_en: 'Comprehensive social security scheme covering small and marginal farmers and agricultural labourers with marriage assistance, maternity benefits, education scholarships for children, and accidental relief.',
    description_ta: 'விவசாயிகள் மற்றும் விவசாய தொழிலாளர்களுக்கு சமூகப் பாதுகாப்பு, விபத்து நிவாரணம், குழந்தைகளின் கல்வி உதவித்தொகை, மகப்பேறு உதவி மற்றும் திருமண உதவி வழங்கும் சமூகம் சார்ந்த திட்டம்.',
    benefits_en: [
      'Accidental death relief up to ₹1,00,000 and disability relief',
      'Education grants from 10th standard through postgraduate and professional degrees for children',
      'Marriage assistance up to ₹10,000 and maternity assistance of ₹6,000',
      'Monthly old age pension of ₹1,000 for destitute senior farmer members'
    ],
    benefits_ta: [
      'விபத்து மரண நிவாரணம் ₹1,00,000 வரை மற்றும் உடல் ஊனமுற்றோருக்கான உதவி',
      'குழந்தைகளின் 10-ஆம் வகுப்பு முதல் பட்டப்படிப்பு வரையிலான கல்வி உதவித்தொகை',
      'திருமண உதவி ₹10,000 மற்றும் மகப்பேறு உதவி ₹6,000',
      'முதியோர் விவசாய உறுப்பினர்களுக்கு மாதம் ₹1,000 ஓய்வூதியம்'
    ],
    eligibility_en: [
      'Agricultural labourers or farmers owning up to 2.5 acres of wetland or 5 acres of dryland',
      'Age between 18 and 65 years at time of registration',
      'Must be registered with the Tamil Nadu Farmers Welfare Board'
    ],
    eligibility_ta: [
      '2.5 ஏக்கர் நஞ்சை அல்லது 5 ஏக்கர் புஞ்சை நிலம் கொண்ட விவசாயிகள் அல்லது விவசாயக் கூலித் தொழிலாளர்கள்',
      'பதிவு செய்யும் போது வயது 18 முதல் 65-க்குள் இருக்க வேண்டும்',
      'உழவர் நல வாரியத்தில் பதிவு செய்த உறுப்பினராக இருக்க வேண்டும்'
    ],
    ageMin: 18,
    ageMax: 65,
    requiredFarmer: true,
    documents_en: [
      'Land Records (Patta / Chitta) or VAO Certificate for Agricultural Labourers',
      'Uzhavar Pathukappu Membership Card',
      'Aadhaar Card',
      'Bank Account Passbook'
    ],
    documents_ta: [
      'நிலப் பட்டா / சிட்டா அல்லது கிராம நிர்வாக அலுவலர் (VAO) விவசாய தொழிலாளர் சான்று',
      'உழவர் பாதுகாப்பு அட்டை',
      'ஆதார் அட்டை',
      'வங்கிக் கணக்கு புத்தகம்'
    ],
    applicationMethod_en: 'Apply through the Special Tahsildar (Social Security Schemes) in your Taluk Office.',
    applicationMethod_ta: 'வட்டார வட்டாட்சியர் அலுவலகம் (சமூக பாதுகாப்புத் திட்டங்கள்) அல்லது VAO மூலம் விண்ணப்பிக்கலாம்.',
    officialUrl: 'https://www.tn.gov.in/scheme/data_view/68547',
    lastUpdated: '2025-01-05',
    status: 'Active',
    iconType: 'leaf'
  },
  {
    id: 'tn-naan-mudhalvan-06',
    name_en: 'Naan Mudhalvan Skill Development and Career Guidance Scheme',
    name_ta: 'நான் முதல்வன் திறன் மேம்பாட்டுத் திட்டம்',
    government_level: 'Tamil Nadu Government',
    department_en: 'Tamil Nadu Skill Development Corporation (TNSDC)',
    department_ta: 'தமிழ்நாடு திறன் மேம்பாட்டுக் கழகம்',
    category: 'Skill Development',
    targetBeneficiaries_en: 'College students, graduates, and job-seeking youth of Tamil Nadu',
    targetBeneficiaries_ta: 'கல்லூரி மாணவர்கள், பட்டதாரிகள் மற்றும் வேலைதேடும் இளைஞர்கள்',
    districtAvailability: 'All',
    description_en: 'Empowers over 10 lakh youth annually with state-of-the-art training in Emerging Technologies (AI, Cloud Computing, Data Science, IoT, EV, Robotics) coupled with soft skills, spoken English, and campus placements.',
    description_ta: 'ஆண்டுதோறும் 10 லட்சத்திற்கும் மேற்பட்ட இளைஞர்களுக்கு செயற்கை நுண்ணறிவு, கிளவுட், டேட்டா சயின்ஸ், ரோபாட்டிக்ஸ் உள்ளிட்ட நவீன தொழில்நுட்ப பயிற்சிகளையும் வேலைவாய்ப்புகளையும் வழங்கும் திட்டம்.',
    benefits_en: [
      'Free industry-recognized certifications from global tech giants (Google, Microsoft, IBM, AWS, Cisco)',
      'Integrated curriculum within engineering, arts, science, and polytechnic colleges',
      'Direct access to corporate placement drives and internship stipends'
    ],
    benefits_ta: [
      'கூகுள், மைக்ரோசாப்ட், ஐபிஎம் உள்ளிட்ட முன்னணி நிறுவனங்களின் இலவச சான்றிதழ் பயிற்சிகள்',
      'கல்லூரிப் பாடத்திட்டத்துடன் இணைக்கப்பட்ட நடைமுறை தொழில்நுட்பப் பயிற்சிகள்',
      'நேரடி வேலைவாய்ப்பு முகாம்கள் மற்றும் உள்ளகப் பயிற்சி (Internship) வாய்ப்புகள்'
    ],
    eligibility_en: [
      'Enrolled college student (Engineering, Arts & Science, Polytechnic, ITI) or recent graduate in Tamil Nadu',
      'Youth seeking industry-ready skill upgradation and employment'
    ],
    eligibility_ta: [
      'தமிழ்நாட்டின் பொறியியல், கலை, அறிவியல், பாலிடெக்னிக், ஐடிஐ மாணவர்கள் அல்லது பட்டதாரிகள்',
      'திறன் மேம்பாடு மற்றும் வேலைவாய்ப்பு பெற விரும்பும் இளைஞர்கள்'
    ],
    ageMin: 17,
    ageMax: 30,
    documents_en: [
      'College ID Card or Degree Certificate',
      'Aadhaar Card',
      'Resume / Student Profile on Naan Mudhalvan Portal'
    ],
    documents_ta: [
      'கல்லூரி அடையாள அட்டை அல்லது பட்டச் சான்றிதழ்',
      'ஆதார் அட்டை',
      'நான் முதல்வன் போர்ட்டலில் பதிவு செய்யப்பட்ட சுயவிவரம்'
    ],
    applicationMethod_en: 'Register directly on the Naan Mudhalvan digital portal or through college campus training coordinators.',
    applicationMethod_ta: 'naanmudhalvan.tn.gov.in இணையதளம் மூலமாகவோ கல்லூரி ஒருங்கிணைப்பாளர்கள் மூலமாகவோ பதிவு செய்யலாம்.',
    officialUrl: 'https://naanmudhalvan.tn.gov.in',
    lastUpdated: '2025-02-15',
    status: 'Active',
    iconType: 'briefcase'
  },
  {
    id: 'tn-aabcs-07',
    name_en: 'Annal Ambedkar Business Champions Scheme (AABCS)',
    name_ta: 'அண்ணல் அம்பேத்கர் தொழில் முன்னோடிகள் திட்டம்',
    government_level: 'Tamil Nadu Government',
    department_en: 'Micro, Small and Medium Enterprises (MSME) Department',
    department_ta: 'குறு, சிறு மற்றும் நடுத்தரத் தொழில் நிறுவனங்கள் துறை',
    category: 'Entrepreneurship',
    targetBeneficiaries_en: 'SC and ST first-generation entrepreneurs in Tamil Nadu',
    targetBeneficiaries_ta: 'ஆதிதிராவிடர் மற்றும் பழங்குடியின (SC/ST) தொழில்முனைவோர்',
    districtAvailability: 'All',
    description_en: 'Provides 35% capital subsidy (up to ₹35 Lakhs) and 6% interest subvention for SC/ST entrepreneurs setting up new manufacturing, service, or trading business ventures in Tamil Nadu.',
    description_ta: 'ஆதிதிராவிடர் மற்றும் பழங்குடியின தொழில்முனைவோரின் புதிய உற்பத்தி மற்றும் சேவைத் தொழில் திட்டங்களுக்கு 35% மானியம் (அதிகபட்சம் ₹35 லட்சம்) மற்றும் 6% வட்டி மானியம் வழங்கும் திட்டம்.',
    benefits_en: [
      '35% Capital Subsidy on plant and machinery (up to ₹35,00,000)',
      '6% Interest Subvention on bank term loans for the entire repayment tenure',
      'No minimum educational qualification required for projects up to certain ceilings'
    ],
    benefits_ta: [
      'இயந்திரங்கள் மற்றும் தளவாடங்களுக்கு 35% முதலீட்டு மானியம் (அதிகபட்சம் ₹35 லட்சம்)',
      'வங்கிக் கடனுக்கு 6% வட்டி மானியம்',
      'எளிமையான தகுதி விதிகளுடன் கூடிய விரைவான தொழில் கடன் ஒப்புதல்'
    ],
    eligibility_en: [
      'Applicant must belong to Scheduled Caste (SC) or Scheduled Tribe (ST) community',
      'Resident of Tamil Nadu setting up business within the state',
      'Age between 18 and 55 years',
      'Applicant should not have availed capital subsidy under other government schemes previously'
    ],
    eligibility_ta: [
      'விண்ணப்பதாரர் SC அல்லது ST பிரிவைச் சேர்ந்தவராக இருக்க வேண்டும்',
      'தமிழ்நாட்டில் புதிய உற்பத்தி அல்லது சேவை தொழில் தொடங்குபவராக இருக்க வேண்டும்',
      'வயது 18 முதல் 55-க்குள் இருக்க வேண்டும்',
      'முன்பு அரசு மூலதன மானியம் பெற்றிருக்கக் கூடாது'
    ],
    ageMin: 18,
    ageMax: 55,
    requiredCategory: ['sc', 'st'],
    documents_en: [
      'Community Certificate (SC/ST) issued by competent authority',
      'Detailed Project Report (DPR)',
      'Aadhaar and PAN Card',
      'Quotation for Machinery/Equipment',
      'Bank Loan In-principle sanction letter'
    ],
    documents_ta: [
      'சாதிச் சான்றிதழ் (SC/ST)',
      'விரிவான திட்ட அறிக்கை (DPR)',
      'ஆதார் மற்றும் பான் அட்டை',
      'இயந்திரங்களுக்கான விலைப்பட்டியல் (Quotation)',
      'வங்கி கடன் ஒப்புதல் கடிதம்'
    ],
    applicationMethod_en: 'Apply online through the Single Window Portal of MSME (msmeonline.tn.gov.in) or General Manager, DIC.',
    applicationMethod_ta: 'மாவட்ட தொழில் மையம் (DIC) அல்லது msmeonline.tn.gov.in இணையதளம் வழியாக விண்ணப்பிக்கலாம்.',
    officialUrl: 'https://msmeonline.tn.gov.in',
    lastUpdated: '2025-01-10',
    status: 'Active',
    iconType: 'sparkles'
  },
  {
    id: 'tn-mrmbs-08',
    name_en: 'Dr. Muthulakshmi Reddy Maternity Benefit Scheme (MRMBS)',
    name_ta: 'டாக்டர் முத்துலட்சுமி ரெட்டி மகப்பேறு நிதி உதவித் திட்டம்',
    government_level: 'Tamil Nadu Government',
    department_en: 'Public Health and Preventive Medicine Department',
    department_ta: 'பொது சுகாதாரம் மற்றும் நோய் தடுப்பு மருந்துத்துறை',
    category: 'Women Welfare',
    targetBeneficiaries_en: 'Pregnant women from economically weaker sections',
    targetBeneficiaries_ta: 'ஏழை மற்றும் நடுத்தர குடும்பத்து கர்ப்பிணிப் தாய்மார்கள்',
    districtAvailability: 'All',
    description_en: 'Provides financial assistance of ₹18,000 (disbursed in 5 installments) along with two Amma Nutrition Kits worth ₹4,000 each to ensure nutritional security and safe institutional delivery.',
    description_ta: 'கர்ப்பிணிப் பெண்களுக்கு சத்தான உணவு மற்றும் பாதுகாப்பான பிரசவத்தை உறுதிசெய்ய 5 தவணைகளில் ₹18,000 நிதி உதவியும் ₹4,000 மதிப்புள்ள இரண்டு ஊட்டச்சத்து பெட்டகங்களும் வழங்கும் திட்டம்.',
    benefits_en: [
      'Total financial assistance of ₹18,000 in staggered milestone installments',
      '2 Nutrition Kits containing iron tonic, dates, protein powder, nutrition mix, and ghee',
      'Promotes 100% institutional deliveries in government health centers'
    ],
    benefits_ta: [
      '5 தவணைகளில் மொத்தம் ₹18,000 நிதி உதவி',
      'ஊட்டச்சத்து மாவு, பேரீச்சம்பழம், நெய், இரும்புச்சத்து டானிக் அடங்கிய 2 ஊட்டச்சத்து பெட்டகங்கள்',
      'அரசு மருத்துவமனைகளில் பாதுகாப்பான பிரசவத்தை உறுதிப்படுத்துதல்'
    ],
    eligibility_en: [
      'Pregnant mother aged 19 years or above from BPL / lower income households',
      'Must register pregnancy before 12 weeks with Village Health Nurse (PICME registration)',
      'Restricted to first two deliveries only'
    ],
    eligibility_ta: [
      '19 வயது பூர்த்தியடைந்த வறுமைக் கோட்டிற்கு கீழ் உள்ள கர்ப்பிணித் தாய்மார்கள்',
      'கிராம சுகாதார செவிலியரிடம் 12 வாரங்களுக்குள் கர்ப்பத்தைப் பதிவு செய்திருக்க வேண்டும் (PICME எண்)',
      'முதல் இரண்டு பிரசவங்களுக்கு மட்டுமே பொருந்தும்'
    ],
    ageMin: 19,
    ageMax: 45,
    requiredGender: 'female',
    documents_en: [
      'PICME (Pregnancy and Infant Cohort Monitoring and Evaluation) 12-digit RCH ID',
      'Mother-Child Protection Card (MCP Card)',
      'Aadhaar Card of pregnant woman',
      'Bank Account Passbook (Aadhaar Seeded)'
    ],
    documents_ta: [
      '12 இலக்க PICME / RCH பதிவு எண்',
      'தாய்-சேய் நலப் பாதுகாப்பு அட்டை',
      'தாயின் ஆதார் அட்டை',
      'ஆதார் இணைக்கப்பட்ட வங்கிக் கணக்குப் புத்தகம்'
    ],
    applicationMethod_en: 'Register with your local Village Health Nurse (VHN) or Urban Primary Health Centre (UPHC).',
    applicationMethod_ta: 'பகுதி கிராம சுகாதார செவிலியர் (VHN) அல்லது நகர்ப்புற ஆரம்ப சுகாதார நிலையத்தில் பதிவு செய்யவும்.',
    officialUrl: 'https://picme.tn.gov.in',
    lastUpdated: '2025-01-18',
    status: 'Active',
    iconType: 'heart'
  },
  {
    id: 'tn-differently-abled-09',
    name_en: 'Maintenance Allowance for Persons with Severe Disabilities',
    name_ta: 'கடுமையாக மாற்றுத்திறனாளிகளுக்கான பராமரிப்பு உதவித்தொகை',
    government_level: 'Tamil Nadu Government',
    department_en: 'Welfare of Differently Abled Persons Department',
    department_ta: 'மாற்றுத்திறனாளிகள் நலத்துறை',
    category: 'Disability Welfare',
    targetBeneficiaries_en: 'Persons with 40% or more disability and intellectual disabilities in TN',
    targetBeneficiaries_ta: '40% அல்லது அதற்கு மேற்பட்ட மாற்றுத்திறன் கொண்ட நபர்கள்',
    districtAvailability: 'All',
    description_en: 'A dedicated social protection scheme providing monthly financial maintenance allowance of ₹2,000 to individuals with severe loco-motor, intellectual, visual, or multiple disabilities.',
    description_ta: 'கடுமையான உடல் ஊனம், மனவளர்ச்சி குறைபாடு, பார்வை குறைபாடு அல்லது பலவகை மாற்றுத்திறன் கொண்ட நபர்களுக்கு மாதம் ₹2,000 பராமரிப்பு உதவித்தொகை வழங்கும் திட்டம்.',
    benefits_en: [
      'Monthly maintenance pension of ₹2,000 transferred via DBT directly into beneficiary account',
      'Free public transport travel concession pass',
      'Free assistive aids (motorized wheel-chairs, hearing aids, braille kits) upon assessment'
    ],
    benefits_ta: [
      'மாதந்தோறும் ₹2,000 பராமரிப்பு உதவித்தொகை நேரடி வங்கிப் பரிமாற்றம்',
      'அரசுப் பேருந்துகளில் இலவச பயண சலுகை அட்டை',
      'முச்சக்கர வண்டிகள், காதொலி கருவிகள் போன்ற உதவி உபகரணங்கள் இலவசமாக வழங்குதல்'
    ],
    eligibility_en: [
      'Resident of Tamil Nadu with certified disability of 40% or higher',
      'Holding Unique Disability Identity Card (UDID) or National Disability Identity Card',
      'All age groups eligible'
    ],
    eligibility_ta: [
      'தமிழ்நாடு குடியுரிமை கொண்ட 40% அல்லது அதற்கு மேற்பட்ட மாற்றுத்திறன் உடையவர்கள்',
      'UDID தேசிய மாற்றுத்திறனாளி அடையாள அட்டை அல்லது மாநில அடையாள அட்டை பெற்றிருக்க வேண்டும்',
      'அனைத்து வயதினரும் தகுதியானவர்கள்'
    ],
    requiredDisability: true,
    documents_en: [
      'Disability Certificate & UDID Card issued by Medical Board',
      'Aadhaar Card',
      'Family Ration Card',
      'Bank Passbook of beneficiary or legal guardian'
    ],
    documents_ta: [
      'மருத்துவக் குழு வழங்கிய மாற்றுத்திறனாளி சான்றிதழ் மற்றும் UDID அட்டை',
      'ஆதார் அட்டை',
      'குடும்ப அட்டை',
      'பயனாளி அல்லது பாதுகாவலரின் வங்கிக் கணக்குப் புத்தகம்'
    ],
    applicationMethod_en: 'Apply at District Differently Abled Welfare Office (DDAWO) or through e-Sevai centres.',
    applicationMethod_ta: 'மாவட்ட மாற்றுத்திறனாளிகள் நல அலுவலர் (DDAWO) அலுவலகம் அல்லது இ-சேவை மையம் மூலம் விண்ணப்பிக்கலாம்.',
    officialUrl: 'https://scd.tn.gov.in',
    lastUpdated: '2025-02-05',
    status: 'Active',
    iconType: 'wheelchair'
  },
  {
    id: 'tn-oap-10',
    name_en: 'Tamil Nadu Old Age Pension Scheme (OAP)',
    name_ta: 'தமிழ்நாடு முதியோர் உதவித்தொகை திட்டம் (OAP)',
    government_level: 'Tamil Nadu Government',
    department_en: 'Revenue and Disaster Management Department',
    department_ta: 'வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை',
    category: 'Senior Citizens',
    targetBeneficiaries_en: 'Destitute senior citizens aged 60 and above with no family support',
    targetBeneficiaries_ta: 'ஆதரவற்ற 60 வயதுக்கு மேற்பட்ட முதியவர்கள்',
    districtAvailability: 'All',
    description_en: 'Monthly pension of ₹1,200 along with free rice (20 kgs) and free dhotis/sarees twice a year on Pongal and Diwali to support destitute senior citizens having no regular source of livelihood.',
    description_ta: 'ஆதரவற்ற முதியோருக்கு வாழ்வாதார பாதுகாப்பிற்காக மாதம் ₹1,200 ஓய்வூதியம், இலவச அரிசி மற்றும் பொங்கல்/தீபாவளிக்கு இலவச வேட்டி-சேலைகள் வழங்கும் சமூக பாதுகாப்பு திட்டம்.',
    benefits_en: [
      'Monthly direct pension of ₹1,200',
      'Free monthly rice (up to 20 kg) through Fair Price Shops',
      'Free Sarees and Dhotis distributed during festive periods'
    ],
    benefits_ta: [
      'மாதந்தோறும் ₹1,200 முதியோர் ஓய்வூதியம்',
      'நியாயவிலைக் கடைகள் மூலம் மாதந்தோறும் இலவச அரிசி (20 கிலோ வரை)',
      'பொங்கல் மற்றும் தீபாவளி பண்டிகைகளில் இலவச வேட்டி, சேலைகள்'
    ],
    eligibility_en: [
      'Applicant must be aged 60 years or above (destitute criteria)',
      'Should not have continuous family income or earning adult son/daughter in a position to support',
      'Resident of Tamil Nadu holding BPL / destitute verification'
    ],
    eligibility_ta: [
      'விண்ணப்பதாரர் 60 வயது அல்லது அதற்கு மேற்பட்டவராக இருக்க வேண்டும்',
      'வழக்கமான வருமானம் அல்லது ஆதரவு இல்லாதவராக இருக்க வேண்டும்',
      'தமிழ்நாட்டில் வசிக்கும் வறுமைக் கோட்டிற்கு கீழ் உள்ள நபர்'
    ],
    ageMin: 60,
    documents_en: [
      'Age Proof (Aadhaar Card, Voter ID, or Medical Certificate)',
      'Smart Ration Card',
      'Destitute Verification Certificate by Village Administrative Officer (VAO)',
      'Bank Account details'
    ],
    documents_ta: [
      'வயது சான்று (ஆதார் அட்டை, வாக்காளர் அடையாள அட்டை)',
      'ஸ்மார்ட் குடும்ப அட்டை',
      'கிராம நிர்வாக அலுவலர் (VAO) வழங்கிய ஆதரவற்றோர் சான்றிதழ்',
      'வங்கிக் கணக்கு விவரங்கள்'
    ],
    applicationMethod_en: 'Apply through your Taluk Office (Social Security Tahsildar) or local e-Sevai centre.',
    applicationMethod_ta: 'வட்டார வட்டாட்சியர் அலுவலகம் (சமூக பாதுகாப்பு) அல்லது அருகில் உள்ள இ-சேவை மையத்தில் விண்ணப்பிக்கலாம்.',
    officialUrl: 'https://www.tn.gov.in/scheme/data_view/68545',
    lastUpdated: '2025-01-12',
    status: 'Active',
    iconType: 'user-check'
  },
  {
    id: 'tn-kalaignar-kanavu-illam-11',
    name_en: 'Kalaignar Kanavu Illam Scheme (Dream Home Housing)',
    name_ta: 'கலைஞர் கனவு இல்லம் திட்டம்',
    government_level: 'Tamil Nadu Government',
    department_en: 'Rural Development and Panchayat Raj Department',
    department_ta: 'ஊரக வளர்ச்சி மற்றும் ஊராட்சித் துறை',
    category: 'Housing',
    targetBeneficiaries_en: 'Hut dwellers and rural poor living in kutcha houses in Tamil Nadu',
    targetBeneficiaries_ta: 'குடிசைகள் மற்றும் தற்காலிக வீடுகளில் வாழும் கிராமப்புற ஏழை மக்கள்',
    districtAvailability: 'All',
    description_en: 'A massive housing mission providing financial grant of ₹3,50,000 per beneficiary to replace vulnerable huts with safe, climate-resilient concrete pucca houses across rural Tamil Nadu.',
    description_ta: 'கிராமப்புறங்களில் உள்ள குடிசைகளை மாற்றி, அனைவருக்கும் கான்கிரீட் கூரையுடன் கூடிய பாதுகாப்பான நிரந்தர வீடுகள் கட்டித் தருவதற்காக தலா ₹3,50,000 நிதி உதவி வழங்கும் திட்டம்.',
    benefits_en: [
      'Financial subsidy of ₹3,50,000 per house directly linked to construction milestones',
      'Includes provision for toilet construction under Swachh Bharat Mission',
      'Free cement and steel allocated at subsidized government rates'
    ],
    benefits_ta: [
      'வீடு கட்டுவதற்கு தவணை முறையில் ₹3,50,000 நேரடி மானிய உதவி',
      'கழிப்பறை வசதி மற்றும் குடிநீர் இணைப்புடன் கூடிய தரமான கான்கிரீட் வீடு',
      'அரசு மானிய விலையில் தரமான சிமெண்ட் மற்றும் இரும்பு கம்பிகள்'
    ],
    eligibility_en: [
      'Must be a resident of rural village panchayat in Tamil Nadu',
      'Must own land or have grama natham patta for at least 300 sq.ft.',
      'Existing house must be a hut / thatched / mud house identified in the rural hut survey',
      'Must not own any other concrete pucca house'
    ],
    eligibility_ta: [
      'கிராம ஊராட்சி பகுதியில் வசிக்கும் நபராக இருக்க வேண்டும்',
      'குறைந்தது 300 சதுர அடி நிலம் அல்லது நத்தம் பட்டா வைத்திருக்க வேண்டும்',
      'தற்போது குடிசை அல்லது மண் சுவருடன் கூடிய கூரை வீட்டில் வசிப்பவராக இருக்க வேண்டும்',
      'வேறு எந்த இடத்திலும் கான்கிரீட் வீடு இருக்கக் கூடாது'
    ],
    incomeLimit: 200000,
    documents_en: [
      'Land Patta / Document showing ownership of house site',
      'Smart Ration Card',
      'Aadhaar Card of head of family and spouse',
      'Photograph of existing hut',
      'Bank Account Passbook'
    ],
    documents_ta: [
      'மனைக்கான பட்டா அல்லது வீட்டு மனை உரிமை ஆவணம்',
      'ஸ்மார்ட் குடும்ப அட்டை',
      'குடும்பத் தலைவர் மற்றும் துணையின் ஆதார் அட்டை',
      'தற்போதைய குடிசை வீட்டின் புகைப்படம்',
      'வங்கி கணக்கு புத்தகம்'
    ],
    applicationMethod_en: 'Selection is done through Village Panchayat Grama Sabha based on the rural hut survey.',
    applicationMethod_ta: 'கிராம ஊராட்சி மன்றம் மற்றும் கிராம சபை மூலம் கணக்கெடுப்பு அடிப்படையில் பயனாளிகள் தேர்வு செய்யப்படுகின்றனர்.',
    officialUrl: 'https://tnrd.tn.gov.in',
    lastUpdated: '2025-01-25',
    status: 'Active',
    iconType: 'home'
  },
  {
    id: 'tn-needs-12',
    name_en: 'New Entrepreneur-cum-Enterprise Development Scheme (NEEDS)',
    name_ta: 'புதிய தொழில்முனைவோர் மற்றும் தொழில் நிறுவன மேம்பாட்டுத் திட்டம் (NEEDS)',
    government_level: 'Tamil Nadu Government',
    department_en: 'Micro, Small and Medium Enterprises (MSME) Department',
    department_ta: 'குறு, சிறு மற்றும் நடுத்தரத் தொழில் நிறுவனங்கள் துறை',
    category: 'Entrepreneurship',
    targetBeneficiaries_en: 'First-generation educated entrepreneurs in Tamil Nadu',
    targetBeneficiaries_ta: 'முதல் தலைமுறை படித்த இளம் தொழில்முனைவோர்',
    districtAvailability: 'All',
    description_en: 'Assists educated first-generation entrepreneurs with 25% project capital subsidy (up to ₹75 Lakhs) and 3% interest subvention for setting up manufacturing or service enterprises with project costs from ₹10 Lakh to ₹5 Crore.',
    description_ta: 'முதல் தலைமுறை பட்டதாரி தொழில்முனைவோருக்கு ₹10 லட்சம் முதல் ₹5 கோடி வரையிலான புதிய தொழில் தொடங்க 25% மூலதன மானியம் (அதிகபட்சம் ₹75 லட்சம்) மற்றும் 3% வட்டி மானியம் வழங்கும் திட்டம்.',
    benefits_en: [
      '25% Capital Subsidy on total project cost (up to ₹75,00,000)',
      '3% Interest Subvention for the duration of bank loan',
      'Collateral guarantee coverage under CGTMSE scheme paid by state government',
      'Compulsory entrepreneurship training by Entrepreneurship Development & Innovation Institute (EDII-TN)'
    ],
    benefits_ta: [
      'திட்ட மதிப்பீட்டில் 25% முதலீட்டு மானியம் (அதிகபட்சம் ₹75 லட்சம்)',
      'வங்கிக் கடனுக்கு 3% வட்டி மானியம்',
      'CGTMSE திட்டத்தின் கீழ் பிணையில்லா கடன் வசதிக்கான ஆதரவு',
      'EDII-TN மூலம் இலவச தொழில்முனைவோர் பயிற்சி'
    ],
    eligibility_en: [
      'First-generation entrepreneur with Degree, Diploma, or ITI qualification',
      'Age between 21 and 35 years (relaxed up to 45 years for Women, SC/ST, BC/MBC, Ex-servicemen, Differently Abled)',
      'Resident of Tamil Nadu for past 3 years'
    ],
    eligibility_ta: [
      'பட்டப்படிப்பு, பட்டயம் அல்லது ITI தகுதி கொண்ட முதல் தலைமுறை தொழில்முனைவோர்',
      'வயது 21 முதல் 35-க்குள் (பெண்கள், SC/ST, BC/MBC, மாற்றுத்திறனாளிகளுக்கு 45 வயது வரை தளர்வு)',
      'கடந்த 3 ஆண்டுகளாக தமிழ்நாட்டில் வசிப்பவராக இருக்க வேண்டும்'
    ],
    ageMin: 21,
    ageMax: 45,
    educationLevel: 'graduate',
    documents_en: [
      'Educational Degree / Diploma Certificate',
      'Detailed Project Report (DPR) with cash flow projections',
      'Aadhaar Card, Community Certificate, and Residence Proof',
      'Quotations for Machinery and Plant'
    ],
    documents_ta: [
      'பட்டப்படிப்பு / பட்டயச் சான்றிதழ்',
      'விரிவான தொழில் திட்ட அறிக்கை (DPR)',
      'ஆதார் அட்டை, சாதிச் சான்றிதழ் மற்றும் இருப்பிடச் சான்று',
      'இயந்திரங்கள் வாங்குவதற்கான விலைப்புள்ளி (Quotations)'
    ],
    applicationMethod_en: 'Apply online on msmeonline.tn.gov.in and submit project documents to the District Industries Centre (DIC).',
    applicationMethod_ta: 'msmeonline.tn.gov.in இணையதளம் மூலம் விண்ணப்பித்து மாவட்ட தொழில் மையத்தில் (DIC) சமர்ப்பிக்கவும்.',
    officialUrl: 'https://msmeonline.tn.gov.in',
    lastUpdated: '2025-02-12',
    status: 'Active',
    iconType: 'sparkles'
  },
  {
    id: 'tn-post-matric-13',
    name_en: 'Post-Matric Scholarship for SC/ST and Converted Christians',
    name_ta: 'ஆதிதிராவிடர் மற்றும் பழங்குடியினருக்கான மெட்ரிக் பின் கல்வி உதவித்தொகை',
    government_level: 'Tamil Nadu Government',
    department_en: 'Adi Dravidar and Tribal Welfare Department',
    department_ta: 'ஆதிதிராவிடர் மற்றும் பழங்குடியினர் நலத்துறை',
    category: 'Education & Scholarships',
    targetBeneficiaries_en: 'SC, ST, and Converted Christian students pursuing post-10th education',
    targetBeneficiaries_ta: '10-ஆம் வகுப்பிற்குப் பிறகு உயர்கல்வி பயிலும் SC/ST மாணவர்கள்',
    districtAvailability: 'All',
    description_en: 'Full reimbursement of non-refundable tuition fees, exam fees, and maintenance allowance for SC/ST students studying in post-matriculation courses including Engineering, Medicine, Arts, and Sciences.',
    description_ta: '11-ஆம் வகுப்பு முதல் பட்டப்படிப்பு, தொழிற்கல்வி பயிலும் ஆதிதிராவிடர், பழங்குடியினர் மாணவர்களுக்கு கல்விக் கட்டணம் முழு விலக்கு மற்றும் மாத பராமரிப்பு உதவித்தொகை வழங்கும் திட்டம்.',
    benefits_en: [
      'Full waiver/reimbursement of tuition fee fixed by government committee',
      'Maintenance allowance for hostellers and day scholars',
      'Direct credit into student Aadhaar-linked bank account'
    ],
    benefits_ta: [
      'அரசு நிர்ணயித்த முழுக் கல்விக் கட்டணமும் அரசே செலுத்துகிறது',
      'விடுதியில் தங்கிப் படிப்போர் மற்றும் தினசரி வருவோருக்கான பராமரிப்பு படி',
      'நேரடி வங்கிப் பரிமாற்றம் மூலம் நிதி விடுவிப்பு'
    ],
    eligibility_en: [
      'Student must belong to SC, ST, or Converted Christian community',
      'Annual family income must not exceed ₹2,50,000',
      'Must have passed Class 10 and enrolled in recognized higher secondary or degree course'
    ],
    eligibility_ta: [
      'ஆதிதிராவிடர் (SC), பழங்குடியினர் (ST) அல்லது கிறித்துவ மதத்திற்கு மாறிய ஆதிதிராவிடர்',
      'குடும்ப ஆண்டு வருமானம் ₹2,50,000-க்கு மிகாமல் இருக்க வேண்டும்',
      '10-ஆம் வகுப்பு தேர்ச்சி பெற்று உயர்கல்வி பயில்பவராக இருக்க வேண்டும்'
    ],
    incomeLimit: 250000,
    ageMin: 15,
    ageMax: 30,
    requiredCategory: ['sc', 'st'],
    requiredStudent: true,
    documents_en: [
      'Community Certificate (SC/ST)',
      'Income Certificate issued by Tahsildar',
      'Previous year Mark Sheet / Transfer Certificate',
      'Aadhaar Card and Student Bank Passbook'
    ],
    documents_ta: [
      'சாதிச் சான்றிதழ் (SC/ST)',
      'வட்டாட்சியர் வழங்கிய வருமானச் சான்றிதழ்',
      'முந்தைய ஆண்டின் மதிப்பெண் பட்டியல்',
      'மாணவரின் ஆதார் அட்டை மற்றும் வங்கிக் கணக்குப் புத்தகம்'
    ],
    applicationMethod_en: 'Apply through your institution via the Tamil Nadu Adi Dravidar Scholarship portal (tnadwscholarship.tn.gov.in).',
    applicationMethod_ta: 'கல்லூரி / பள்ளி மூலமாக tnadwscholarship.tn.gov.in போர்ட்டலில் விண்ணப்பிக்கலாம்.',
    officialUrl: 'https://adwelfare.tn.gov.in',
    lastUpdated: '2025-01-30',
    status: 'Active',
    iconType: 'graduation'
  },
  {
    id: 'central-pm-kisan-14',
    name_en: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    name_ta: 'பிரதம மந்திரி கிசான் சம்மான் நிதி (PM-KISAN)',
    government_level: 'Central Government',
    department_en: 'Ministry of Agriculture and Farmers Welfare (Implemented with TN Agriculture Dept)',
    department_ta: 'மத்திய வேளாண்மை அமைச்சகம் (தமிழ்நாடு வேளாண்மைத் துறையுடன் இணைந்து)',
    category: 'Agriculture & Farmers',
    targetBeneficiaries_en: 'Landholding farmer families in Tamil Nadu',
    targetBeneficiaries_ta: 'விவசாய நிலம் வைத்துள்ள தமிழ்நாட்டு விவசாய குடும்பங்கள்',
    districtAvailability: 'All',
    description_en: 'Central Government scheme implemented in Tamil Nadu providing ₹6,000 per year in three equal four-monthly installments of ₹2,000 directly into the bank accounts of landholder farmer families.',
    description_ta: 'விவசாய நிலம் வைத்துள்ள விவசாயிகளுக்கு ஆண்டுதோறும் ₹6,000 நிதி உதவியை நான்கு மாதங்களுக்கு ஒருமுறை ₹2,000 வீதம் 3 தவணைகளில் நேரடியாக வங்கிக் கணக்கில் செலுத்தும் மத்திய அரசு திட்டம்.',
    benefits_en: [
      'Guaranteed ₹6,000 annual income support (3 installments of ₹2,000)',
      'Direct DBT credit to Aadhaar-seeded bank account',
      'Assists with purchasing seeds, fertilizers, and farm inputs before crop cycles'
    ],
    benefits_ta: [
      'ஆண்டுக்கு ₹6,000 நேரடி நிதி உதவி (தலா ₹2,000 வீதம் 3 தவணைகள்)',
      'ஆதார் இணைக்கப்பட்ட வங்கிக் கணக்கில் நேரடியாக வரவு',
      'விதை, உரம் உள்ளிட்ட விவசாய உள்ளீடுகள் வாங்குவதற்கான ஆதரவு'
    ],
    eligibility_en: [
      'Farmer family holding cultivable agricultural land registered in their name in Tamil Nadu',
      'Must have land records (Patta / Chitta) seeded with Aadhaar',
      'Institutional landholders and income tax payers are excluded'
    ],
    eligibility_ta: [
      'சொந்த பெயரில் சாகுபடி செய்யக்கூடிய விவசாய நிலம் வைத்திருக்கும் விவசாயிகள்',
      'பட்டா மற்றும் நில ஆவணங்கள் ஆதாருடன் இணைக்கப்பட்டிருக்க வேண்டும்',
      'வருமான வரி செலுத்துவோர் மற்றும் அரசு ஊழியர்களுக்கு பொருந்தாது'
    ],
    requiredFarmer: true,
    documents_en: [
      'Land Ownership Record (Tamil Nadu Patta / Chitta copy)',
      'Aadhaar Card (Mandatory for biometric eKYC)',
      'Aadhaar-seeded Bank Account Passbook',
      'Active Mobile Number'
    ],
    documents_ta: [
      'தமிழ்நாடு பட்டா / சிட்டா நகல் (நில உரிமை ஆவணம்)',
      'ஆதார் அட்டை (பயோமெட்ரிக் e-KYC கட்டாயம்)',
      'ஆதார் இணைக்கப்பட்ட வங்கிக் கணக்கு புத்தகம்',
      'செயலில் உள்ள செல்போன் எண்'
    ],
    applicationMethod_en: 'Self-registration through pmkisan.gov.in or via nearest Village e-Sevai / CSC centres.',
    applicationMethod_ta: 'pmkisan.gov.in போர்ட்டலில் சுயமாகவோ அல்லது அருகில் உள்ள இ-சேவை மையங்கள் மூலமாகவோ பதிவு செய்யலாம்.',
    officialUrl: 'https://pmkisan.gov.in',
    lastUpdated: '2025-02-18',
    status: 'Active',
    iconType: 'leaf'
  },
  {
    id: 'central-pmay-g-15',
    name_en: 'Pradhan Mantri Awas Yojana - Gramin (PMAY-G) in Tamil Nadu',
    name_ta: 'பிரதம மந்திரி ஆவாஸ் யோஜனா - கிராமப்புறம் (PMAY-G)',
    government_level: 'Central Government',
    department_en: 'Ministry of Rural Development & TN Rural Development Department',
    department_ta: 'ஊரக வளர்ச்சி அமைச்சகம் மற்றும் தமிழ்நாடு ஊரக வளர்ச்சித் துறை',
    category: 'Housing',
    targetBeneficiaries_en: 'Homeless and families living in dilapidated houses in rural Tamil Nadu',
    targetBeneficiaries_ta: 'கிராமப்புறங்களில் வீடு இல்லாதோர் மற்றும் பழுதடைந்த வீடுகளில் வாழ்வோர்',
    districtAvailability: 'All',
    description_en: 'Central assistance combined with Tamil Nadu state top-up providing financial assistance of ₹2,77,000 for constructing a permanent disaster-resilient house of minimum 25 sq.mt area with basic amenities.',
    description_ta: 'மத்திய மற்றும் தமிழ்நாடு அரசின் கூட்டு நிதி பங்களிப்பில், கிராமப்புற ஏழைகளுக்கு அனைத்து அடிப்படை வசதிகளுடன் கூடிய கான்கிரீட் வீடு கட்ட ₹2.77 லட்சம் நிதி உதவி வழங்கும் திட்டம்.',
    benefits_en: [
      'Financial subsidy of ₹2,77,000 (Central + State combined share)',
      'Additional 90 person-days of unskilled labor wages under MGNREGS (approx. ₹25,000)',
      '₹12,000 incentive for constructing sanitation toilet facility',
      'LPG connection under PM Ujjwala and power under Saubhagya'
    ],
    benefits_ta: [
      'மத்திய-மாநில அரசுகளின் ஒருங்கிணைந்த நிதி உதவி ₹2,77,000',
      '100 நாள் வேலைத் திட்டத்தின் கீழ் கூடுதலாக 90 நாள் கூலி உதவி (சுமார் ₹25,000)',
      'கழிப்பறை கட்ட ₹12,000 தனி மானியம்',
      'இலவச சமையல் எரிவாயு மற்றும் மின்சார இணைப்பு'
    ],
    eligibility_en: [
      'Families registered under the Socio-Economic Caste Census (SECC) / Awas+ survey list',
      'Must not own a pucca concrete house anywhere in India',
      'Must possess land or be allotted land by the Gram Panchayat'
    ],
    eligibility_ta: [
      'SECC அல்லது ஆவாஸ்+ கிராம கணக்கெடுப்பில் இடம்பெற்றுள்ள குடும்பங்கள்',
      'இந்தியாவில் எங்கும் சொந்தமாக கான்கிரீட் வீடு இல்லாதவராக இருக்க வேண்டும்',
      'சொந்த வீட்டுமனை அல்லது ஊராட்சி வழங்கிய மனை உரிமை சான்று'
    ],
    incomeLimit: 200000,
    documents_en: [
      'Aadhaar Card of beneficiary',
      'Awas+ Registration ID from Village Panchayat',
      'Land Patta or Gram Panchayat Allotment Order',
      'Bank Account Passbook (DBT enabled)'
    ],
    documents_ta: [
      'பயனாளியின் ஆதார் அட்டை',
      'ஊராட்சியில் பதிவு செய்யப்பட்ட ஆவாஸ்+ பதிவு எண்',
      'மனை பட்டா அல்லது ஊராட்சி ஒதுக்கீட்டு ஆணை',
      'வங்கிக் கணக்குப் புத்தகம்'
    ],
    applicationMethod_en: 'Beneficiary lists are finalized by Village Grama Sabhas based on official survey data.',
    applicationMethod_ta: 'கிராம சபை மூலமாக அதிகாரப்பூர்வ கணக்கெடுப்பின் அடிப்படையில் பயனாளிகள் தேர்வு செய்யப்படுகின்றனர்.',
    officialUrl: 'https://pmayg.nic.in',
    lastUpdated: '2025-01-28',
    status: 'Active',
    iconType: 'home'
  },
  {
    id: 'central-pmegp-16',
    name_en: 'Prime Minister’s Employment Generation Programme (PMEGP)',
    name_ta: 'பிரதமரின் வேலைவாய்ப்பு உருவாக்கும் திட்டம் (PMEGP)',
    government_level: 'Central Government',
    department_en: 'Ministry of MSME (Executed by KVIC and DIC Tamil Nadu)',
    department_ta: 'மத்திய MSME அமைச்சகம் (தமிழ்நாடு KVIC மற்றும் DIC மூலம் செயல்படுத்தப்படுகிறது)',
    category: 'Employment',
    targetBeneficiaries_en: 'Aspiring micro-entrepreneurs and unemployed youth in Tamil Nadu',
    targetBeneficiaries_ta: 'தமிழ்நாட்டில் தொழில் தொடங்க விரும்பும் வேலையில்லாத இளைஞர்கள்',
    districtAvailability: 'All',
    description_en: 'Credit-linked subsidy programme providing up to 35% margin money subsidy for project costs up to ₹50 Lakhs for manufacturing units and ₹20 Lakhs for service units across urban and rural Tamil Nadu.',
    description_ta: 'புதிய உற்பத்தி மற்றும் சேவைத் தொழில் நிறுவனங்களை தொடங்குவதற்கு 35% வரை மானியத்துடன் வங்கிக் கடன் வழங்கும் வேலைவாய்ப்பு உருவாக்கும் மத்திய-மாநில திட்டம்.',
    benefits_en: [
      'Subsidy of 25% (urban) and 35% (rural) for special categories (Women, SC/ST, OBC, Minorities, Differently Abled)',
      'Loan ceiling up to ₹50 Lakhs for manufacturing projects and ₹20 Lakhs for service projects',
      'Bank finance up to 90-95% of project cost with low promoter contribution'
    ],
    benefits_ta: [
      'சிறப்பு பிரிவினருக்கு கிராமப்புறங்களில் 35% மற்றும் நகர்ப்புறங்களில் 25% மானியம்',
      'உற்பத்தித் தொழிலுக்கு ₹50 லட்சம் வரை, சேவைத் தொழிலுக்கு ₹20 லட்சம் வரை கடனுதவி',
      'திட்ட மதிப்பீட்டில் 5% முதல் 10% மட்டுமே சுய முதலீடு தேவை'
    ],
    eligibility_en: [
      'Individual aged 18 years and above',
      'At least 8th standard pass for manufacturing projects above ₹10 Lakh and service projects above ₹5 Lakh',
      'Only new projects are eligible; existing units not covered'
    ],
    eligibility_ta: [
      '18 வயது பூர்த்தியடைந்த நபர்கள்',
      '₹10 லட்சத்திற்கு மேற்பட்ட உற்பத்தி திட்டங்களுக்கு 8-ஆம் வகுப்பு தேர்ச்சி பெற்றிருக்க வேண்டும்',
      'புதிய திட்டங்களுக்கு மட்டுமே மானியக் கடன் வழங்கப்படும்'
    ],
    ageMin: 18,
    ageMax: 60,
    documents_en: [
      'Detailed Project Profile / Business Plan',
      'Aadhaar and PAN Card',
      'Educational Qualification Certificate',
      'Special Category Certificate (Community / Disability if claiming higher subsidy)'
    ],
    documents_ta: [
      'தொழில் திட்ட அறிக்கை (Project Report)',
      'ஆதார் அட்டை மற்றும் பான் அட்டை',
      'கல்வித் தகுதி சான்றிதழ்',
      'சாதிச் சான்றிதழ் (கூடுதல் மானியம் கோருபவர்களுக்கு)'
    ],
    applicationMethod_en: 'Apply online on the official KVIC PMEGP e-Portal (kviconline.gov.in/pmegpeportal).',
    applicationMethod_ta: 'kviconline.gov.in இணையதளம் வழியாக ஆன்லைனில் நேரடியாக விண்ணப்பிக்கலாம்.',
    officialUrl: 'https://www.kviconline.gov.in/pmegpeportal',
    lastUpdated: '2025-02-08',
    status: 'Active',
    iconType: 'briefcase'
  },
  {
    id: 'tn-destitute-widow-17',
    name_en: 'Destitute Widow Pension Scheme',
    name_ta: 'ஆதரவற்ற விதவை உதவித்தொகை திட்டம்',
    government_level: 'Tamil Nadu Government',
    department_en: 'Revenue & Social Welfare and Women Empowerment Department',
    department_ta: 'வருவாய் மற்றும் சமூக நலன் மகளிர் உரிமைத் துறை',
    category: 'Women Welfare',
    targetBeneficiaries_en: 'Destitute widows residing in Tamil Nadu with no regular support',
    targetBeneficiaries_ta: 'தமிழ்நாட்டில் வசிக்கும் ஆதரவற்ற விதவைப் பெண்கள்',
    districtAvailability: 'All',
    description_en: 'Monthly financial assistance of ₹1,200 along with free rice and subsidized ration to support destitute widows who do not have adequate family income or assets.',
    description_ta: 'வாழ்வாதாரத்திற்கு வழியில்லாத ஆதரவற்ற விதவைப் பெண்களுக்கு மாதம் ₹1,200 நிதி உதவி மற்றும் இலவச அரிசி வழங்கி பொருளாதார பாதுகாப்பளிக்கும் திட்டம்.',
    benefits_en: [
      'Direct monthly pension of ₹1,200 to bank account',
      'Priority for children in government school admissions and state scholarships',
      'Free distribution of dhotis/sarees and 20 kg free rice monthly'
    ],
    benefits_ta: [
      'மாதந்தோறும் ₹1,200 நேரடி வங்கி ஓய்வூதியம்',
      'குழந்தைகளுக்கு அரசு பள்ளி சேர்க்கை மற்றும் கல்வி உதவித்தொகையில் முன்னுரிமை',
      'மாதம் 20 கிலோ இலவச அரிசி மற்றும் பண்டிகை கால இலவச சேலைகள்'
    ],
    eligibility_en: [
      'Destitute widow aged 18 years or above',
      'Resident of Tamil Nadu',
      'Annual family income should not exceed ₹1,20,000',
      'Should not possess significant landed property or permanent employment'
    ],
    eligibility_ta: [
      '18 வயது அல்லது அதற்கு மேற்பட்ட ஆதரவற்ற விதவைப் பெண்கள்',
      'தமிழ்நாட்டில் நிரந்தரமாக வசிப்பவராக இருக்க வேண்டும்',
      'குடும்ப ஆண்டு வருமானம் ₹1,20,000-க்குள் இருக்க வேண்டும்',
      'சொந்தமாக சொத்துக்களோ நிரந்தர வேலையோ இருக்கக் கூடாது'
    ],
    incomeLimit: 120000,
    ageMin: 18,
    requiredGender: 'female',
    documents_en: [
      'Death Certificate of Husband',
      'Destitute Widow Certificate issued by Revenue Divisional Officer (RDO) / Tahsildar',
      'Smart Family Card',
      'Aadhaar Card and Bank Passbook'
    ],
    documents_ta: [
      'கணவரின் இறப்புச் சான்றிதழ்',
      'வருவாய்க் கோட்டாட்சியர் (RDO) அல்லது வட்டாட்சியர் வழங்கிய ஆதரவற்ற விதவைச் சான்றிதழ்',
      'ஸ்மார்ட் குடும்ப அட்டை',
      'ஆதார் அட்டை மற்றும் வங்கிக் கணக்கு புத்தகம்'
    ],
    applicationMethod_en: 'Submit application to the Special Tahsildar (Social Security Schemes) in the Taluk Office.',
    applicationMethod_ta: 'வட்டார வட்டாட்சியர் அலுவலகம் (சமூக பாதுகாப்பு திட்டம்) அல்லது இ-சேவை மையம் மூலம் விண்ணப்பிக்கலாம்.',
    officialUrl: 'https://tnsocialwelfare.tn.gov.in',
    lastUpdated: '2025-01-14',
    status: 'Active',
    iconType: 'shield'
  },
  {
    id: 'tn-coimbatore-textile-skill-18',
    name_en: 'District Skill Training Programme for Coimbatore & Tiruppur Garment Clusters',
    name_ta: 'கோயம்புத்தூர் மற்றும் திருப்பூர் ஆடைத் தொழில் மாவட்ட திறன் பயிற்சி திட்டம்',
    government_level: 'Tamil Nadu Government',
    department_en: 'Tamil Nadu Skill Development Corporation & Handlooms and Textiles Dept',
    department_ta: 'தமிழ்நாடு திறன் மேம்பாட்டுக் கழகம் மற்றும் கைத்தறி-ஜவுளித்துறை',
    category: 'Skill Development',
    targetBeneficiaries_en: 'Youth and women in Coimbatore, Tiruppur, Erode, and Salem seeking textile industry careers',
    targetBeneficiaries_ta: 'கோயம்புத்தூர், திருப்பூர், ஈரோடு, சேலம் மாவட்ட இளைஞர்கள் மற்றும் பெண்கள்',
    districtAvailability: ['coimbatore', 'tiruppur', 'erode', 'salem'],
    description_en: 'District-targeted free specialized training in computer-aided textile designing, merchandising, industrial sewing, and quality auditing with 100% placement assurance in leading apparel manufacturing units.',
    description_ta: 'கோயம்புத்தூர் மற்றும் திருப்பூர் ஜவுளி மண்டலங்களில் உள்ள இளைஞர்களுக்கு இலவச ஆடை வடிவமைப்பு, தையல் மற்றும் தரக்கட்டுப்பாடு பயிற்சிகள் வழங்கி 100% வேலைவாய்ப்பு உறுதி செய்யும் பிரத்யேக மாவட்ட திட்டம்.',
    benefits_en: [
      '100% Free 3-month residential/non-residential specialized skill training',
      'Monthly training stipend of ₹1,500 plus free training kits and uniforms',
      'Guaranteed direct campus placement in registered apparel export hubs'
    ],
    benefits_ta: [
      '3 மாத இலவச சிறப்பு திறன் பயிற்சி மற்றும் சான்றிதழ்',
      'பயிற்சி காலத்தில் மாதம் ₹1,500 ஊக்கத்தொகை மற்றும் இலவச சீருடை',
      'முன்னணி ஆடை ஏற்றுமதி நிறுவனங்களில் உடனடி வேலைவாய்ப்பு'
    ],
    eligibility_en: [
      'Resident of Coimbatore, Tiruppur, Erode, or Salem district',
      'Age between 18 and 35 years',
      'Education: Minimum 8th standard pass up to Diploma/Degree holders'
    ],
    eligibility_ta: [
      'கோயம்புத்தூர், திருப்பூர், ஈரோடு அல்லது சேலம் மாவட்டங்களைச் சேர்ந்தவர்',
      'வயது 18 முதல் 35-க்குள் இருக்க வேண்டும்',
      'குறைந்தபட்சம் 8-ஆம் வகுப்பு தேர்ச்சி பெற்றிருக்க வேண்டும்'
    ],
    ageMin: 18,
    ageMax: 35,
    documents_en: [
      'Proof of Residence in designated districts (Aadhaar / Ration Card)',
      'Educational Marksheet',
      'Bank Account details'
    ],
    documents_ta: [
      'குறிப்பிட்ட மாவட்டங்களுக்கான முகவரிச் சான்று (ஆதார் / குடும்ப அட்டை)',
      'பள்ளி / கல்லூரி மதிப்பெண் பட்டியல்',
      'வங்கி கணக்கு புத்தகம்'
    ],
    applicationMethod_en: 'Apply at District Employment & Career Guidance Centre, Coimbatore / Tiruppur or TNSDC nodal centres.',
    applicationMethod_ta: 'மாவட்ட வேலைவாய்ப்பு மற்றும் தொழில்நெறி வழிகாட்டும் மையம் அல்லது TNSDC மையங்களில் பதிவு செய்யவும்.',
    officialUrl: 'https://skilltraining.tn.gov.in',
    lastUpdated: '2025-02-14',
    status: 'Active',
    iconType: 'briefcase'
  },
  {
    id: 'tn-evr-marriage-19',
    name_en: 'E.V.R. Maniammaiyar Ninaivu Poor Widow Daughter Marriage Assistance',
    name_ta: 'ஈ.வே.ரா. மணியம்மையார் நினைவு ஏழை விதவை மகள் திருமண உதவித் திட்டம்',
    government_level: 'Tamil Nadu Government',
    department_en: 'Social Welfare and Women Empowerment Department',
    department_ta: 'சமூக நலம் மற்றும் மகளிர் உரிமைத் துறை',
    category: 'Family Welfare',
    targetBeneficiaries_en: 'Poor widow mothers getting their daughter married in Tamil Nadu',
    targetBeneficiaries_ta: 'மகளுக்கு திருமணம் செய்து வைக்கும் ஏழை விதவைத் தாய்மார்கள்',
    districtAvailability: 'All',
    description_en: 'Financial assistance of up to ₹50,000 and 8 grams (one sovereign) 22-carat gold coin for making Thirumangalyam to help poor widow mothers perform their daughters’ marriage without indebtedness.',
    description_ta: 'ஏழை விதவைத் தாய்மார்கள் தங்களின் பெண் குழந்தைகளின் திருமணத்தை கடன் இல்லாமல் நடத்த ₹50,000 வரை நிதி உதவியும் திருமாங்கல்யம் செய்ய 8 கிராம் (1 பவுன்) தங்க நாணயமும் வழங்கும் குடும்ப நல திட்டம்.',
    benefits_en: [
      'Scheme-1: ₹25,000 cash grant + 8 grams 22ct gold coin for 10th pass brides',
      'Scheme-2: ₹50,000 cash grant + 8 grams 22ct gold coin for Degree/Diploma graduate brides',
      'Protects destitute widow families from usurious moneylenders'
    ],
    benefits_ta: [
      'திட்டம் 1: 10-ஆம் வகுப்பு முடித்த மணமகளுக்கு ₹25,000 நிதி உதவி + 8 கிராம் தங்க நாணயம்',
      'திட்டம் 2: பட்டப்படிப்பு அல்லது பட்டயம் முடித்த மணமகளுக்கு ₹50,000 நிதி உதவி + 8 கிராம் தங்க நாணயம்',
      'ஏழை விதவை குடும்பங்கள் கடன் வலையில் சிக்காமல் பாதுகாத்தல்'
    ],
    eligibility_en: [
      'Mother must be a destitute widow resident of Tamil Nadu',
      'Bride must have completed 18 years of age at the time of marriage',
      'Annual family income must not exceed ₹72,000',
      'Only one daughter of the widow is eligible'
    ],
    eligibility_ta: [
      'தாய் தமிழ்நாட்டில் வசிக்கும் ஏழை விதவையாக இருக்க வேண்டும்',
      'மணமகளுக்கு திருமணத்தின் போது 18 வயது பூர்த்தியடைந்திருக்க வேண்டும்',
      'குடும்ப ஆண்டு வருமானம் ₹72,000-க்குள் இருக்க வேண்டும்',
      'ஒரு ஏழை விதவை தாயின் ஒரு மகளுக்கு மட்டுமே வழங்கப்படும்'
    ],
    incomeLimit: 72000,
    ageMin: 18,
    requiredGender: 'female',
    documents_en: [
      'Death certificate of husband (Father of bride)',
      'Widow Certificate from Tahsildar',
      'Bride Educational Certificate (10th / Degree)',
      'Marriage Invitation card and Age Proof',
      'Income Certificate and Smart Ration Card'
    ],
    documents_ta: [
      'கணவரின் இறப்புச் சான்றிதழ்',
      'வட்டாட்சியர் வழங்கிய விதவைச் சான்றிதழ்',
      'மணமகளின் கல்விச் சான்றிதழ் (10-ஆம் வகுப்பு / பட்டப்படிப்பு)',
      'திருமண அழைப்பிதழ் மற்றும் மணமகளின் வயது சான்று',
      'வருமானச் சான்றிதழ் மற்றும் குடும்ப அட்டை'
    ],
    applicationMethod_en: 'Apply through local e-Sevai centre or District Social Welfare Office at least 40 days before marriage.',
    applicationMethod_ta: 'திருமணத்திற்கு 40 நாட்களுக்கு முன்பாக இ-சேவை மையம் அல்லது மாவட்ட சமூக நல அலுவலகத்தில் விண்ணப்பிக்க வேண்டும்.',
    officialUrl: 'https://tnsocialwelfare.tn.gov.in',
    lastUpdated: '2025-01-22',
    status: 'Active',
    iconType: 'coins'
  },
  {
    id: 'tn-financial-assistance-20',
    name_en: "Chief Minister's Public Relief Fund (CMPRF) Special Distress Assistance",
    name_ta: 'முதலமைச்சரின் பொது நிவாரண நிதி (CMPRF) சிறப்பு துயர் துடைப்பு உதவி',
    government_level: 'Tamil Nadu Government',
    department_en: 'Revenue and Disaster Management & Finance Department',
    department_ta: 'வருவாய் மற்றும் பேரிடர் மேலாண்மை / நிதித்துறை',
    category: 'Financial Assistance',
    targetBeneficiaries_en: 'Citizens facing sudden catastrophic emergencies, major accidents, or natural distress in Tamil Nadu',
    targetBeneficiaries_ta: 'திடீர் விபத்துக்கள், கடுமையான மருத்துவச் செலவுகள் மற்றும் பேரிடரால் பாதிக்கப்பட்ட தமிழ்நாட்டு மக்கள்',
    districtAvailability: 'All',
    description_en: 'Immediate direct financial aid granted by the Government of Tamil Nadu to provide relief to families affected by unforeseen natural disasters, major accidents, loss of breadwinner, or critical medical emergencies not covered elsewhere.',
    description_ta: 'எதிர்பாராத பேரிடர்கள், விபத்து மரணங்கள் மற்றும் கடுமையான மருத்துவச் செலவுகளால் பாதிக்கப்படும் ஏழைக் குடும்பங்களுக்கு உடனடியாக துயர் துடைக்கும் நேரடி நிதி உதவி வழங்கும் தமிழ்நாடு அரசு திட்டம்.',
    benefits_en: [
      'Immediate ex-gratia financial relief disbursed directly via bank transfer',
      'Up to ₹1,00,000 to ₹3,00,000 depending on nature of grievance and assessment',
      'Rapid sanctioning through District Collectorate grievance redressed channel'
    ],
    benefits_ta: [
      'வங்கிக் கணக்கு மூலம் உடனடியாக விடுவிக்கப்படும் துயர் துடைப்பு நிதி',
      'பாதிப்பின் தீவிரத்தைப் பொறுத்து ₹1,00,000 முதல் ₹3,00,000 வரை நிதி உதவி',
      'மாவட்ட ஆட்சியர் குறைதீர்ப்பு முகாம்கள் மூலம் விரைவான ஒப்புதல்'
    ],
    eligibility_en: [
      'Permanent resident of Tamil Nadu',
      'Family must have faced serious distress, breadwinner demise, or natural disaster calamity',
      'Verified low income background with lack of insurance coverage'
    ],
    eligibility_ta: [
      'தமிழ்நாட்டில் நிரந்தரமாக வசிக்கும் குடிமகன்',
      'குடும்பத் தலைவரின் இழப்பு, விபத்து அல்லது எதிர்பாராத பேரிடரால் பாதிக்கப்பட்ட குடும்பம்',
      'குறைந்த வருமானம் கொண்ட குடும்பங்களுக்கு முன்னுரிமை'
    ],
    documents_en: [
      'Aadhaar Card and Family Smart Ration Card',
      'Police FIR / Hospital Emergency Records / Death Certificate (as applicable)',
      'Income Certificate / VAO Verification Report',
      'Bank Account Passbook'
    ],
    documents_ta: [
      'ஆதார் அட்டை மற்றும் ஸ்மார்ட் குடும்ப அட்டை',
      'காவல்துறை FIR / மருத்துவமனை சிகிச்சை அறிக்கை / இறப்புச் சான்றிதழ்',
      'வருமானச் சான்றிதழ் / கிராம நிர்வாக அலுவலர் (VAO) அறிக்கை',
      'வங்கி கணக்கு புத்தகம்'
    ],
    applicationMethod_en: 'Submit petition to the District Collector on Monday grievance day or online via cmportal.tn.gov.in.',
    applicationMethod_ta: 'மாவட்ட ஆட்சியரின் திங்கட்கிழமை மக்கள் குறைதீர்க்கும் நாள் அல்லது cmportal.tn.gov.in மூலம் மனு அளிக்கலாம்.',
    officialUrl: 'https://cmportal.tn.gov.in',
    lastUpdated: '2025-02-20',
    status: 'Active',
    iconType: 'shield'
  }
];

export const SCHEMES_DATABASE = TAMIL_NADU_SCHEMES;
