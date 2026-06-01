import { CourtGraphic } from '../CourtGraphic/CourtGraphic';
import { Heart } from '../Heart/Heart';
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
 * Carte club (style Anybuddy) : grande photo de court, nom + note superposés
 * en haut, cœur en rond blanc, et un bandeau d'info en bas (créneaux / prix).
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
          <div className={styles.head}>
            <h3>{club.name}</h3>
            <div className={styles.rate}>
              <i className={styles.star}>★</i> {club.rating}{' '}
              <span className={styles.avis}>({club.avis} avis)</span>
              <span className={styles.dist}>↗ {club.distanceKm} km</span>
            </div>
          </div>
          <Heart variant="round" />
        </div>

        <div className={styles.strip}>
          <span>
            Dispo aujourd’hui · dès <b>{club.price} DH</b>
          </span>
          <span className={styles.chev}>›</span>
        </div>
      </div>
    </article>
  );
}
