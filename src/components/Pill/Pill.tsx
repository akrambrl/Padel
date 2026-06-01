import type { ReactNode } from 'react';
import styles from './Pill.module.css';

type PillProps = {
  children: ReactNode;
  /** Posé en surimpression sur une image (fond translucide flouté). */
  floating?: boolean;
};

/**
 * Petit badge en pilule. Ex : "📍 1.4 km" sur une photo de club.
 */
export function Pill({ children, floating = false }: PillProps) {
  return (
    <span className={`${styles.pill} ${floating ? styles.floating : ''}`}>
      {children}
    </span>
  );
}
