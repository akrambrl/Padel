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
      {categories.map((c) => {
        const active = c.id === activeId;
        return (
          <button
            key={c.id}
            type="button"
            className={`${styles.cat} ${active ? styles.on : ''}`}
            onClick={() => onChange(c.id)}
          >
            <span
              className={styles.ic}
              style={{ background: active ? 'rgba(0,0,0,.12)' : `${c.color}33` }}
            >
              {c.icon}
            </span>
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
