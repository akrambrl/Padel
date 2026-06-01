/**
 * Données fictives pour les écrans Matchs Publics, Discussions et Profil.
 * (Phase 1 : en dur, en attendant Supabase.)
 */

export type Player = {
  /** me = moi (vert), photo = joueur inscrit, empty = place libre, ghost = inconnu */
  kind: 'me' | 'photo' | 'empty' | 'ghost';
  name?: string;
  level?: string;
  color?: string;
};

export type Match = {
  id: string;
  date: string;
  time: string;
  levelRange: string;
  levelNote?: string;
  players: Player[];
  club?: string;
  location?: string;
  /** 'reserve' = terrain déjà réservé ; sinon match ouvert. */
  status?: 'reserve';
};

/** Profil joueur (entête + résumé). */
export const PROFILE = {
  name: 'Akram',
  level: '3,5',
  classement: 'NC',
  eclairs: 6,
  trophees: 0,
  ville: 'Casablanca',
};

/** Matchs publics "de même niveau" à rejoindre. */
export const SAME_LEVEL_MATCHES: Match[] = [
  {
    id: 'm1',
    date: 'Lun. 1 Juin',
    time: '17h',
    levelRange: 'Niv 2-4.5',
    levelNote: 'Tous',
    status: 'reserve',
    players: [
      { kind: 'photo', name: 'Pierre-Jean', level: '3,5', color: '#2C6FB0' },
      { kind: 'photo', name: 'Yassine', level: '4', color: '#2E9E6B' },
      { kind: 'empty' },
      { kind: 'empty' },
    ],
  },
  {
    id: 'm2',
    date: 'Lun. 1 Juin',
    time: '20h30',
    levelRange: 'Niv 3-4',
    levelNote: 'Mixte',
    players: [
      { kind: 'photo', name: 'Sofia', level: '3', color: '#B0568F' },
      { kind: 'empty' },
      { kind: 'empty' },
      { kind: 'empty' },
    ],
  },
];

/** Historique des matchs (écran Profil). */
export const PROFILE_HISTORY: Match[] = [
  {
    id: 'h1',
    date: 'Jeu. 20 Nov.',
    time: '17h30',
    levelRange: 'Niv 1-8',
    club: 'Casa Padel Club',
    location: 'Maârif',
    players: [
      { kind: 'me', name: 'Akram', level: '3,5' },
      { kind: 'ghost' },
      { kind: 'ghost' },
      { kind: 'ghost' },
    ],
  },
  {
    id: 'h2',
    date: 'Jeu. 23 Oct.',
    time: '17h',
    levelRange: 'Niv 1-8',
    club: 'Green Padel',
    location: 'Sidi Maârouf',
    players: [
      { kind: 'me', name: 'Akram', level: '3,5' },
      { kind: 'ghost' },
      { kind: 'ghost' },
      { kind: 'ghost' },
    ],
  },
  {
    id: 'h3',
    date: 'Mer. 27 Août',
    time: '12h30',
    levelRange: 'Niv 1-8',
    club: 'Anfa Smash Center',
    location: 'Anfa',
    players: [
      { kind: 'me', name: 'Akram', level: '3,5' },
      { kind: 'ghost' },
      { kind: 'ghost' },
      { kind: 'ghost' },
    ],
  },
];

export type Group = {
  id: string;
  tag: string;
  members: number;
  color: string;
  last: string;
};

/** Groupes de discussion. */
export const GROUPS: Group[] = [
  { id: 'g1', tag: '#PADEL CASA', members: 5665, color: '#20DF63', last: 'Dylan : Complet !' },
  { id: 'g2', tag: '#PADEL RABAT', members: 1240, color: '#FFC02E', last: 'Eitan : On joue ?' },
  { id: 'g3', tag: '#PADEL MARRAKECH', members: 832, color: '#8B6CF6', last: 'Sara : Dispo dim.' },
];
