import React from 'react';
import { User } from 'lucide-react';

interface NavbarProps {
  currentTab: 'decouvrir' | 'affinites' | 'messages' | 'rendezvous';
  onSelectTab: (tab: 'decouvrir' | 'affinites' | 'messages' | 'rendezvous') => void;
  unreadCount: number;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  unreadCount,
  onOpenProfile,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('decouvrir')}
          className="text-xl font-serif-display font-semibold tracking-wide text-white whitespace-nowrap shrink-0 hover:text-rose-300 transition-colors cursor-pointer"
        >
          Élixir
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
          <button
            onClick={() => onSelectTab('decouvrir')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentTab === 'decouvrir'
                ? 'text-white border-b-2 border-rose-500 pb-0.5'
                : 'hover:text-neutral-200'
            }`}
          >
            Découvrir
          </button>

          <button
            onClick={() => onSelectTab('affinites')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentTab === 'affinites'
                ? 'text-white border-b-2 border-rose-500 pb-0.5'
                : 'hover:text-neutral-200'
            }`}
          >
            Test d’Affinités
          </button>

          <button
            onClick={() => onSelectTab('messages')}
            className={`relative whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentTab === 'messages'
                ? 'text-white border-b-2 border-rose-500 pb-0.5'
                : 'hover:text-neutral-200'
            }`}
          >
            Messagerie
            {unreadCount > 0 && (
              <span className="ml-1.5 text-xs font-mono tabular-nums text-rose-400 font-semibold">
                ({unreadCount})
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('rendezvous')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentTab === 'rendezvous'
                ? 'text-white border-b-2 border-rose-500 pb-0.5'
                : 'hover:text-neutral-200'
            }`}
          >
            Idées de Rendez-vous
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-neutral-200 bg-neutral-900 border border-neutral-700/80 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-rose-400" />
            <span>Mon Profil</span>
          </button>
        </div>
      </div>

      {/* Mobile navigation tab strip */}
      <div className="md:hidden flex items-center justify-around border-t border-neutral-800/60 px-4 py-2.5 text-xs text-neutral-400">
        <button
          onClick={() => onSelectTab('decouvrir')}
          className={`py-1 cursor-pointer whitespace-nowrap ${currentTab === 'decouvrir' ? 'text-rose-400 font-semibold' : ''}`}
        >
          Découvrir
        </button>
        <button
          onClick={() => onSelectTab('affinites')}
          className={`py-1 cursor-pointer whitespace-nowrap ${currentTab === 'affinites' ? 'text-rose-400 font-semibold' : ''}`}
        >
          Affinités
        </button>
        <button
          onClick={() => onSelectTab('messages')}
          className={`py-1 cursor-pointer whitespace-nowrap ${currentTab === 'messages' ? 'text-rose-400 font-semibold' : ''}`}
        >
          Messages {unreadCount > 0 && `(${unreadCount})`}
        </button>
        <button
          onClick={() => onSelectTab('rendezvous')}
          className={`py-1 cursor-pointer whitespace-nowrap ${currentTab === 'rendezvous' ? 'text-rose-400 font-semibold' : ''}`}
        >
          Rendez-vous
        </button>
      </div>
    </header>
  );
};
