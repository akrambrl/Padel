import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Chip.module.css';

type Variant = 'accent' | 'ghost' | 'muted' | 'dark';

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

/**
 * Petite pilule cliquable (filtres, "Padel ▾", etc.).
 * accent = vert, ghost = blanc bordé, muted = gris clair, dark = noir.
 */
export function Chip({ variant = 'ghost', className = '', children, ...rest }: ChipProps) {
  return (
    <button className={`${styles.chip} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
