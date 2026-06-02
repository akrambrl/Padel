/**
 * Données fictives (Phase 1 : saisies à la main, en attendant Supabase).
 * Le type `Club` est volontairement "résumé UI" ; il dérivera plus tard des
 * tables `clubs` / `courts` / `opening_hours` décrites dans CLAUDE.md.
 */

/** Moment de la journée (pour le filtre "Quand"). */
export type Period = 'morning' | 'afternoon' | 'evening';

export type Club = {
  id: string;
  name: string;
  location: string;
  /** Ex : "Indoor · Outdoor". */
  type: string;
  courts: number;
  rating: number;
  /** Nombre d'avis. */
  avis: number;
  /** Prix indicatif du créneau 1h30, en dirhams. */
  price: number;
  distanceKm: number;
  /** Moments où le club a (fictivement) des créneaux libres aujourd'hui. */
  periods: Period[];
};

export const CLUBS: Club[] = [
  {
    id: 'casa-padel-club',
    name: 'Casa Padel Club',
    location: 'Maârif, Casablanca',
    type: 'Indoor · Outdoor',
    courts: 6,
    rating: 4.9,
    avis: 102,
    price: 300,
    distanceKm: 1.4,
    periods: ['morning', 'afternoon', 'evening'],
  },
  {
    id: 'bouskoura-padel-arena',
    name: 'Bouskoura Padel Arena',
    location: 'Bouskoura',
    type: 'Indoor · le plus grand',
    courts: 10,
    rating: 4.8,
    avis: 67,
    price: 320,
    distanceKm: 8.0,
    periods: ['afternoon', 'evening'],
  },
  {
    id: 'anfa-smash-center',
    name: 'Anfa Smash Center',
    location: 'Anfa, Casablanca',
    type: 'Indoor',
    courts: 4,
    rating: 4.7,
    avis: 41,
    price: 280,
    distanceKm: 3.1,
    periods: ['morning', 'evening'],
  },
  {
    id: 'racket-club-ain-diab',
    name: 'Racket Club Aïn Diab',
    location: 'Corniche, Aïn Diab',
    type: 'Outdoor · vue mer',
    courts: 3,
    rating: 4.6,
    avis: 25,
    price: 250,
    distanceKm: 5.2,
    periods: ['morning', 'afternoon'],
  },
  {
    id: 'green-padel-sidi-maarouf',
    name: 'Green Padel Sidi Maârouf',
    location: 'Sidi Maârouf',
    type: 'Indoor · Outdoor',
    courts: 5,
    rating: 4.5,
    avis: 38,
    price: 230,
    distanceKm: 6.8,
    periods: ['evening'],
  },
  {
    id: 'marina-padel',
    name: 'Marina Padel',
    location: 'Casa Marina',
    type: 'Outdoor',
    courts: 4,
    rating: 4.8,
    avis: 54,
    price: 340,
    distanceKm: 4.0,
    periods: ['morning', 'afternoon', 'evening'],
  },
];

/** Jours affichés dans le sélecteur (démo : à partir du Lun. 1). */
export const DEMO_DAYS = [
  { dow: 'Lun.', day: 1 },
  { dow: 'Mar.', day: 2 },
  { dow: 'Mer.', day: 3 },
  { dow: 'Jeu.', day: 4 },
  { dow: 'Ven.', day: 5 },
  { dow: 'Sam.', day: 6 },
  { dow: 'Dim.', day: 7 },
  { dow: 'Lun.', day: 8 },
];

/** Créneaux indicatifs (prix + éventuelle mention "1 dispo") pour la fiche club. */
export const DEMO_SLOTS = [
  { time: '09h', price: '280 DH' },
  { time: '10h', price: '280 DH' },
  { time: '11h', price: '280 DH' },
  { time: '12h', price: '280 DH', note: '1 dispo' },
  { time: '13h', price: '280 DH' },
  { time: '14h', price: '280 DH' },
  { time: '15h', price: '280 DH' },
  { time: '16h', price: '280 DH' },
  { time: '17h', price: '320 DH' },
  { time: '18h', price: '320 DH', note: '1 dispo' },
  { time: '20h', price: '320 DH' },
  { time: '21h', price: '320 DH' },
];
