import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroBannerProps {
  onStartQuiz: () => void;
  onExplore: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onStartQuiz, onExplore }) => {
  return (
    <section className="relative overflow-hidden border-b border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Value proposition */}
        <div className="lg:col-span-7 space-y-6">
          <div className="text-xs uppercase tracking-widest text-rose-400 font-medium">
            Rencontres adultes & affinités choisies
          </div>

          <h1 className="text-3xl md:text-5xl font-serif-display font-medium text-white tracking-tight leading-tight text-balance">
            Pour ceux qui recherchent une alchimie sincère et un échange d'esprit.
          </h1>

          <p className="text-base text-neutral-400 max-w-xl leading-relaxed">
            Élixir réunit des personnes majeures partageant le goût des belles choses, des conversations profondes et des projets à deux. Sans faux-semblants ni algorithmes superficiels.
          </p>

          {/* Adjacency proof & clean unboxed metadata with typographic separators */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 pt-1">
            <span>Profils 100% vérifiés</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Algorithme d'affinités de valeurs</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Cadre bienveillant & sécurisé</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onStartQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white bg-rose-600 hover:bg-rose-500 transition-colors shadow-lg shadow-rose-950/40 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              <span>Calculer mes affinités</span>
            </button>

            <button
              onClick={onExplore}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-neutral-300 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Découvrir les membres</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Hero Visual photography */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl aspect-[16/10] bg-neutral-900">
            <img
              src="/src/assets/images/hero_romantic_connection_1792873465284.jpg"
              alt="Moment de complicité élégant lors d'un dîner à Paris"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-xs text-neutral-200">
              <span className="font-serif-display italic">« L’amour ne consiste pas à se regarder l’un l’autre, mais à regarder ensemble dans la même direction. »</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
