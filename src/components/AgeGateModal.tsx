import React, { useState } from 'react';
import { ShieldCheck, HeartHandshake, Lock } from 'lucide-react';

interface AgeGateModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

export const AgeGateModal: React.FC<AgeGateModalProps> = ({ isOpen, onConfirm }) => {
  const [isOver18, setIsOver18] = useState(false);
  const [acceptsCharter, setAcceptsCharter] = useState(false);

  if (!isOpen) return null;

  const canProceed = isOver18 && acceptsCharter;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl text-neutral-100">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-rose-950/60 border border-rose-800/50 flex items-center justify-center text-rose-400 mb-4">
            <HeartHandshake className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-serif-display font-medium tracking-tight text-white mb-2">
            Bienvenue sur Élixir
          </h2>
          <p className="text-sm text-neutral-400 max-w-sm">
            Espace exclusif de rencontres et de mise en relation pour adultes exigeants en quête d’échanges authentiques et respectueux.
          </p>
        </div>

        <div className="space-y-4 mb-8 bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-5 text-sm">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-neutral-200">Plateforme réservée aux personnes majeures (18+)</p>
              <p className="text-xs text-neutral-400 mt-0.5">
                Conformément à la réglementation et à nos engagements d'intégrité, l'accès est strictement réservé aux adultes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-neutral-200">Charte de courtoisie et de consentement</p>
              <p className="text-xs text-neutral-400 mt-0.5">
                Chaque membre s’engage à des échanges respectueux, sans harcèlement ni propos inappropriés.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={isOver18}
              onChange={(e) => setIsOver18(e.target.checked)}
              className="w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-rose-600 focus:ring-rose-500/30 accent-rose-500 cursor-pointer"
            />
            <span className="text-xs text-neutral-300 group-hover:text-white transition-colors">
              Je certifie sur l'honneur avoir au moins 18 ans révolus.
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={acceptsCharter}
              onChange={(e) => setAcceptsCharter(e.target.checked)}
              className="w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-rose-600 focus:ring-rose-500/30 accent-rose-500 cursor-pointer"
            />
            <span className="text-xs text-neutral-300 group-hover:text-white transition-colors">
              J'accepte la charte d'éthique, de respect mutuel et de confidentialité.
            </span>
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              if (canProceed) {
                onConfirm();
              }
            }}
            disabled={!canProceed}
            className={`w-full py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              canProceed
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/40 cursor-pointer'
                : 'bg-neutral-800 text-neutral-500 cursor-not-allowed opacity-60'
            }`}
          >
            Accéder à la communauté
          </button>
          <p className="text-center text-[11px] text-neutral-400">
            Navigation chiffrée · Données personnelles protégées
          </p>
        </div>
      </div>
    </div>
  );
};
