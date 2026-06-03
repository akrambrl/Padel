/**
 * Données fictives pour l'ESPACE PRO (back-office club) — démo.
 * À remplacer par Supabase (table bookings partagée, source 'club' | 'app').
 */

export type Source = 'app' | 'club';

export type Booking = {
  id: string;
  /** Index du terrain (0 = Terrain 1). */
  court: number;
  /** Heure de début en décimal (9.5 = 9h30). */
  start: number;
  /** Durée en heures (1.5 = 1h30). */
  duration: number;
  client: string;
  source: Source;
  /** Prix du créneau en DH. */
  price: number;
  /** Encaissé ? */
  paid: boolean;
};

export type PendingBooking = Booking & { tel: string };

export const CLUB_NAME = 'Casa Padel Club';

export const COURTS = [
  'Terrain 1',
  'Terrain 2',
  'Terrain 3',
  'Terrain 4',
  'Terrain 5',
  'Terrain 6',
];

/** Plage horaire de l'agenda. */
export const OPEN_HOUR = 8;
export const CLOSE_HOUR = 23;

/** Réservations confirmées du jour (mélange app + club/téléphone). */
export const AGENDA: Booking[] = [
  { id: 'b1', court: 0, start: 9, duration: 1.5, client: 'Yassine B.', source: 'club', price: 280, paid: true },
  { id: 'b2', court: 0, start: 18, duration: 1.5, client: 'Réda M.', source: 'app', price: 320, paid: false },
  { id: 'b3', court: 1, start: 10.5, duration: 1.5, client: 'Salma K.', source: 'club', price: 280, paid: true },
  { id: 'b4', court: 1, start: 20, duration: 1.5, client: 'Anas L.', source: 'app', price: 320, paid: false },
  { id: 'b5', court: 2, start: 12, duration: 1.5, client: 'Walid T.', source: 'club', price: 280, paid: true },
  { id: 'b6', court: 2, start: 19.5, duration: 1.5, client: 'Imane R.', source: 'app', price: 320, paid: false },
  { id: 'b7', court: 3, start: 17, duration: 1.5, client: 'Omar F.', source: 'app', price: 320, paid: true },
  { id: 'b8', court: 4, start: 11, duration: 1.5, client: 'Hamza D.', source: 'club', price: 280, paid: false },
  { id: 'b9', court: 4, start: 21, duration: 1.5, client: 'Sara N.', source: 'app', price: 320, paid: false },
  { id: 'b10', court: 5, start: 18.5, duration: 1.5, client: 'Mehdi A.', source: 'club', price: 320, paid: true },
];

/** Demandes de réservation reçues via l'app (statut "en attente"). */
export const PENDING: PendingBooking[] = [
  { id: 'p1', court: 2, start: 17, duration: 1.5, client: 'Sofia E.', source: 'app', price: 320, paid: false, tel: '06 12 34 56 78' },
  { id: 'p2', court: 0, start: 20, duration: 1.5, client: 'Karim Z.', source: 'app', price: 320, paid: false, tel: '06 98 76 54 32' },
  { id: 'p3', court: 3, start: 19.5, duration: 1.5, client: 'Yasmine O.', source: 'app', price: 320, paid: false, tel: '07 11 22 33 44' },
];

/** Formate une heure décimale : 9.5 -> "9h30". */
export function fmtHour(h: number) {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  return mm === 0 ? `${hh}h` : `${hh}h${String(mm).padStart(2, '0')}`;
}
