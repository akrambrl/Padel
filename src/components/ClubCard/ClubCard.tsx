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
 * Carte club immersive (style Anybuddy) : grande photo de court, infos
 * superposées en bas (nom, note, type), prix en vert. Distance + favori en haut.
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
        <div className={styles.top}>
          <Pill floating>📍 {club.distanceKm} km</Pill>
          <Heart />
        </div>

        <div className={styles.overlay}>
          <h3>{club.name}</h3>
          <div className={styles.sub}>
            {club.location} · {club.type}
          </div>
          <div className={styles.row}>
            <span className={styles.rate}>
              <i className={styles.star}>★</i> {club.rating}
            </span>
            <span className={styles.price}>
              <b>{club.price} DH</b> / 1h30
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
