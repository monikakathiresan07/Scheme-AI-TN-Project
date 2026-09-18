import { Scheme, UserProfile, Language } from '../types';
import { SCHEMES_DATABASE } from '../data/schemes';
import { TAMIL_NADU_DISTRICTS } from '../data/districts';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  language: 'ta' | 'en';
  isVoiceNote?: boolean;
  audioUrl?: string;
  audioDuration?: number; // in seconds
  matchedSchemes?: Scheme[];
  officialLinks?: { title: string; url: string }[];
}

export class SchemeAIChatbotService {
  /**
   * Detects if the message is predominantly Tamil or English
   */
  public static detectLanguage(text: string): 'ta' | 'en' {
    const tamilRegex = /[\u0B80-\u0BFF]/;
    return tamilRegex.test(text) ? 'ta' : 'en';
  }

  /**
   * Generates a grounded, safe, and context-aware answer based on Scheme AI's verified database.
   */
  public static async processQuery(
    userText: string,
    currentUser: UserProfile,
    currentLanguage: Language
  ): Promise<{
    reply: string;
    matchedSchemes?: Scheme[];
    officialLinks?: { title: string; url: string }[];
  }> {
    const query = userText.trim().toLowerCase();
    const queryLang = this.detectLanguage(userText);
    const lang = queryLang || currentLanguage;

    // 1. Check if user is asking for specific documents
    const isDocQuery =
      query.includes('document') ||
      query.includes('ஆவணம்') ||
      query.includes('சான்றிதழ்') ||
      query.includes('papers') ||
      query.includes('proof');

    // 2. Check if user is asking how to apply
    const isApplyQuery =
      query.includes('how to apply') ||
      query.includes('how can i apply') ||
      query.includes('application') ||
      query.includes('எப்படி விண்ணப்பிப்பது') ||
      query.includes('விண்ணப்பிக்க') ||
      query.includes('apply');

    // 3. Extract district from query if mentioned
    let mentionedDistrict: string | null = null;
    for (const dist of TAMIL_NADU_DISTRICTS) {
      if (
        query.includes(dist.name_en.toLowerCase()) ||
        query.includes(dist.name_ta.toLowerCase())
      ) {
        mentionedDistrict = dist.name_en;
        break;
      }
    }

    // 4. Extract age from query if mentioned (e.g. "19 year old", "19 years", "வயது 22")
    let mentionedAge: number | null = null;
    const ageMatch = query.match(/(?:age|aged|வயது)?\s*(\d{1,2})\s*(?:years|year old|yr|yrs|வயது)?/i);
    if (ageMatch && parseInt(ageMatch[1]) >= 10 && parseInt(ageMatch[1]) <= 95) {
      // Avoid false positive matching small numbers unless context implies age
      if (
        query.includes('age') ||
        query.includes('year') ||
        query.includes('yr') ||
        query.includes('வயது') ||
        query.includes('old')
      ) {
        mentionedAge = parseInt(ageMatch[1]);
      }
    }

    // 5. Check if student, farmer, woman mentioned
    const isStudentQuery =
      query.includes('student') ||
      query.includes('college') ||
      query.includes('school') ||
      query.includes('scholarship') ||
      query.includes('படிப்பு') ||
      query.includes('மாணவர்') ||
      query.includes('மாணவி') ||
      query.includes('கல்வி');

    const isFarmerQuery =
      query.includes('farmer') ||
      query.includes('agriculture') ||
      query.includes('crop') ||
      query.includes('land') ||
      query.includes('விவசாயி') ||
      query.includes('உழவர்') ||
      query.includes('பயிர்');

    const isWomenQuery =
      query.includes('women') ||
      query.includes('female') ||
      query.includes('girl') ||
      query.includes('பெண்') ||
      query.includes('மகளிர்') ||
      query.includes('தாய்');

    // 6. Look for a specific scheme match in the query
    const matchingScheme = SCHEMES_DATABASE.find(s => {
      const nameEn = s.name_en.toLowerCase();
      const nameTa = s.name_ta.toLowerCase();
      return (
        query.includes(nameEn) ||
        query.includes(nameTa) ||
        (query.includes('magalir') && s.id.includes('kmut')) ||
        (query.includes('urimai') && s.id.includes('kmut')) ||
        (query.includes('pudhumai') && s.id.includes('pudhumai')) ||
        (query.includes('penn') && s.id.includes('pudhumai')) ||
        (query.includes('pudhalvan') && s.id.includes('pudhalvan')) ||
        (query.includes('kanavu') && s.id.includes('kanavu')) ||
        (query.includes('naan mudhalvan') && s.id.includes('mudhalvan')) ||
        (query.includes('uzhavar') && s.id.includes('uzhavar')) ||
        (query.includes('ayushman') && s.id.includes('ayushman')) ||
        (query.includes('kisan') && s.id.includes('kisan')) ||
        (query.includes('insurance') && s.id.includes('cmchis')) ||
        (query.includes('காப்பீடு') && s.id.includes('cmchis')) ||
        (query.includes('needs') && s.id.includes('needs')) ||
        (query.includes('mudra') && s.id.includes('mudra'))
      );
    });

    // CASE A: Query about documents for a specific scheme or general
    if (isDocQuery && matchingScheme) {
      const docs = lang === 'ta' ? matchingScheme.documents_ta : matchingScheme.documents_en;
      const title = lang === 'ta' ? matchingScheme.name_ta : matchingScheme.name_en;

      const reply =
        lang === 'ta'
          ? `📋 **${title}** திட்டத்திற்குத் தேவையான முக்கிய ஆவணங்கள்:\n\n` +
            docs.map((d, i) => `${i + 1}. ${d}`).join('\n') +
            `\n\n📌 **குறிப்பு**: இது AI வழிகாட்டுதல் மட்டுமே. உங்கள் விண்ணப்பத்தின் வகையைப் பொறுத்து கூடுதல் ஆவணங்கள் மாவட்ட/துறை அலுவலகத்தால் கோரப்படலாம். அதிகாரப்பூர்வ தளத்தில் சரிபார்க்கவும்.`
          : `📋 Required Documents for **${title}**:\n\n` +
            docs.map((d, i) => `${i + 1}. ${d}`).join('\n') +
            `\n\n📌 **Note**: This is an AI guidance summary based on verified gazette details. Government authorities may request specific supporting proofs during field verification. Always confirm via the official portal.`;

      return {
        reply,
        matchedSchemes: [matchingScheme],
        officialLinks: [{ title: matchingScheme.name_en, url: matchingScheme.officialUrl }]
      };
    }

    // CASE B: Query about how to apply for a specific scheme
    if (isApplyQuery && matchingScheme) {
      const method = lang === 'ta' ? matchingScheme.applicationMethod_ta : matchingScheme.applicationMethod_en;
      const title = lang === 'ta' ? matchingScheme.name_ta : matchingScheme.name_en;
      const dept = lang === 'ta' ? matchingScheme.department_ta : matchingScheme.department_en;

      const reply =
        lang === 'ta'
          ? `✍️ **${title}** திட்டத்திற்கு விண்ணப்பிக்கும் முறை:\n\n` +
            `${method}\n\n` +
            `🏛️ **பொறுப்பான அரசு துறை**: ${dept}\n` +
            `🌐 **அதிகாரப்பூர்வ இணையதளம்**: [${matchingScheme.officialUrl}](${matchingScheme.officialUrl})\n\n` +
            `⚠️ **முக்கிய நினைவூட்டல்**: Scheme AI என்பது வழிகாட்டுதல் தளம் மட்டுமே. எந்தவொரு திட்டத்திற்கும் 100% தகுதி உத்தரவாதம் அளிக்கப்படாது. இறுதி ஒப்புதல் அரசு துறையால் மட்டுமே வழங்கப்படும்.`
          : `✍️ How to apply for **${title}**:\n\n` +
            `${method}\n\n` +
            `🏛️ **Nodal Department**: ${dept}\n` +
            `🌐 **Official Portal**: [${matchingScheme.officialUrl}](${matchingScheme.officialUrl})\n\n` +
            `⚠️ **Important Reminder**: Scheme AI is an informational discovery engine. We never guarantee 100% eligibility or approval; final sanction is solely determined by designated government officers.`;

      return {
        reply,
        matchedSchemes: [matchingScheme],
        officialLinks: [{ title: matchingScheme.name_en, url: matchingScheme.officialUrl }]
      };
    }

    // CASE C: General "எனக்கு என்ன திட்டம்?" or Persona-based matching query
    // e.g. "I am a 19 year old student from Coimbatore. Which schemes may be relevant to me?"
    if (
      query.includes('எனக்கு என்ன திட்டம்') ||
      query.includes('which schemes') ||
      query.includes('what schemes') ||
      query.includes('relevant to me') ||
      isStudentQuery ||
      isFarmerQuery ||
      isWomenQuery ||
      mentionedAge !== null ||
      mentionedDistrict !== null
    ) {
      const targetAge = mentionedAge ?? currentUser.age;
      const targetDistrict = mentionedDistrict ?? currentUser.district;
      const targetStudent = isStudentQuery || currentUser.isStudent;
      const targetFarmer = isFarmerQuery || currentUser.isFarmer;

      // Filter schemes that match these criteria
      const candidateSchemes = SCHEMES_DATABASE.filter(s => {
        // District filter
        if (s.districtAvailability !== 'All' && targetDistrict) {
          const hasDist = s.districtAvailability
            .map(d => d.toLowerCase())
            .includes(targetDistrict.toLowerCase());
          if (!hasDist) return false;
        }

        // Age filter
        if (targetAge) {
          if (s.ageMin && targetAge < s.ageMin) return false;
          if (s.ageMax && targetAge > s.ageMax) return false;
        }

        // Student filter
        if (targetStudent && (s.category === 'Education & Scholarships' || s.category === 'Student Support' || s.category === 'Skill Development' || s.id.includes('pudhumai') || s.id.includes('pudhalvan') || s.id.includes('mudhalvan'))) {
          return true;
        }

        // Farmer filter
        if (targetFarmer && (s.category === 'Agriculture & Farmers' || s.id.includes('uzhavar') || s.id.includes('kisan'))) {
          return true;
        }

        // Women filter
        if (isWomenQuery && (s.category === 'Women Welfare' || s.category === 'Girl Child Welfare' || s.id.includes('kmut') || s.id.includes('pudhumai') || s.id.includes('moovalur'))) {
          return true;
        }

        // General fallback
        return s.category === 'Health & Medical Assistance' || s.category === 'Education & Scholarships';
      }).slice(0, 3);

      const topSchemes = candidateSchemes.length > 0 ? candidateSchemes : SCHEMES_DATABASE.slice(0, 3);

      if (lang === 'ta') {
        let schemeBreakdown = topSchemes
          .map((s, idx) => {
            const isTN = s.government_level === 'Tamil Nadu Government';
            const govBadge = isTN ? '【தமிழ்நாடு அரசு】' : '【மத்திய அரசு】';
            const benefit = s.benefits_ta[0] || s.description_ta;
            return `**${idx + 1}. ${s.name_ta}** ${govBadge}\n` +
                   `• **நன்மை**: ${benefit}\n` +
                   `• **துறை**: ${s.department_ta}\n` +
                   `• **அதிகாரப்பூர்வ தளம்**: [${s.officialUrl}](${s.officialUrl})`;
          })
          .join('\n\n');

        const reply =
          `வணக்கம்! உங்கள் சுயவிவரக் காரணிகளை (${targetAge ? `வயது: ${targetAge}, ` : ''}${targetDistrict ? `மாவட்டம்: ${targetDistrict}, ` : ''}${targetStudent ? 'மாணவர் நிலை' : ''}) அடிப்படையாகக் கொண்டு, உங்களுக்குப் பொருந்தக்கூடிய முக்கிய அரசு திட்டங்கள்:\n\n` +
          schemeBreakdown +
          `\n\n💡 **AI பொருத்தம் vs அரசு தகுதி**:\n` +
          `இவை AI மதிப்பீட்டின்படி உங்களுக்கான சாத்தியமான பொருத்தங்கள் மட்டுமே. எந்தவொரு திட்டத்திற்கும் 100% தகுதி உத்தரவாதம் கிடையாது. திட்டத்தின் முழுமையான வழிகாட்டு நெறிமுறைகளை அதிகாரப்பூர்வ தளங்களில் சரிபார்த்து விண்ணப்பிக்கவும்.`;

        return {
          reply,
          matchedSchemes: topSchemes,
          officialLinks: topSchemes.map(s => ({ title: s.name_ta, url: s.officialUrl }))
        };
      } else {
        let schemeBreakdown = topSchemes
          .map((s, idx) => {
            const isTN = s.government_level === 'Tamil Nadu Government';
            const govBadge = isTN ? '[Tamil Nadu Govt]' : '[Central Govt in TN]';
            const benefit = s.benefits_en[0] || s.description_en;
            return `**${idx + 1}. ${s.name_en}** ${govBadge}\n` +
                   `• **Primary Benefit**: ${benefit}\n` +
                   `• **Department**: ${s.department_en}\n` +
                   `• **Official Portal**: [${s.officialUrl}](${s.officialUrl})`;
          })
          .join('\n\n');

        const reply =
          `Based on your details (${targetAge ? `Age: ${targetAge}, ` : ''}${targetDistrict ? `District: ${targetDistrict}, ` : ''}${targetStudent ? 'Student Status' : ''}), here are top verified schemes with high potential relevance:\n\n` +
          schemeBreakdown +
          `\n\n💡 **AI Match vs Government Eligibility**:\n` +
          `These recommendations represent an AI profile match based on public eligibility rules. Scheme AI never guarantees 100% eligibility or approval. Final verification and sanctions rest exclusively with the respective government departments.`;

        return {
          reply,
          matchedSchemes: topSchemes,
          officialLinks: topSchemes.map(s => ({ title: s.name_en, url: s.officialUrl }))
        };
      }
    }

    // CASE D: If user mentions a specific scheme without asking for docs or apply
    if (matchingScheme) {
      const title = lang === 'ta' ? matchingScheme.name_ta : matchingScheme.name_en;
      const desc = lang === 'ta' ? matchingScheme.description_ta : matchingScheme.description_en;
      const isTN = matchingScheme.government_level === 'Tamil Nadu Government';
      const benefits = lang === 'ta' ? matchingScheme.benefits_ta : matchingScheme.benefits_en;
      const elig = lang === 'ta' ? matchingScheme.eligibility_ta : matchingScheme.eligibility_en;

      const reply =
        lang === 'ta'
          ? `ℹ️ **${title}** (${isTN ? 'தமிழ்நாடு அரசு திட்டம்' : 'மத்திய அரசு திட்டம்'}):\n\n` +
            `${desc}\n\n` +
            `🎯 **முக்கிய நன்மைகள்**:\n${benefits.slice(0, 2).map(b => `• ${b}`).join('\n')}\n\n` +
            `📝 **தகுதி நிபந்தனைகள்**:\n${elig.slice(0, 2).map(e => `• ${e}`).join('\n')}\n\n` +
            `🌐 **அதிகாரப்பூர்வ தளம்**: [${matchingScheme.officialUrl}](${matchingScheme.officialUrl})\n\n` +
            `🛡️ *குறிப்பு: இறுதி தகுதி மற்றும் நிதி ஒதுக்கீடுகள் அரசு விதிமுறைகளின்படியே தீர்மானிக்கப்படும்.*`
          : `ℹ️ **${title}** (${isTN ? 'Tamil Nadu Government Scheme' : 'Central Government Scheme in TN'}):\n\n` +
            `${desc}\n\n` +
            `🎯 **Key Benefits**:\n${benefits.slice(0, 2).map(b => `• ${b}`).join('\n')}\n\n` +
            `📝 **Key Eligibility**:\n${elig.slice(0, 2).map(e => `• ${e}`).join('\n')}\n\n` +
            `🌐 **Official Portal**: [${matchingScheme.officialUrl}](${matchingScheme.officialUrl})\n\n` +
            `🛡️ *Note: Formal approval and entitlement disbursements are governed strictly by state guidelines.*`;

      return {
        reply,
        matchedSchemes: [matchingScheme],
        officialLinks: [{ title: matchingScheme.name_en, url: matchingScheme.officialUrl }]
      };
    }

    // CASE E: General fallback / Help inquiry
    if (lang === 'ta') {
      return {
        reply:
          `வணக்கம்! நான் Scheme AI இன் அதிகாரப்பூர்வ நலத்திட்ட வழிகாட்டி உதவியாளர்.\n\n` +
          `நான் உங்களுக்கு பின்வரும் தகவல்களை வழங்க முடியும்:\n` +
          `1. **சுயவிவரப் பொருத்தம்**: உங்கள் வயது, கல்வி அல்லது தொழில் அடிப்படையில் ("19 வயது மாணவருக்கு என்ன திட்டம்?")\n` +
          `2. **தேவையான ஆவணங்கள்**: ("கலைஞர் மகளிர் உரிமைத் திட்டத்திற்கு என்ன documents வேண்டும்?")\n` +
          `3. **விண்ணப்பிக்கும் முறை**: ("Pudhumai Penn திட்டத்திற்கு எப்படி விண்ணப்பிப்பது?")\n` +
          `4. **மத்திய & மாநில அரசு நலத்திட்ட விவரங்கள்**\n\n` +
          `நீங்கள் குரல் குறிப்பு (Voice Note) அல்லது உரைச் செய்தி (Text) மூலம் கேட்கலாம்!`,
        officialLinks: [
          { title: 'TN State Portal', url: 'https://www.tn.gov.in' },
          { title: 'TNeGA e-Sevai', url: 'https://tnega.tn.gov.in' }
        ]
      };
    } else {
      return {
        reply:
          `Hello! I am your Scheme AI welfare guide assistant.\n\n` +
          `I can help you with:\n` +
          `1. **Personalized Discovery**: Discover schemes tailored to your age, district, education, or occupation (e.g. *"I am a 19 year old student in Coimbatore. Which schemes may be relevant to me?"*)\n` +
          `2. **Required Documents**: Inquire about necessary certificates (e.g. *"What documents are required for Kalaignar Magalir Urimai Thittam?"*)\n` +
          `3. **How to Apply**: Get official step-by-step guidance and portal links.\n` +
          `4. **TN vs Central Schemes**: Clear differentiation with responsible departments.\n\n` +
          `Feel free to type your question or record a voice note using the microphone!`,
        officialLinks: [
          { title: 'TN Official Portal', url: 'https://www.tn.gov.in' },
          { title: 'TNeGA Portal', url: 'https://tnega.tn.gov.in' }
        ]
      };
    }
  }
}
