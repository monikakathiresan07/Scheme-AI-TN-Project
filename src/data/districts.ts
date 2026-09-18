export interface District {
  id: string;
  name_en: string;
  name_ta: string;
  zone: 'Northern' | 'Western' | 'Central' | 'Southern';
}

export const TAMIL_NADU_DISTRICTS: District[] = [
  { id: 'chennai', name_en: 'Chennai', name_ta: 'சென்னை', zone: 'Northern' },
  { id: 'coimbatore', name_en: 'Coimbatore', name_ta: 'கோயம்புத்தூர்', zone: 'Western' },
  { id: 'madurai', name_en: 'Madurai', name_ta: 'மதுரை', zone: 'Southern' },
  { id: 'tiruchirappalli', name_en: 'Tiruchirappalli', name_ta: 'திருச்சிராப்பள்ளி', zone: 'Central' },
  { id: 'salem', name_en: 'Salem', name_ta: 'சேலம்', zone: 'Western' },
  { id: 'tiruppur', name_en: 'Tiruppur', name_ta: 'திருப்பூர்', zone: 'Western' },
  { id: 'erode', name_en: 'Erode', name_ta: 'ஈரோடு', zone: 'Western' },
  { id: 'thanjavur', name_en: 'Thanjavur', name_ta: 'தஞ்சாவூர்', zone: 'Central' },
  { id: 'vellore', name_en: 'Vellore', name_ta: 'வேலூர்', zone: 'Northern' },
  { id: 'tirunelveli', name_en: 'Tirunelveli', name_ta: 'திருநெல்வேலி', zone: 'Southern' },
  { id: 'thoothukudi', name_en: 'Thoothukudi', name_ta: 'தூத்துக்குடி', zone: 'Southern' },
  { id: 'dindigul', name_en: 'Dindigul', name_ta: 'திண்டுக்கல்', zone: 'Central' },
  { id: 'karur', name_en: 'Karur', name_ta: 'கரூர்', zone: 'Central' },
  { id: 'namakkal', name_en: 'Namakkal', name_ta: 'நாமக்கல்', zone: 'Western' },
  { id: 'dharmapuri', name_en: 'Dharmapuri', name_ta: 'தருமபுரி', zone: 'Western' },
  { id: 'krishnagiri', name_en: 'Krishnagiri', name_ta: 'கிருஷ்ணகிரி', zone: 'Western' },
  { id: 'sivaganga', name_en: 'Sivaganga', name_ta: 'சிவகங்கை', zone: 'Southern' },
  { id: 'ramanathapuram', name_en: 'Ramanathapuram', name_ta: 'இராமநாதபுரம்', zone: 'Southern' },
  { id: 'virudhunagar', name_en: 'Virudhunagar', name_ta: 'விருதுநகர்', zone: 'Southern' },
  { id: 'kanyakumari', name_en: 'Kanyakumari', name_ta: 'கன்னியாகுமரி', zone: 'Southern' },
  { id: 'the_nilgiris', name_en: 'The Nilgiris', name_ta: 'நீலகிரி', zone: 'Western' },
  { id: 'ariyalur', name_en: 'Ariyalur', name_ta: 'அரியலூர்', zone: 'Central' },
  { id: 'perambalur', name_en: 'Perambalur', name_ta: 'பெரம்பலூர்', zone: 'Central' },
  { id: 'pudukkottai', name_en: 'Pudukkottai', name_ta: 'புதுக்கோட்டை', zone: 'Central' },
  { id: 'nagapattinam', name_en: 'Nagapattinam', name_ta: 'நாகப்பட்டினம்', zone: 'Central' },
  { id: 'tiruvarur', name_en: 'Tiruvarur', name_ta: 'திருவாரூர்', zone: 'Central' },
  { id: 'cuddalore', name_en: 'Cuddalore', name_ta: 'கடலூர்', zone: 'Northern' },
  { id: 'villupuram', name_en: 'Villupuram', name_ta: 'விழுப்புரம்', zone: 'Northern' },
  { id: 'kallakurichi', name_en: 'Kallakurichi', name_ta: 'கள்ளக்குறிச்சி', zone: 'Northern' },
  { id: 'tirupathur', name_en: 'Tirupathur', name_ta: 'திருப்பத்தூர்', zone: 'Northern' },
  { id: 'ranipet', name_en: 'Ranipet', name_ta: 'இராணிப்பேட்டை', zone: 'Northern' },
  { id: 'chengalpattu', name_en: 'Chengalpattu', name_ta: 'செங்கல்பட்டு', zone: 'Northern' },
  { id: 'kancheepuram', name_en: 'Kancheepuram', name_ta: 'காஞ்சிபுரம்', zone: 'Northern' },
  { id: 'mayiladuthurai', name_en: 'Mayiladuthurai', name_ta: 'மயிலாடுதுறை', zone: 'Central' },
  { id: 'tenkasi', name_en: 'Tenkasi', name_ta: 'தென்காசி', zone: 'Southern' },
  { id: 'theni', name_en: 'Theni', name_ta: 'தேனி', zone: 'Southern' },
  { id: 'tiruvallur', name_en: 'Tiruvallur', name_ta: 'திருவள்ளூர்', zone: 'Northern' },
  { id: 'tiruvannamalai', name_en: 'Tiruvannamalai', name_ta: 'திருவண்ணாமலை', zone: 'Northern' }
];
