import type { ReactNode } from 'react';
import styles from './PhoneFrame.module.css';

type PhoneFrameProps = {
  children: ReactNode;
};

/**
 * Cadre "téléphone" mobile-first (max 440px) centré sur fond gris.
 * Tout l'écran de l'app vit à l'intérieur.
 */
export function PhoneFrame({ children }: PhoneFrameProps) {
  return <div className={styles.phone}>{children}</div>;
}
