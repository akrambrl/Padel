import { useState } from 'react';
import styles from './Heart.module.css';

type HeartProps = {
  /** Contrôlé : état favori. Si omis, le composant gère son propre état. */
  active?: boolean;
  onChange?: (active: boolean) => void;
  /** 'plain' : cœur posé sur l'image. 'round' : bouton blanc flottant (fiche). */
  variant?: 'plain' | 'round';
};

/**
 * Bouton favori ♡ / ♥. L'état actif passe en couleur accent.
 */
export function Heart({ active, onChange, variant = 'plain' }: HeartProps) {
  const [internal, setInternal] = useState(false);
  const isControlled = active !== undefined;
  const on = isControlled ? active : internal;

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !on;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      className={`${styles.heart} ${styles[variant]} ${on ? styles.on : ''}`}
      onClick={toggle}
    >
      {on ? '♥' : '♡'}
    </button>
  );
}
