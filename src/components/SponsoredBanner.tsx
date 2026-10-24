import React, { useState } from 'react';
import { ExternalLink, Sparkles, X, Wine } from 'lucide-react';

export const SponsoredBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const [copiedNotice, setCopiedNotice] = useState(false);

  const handleAction = () => {
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  if (!isVisible) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="relative bg-gradient-to-r from-neutral-900 via-neutral-900 to-rose-950/40 border border-neutral-800/90 rounded-2xl p-4 md:p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Close banner button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
          title="Masquer l'annonce"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-900/30 border border-rose-700/40 flex items-center justify-center text-rose-400 shrink-0">
            <Wine className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-neutral-800 text-rose-300 border border-neutral-700">
                Sponsorisé
              </span>
              <span className="text-xs text-neutral-400">Partenaire Officiel</span>
            </div>
            <h4 className="text-sm font-serif-display font-medium text-white">
              Dégustation Privée & Soirée Célibataires Épicuriens
            </h4>
            <p className="text-xs text-neutral-400 max-w-xl">
              Profitez de -20% sur les ateliers cocktails & dégustations de vin pour deux personnes avec le code <strong className="text-rose-300">ELIXIR20</strong>.
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <button
            onClick={handleAction}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 shadow-md shadow-rose-950/30 whitespace-nowrap"
          >
            <span>{copiedNotice ? 'Code ELIXIR20 copié !' : 'Découvrir l’offre'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
