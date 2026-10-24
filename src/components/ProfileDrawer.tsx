import React, { useState } from 'react';
import { UserPreferences } from '../types';
import { X, Check, Shield, User, MapPin, Briefcase, Heart } from 'lucide-react';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userPrefs: UserPreferences;
  onSavePrefs: (newPrefs: UserPreferences) => void;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  userPrefs,
  onSavePrefs,
}) => {
  const [formData, setFormData] = useState<UserPreferences>(userPrefs);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSavePrefs(formData);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 900);
  };

  const intents = [
    'Relation complice',
    'Grand amour',
    'Partage culturel',
    'Rencontre spontanée',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg h-full bg-neutral-900 border-l border-neutral-800 p-6 md:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-rose-950 border border-rose-800 flex items-center justify-center text-rose-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-serif-display font-medium text-white">
                  Mon Profil Membre
                </h3>
                <p className="text-xs text-neutral-400">Gérez vos critères et votre présentation</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Identity & Basic Info */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-400 mb-1 font-medium">Prénom</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-medium">Âge (18+)</label>
                <input
                  type="number"
                  min={18}
                  max={99}
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-400 mb-1 font-medium">Ville de résidence</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-medium">Activité / Profession</label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {/* Relationship intent */}
            <div>
              <label className="block text-neutral-400 mb-1 font-medium">Ce que vous recherchez</label>
              <select
                value={formData.intent}
                onChange={(e) => setFormData({ ...formData, intent: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
              >
                {intents.map((i) => (
                  <option key={i} value={i} className="bg-neutral-900 text-white">
                    {i}
                  </option>
                ))}
              </select>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-neutral-400 mb-1 font-medium">Votre présentation (Bio)</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-white focus:outline-none focus:border-rose-500 resize-none"
                placeholder="Parlez de vos passions, de votre vision d'une belle relation..."
              />
            </div>

            {/* Trust badge note */}
            <div className="bg-neutral-950 border border-neutral-800/80 rounded-xl p-4 flex items-start gap-3">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-[11px]">
                <p className="font-medium text-neutral-300">Statut vérifié Élixir</p>
                <p className="text-neutral-500">
                  Votre compte bénéficie de la certification de courtoisie et de majorité 18+.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-rose-950/40"
              >
                {savedNotice ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Modifications enregistrées !</span>
                  </>
                ) : (
                  <span>Enregistrer mon profil</span>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="pt-6 border-t border-neutral-800 text-center text-[11px] text-neutral-500">
          Élixir · Respect des données personnelles · Protocole confidentiel
        </div>
      </div>
    </div>
  );
};
