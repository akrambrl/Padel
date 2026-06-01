import { CourtGraphic } from '../CourtGraphic/CourtGraphic';
import { Heart } from '../Heart/Heart';
import { Pill } from '../Pill/Pill';
import type { Club } from '../../data/clubs';
import styles from './ClubCard.module.css';

type ClubCardProps = {
  club: Club;
  gradient: string;
  /** Délai d'apparition (ms) pour l'animation en cascade de la liste. */
  delay?: number;
  onClick?: (club: Club) => void;
};

/**
 * Carte club "photo-forward" : grand visuel arrondi, puis infos minimales
 * (nom + note, lieu, type · terrains, prix en gras). Séparateur filet sous la carte.
 */
export function ClubCard({ club, gradient, delay = 0, onClick }: ClubCardProps) {
  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => onClick?.(club)}
    >
      <div className={styles.photo} style={{ background: gradient }}>
        <CourtGraphic />
        <div className={styles.pill}>
          <Pill floating>📍 {club.distanceKm} km</Pill>
        </div>
        <div className={styles.heart}>
          <Heart />
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.l1}>
          <h3>{club.name}</h3>
          <div className={styles.rate}>
            <span className={styles.st}>★</span> {club.rating}
          </div>
        </div>
        <div className={styles.loc}>{club.location}</div>
        <div className={styles.ty}>
          {club.type} · {club.courts} terrains
        </div>
        <div className={styles.pr}>
          <b>{club.price} DH</b> <span>/ 1h30</span>
        </div>
      </div>
    </article>
  );
}
