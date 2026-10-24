import React, { useState, useRef, useEffect } from 'react';
import { MemberProfile, ChatMessage, DateIdea } from '../types';
import {
  Send,
  Sparkles,
  Calendar,
  MapPin,
  CheckCheck,
  ShieldAlert,
  MoreVertical,
  Coffee,
  Heart,
  X,
} from 'lucide-react';

interface ChatViewProps {
  profiles: MemberProfile[];
  messages: Record<string, ChatMessage[]>;
  activeProfileId: string;
  onSelectActiveProfile: (id: string) => void;
  onSendMessage: (profileId: string, text: string, dateIdea?: DateIdea) => void;
  dateIdeas: DateIdea[];
}

export const ChatView: React.FC<ChatViewProps> = ({
  profiles,
  messages,
  activeProfileId,
  onSelectActiveProfile,
  onSendMessage,
  dateIdeas,
}) => {
  const [inputText, setInputText] = useState('');
  const [showDateModal, setShowDateModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];
  const activeConversation = messages[activeProfile.id] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const textToSend = inputText.trim();
    setInputText('');
    onSendMessage(activeProfile.id, textToSend);

    // Simulate polite, authentic reply after 1.5 seconds
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses: Record<string, string[]> = {
        camille: [
          'J’aime beaucoup ta façon de voir les choses ! Ce serait avec plaisir qu’on échange davantage autour d’un verre.',
          'C’est exactement ce qui rend une rencontre intéressante, merci pour ce partage sincère.',
        ],
        alexandre: [
          'Tout à fait d’accord ! La simplicité et la spontanéité sont souvent le secret des plus beaux moments.',
          'Excellente idée. Je suis très curieux de poursuivre cette discussion de vive voix.',
        ],
        sophie: [
          'Haha j’adore ! Tu as beaucoup d’humour, c’est rafraîchissant.',
          'Ça me donne très envie de creuser le sujet avec toi !',
        ],
        julien: [
          'Bien vu ! Je sens qu’on partage une vision très similaire des bons moments de la vie.',
          'Avec plaisir pour organiser ça quand nos emplois du temps le permettent !',
        ],
      };
      const possible = responses[activeProfile.id] || [
        'Merci pour ton message, je suis ravi(e) de faire ta connaissance !',
      ];
      const randomResponse = possible[Math.floor(Math.random() * possible.length)];
      onSendMessage(activeProfile.id, randomResponse);
    }, 1600);
  };

  const handleSuggestDate = (idea: DateIdea) => {
    setShowDateModal(false);
    onSendMessage(
      activeProfile.id,
      `Que dirais-tu d'aller là-bas ensemble ? « ${idea.title} »`,
      idea
    );

    // Simulate instant excitement from the match
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      onSendMessage(
        activeProfile.id,
        `Quelle excellente idée d’invitation ! ${idea.title} à ${idea.location}, j’en serais ravie ! Dis-moi quel soir t'arrangerait.`
      );
    }, 1800);
  };

  const icebreakers = [
    'Quel est le détail qui te fait immédiatement sourire chez quelqu’un ?',
    'Ton spot secret préféré à Paris pour déconnecter ?',
    'Si tu devais choisir une seule musique pour la fin de soirée ?',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 h-[calc(100vh-140px)] min-h-[600px] flex flex-col">
      <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12">
        {/* Left column: Conversations list */}
        <div className="md:col-span-4 border-r border-neutral-800 flex flex-col bg-neutral-950/60">
          <div className="p-4 border-b border-neutral-800">
            <h3 className="text-base font-serif-display font-medium text-white">
              Échanges & Affinités
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">Vos correspondances privées</p>
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-neutral-900">
            {profiles.map((profile) => {
              const msgs = messages[profile.id] || [];
              const lastMsg = msgs[msgs.length - 1];
              const isSelected = profile.id === activeProfile.id;

              return (
                <button
                  key={profile.id}
                  onClick={() => onSelectActiveProfile(profile.id)}
                  className={`w-full text-left p-4 flex items-center gap-3.5 transition-colors cursor-pointer ${
                    isSelected ? 'bg-neutral-800/80 border-l-2 border-rose-500' : 'hover:bg-neutral-900/50'
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-neutral-700">
                    <img
                      src={profile.photoUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white truncate">
                        {profile.name}
                      </span>
                      <span className="text-[11px] text-neutral-500 font-mono">
                        {lastMsg?.timestamp || 'Nouveau'}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 truncate">
                      {lastMsg?.text || `Affinité ${profile.compatibility}% · Démarrez l'échange`}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column: Active conversation window */}
        <div className="md:col-span-8 flex flex-col h-full bg-neutral-950">
          {/* Conversation Header */}
          <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-700 shrink-0">
                <img
                  src={activeProfile.photoUrl}
                  alt={activeProfile.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-white">
                    {activeProfile.name}, {activeProfile.age}
                  </h4>
                  <span className="text-xs text-rose-400 font-mono tabular-nums">
                    {activeProfile.compatibility}% d'affinité
                  </span>
                </div>
                <p className="text-xs text-neutral-400">{activeProfile.city}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDateModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-neutral-200 hover:text-white text-xs font-medium transition-colors cursor-pointer border border-neutral-700/60"
              >
                <Calendar className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">Proposer un rendez-vous</span>
              </button>
            </div>
          </div>

          {/* Messages list scroll area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {/* Soft privacy and security reminder */}
            <div className="text-center py-2">
              <p className="inline-block text-[11px] text-neutral-500 bg-neutral-900/80 px-3 py-1 rounded-full border border-neutral-800">
                Échange sécurisé & modéré · Respect de la vie privée
              </p>
            </div>

            {activeConversation.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-md rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      isUser
                        ? 'bg-rose-600 text-white rounded-br-none shadow-md shadow-rose-950/20'
                        : 'bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-bl-none'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Embedded Date Invitation Card if present */}
                    {msg.dateSuggestion && (
                      <div className="mt-3 pt-3 border-t border-white/20 bg-black/20 p-3 rounded-xl text-left space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-rose-200">
                          <span>{msg.dateSuggestion.category}</span>
                          <span className="font-mono">{msg.dateSuggestion.priceRange}</span>
                        </div>
                        <p className="font-serif-display font-medium text-white text-sm">
                          {msg.dateSuggestion.title}
                        </p>
                        <p className="text-[11px] text-neutral-300 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-rose-300" />
                          <span>{msg.dateSuggestion.location}</span>
                        </p>
                        <p className="text-[11px] text-neutral-300 italic pt-1">
                          {msg.dateSuggestion.description}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-neutral-400 mt-1 px-1">
                    <span>{msg.timestamp}</span>
                    {isUser && <CheckCheck className="w-3 h-3 text-rose-400" />}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-neutral-400 italic">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                <span>{activeProfile.name} est en train d'écrire...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Icebreakers Suggestions */}
          <div className="px-4 py-2 bg-neutral-950 border-t border-neutral-800/60 overflow-x-auto flex items-center gap-2">
            <span className="text-[11px] text-neutral-500 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-rose-400" />
              <span>Idées brise-glace :</span>
            </span>
            {icebreakers.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setInputText(prompt)}
                className="text-[11px] text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-full px-3 py-1 whitespace-nowrap cursor-pointer transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder={`Écrire un message à ${activeProfile.name}...`}
              className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-rose-500/80"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="p-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white rounded-xl transition-colors cursor-pointer"
              title="Envoyer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Date Idea Selection Modal */}
      {showDateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setShowDateModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-serif-display font-medium text-white mb-1">
              Choisir un lieu d'invitation
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Sélectionnez une expérience raffinée pour proposer un premier rendez-vous à {activeProfile.name}.
            </p>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {dateIdeas.map((idea) => (
                <div
                  key={idea.id}
                  className="bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-xl p-4 transition-all flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                      <span className="text-rose-400 font-medium">{idea.category}</span>
                      <span className="font-mono">{idea.priceRange}</span>
                    </div>
                    <h4 className="text-sm font-serif-display font-medium text-white">
                      {idea.title}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{idea.location}</span>
                    </p>
                    <p className="text-xs text-neutral-300 mt-2">{idea.description}</p>
                  </div>

                  <button
                    onClick={() => handleSuggestDate(idea)}
                    className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Coffee className="w-3.5 h-3.5" />
                    <span>Envoyer cette invitation</span>
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
