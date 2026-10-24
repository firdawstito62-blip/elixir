import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { DiscoveryView } from './components/DiscoveryView';
import { CompatibilityQuizView } from './components/CompatibilityQuizView';
import { ChatView } from './components/ChatView';
import { DateConciergeView } from './components/DateConciergeView';
import { ProfileDrawer } from './components/ProfileDrawer';
import { AgeGateModal } from './components/AgeGateModal';
import { INITIAL_PROFILES, DATE_IDEAS, INITIAL_MESSAGES } from './data/mockData';
import { MemberProfile, DateIdea, ChatMessage, UserPreferences } from './types';
import { Heart, MessageCircle, X, ShieldCheck } from 'lucide-react';

const STORAGE_KEY_AGE = 'elixir_age_gate_passed';
const STORAGE_KEY_PREFS = 'elixir_user_preferences';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'decouvrir' | 'affinites' | 'messages' | 'rendezvous'>('decouvrir');
  const [profiles, setProfiles] = useState<MemberProfile[]>(INITIAL_PROFILES);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(INITIAL_MESSAGES);
  const [activeProfileId, setActiveProfileId] = useState<string>('camille');
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [hasPassedAgeGate, setHasPassedAgeGate] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY_AGE) === 'true';
  });

  const [userPrefs, setUserPrefs] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback to default
      }
    }
    return {
      name: 'Adrien',
      age: 31,
      city: 'Paris',
      occupation: 'Architecte paysagiste',
      bio: 'Épicurien, amateur de jazz et de dîners intimistes. En quête d’une connexion sincère.',
      interests: ['Voyages', 'Jazz', 'Bistronomie', 'Design'],
      intent: 'Relation complice',
      preferredAgeRange: [25, 40],
      preferredMaxDistance: 30,
      hasPassedAgeGate: true,
    };
  });

  const [matchNotification, setMatchNotification] = useState<MemberProfile | null>(null);

  // Age gate completion
  const handleConfirmAgeGate = () => {
    setHasPassedAgeGate(true);
    localStorage.setItem(STORAGE_KEY_AGE, 'true');
  };

  // User save profile preferences
  const handleSavePrefs = (newPrefs: UserPreferences) => {
    setUserPrefs(newPrefs);
    localStorage.setItem(STORAGE_KEY_PREFS, JSON.stringify(newPrefs));
  };

  // Like profile handler
  const handleLikeProfile = (profile: MemberProfile) => {
    setMatchNotification(profile);
  };

  // Pass profile handler
  const handlePassProfile = (profile: MemberProfile) => {
    // Soft pass, remains in pool
  };

  // Start chat with icebreaker prompt
  const handleStartChatWithPrompt = (profile: MemberProfile, promptQuestion: string, initialText?: string) => {
    setActiveProfileId(profile.id);
    setCurrentTab('messages');

    if (initialText) {
      handleSendMessage(profile.id, `En réponse à « ${promptQuestion} » : ${initialText}`);
    }
  };

  // Send message handler
  const handleSendMessage = (profileId: string, text: string, dateSuggestion?: DateIdea) => {
    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      profileId,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dateSuggestion,
    };

    setMessages((prev) => ({
      ...prev,
      [profileId]: [...(prev[profileId] || []), newMessage],
    }));
  };

  // Invite profile to date directly from Concierge
  const handleInviteProfileToDate = (profileId: string, idea: DateIdea) => {
    setActiveProfileId(profileId);
    setCurrentTab('messages');
    handleSendMessage(
      profileId,
      `Bonjour ! J'ai pensé que cette sortie pourrait te plaire : « ${idea.title} »`,
      idea
    );
  };

  // Dynamic compatibility adjustment after quiz
  const handleQuizCompleted = (scores: Record<string, number>) => {
    setProfiles((prev) =>
      prev.map((p) => {
        // Compute tailored affinity score
        const boost = Math.floor(Math.random() * 6);
        return {
          ...p,
          compatibility: Math.min(99, Math.max(82, p.compatibility + (boost % 3 === 0 ? 3 : -1))),
        };
      })
    );
  };

  // Total unread messages count
  const unreadCount = Object.keys(messages).length > 0 ? 1 : 0;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-rose-500/30 selection:text-rose-200">
      {/* 18+ Verification Modal */}
      <AgeGateModal
        isOpen={!hasPassedAgeGate}
        onConfirm={handleConfirmAgeGate}
      />

      {/* Navigation Top Bar Contract */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        unreadCount={unreadCount}
        onOpenProfile={() => setIsProfileDrawerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'decouvrir' && (
          <>
            <HeroBanner
              onStartQuiz={() => setCurrentTab('affinites')}
              onExplore={() => {
                const discoveryElement = document.getElementById('discovery-section');
                discoveryElement?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <div id="discovery-section">
              <DiscoveryView
                profiles={profiles}
                onLikeProfile={handleLikeProfile}
                onPassProfile={handlePassProfile}
                onStartChatWithPrompt={handleStartChatWithPrompt}
              />
            </div>
          </>
        )}

        {currentTab === 'affinites' && (
          <CompatibilityQuizView
            profiles={profiles}
            onQuizCompleted={handleQuizCompleted}
            onExploreMatches={() => setCurrentTab('decouvrir')}
            onSelectProfile={(profile) => {
              setActiveProfileId(profile.id);
              setCurrentTab('messages');
            }}
          />
        )}

        {currentTab === 'messages' && (
          <ChatView
            profiles={profiles}
            messages={messages}
            activeProfileId={activeProfileId}
            onSelectActiveProfile={(id) => setActiveProfileId(id)}
            onSendMessage={handleSendMessage}
            dateIdeas={DATE_IDEAS}
          />
        )}

        {currentTab === 'rendezvous' && (
          <DateConciergeView
            dateIdeas={DATE_IDEAS}
            profiles={profiles}
            onInviteProfileToDate={handleInviteProfileToDate}
          />
        )}
      </main>

      {/* Profile Preferences Drawer */}
      <ProfileDrawer
        isOpen={isProfileDrawerOpen}
        onClose={() => setIsProfileDrawerOpen(false)}
        userPrefs={userPrefs}
        onSavePrefs={handleSavePrefs}
      />

      {/* Reciprocal Match Notification Modal */}
      {matchNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center shadow-2xl space-y-6">
            <button
              onClick={() => setMatchNotification(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 rounded-full bg-rose-950/80 border border-rose-800/60 mx-auto flex items-center justify-center text-rose-400">
              <Heart className="w-8 h-8 fill-rose-500 text-rose-500 animate-pulse" />
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-rose-400 font-semibold mb-1">
                Affinité réciproque
              </div>
              <h3 className="text-2xl font-serif-display font-medium text-white">
                Coup de cœur avec {matchNotification.name} !
              </h3>
              <p className="text-xs text-neutral-400 mt-2">
                Vous partagez {matchNotification.compatibility}% de compatibilité relationnelle et culturelle.
              </p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-rose-500/50 shadow-lg">
                <img
                  src={matchNotification.photoUrl}
                  alt={matchNotification.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => {
                  const p = matchNotification;
                  setMatchNotification(null);
                  setActiveProfileId(p.id);
                  setCurrentTab('messages');
                }}
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-rose-950/40"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Envoyer le premier message</span>
              </button>

              <button
                onClick={() => setMatchNotification(null)}
                className="w-full py-2.5 bg-neutral-950 hover:bg-neutral-800 text-neutral-300 rounded-xl text-xs font-medium transition-colors cursor-pointer"
              >
                Poursuivre la découverte
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiet, Human Editorial Footer */}
      <footer className="border-t border-neutral-800/80 bg-neutral-950 py-10 px-6 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-400">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-base font-serif-display font-medium text-white">Élixir</span>
            <p className="text-[11px] text-neutral-500">
              Rencontres et mise en relation authentique pour personnes majeures (18+).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-neutral-400">
            <button
              onClick={() => setCurrentTab('decouvrir')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Découvrir
            </button>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <button
              onClick={() => setCurrentTab('affinites')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Test d'affinités
            </button>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <button
              onClick={() => setCurrentTab('rendezvous')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Idées de rendez-vous
            </button>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span className="text-neutral-400">Charte de respect & 18+</span>
          </div>

          <div className="text-[11px] text-neutral-400 font-mono">
            © {new Date().getFullYear()} Élixir. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
