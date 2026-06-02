/**
 * Données clubs — Phase 1.
 * Les NOMS, QUARTIERS, ADRESSES et TÉLÉPHONES sont RÉELS (clubs de Casablanca
 * affiliés à la FRMT — fichier fourni par le fondateur).
 * Les champs spécifiques padel (terrains, prix, note, avis, créneaux, dispo) sont
 * encore des VALEURS D'EXEMPLE en attendant les vraies infos (Supabase).
 */

/** Moment de la journée (pour le filtre "Quand"). */
export type Period = 'morning' | 'afternoon' | 'evening';

export type Club = {
  id: string;
  name: string;
  /** Quartier + ville (affiché sur les cartes). */
  location: string;
  /** Adresse complète (réelle) — pour "Comment s'y rendre". */
  address?: string;
  /** Téléphone réel du club. */
  phone?: string;
  /** Ex : "Indoor · Outdoor". (exemple) */
  type: string;
  courts: number;
  rating: number;
  avis: number;
  /** Prix indicatif du créneau 1h30, en dirhams. (exemple) */
  price: number;
  distanceKm: number;
  /** Moments où le club a (à titre d'exemple) des créneaux libres aujourd'hui. */
  periods: Period[];
};

export const CLUBS: Club[] = [
  {
    id: 'coc',
    name: 'Club Olympique Casablancais',
    location: 'Ferme Bretonne, Casablanca',
    address: 'Cours des Sports, Ferme Bretonne, Casablanca',
    phone: '0522 99 21 31',
    type: 'Indoor · Outdoor',
    courts: 6,
    rating: 4.8,
    avis: 96,
    price: 300,
    distanceKm: 1.4,
    periods: ['morning', 'afternoon', 'evening'],
  },
  {
    id: 'ruc',
    name: 'Racing Universitaire Casablancais',
    location: "Route d'El Jadida, Casablanca",
    address: "Clos de l'Aviation, Route d'El Jadida, Casablanca",
    phone: '0522 98 74 12',
    type: 'Outdoor',
    courts: 4,
    rating: 4.6,
    avis: 54,
    price: 260,
    distanceKm: 3.2,
    periods: ['morning', 'evening'],
  },
  {
    id: 'cmc',
    name: 'Club Municipal Casablancais',
    location: 'Parc de la Ligue Arabe, Casablanca',
    address: 'Parc de la Ligue Arabe, Casablanca',
    phone: '0522 22 20 47',
    type: 'Outdoor',
    courts: 5,
    rating: 4.5,
    avis: 41,
    price: 240,
    distanceKm: 2.1,
    periods: ['afternoon', 'evening'],
  },
  {
    id: 'usm-tcc',
    name: 'USM Tennis Club de Casablanca',
    location: 'Parc de la Ligue Arabe, Casablanca',
    address: 'Parc de la Ligue Arabe, Casablanca',
    phone: '0522 20 02 06',
    type: 'Indoor · Outdoor',
    courts: 4,
    rating: 4.7,
    avis: 63,
    price: 280,
    distanceKm: 2.3,
    periods: ['morning', 'afternoon', 'evening'],
  },
  {
    id: 'occ',
    name: 'Océanic Club de Casablanca',
    location: 'Sidi Abderrahmane, Casablanca',
    address: 'Route de la Falaise, Sidi Abderrahmane, Casablanca',
    phone: '0522 79 76 20',
    type: 'Outdoor · vue mer',
    courts: 3,
    rating: 4.6,
    avis: 38,
    price: 250,
    distanceKm: 5.6,
    periods: ['morning', 'afternoon'],
  },
  {
    id: 'cafc',
    name: 'Club Athlétique Français',
    location: 'Jean Mermoz, Casablanca',
    address: 'Avenue Jean Mermoz, Casablanca',
    phone: '0522 25 43 42',
    type: 'Indoor · Outdoor',
    courts: 5,
    rating: 4.7,
    avis: 72,
    price: 290,
    distanceKm: 2.8,
    periods: ['afternoon', 'evening'],
  },
  {
    id: 'asas',
    name: 'Association Sportive Aïn Sebaâ',
    location: 'Aïn Sebaâ, Casablanca',
    address: '29, Allée des Parcs, Aïn Sebaâ, Casablanca',
    phone: '0522 66 11 81',
    type: 'Outdoor',
    courts: 4,
    rating: 4.4,
    avis: 29,
    price: 220,
    distanceKm: 7.4,
    periods: ['evening'],
  },
  {
    id: 'acsa',
    name: 'Amicale des Aéroports (ACSA)',
    location: 'Bd du Grand Théâtre, Casablanca',
    address: '102, Angle Bd Sidi Abderrahmane et Bd du Grand Théâtre, Casablanca',
    phone: '0529 14 73 85',
    type: 'Indoor',
    courts: 3,
    rating: 4.5,
    avis: 33,
    price: 270,
    distanceKm: 4.0,
    periods: ['morning', 'evening'],
  },
  {
    id: 'moundir-academy',
    name: 'Moundir Tennis Academy',
    location: 'Dar Bouazza, Casablanca',
    address: "Route d'Azemmour KM 5.6, Dar Bouazza, Casablanca",
    phone: '0522 93 58 12',
    type: 'Indoor · Outdoor',
    courts: 8,
    rating: 4.9,
    avis: 128,
    price: 320,
    distanceKm: 9.1,
    periods: ['morning', 'afternoon', 'evening'],
  },
  {
    id: 'kahrama',
    name: 'Club Kahrama (Lydec)',
    location: 'Californie, Casablanca',
    address: 'Km 7, Route de la Mecque, Quartier Californie, Casablanca',
    phone: '0522 31 06 54',
    type: 'Outdoor',
    courts: 4,
    rating: 4.5,
    avis: 47,
    price: 230,
    distanceKm: 6.2,
    periods: ['afternoon', 'evening'],
  },
  {
    id: 'atlas-bouskoura',
    name: 'Atlas Bouskoura Club',
    location: 'Bouskoura, Casablanca',
    address: 'Route de Bouskoura KM 15, Casablanca',
    phone: '0522 33 43 86',
    type: 'Indoor · Outdoor',
    courts: 6,
    rating: 4.8,
    avis: 85,
    price: 300,
    distanceKm: 11.0,
    periods: ['morning', 'afternoon', 'evening'],
  },
  {
    id: 'lissasfa',
    name: 'Service Club de Tennis Lissasfa',
    location: 'El Oulfa, Casablanca',
    address: 'Lot Haj Fateh, Rue 12 N°38, El Oulfa, Casablanca',
    phone: '0663 08 22 43',
    type: 'Outdoor',
    courts: 3,
    rating: 4.3,
    avis: 21,
    price: 200,
    distanceKm: 5.0,
    periods: ['morning', 'afternoon'],
  },
  {
    id: 'cafc-bp',
    name: 'ASC Banque Populaire',
    location: 'Hay Essalam, Casablanca',
    address: 'Rue Aïn Chifaa, Bd Ibnou Sina, Hay Essalam, Casablanca',
    phone: '0522 36 30 22',
    type: 'Outdoor',
    courts: 3,
    rating: 4.4,
    avis: 26,
    price: 210,
    distanceKm: 4.6,
    periods: ['evening'],
  },
  {
    id: 'csa-alamal',
    name: 'Complexe Sportif Al Amal',
    location: 'Ferme Bretonne, Casablanca',
    address: 'Cours des Sports, Ferme Bretonne, Casablanca',
    phone: '0522 23 41 36',
    type: 'Indoor',
    courts: 4,
    rating: 4.6,
    avis: 44,
    price: 260,
    distanceKm: 1.6,
    periods: ['morning', 'afternoon', 'evening'],
  },
  {
    id: 'ocbs',
    name: "Omnisport Club Ben M'Sik",
    location: "Ben M'Sik Sidi Othmane, Casablanca",
    address: "Av. Abderrahmane Sahraoui, Ben M'Sik Sidi Othmane, Casablanca",
    phone: '0522 38 46 76',
    type: 'Outdoor',
    courts: 3,
    rating: 4.2,
    avis: 18,
    price: 190,
    distanceKm: 8.3,
    periods: ['afternoon'],
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
