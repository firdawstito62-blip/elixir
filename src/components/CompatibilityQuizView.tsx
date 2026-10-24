import React, { useState } from 'react';
import { COMPATIBILITY_QUESTIONS } from '../data/mockData';
import { MemberProfile } from '../types';
import { Sparkles, Check, ArrowRight, RotateCcw, Heart, Shield } from 'lucide-react';

interface CompatibilityQuizViewProps {
  profiles: MemberProfile[];
  onQuizCompleted: (scores: Record<string, number>) => void;
  onExploreMatches: () => void;
  onSelectProfile: (profile: MemberProfile) => void;
}

export const CompatibilityQuizView: React.FC<CompatibilityQuizViewProps> = ({
  profiles,
  onQuizCompleted,
  onExploreMatches,
  onSelectProfile,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [calculatedTraits, setCalculatedTraits] = useState<Record<string, number>>({
    romantic: 85,
    epicurean: 90,
    intellectual: 78,
    spontaneous: 82,
    authentic: 94,
  });

  const question = COMPATIBILITY_QUESTIONS[currentStep];

  const handleSelectOption = (optionIndex: number) => {
    const newAnswers = { ...answers, [currentStep]: optionIndex };
    setAnswers(newAnswers);

    if (currentStep < COMPATIBILITY_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete quiz
      const traitTotals: Record<string, number> = {
        romantic: 70,
        epicurean: 70,
        intellectual: 70,
        spontaneous: 70,
        authentic: 70,
      };

      Object.entries(newAnswers).forEach(([qIdx, optIdx]) => {
        const q = COMPATIBILITY_QUESTIONS[Number(qIdx)];
        const opt = q.options[optIdx];
        Object.entries(opt.traitScore).forEach(([trait, score]) => {
          traitTotals[trait] = Math.min(99, (traitTotals[trait] || 70) + score * 6);
        });
      });

      setCalculatedTraits(traitTotals);
      setIsCompleted(true);
      onQuizCompleted(traitTotals);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Sort profiles by compatibility
  const sortedProfiles = [...profiles].sort((a, b) => b.compatibility - a.compatibility);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="text-xs uppercase tracking-widest text-rose-400 font-medium mb-1">
          Baromètre d'alchimie
        </div>
        <h2 className="text-2xl md:text-3xl font-serif-display font-medium text-white tracking-tight">
          Test de compatibilité & affinités de valeurs
        </h2>
        <p className="text-xs md:text-sm text-neutral-400 mt-2 leading-relaxed">
          4 questions pour révéler votre sensibilité relationnelle et calibrer les suggestions de profils selon vos aspirations réelles.
        </p>
      </div>

      {!isCompleted ? (
        <div className="max-w-2xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-2xl">
          {/* Progress indicators */}
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-6">
            <span>Question {currentStep + 1} sur {COMPATIBILITY_QUESTIONS.length}</span>
            <span className="font-mono tabular-nums">
              {Math.round(((currentStep + 1) / COMPATIBILITY_QUESTIONS.length) * 100)}%
            </span>
          </div>

          <div className="w-full bg-neutral-800 h-1.5 rounded-full mb-8 overflow-hidden">
            <div
              className="bg-rose-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / COMPATIBILITY_QUESTIONS.length) * 100}%` }}
            />
          </div>

          <div className="mb-6">
            <h3 className="text-lg md:text-xl font-serif-display font-medium text-white mb-2 leading-snug">
              {question.question}
            </h3>
            <p className="text-xs text-neutral-400">{question.subtitle}</p>
          </div>

          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={option.label}
                onClick={() => handleSelectOption(idx)}
                className="w-full text-left p-4 rounded-xl border border-neutral-800 bg-neutral-950/70 hover:bg-neutral-800 hover:border-neutral-700 transition-all cursor-pointer group flex items-start justify-between gap-4"
              >
                <div>
                  <p className="text-sm font-medium text-neutral-100 group-hover:text-rose-200 transition-colors">
                    {option.label}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    {option.description}
                  </p>
                </div>
                <div className="w-5 h-5 rounded-full border border-neutral-700 group-hover:border-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>

          {currentStep > 0 && (
            <div className="mt-6 pt-4 border-t border-neutral-800/80 flex justify-between items-center text-xs text-neutral-400">
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                ← Question précédente
              </button>
            </div>
          )}
        </div>
      ) : (
        /* QUIZ RESULTS & RADAR VIEW */
        <div className="space-y-10">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Trait breakdown bars */}
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Votre profil relationnel</span>
              </div>
              <h3 className="text-2xl font-serif-display font-medium text-white">
                Épicurien réfléchi & sensible
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Vous privilégiez la complicité chaleureuse, les discussions profondes et le plaisir de vivre des moments choisis sans superficialité.
              </p>

              <div className="space-y-3 pt-3">
                {Object.entries({
                  'Authenticité & Vérité': calculatedTraits.authentic,
                  'Épicurisme & Plaisir de vivre': calculatedTraits.epicurean,
                  'Romantisme & Attention': calculatedTraits.romantic,
                  'Curiosité culturelle & Échange': calculatedTraits.intellectual,
                  'Spontanéité & Surprise': calculatedTraits.spontaneous,
                }).map(([label, score]) => (
                  <div key={label} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-300">{label}</span>
                      <span className="font-mono tabular-nums text-rose-300 font-medium">{score}%</span>
                    </div>
                    <div className="w-full bg-neutral-950 h-2 rounded-full overflow-hidden border border-neutral-800">
                      <div
                        className="bg-gradient-to-r from-rose-600 to-amber-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-neutral-800 text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Repasser le test</span>
                </button>
              </div>
            </div>

            {/* Right highlight message */}
            <div className="md:col-span-6 bg-neutral-950 border border-neutral-800/80 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium">
                <Shield className="w-4 h-4" />
                <span>Compatibilité recalibrée avec succès</span>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Vos réponses ont permis d’affiner l’indice d’affinité pour l’ensemble des profils certifiés de votre région.
              </p>
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
                <div className="text-xs text-neutral-400 mb-1">Meilleure correspondance actuelle :</div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-serif-display font-medium text-white">{sortedProfiles[0]?.name}</p>
                    <p className="text-xs text-neutral-400">{sortedProfiles[0]?.occupation}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-mono tabular-nums font-bold text-rose-400">
                      {sortedProfiles[0]?.compatibility}%
                    </span>
                    <span className="block text-[11px] text-neutral-500">d'affinité</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onExploreMatches}
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-rose-950/40"
              >
                <span>Voir mes correspondances</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Top 3 Profile Matches */}
          <div>
            <h4 className="text-lg font-serif-display font-medium text-white mb-4">
              Vos profils les plus compatibles
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sortedProfiles.slice(0, 3).map((match) => (
                <div
                  key={match.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={match.photoUrl}
                      alt={match.name}
                      className="w-16 h-16 rounded-xl object-cover border border-neutral-700 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-base font-serif-display font-medium text-white">{match.name}, {match.age}</h5>
                      </div>
                      <p className="text-xs text-neutral-400 truncate">{match.city}</p>
                      <div className="flex items-center gap-1 text-xs text-rose-400 font-mono tabular-nums font-semibold mt-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{match.compatibility}% d'affinité</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 line-clamp-2">
                    {match.bio}
                  </p>

                  <button
                    onClick={() => onSelectProfile(match)}
                    className="w-full py-2 bg-neutral-800 hover:bg-neutral-750 text-neutral-200 hover:text-white rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span>Découvrir le profil</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
