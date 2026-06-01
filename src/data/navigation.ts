/** Configuration de navigation (catégories Explorer + onglets du bas). */

export type Category = {
  id: string;
  label: string;
  icon: string;
};

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'all', label: 'Tous', icon: '🎾' },
  { id: 'indoor', label: 'Indoor', icon: '🏠' },
  { id: 'outdoor', label: 'Outdoor', icon: '☀️' },
  { id: 'tonight', label: 'Dispo ce soir', icon: '⚡' },
  { id: 'top', label: 'Top notés', icon: '⭐' },
  { id: 'cheap', label: 'Abordable', icon: '💸' },
];

export type NavTab = {
  id: string;
  label: string;
  icon: string;
};

export const DEFAULT_TABS: NavTab[] = [
  { id: 'explore', label: 'Explorer', icon: '🔍' },
  { id: 'map', label: 'Carte', icon: '🗺️' },
  { id: 'favorites', label: 'Favoris', icon: '♡' },
  { id: 'profile', label: 'Profil', icon: '👤' },
];
