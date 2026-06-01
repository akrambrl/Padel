import type { Category } from '../../data/navigation';
import styles from './CategoryBar.module.css';

type CategoryBarProps = {
  categories: Category[];
  activeId: string;
  onChange: (id: string) => void;
};

/**
 * Barre de catégories horizontale (scroll). L'item actif est souligné (filet ink).
 */
export function CategoryBar({ categories, activeId, onChange }: CategoryBarProps) {
  return (
    <div className={`${styles.cats} no-scrollbar`}>
      {categories.map((c) => (
        <button
          key={c.id}
          type="button"
          className={`${styles.cat} ${c.id === activeId ? styles.on : ''}`}
          onClick={() => onChange(c.id)}
        >
          <span className={styles.ic}>{c.icon}</span>
          {c.label}
        </button>
      ))}
    </div>
  );
}
