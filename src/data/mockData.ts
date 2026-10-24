import { MemberProfile, DateIdea, CompatibilityQuestion, ChatMessage } from '../types';

export const INITIAL_PROFILES: MemberProfile[] = [
  {
    id: 'camille',
    name: 'Camille',
    age: 28,
    city: 'Paris (Le Marais)',
    occupation: 'Conservatrice d’art contemporain',
    verified: true,
    photoUrl: '/src/assets/images/profile_camille_portrait_1792873465085.jpg',
    bio: 'Passionnée de peinture abstraite, de cafés de quartier et d’escapades imprévues. Je cherche une personne curieuse, avec qui refaire le monde devant un bon verre de Bourgogne.',
    interests: ['Galeries d’art', 'Bistronomie', 'Jazz & Vinyles', 'Voyages spontanés', 'Littérature'],
    relationshipIntent: 'Relation complice',
    prompts: [
      {
        id: 'p1',
        question: 'Le premier rendez-vous parfait...',
        answer: 'Un vernissage en début de soirée suivi d’une table confidentielle dans une ruelle pavée.',
      },
      {
        id: 'p2',
        question: 'Une passion non négociable...',
        answer: 'Dénicher de vieux disques de jazz le dimanche matin et préparer un espresso parfait.',
      },
    ],
    personalityTraits: ['Créative', 'Attentive', 'Spontanée', 'Épicurienne'],
    compatibility: 94,
    distanceKm: 4,
    lifestyle: {
      cocktailOrTea: 'Negroni fumé au romarin',
      idealWeekend: 'Musée le matin, marché aux puces et dîner aux chandelles',
      musicStyle: 'Nu-Jazz, Soul & Chanson française indépendante',
    },
  },
  {
    id: 'alexandre',
    name: 'Alexandre',
    age: 32,
    city: 'Paris (Saint-Germain)',
    occupation: 'Architecte d’intérieur & Designer mobilier',
    verified: true,
    photoUrl: '/src/assets/images/profile_alexandre_portrait_1792873465502.jpg',
    bio: 'Sensible aux belles matières, aux lumières chaudes et aux conversations sans fin. Adepte des dîners entre amis et des grandes promenades urbaines.',
    interests: ['Design scandinave', 'Architecture', 'Café de spécialité', 'Cinéma d’auteur', 'Cyclisme urbain'],
    relationshipIntent: 'Grand amour',
    prompts: [
      {
        id: 'p1',
        question: 'Ce qui me séduit instantanément...',
        answer: 'L’humour fin, l’élégance naturelle et le plaisir simple de partager un bon repas.',
      },
      {
        id: 'p2',
        question: 'Mon pêché mignon en fin de journée...',
        answer: 'Un espresso macchiato en terrasse en regardant la ville s’illuminer.',
      },
    ],
    personalityTraits: ['Chaleureux', 'Esthète', 'Posé', 'Généreux'],
    compatibility: 91,
    distanceKm: 6,
    lifestyle: {
      cocktailOrTea: 'Old Fashioned au bourbon vieilli',
      idealWeekend: 'Visite d’ateliers de créateurs et dîner fait maison pour deux',
      musicStyle: 'Indie Folk, Bossa Nova et Lo-Fi Beats',
    },
  },
  {
    id: 'sophie',
    name: 'Sophie',
    age: 29,
    city: 'Paris (Montmartre)',
    occupation: 'Cheffe de projet éditoriale & Podcasteuse',
    verified: true,
    photoUrl: '/src/assets/images/profile_sophie_portrait_1792873466944.jpg',
    bio: 'Rieuse, toujours un roman ou un carnet dans mon sac en cuir. J’adore explorer les passages couverts de Paris et débattre d’idées nouvelles jusqu’à pas d’heure.',
    interests: ['Écriture', 'Podcasts culturels', 'Randonnée en forêt', 'Théâtre contemporain', 'Vins vivants'],
    relationshipIntent: 'Relation complice',
    prompts: [
      {
        id: 'p1',
        question: 'Le voyage qui a tout changé...',
        answer: 'Un périple en train à travers les fjords norvégiens avec un simple sac à dos.',
      },
      {
        id: 'p2',
        question: 'Un trait de caractère indispensable chez l’autre...',
        answer: 'L’auto-dérision et une véritable écoute bienveillante.',
      },
    ],
    personalityTraits: ['Solaire', 'Éloquente', 'Curieuse', 'Dynamique'],
    compatibility: 88,
    distanceKm: 8,
    lifestyle: {
      cocktailOrTea: 'Thé vert Genmaicha le matin, Spritz artisanal le soir',
      idealWeekend: 'Écriture matinale, marché bio et pièce de théâtre engagée',
      musicStyle: 'French Touch, Électro-pop douce & Indie Rock',
    },
  },
  {
    id: 'julien',
    name: 'Julien',
    age: 33,
    city: 'Boulogne / Paris Ouest',
    occupation: 'Sommelier & Fondateur de cave nature',
    verified: true,
    photoUrl: '/src/assets/images/profile_julien_portrait_1792873466116.jpg',
    bio: 'Amoureux des terroirs vivants, des grandes tablées et des week-ends au bord de l’océan. Je recherche une complicité sincère où chacun inspire l’autre.',
    interests: ['Œnologie', 'Cuisine de saison', 'Surf & Océan', 'Marchés de producteurs', 'Photographie argentique'],
    relationshipIntent: 'Grand amour',
    prompts: [
      {
        id: 'p1',
        question: 'Une soirée idéale...',
        answer: 'Ouvrir une bouteille rare, préparer des pâtes fraîches maison et écouter un vieux vinyle.',
      },
      {
        id: 'p2',
        question: 'Ce que mes amis disent de moi...',
        answer: 'Le mec fiable sur qui compter, et celui qui choisit toujours le meilleur vin à table.',
      },
    ],
    personalityTraits: ['Authentique', 'Protecteur', 'Passionné', 'Calme'],
    compatibility: 96,
    distanceKm: 9,
    lifestyle: {
      cocktailOrTea: 'Vin orange naturel ou Mezcal artisanal',
      idealWeekend: 'Aller-retour côte basque ou dîner intimiste entre proches',
      musicStyle: 'Classic Rock, Blues et Acoustique guitare',
    },
  },
];

export const DATE_IDEAS: DateIdea[] = [
  {
    id: 'd1',
    title: 'Apéritif panoramique sur les toits',
    category: 'Cocktails & Ambiance',
    location: 'Rooftop secret, Quartier Latin',
    description: 'Cocktails signatures à la bougie avec vue dégagée sur les monuments illuminés.',
    priceRange: '€€',
    atmosphere: 'Intimiste & Romantique',
  },
  {
    id: 'd2',
    title: 'Vernissage privé & Galerie nocturne',
    category: 'Culture & Arts',
    location: 'Galerie d’art contemporain, Le Marais',
    description: 'Déambulation au calme devant des œuvres contemporaines suivie d’un échange décontracté.',
    priceRange: '€',
    atmosphere: 'Inspirant & Raffiné',
  },
  {
    id: 'd3',
    title: 'Dégustation œnologique & Cépages rares',
    category: 'Gastronomie',
    location: 'Cave voûtée du XVIIe siècle, Île Saint-Louis',
    description: 'Sélection de 4 vins vivants commentés et planches d’affinages artisanaux.',
    priceRange: '€€€',
    atmosphere: 'Épicurien & Convivial',
  },
  {
    id: 'd4',
    title: 'Balade crépusculaire au bord de l’eau',
    category: 'Nature & Plein air',
    location: 'Quais de Seine et Square du Vert-Galant',
    description: 'Marche au fil de l’eau, arrêt gourmand pour un café ou une glace artisanale.',
    priceRange: '€',
    atmosphere: 'Doux & Poétique',
  },
];

export const COMPATIBILITY_QUESTIONS: CompatibilityQuestion[] = [
  {
    id: 1,
    question: 'Quelle atmosphère privilégiez-vous pour une première rencontre ?',
    subtitle: 'Pour déterminer le cadre propice à une alchimie naturelle.',
    options: [
      {
        label: 'Un bar feutré et intimiste',
        description: 'Cocktails soignés, lumière tamisée et murmures complices.',
        traitScore: { romantic: 3, epicurean: 2 },
      },
      {
        label: 'Une promenade culturelle',
        description: 'Musée, exposition d’art ou déambulation dans un quartier historique.',
        traitScore: { intellectual: 3, spontaneous: 1 },
      },
      {
        label: 'Une table bistronomique détendue',
        description: 'Bons petits plats à partager et découverte de vins d’artisans.',
        traitScore: { epicurean: 3, authentic: 2 },
      },
      {
        label: 'Un café en terrasse au soleil',
        description: 'Spontané, simple, sans pression, pour voir si le feeling passe.',
        traitScore: { spontaneous: 3, authentic: 2 },
      },
    ],
  },
  {
    id: 2,
    question: 'Quel est votre langage amoureux prédominant ?',
    subtitle: 'La façon dont vous aimez exprimer et recevoir l’affection.',
    options: [
      {
        label: 'Les moments de qualité',
        description: 'Être 100% présent, sans téléphone, engagé dans l’instant partagé.',
        traitScore: { romantic: 3, authentic: 2 },
      },
      {
        label: 'Les paroles valorisantes',
        description: 'Compliments sincères, encouragements constants et franchise bienveillante.',
        traitScore: { intellectual: 2, authentic: 3 },
      },
      {
        label: 'Les petites attentions du quotidien',
        description: 'Un café préparé avec soin, une surprise inattendue, un détail mémorisé.',
        traitScore: { epicurean: 2, romantic: 3 },
      },
      {
        label: 'La complicité physique & tactile',
        description: 'Une main effleurée, un regard intense, une proximité rassurante.',
        traitScore: { spontaneous: 2, romantic: 3 },
      },
    ],
  },
  {
    id: 3,
    question: 'Votre week-end idéal à deux ressemble à :',
    subtitle: 'Votre rythme de déconnexion et de ressourcement.',
    options: [
      {
        label: 'Évasion spontanée en train',
        description: 'Prendre un billet sur un coup de tête vers la mer ou la campagne.',
        traitScore: { spontaneous: 3, epicurean: 2 },
      },
      {
        label: 'Cocooning & Gastronomie maison',
        description: 'Cuisiner ensemble, écouter de la bonne musique et prendre son temps.',
        traitScore: { epicurean: 3, romantic: 2 },
      },
      {
        label: 'Effervescence culturelle urbaine',
        description: 'Cinéma, vernissages, librairies indépendantes et dîner tardif.',
        traitScore: { intellectual: 3, spontaneous: 1 },
      },
      {
        label: 'Grand air et sport doux',
        description: 'Randonnée en forêt, grand bol d’air pur et pique-nique soigné.',
        traitScore: { authentic: 3, spontaneous: 2 },
      },
    ],
  },
  {
    id: 4,
    question: 'Ce que vous appréciez le plus dans une discussion :',
    subtitle: 'Ce qui rend une conversation captivante à vos yeux.',
    options: [
      {
        label: 'La profondeur et la vulnérabilité',
        description: 'Parler de ses passions sincères, de ses rêves et de ses doutes sans masque.',
        traitScore: { authentic: 3, romantic: 2 },
      },
      {
        label: 'L’humour fin et la répartie',
        description: 'L’art du second degré, des piques douces et des rires partagés.',
        traitScore: { spontaneous: 3, intellectual: 2 },
      },
      {
        label: 'Les débats d’idées stimulants',
        description: 'Confronter des visions du monde, parler d’art, de philosophie ou d’actualité.',
        traitScore: { intellectual: 3, epicurean: 1 },
      },
      {
        label: 'L’écoute sereine et apaisante',
        description: 'Un espace de confiance où le silence n’est jamais gênant.',
        traitScore: { romantic: 3, authentic: 2 },
      },
    ],
  },
];

export const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  camille: [
    {
      id: 'm1',
      profileId: 'camille',
      sender: 'match',
      text: 'Bonjour ! J’ai vu que tu aimais aussi l’art contemporain et la bistronomie. Tu as une galerie fétiche à Paris ?',
      timestamp: '11:42',
    },
    {
      id: 'm2',
      profileId: 'camille',
      sender: 'user',
      text: 'Bonjour Camille ! Oui, j’adore les petits espaces indépendants vers le Marais, où l’on peut discuter avec les galeristes en toute simplicité.',
      timestamp: '11:45',
    },
    {
      id: 'm3',
      profileId: 'camille',
      sender: 'match',
      text: 'Exactement ce que je recherche aussi. Et pour un verre après l’expo, tu as un repaire préféré ?',
      timestamp: '11:47',
    },
  ],
  alexandre: [
    {
      id: 'm4',
      profileId: 'alexandre',
      sender: 'match',
      text: 'Ravi de cette affinité ! Ta sensibilité pour l’architecture et les beaux espaces a attiré mon attention.',
      timestamp: 'Hier',
    },
  ],
  sophie: [
    {
      id: 'm5',
      profileId: 'sophie',
      sender: 'match',
      text: 'Hello ! Quel est le dernier livre ou podcast qui t’a vraiment marqué dernièrement ?',
      timestamp: 'Hier',
    },
  ],
  julien: [
    {
      id: 'm6',
      profileId: 'julien',
      sender: 'match',
      text: 'Salut ! J’ai déniché un Chenin d’Anjou incroyable cette semaine, je me suis dit que ça plairait à un amateur de bons terroirs.',
      timestamp: 'Il y a 2 jours',
    },
  ],
};
