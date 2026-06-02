/**
 * Photos de padel (Pexels — libres, sans attribution requise) utilisées comme
 * visuels de clubs, par-dessus le dégradé de secours (cf. gradients.ts).
 * Si une image ne charge pas, on retombe automatiquement sur le dégradé + tracé.
 * À terme, ces URLs seront remplacées par les vraies photos des clubs (Supabase).
 */
const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`;

/** Grande photo pour le hero de la version PC. */
export const HERO_PHOTO =
  'https://images.pexels.com/photos/32474981/pexels-photo-32474981.jpeg?auto=compress&cs=tinysrgb&w=1600';

export const PADEL_PHOTOS = [
  px(32474981), // court intérieur bleu
  px(32897040), // court intérieur + raquette/balles
  px(33641987), // joueur sur court intérieur
  px(31559322), // joueuse avec raquette
  px(9390282), // raquette/balles bleues
  px(4536850), // raquette + balles sur court
];
