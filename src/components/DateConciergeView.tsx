import React, { useState } from 'react';
import { DateIdea, MemberProfile } from '../types';
import { Wine, Palette, MapPin, Sparkles, Send, Compass, Coffee } from 'lucide-react';

interface DateConciergeViewProps {
  dateIdeas: DateIdea[];
  profiles: MemberProfile[];
  onInviteProfileToDate: (profileId: string, idea: DateIdea) => void;
}

export const DateConciergeView: React.FC<DateConciergeViewProps> = ({
  dateIdeas,
  profiles,
  onInviteProfileToDate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIdeaForInvite, setSelectedIdeaForInvite] = useState<DateIdea | null>(null);

  const filteredIdeas = dateIdeas.filter((idea) => {
    if (selectedCategory === 'all') return true;
    return idea.category === selectedCategory;
  });

  const categories = [
    { id: 'all', label: 'Tous les cadres' },
    { id: 'Cocktails & Ambiance', label: 'Cocktails & Ambiance' },
    { id: 'Culture & Arts', label: 'Culture & Arts' },
    { id: 'Gastronomie', label: 'Gastronomie' },
    { id: 'Nature & Plein air', label: 'Nature & Plein air' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-neutral-800">
        <div>
          <div className="text-xs uppercase tracking-widest text-rose-400 font-medium mb-1">
            Conciergerie de rendez-vous
          </div>
          <h2 className="text-2xl md:text-3xl font-serif-display font-medium text-white tracking-tight">
            Idées d'escapades & adresses confidentielles
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 mt-1 max-w-xl leading-relaxed">
            Une sélection soignée de lieux propices aux échanges authentiques, aux confidences et à la complicité.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-neutral-800 text-white font-medium'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {filteredIdeas.map((idea) => (
          <div
            key={idea.id}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-all shadow-xl group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                <span className="text-rose-400 font-medium">{idea.category}</span>
                <span className="font-mono">{idea.priceRange}</span>
              </div>

              <h3 className="text-lg font-serif-display font-medium text-white group-hover:text-rose-200 transition-colors">
                {idea.title}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-2 mb-3">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>{idea.location}</span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                {idea.description}
              </p>
            </div>

            <div className="pt-6 border-t border-neutral-800/80 mt-6 space-y-3">
              <div className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-rose-400" />
                <span>Ambiance : <strong className="text-neutral-300 font-normal">{idea.atmosphere}</strong></span>
              </div>

              <button
                onClick={() => setSelectedIdeaForInvite(idea)}
                className="w-full py-2.5 bg-neutral-800 hover:bg-rose-600 text-neutral-200 hover:text-white rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Coffee className="w-3.5 h-3.5" />
                <span>Inviter une personne ici</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Selection Modal for Invitation */}
      {selectedIdeaForInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-base font-serif-display font-medium text-white mb-1">
              À qui souhaitez-vous proposer cette sortie ?
            </h3>
            <p className="text-xs text-rose-300 italic mb-4">
              « {selectedIdeaForInvite.title} »
            </p>

            <div className="space-y-2.5 max-h-[50vh] overflow-y-auto mb-6 pr-1">
              {profiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => {
                    onInviteProfileToDate(profile.id, selectedIdeaForInvite);
                    setSelectedIdeaForInvite(null);
                  }}
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850 flex items-center justify-between text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={profile.photoUrl}
                      alt={profile.name}
                      className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-xs font-medium text-white group-hover:text-rose-200">
                        {profile.name}, {profile.age} ans
                      </p>
                      <p className="text-[11px] text-neutral-400">{profile.city}</p>
                    </div>
                  </div>
                  <Send className="w-4 h-4 text-neutral-500 group-hover:text-rose-400 transition-colors" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setSelectedIdeaForInvite(null)}
              className="w-full py-2 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
