import styles from './LevelBadge.module.css';

type LevelBadgeProps = {
  level: string;
};

/** Petit badge de niveau (vert) posé sous un avatar joueur. */
export function LevelBadge({ level }: LevelBadgeProps) {
  return <span className={styles.badge}>{level}</span>;
}
