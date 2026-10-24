export interface DateIdea {
  id: string;
  title: string;
  category: 'Gastronomie' | 'Culture & Arts' | 'Nature & Plein air' | 'Cocktails & Ambiance';
  location: string;
  description: string;
  priceRange: '€' | '€€' | '€€€';
  atmosphere: string;
}

export interface IcebreakerPrompt {
  id: string;
  question: string;
  answer: string;
}

export interface MemberProfile {
  id: string;
  name: string;
  age: number;
  city: string;
  occupation: string;
  verified: boolean;
  photoUrl: string;
  additionalPhotos?: string[];
  bio: string;
  interests: string[];
  relationshipIntent: 'Relation complice' | 'Grand amour' | 'Partage culturel' | 'Rencontre spontanée';
  prompts: IcebreakerPrompt[];
  personalityTraits: string[];
  compatibility: number; // percentage based on quiz
  distanceKm: number;
  lifestyle: {
    cocktailOrTea: string;
    idealWeekend: string;
    musicStyle: string;
  };
}

export interface ChatMessage {
  id: string;
  profileId: string;
  sender: 'user' | 'match';
  text: string;
  timestamp: string;
  dateSuggestion?: DateIdea;
}

export interface CompatibilityQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    traitScore: Record<string, number>;
  }[];
}

export interface UserPreferences {
  name: string;
  age: number;
  city: string;
  occupation: string;
  bio: string;
  interests: string[];
  intent: string;
  preferredAgeRange: [number, number];
  preferredMaxDistance: number;
  hasPassedAgeGate: boolean;
}
