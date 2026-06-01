/** Configuration de navigation (catégories Explorer + onglets du bas). */

export type Category = {
  id: string;
  label: string;
  icon: string;
  /** Couleur d'identité de la catégorie (badge d'icône). */
  color: string;
};

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'all', label: 'Tous', icon: '🎾', color: '#2BE06A' },
  { id: 'indoor', label: 'Indoor', icon: '🏠', color: '#8B6CF6' },
  { id: 'outdoor', label: 'Outdoor', icon: '☀️', color: '#FB923C' },
  { id: 'tonight', label: 'Dispo ce soir', icon: '⚡', color: '#FFD23F' },
  { id: 'top', label: 'Top notés', icon: '⭐', color: '#FB6FA0' },
  { id: 'cheap', label: 'Abordable', icon: '💸', color: '#16C9B0' },
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
