/**
 * Données fictives (Phase 1 : saisies à la main, en attendant Supabase).
 * Le type `Club` est volontairement "résumé UI" ; il dérivera plus tard des
 * tables `clubs` / `courts` / `opening_hours` décrites dans CLAUDE.md.
 */
export type Club = {
  id: string;
  name: string;
  location: string;
  /** Ex : "Indoor · Outdoor". */
  type: string;
  courts: number;
  rating: number;
  /** Prix indicatif du créneau 1h30, en dirhams. */
  price: number;
  distanceKm: number;
};

export const CLUBS: Club[] = [
  {
    id: 'casa-padel-club',
    name: 'Casa Padel Club',
    location: 'Maârif, Casablanca',
    type: 'Indoor · Outdoor',
    courts: 6,
    rating: 4.9,
    price: 300,
    distanceKm: 1.4,
  },
  {
    id: 'bouskoura-padel-arena',
    name: 'Bouskoura Padel Arena',
    location: 'Bouskoura',
    type: 'Indoor · le plus grand',
    courts: 10,
    rating: 4.8,
    price: 320,
    distanceKm: 8.0,
  },
  {
    id: 'anfa-smash-center',
    name: 'Anfa Smash Center',
    location: 'Anfa, Casablanca',
    type: 'Indoor',
    courts: 4,
    rating: 4.7,
    price: 280,
    distanceKm: 3.1,
  },
  {
    id: 'racket-club-ain-diab',
    name: 'Racket Club Aïn Diab',
    location: 'Corniche, Aïn Diab',
    type: 'Outdoor · vue mer',
    courts: 3,
    rating: 4.6,
    price: 250,
    distanceKm: 5.2,
  },
  {
    id: 'green-padel-sidi-maarouf',
    name: 'Green Padel Sidi Maârouf',
    location: 'Sidi Maârouf',
    type: 'Indoor · Outdoor',
    courts: 5,
    rating: 4.5,
    price: 230,
    distanceKm: 6.8,
  },
  {
    id: 'marina-padel',
    name: 'Marina Padel',
    location: 'Casa Marina',
    type: 'Outdoor',
    courts: 4,
    rating: 4.8,
    price: 340,
    distanceKm: 4.0,
  },
];

/** Créneaux indicatifs (indispo = déjà réservé) pour la démo de fiche club. */
export const DEMO_SLOTS = [
  { time: '08:00' },
  { time: '09:30' },
  { time: '11:00', off: true },
  { time: '12:30' },
  { time: '14:00' },
  { time: '15:30', off: true },
  { time: '17:00' },
  { time: '18:30', off: true },
  { time: '20:00' },
  { time: '21:30' },
];
