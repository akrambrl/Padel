/** Configuration de navigation (onglets du bas, style Anybuddy). */

export type NavTab = {
  id: string;
  label: string;
  icon: string;
};

export const DEFAULT_TABS: NavTab[] = [
  { id: 'recherche', label: 'Recherche', icon: '🔍' },
  { id: 'matchs', label: 'Matchs Publics', icon: '⚡' },
  { id: 'discussions', label: 'Discussions', icon: '💬' },
  { id: 'profil', label: 'Profil', icon: '🙂' },
];
