import { LevelBadge } from '../LevelBadge/LevelBadge';
import type { Player } from '../../data/matches';
import styles from './PlayerAvatar.module.css';

type PlayerAvatarProps = {
  player: Player;
};

/**
 * Avatar joueur rond (style Anybuddy) :
 * - me : cercle vert ; photo : cercle coloré ; ghost : gris ; empty : place libre (＋).
 * Le niveau s'affiche en badge sous l'avatar.
 */
export function PlayerAvatar({ player }: PlayerAvatarProps) {
  const { kind, level, color } = player;

  return (
    <div className={styles.wrap}>
      <div
        className={`${styles.av} ${styles[kind]}`}
        style={color && kind === 'photo' ? { background: color } : undefined}
      >
        {kind === 'empty' ? <span className={styles.plus}>＋</span> : <span className={styles.face}>🙂</span>}
      </div>
      {level && (
        <div className={styles.lvl}>
          <LevelBadge level={level} />
        </div>
      )}
    </div>
  );
}
