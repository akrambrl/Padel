import { PlayerAvatar } from '../PlayerAvatar/PlayerAvatar';
import { Button } from '../Button/Button';
import type { Match } from '../../data/matches';
import styles from './MatchCard.module.css';

type MatchCardProps = {
  match: Match;
  /** Libellé du bouton d'action (ex : "Voir"). Si absent, pas de pied de carte club. */
  action?: string;
  onAction?: (match: Match) => void;
};

/**
 * Carte de match (style Anybuddy) : entête (date, heure, niveau), rangée de
 * joueurs 2 contre 2 (avatars + VS), et pied optionnel (club + bouton / "Réservé").
 */
export function MatchCard({ match, action, onAction }: MatchCardProps) {
  const [a, b, c, d] = match.players;

  return (
    <article className={styles.card}>
      <div className={styles.head}>
        <span className={styles.racket}>🎾</span>
        <b className={styles.date}>{match.date}</b>
        <span className={styles.time}>🕐 {match.time}</span>
        <span className={styles.level}>
          {match.levelRange}
          {match.levelNote && <small>{match.levelNote}</small>}
        </span>
      </div>

      <div className={styles.players}>
        {a && <PlayerAvatar player={a} />}
        {b && <PlayerAvatar player={b} />}
        <span className={styles.vs}>VS</span>
        {c && <PlayerAvatar player={c} />}
        {d && <PlayerAvatar player={d} />}
      </div>

      {(match.club || match.status || action) && (
        <div className={styles.foot}>
          {match.club ? (
            <span className={styles.club}>
              <span className={styles.court}>🟨</span>
              <span>
                <b>{match.club}</b>
                {match.location && <small> · {match.location}</small>}
              </span>
            </span>
          ) : match.status === 'reserve' ? (
            <span className={styles.tag}>✓ Réservé</span>
          ) : (
            <span />
          )}
          {action && (
            <Button onClick={() => onAction?.(match)} className={styles.action}>
              {action}
            </Button>
          )}
        </div>
      )}
    </article>
  );
}
