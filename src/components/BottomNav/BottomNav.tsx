import { DEFAULT_TABS, type NavTab } from '../../data/navigation';
import styles from './BottomNav.module.css';

type BottomNavProps = {
  tabs?: NavTab[];
  activeId: string;
  onChange: (id: string) => void;
};

/**
 * Barre de navigation du bas (4 onglets). L'onglet actif passe en couleur accent.
 */
export function BottomNav({ tabs = DEFAULT_TABS, activeId, onChange }: BottomNavProps) {
  return (
    <nav className={styles.nav}>
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          className={t.id === activeId ? styles.on : ''}
          onClick={() => onChange(t.id)}
        >
          <span className={styles.ic}>{t.icon}</span>
          {t.label}
        </button>
      ))}
    </nav>
  );
}
