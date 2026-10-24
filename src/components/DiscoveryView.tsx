import React, { useState } from 'react';
import { MemberProfile } from '../types';
import {
  Heart,
  X,
  Sparkles,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Compass,
  SlidersHorizontal,
  LayoutGrid,
  CreditCard as CardIcon,
  Wine,
  Music,
  Calendar,
} from 'lucide-react';

interface DiscoveryViewProps {
  profiles: MemberProfile[];
  onLikeProfile: (profile: MemberProfile) => void;
  onPassProfile: (profile: MemberProfile) => void;
  onStartChatWithPrompt: (profile: MemberProfile, promptQuestion: string, initialText?: string) => void;
}

export const DiscoveryView: React.FC<DiscoveryViewProps> = ({
  profiles,
  onLikeProfile,
  onPassProfile,
  onStartChatWithPrompt,
}) => {
  const [viewMode, setViewMode] = useState<'card' | 'grid'>('card');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterIntent, setFilterIntent] = useState<string>('all');
  const [selectedProfileModal, setSelectedProfileModal] = useState<MemberProfile | null>(null);
  const [customIcebreakerText, setCustomIcebreakerText] = useState('');
  const [activePromptForReply, setActivePromptForReply] = useState<{ profile: MemberProfile; question: string } | null>(null);

  // Filter profiles based on intent
  const filteredProfiles = profiles.filter((p) => {
    if (filterIntent === 'all') return true;
    return p.relationshipIntent === filterIntent;
  });

  const currentProfile = filteredProfiles[currentIndex % Math.max(1, filteredProfiles.length)];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProfiles.length);
  };

  const handleLike = (profile: MemberProfile) => {
    onLikeProfile(profile);
    handleNext();
  };

  const handlePass = (profile: MemberProfile) => {
    onPassProfile(profile);
    handleNext();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Top Filter and View Mode Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80">
        <div>
          <h2 className="text-xl font-serif-display font-medium text-white tracking-tight">
            Rencontres sélectionnées
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Membres actifs vérifiés selon votre indice de compatibilité.
          </p>
        </div>

        {/* Filter controls and view switch */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-lg text-xs">
            <span className="text-neutral-500 pl-2 pr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" />
              <span>Intention :</span>
            </span>
            <button
              onClick={() => setFilterIntent('all')}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filterIntent === 'all'
                  ? 'bg-neutral-800 text-white font-medium'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Toutes
            </button>
            <button
              onClick={() => setFilterIntent('Relation complice')}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filterIntent === 'Relation complice'
                  ? 'bg-neutral-800 text-white font-medium'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Complicité
            </button>
            <button
              onClick={() => setFilterIntent('Grand amour')}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filterIntent === 'Grand amour'
                  ? 'bg-neutral-800 text-white font-medium'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Grand amour
            </button>
          </div>

          <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-lg text-xs">
            <button
              onClick={() => setViewMode('card')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'card' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
              title="Vue Carte immersive"
            >
              <CardIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
              title="Vue Grille complète"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {filteredProfiles.length === 0 ? (
        <div className="text-center py-20 bg-neutral-900/40 rounded-2xl border border-neutral-800 mt-8">
          <Compass className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
          <p className="text-base text-neutral-300 font-medium">Aucun profil ne correspond à ce filtre.</p>
          <button
            onClick={() => setFilterIntent('all')}
            className="mt-4 px-4 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : viewMode === 'card' && currentProfile ? (
        /* IMMERSIVE CARD DECK VIEW */
        <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Main Visual Profile Card */}
          <div className="md:col-span-7 bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="relative aspect-[4/5] bg-neutral-950">
              <img
                src={currentProfile.photoUrl}
                alt={currentProfile.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

              {/* Verified & Compatibility indicator */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs text-rose-300 border border-rose-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  <span className="font-mono tabular-nums font-semibold">{currentProfile.compatibility}%</span>
                  <span className="text-[11px] text-neutral-300">d’affinité</span>
                </div>

                {currentProfile.verified && (
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-neutral-950/70 backdrop-blur-md rounded-full text-xs text-neutral-300 border border-neutral-700/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Profil vérifié</span>
                  </div>
                )}
              </div>

              {/* Bottom Card Title Info */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="flex items-baseline gap-2.5">
                  <h3 className="text-2xl font-serif-display font-medium">{currentProfile.name}</h3>
                  <span className="text-lg text-neutral-300 font-mono tabular-nums">{currentProfile.age} ans</span>
                </div>
                <p className="text-xs text-rose-300 font-medium mt-0.5">{currentProfile.occupation}</p>
                <div className="flex items-center gap-2 text-xs text-neutral-400 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{currentProfile.city}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">À {currentProfile.distanceKm} km</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-neutral-300">{currentProfile.relationshipIntent}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Floating Bar */}
            <div className="p-4 bg-neutral-950/90 border-t border-neutral-800/80 flex items-center justify-around">
              <button
                onClick={() => handlePass(currentProfile)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer text-xs font-medium"
              >
                <X className="w-4 h-4 text-neutral-400" />
                <span>Passer</span>
              </button>

              <button
                onClick={() => setSelectedProfileModal(currentProfile)}
                className="text-xs text-neutral-400 hover:text-rose-300 transition-colors font-medium cursor-pointer"
              >
                Voir le profil complet
              </button>

              <button
                onClick={() => handleLike(currentProfile)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer text-xs font-medium shadow-lg shadow-rose-950/50"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Coup de cœur</span>
              </button>
            </div>
          </div>

          {/* Right Column: Bio & Icebreaker Prompts */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                À propos
              </div>
              <p className="text-sm text-neutral-200 leading-relaxed">
                {currentProfile.bio}
              </p>

              {/* Centers of interest (unboxed text with subtle separator or clean text tags) */}
              <div className="mt-5 pt-4 border-t border-neutral-800/80">
                <div className="text-xs text-neutral-400 mb-2.5 font-medium">Centres d'intérêt :</div>
                <div className="flex flex-wrap gap-2 text-xs text-neutral-300">
                  {currentProfile.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-md"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Lifestyle Snapshot */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-3.5 text-xs">
              <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Style de vie & Épicurisme
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <Wine className="w-4 h-4 text-rose-400 shrink-0" />
                <div>
                  <span className="text-neutral-500">Apéritif fétiche : </span>
                  <span className="text-neutral-200">{currentProfile.lifestyle.cocktailOrTea}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <Calendar className="w-4 h-4 text-rose-400 shrink-0" />
                <div>
                  <span className="text-neutral-500">Week-end idéal : </span>
                  <span className="text-neutral-200">{currentProfile.lifestyle.idealWeekend}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <Music className="w-4 h-4 text-rose-400 shrink-0" />
                <div>
                  <span className="text-neutral-500">Ambiance musicale : </span>
                  <span className="text-neutral-200">{currentProfile.lifestyle.musicStyle}</span>
                </div>
              </div>
            </div>

            {/* Interactive Icebreaker Questions */}
            <div className="space-y-3">
              <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Brise-glace pour entamer l'échange
              </div>
              {currentProfile.prompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className="bg-neutral-900/90 border border-neutral-800/90 rounded-xl p-4 transition-all hover:border-neutral-700"
                >
                  <p className="text-xs text-rose-300 font-serif-display italic mb-1.5">
                    « {prompt.question} »
                  </p>
                  <p className="text-xs text-neutral-200 mb-3">
                    {prompt.answer}
                  </p>
                  <button
                    onClick={() => {
                      setActivePromptForReply({
                        profile: currentProfile,
                        question: prompt.question,
                      });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-neutral-300 hover:text-rose-400 transition-colors font-medium cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Répondre à ce brise-glace</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* GRID VIEW OF ALL PROFILES */
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProfiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg group hover:border-neutral-700 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[4/5] bg-neutral-950 overflow-hidden">
                <img
                  src={profile.photoUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />

                <div className="absolute top-3 left-3">
                  <div className="flex items-center gap-1 px-2.5 py-0.5 bg-black/60 backdrop-blur-md rounded-full text-[11px] text-rose-300 border border-rose-500/30">
                    <Sparkles className="w-3 h-3 text-rose-400" />
                    <span className="font-mono tabular-nums font-semibold">{profile.compatibility}%</span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-lg font-serif-display font-medium">{profile.name}</h4>
                    <span className="text-sm text-neutral-300 font-mono tabular-nums">{profile.age} ans</span>
                  </div>
                  <p className="text-xs text-neutral-300 truncate">{profile.occupation}</p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">{profile.city}</p>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {profile.bio}
                </p>

                <div className="flex items-center gap-2 pt-2 border-t border-neutral-800/80">
                  <button
                    onClick={() => setSelectedProfileModal(profile)}
                    className="flex-1 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-750 rounded-lg transition-colors text-center cursor-pointer"
                  >
                    Détails
                  </button>
                  <button
                    onClick={() => onLikeProfile(profile)}
                    className="px-3 py-2 text-xs font-medium text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                    title="Coup de cœur"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Profile Detail Modal */}
      {selectedProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            <button
              onClick={() => setSelectedProfileModal(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="overflow-y-auto p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shrink-0 border border-neutral-800">
                  <img
                    src={selectedProfileModal.photoUrl}
                    alt={selectedProfileModal.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-serif-display font-medium text-white">
                      {selectedProfileModal.name}, {selectedProfileModal.age}
                    </h3>
                    {selectedProfileModal.verified && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-sm text-rose-300 font-medium">{selectedProfileModal.occupation}</p>
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{selectedProfileModal.city}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{selectedProfileModal.distanceKm} km</span>
                  </div>
                  <div className="pt-1 text-xs text-neutral-300">
                    <span className="text-neutral-500">Recherche : </span>
                    <span className="font-medium text-rose-200">{selectedProfileModal.relationshipIntent}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-800 pt-4">
                <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">Présentation</h4>
                <p className="text-sm text-neutral-200 leading-relaxed">{selectedProfileModal.bio}</p>
              </div>

              <div className="border-t border-neutral-800 pt-4">
                <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">Centres d'intérêt</h4>
                <div className="flex flex-wrap gap-2 text-xs text-neutral-300">
                  {selectedProfileModal.interests.map((interest) => (
                    <span key={interest} className="px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-lg">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-neutral-800 pt-4 space-y-3">
                <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">Brise-glace</h4>
                {selectedProfileModal.prompts.map((p) => (
                  <div key={p.id} className="bg-neutral-950 border border-neutral-800/80 p-3.5 rounded-xl text-xs">
                    <p className="text-rose-300 font-serif-display italic mb-1">« {p.question} »</p>
                    <p className="text-neutral-300">{p.answer}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-neutral-800">
                <button
                  onClick={() => {
                    const p = selectedProfileModal;
                    setSelectedProfileModal(null);
                    onLikeProfile(p);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Envoyer un Coup de Cœur</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reply to Icebreaker Prompt Modal */}
      {activePromptForReply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setActivePromptForReply(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-serif-display font-medium text-white mb-1">
              Répondre à {activePromptForReply.profile.name}
            </h3>
            <p className="text-xs text-rose-300 italic mb-4">
              « {activePromptForReply.question} »
            </p>

            <textarea
              value={customIcebreakerText}
              onChange={(e) => setCustomIcebreakerText(e.target.value)}
              placeholder="Écrivez un message délicat et personnalisé..."
              rows={4}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-rose-500/80 resize-none mb-4"
            />

            <button
              onClick={() => {
                if (customIcebreakerText.trim()) {
                  onStartChatWithPrompt(
                    activePromptForReply.profile,
                    activePromptForReply.question,
                    customIcebreakerText.trim()
                  );
                  setActivePromptForReply(null);
                  setCustomIcebreakerText('');
                }
              }}
              disabled={!customIcebreakerText.trim()}
              className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Démarrer la conversation</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
