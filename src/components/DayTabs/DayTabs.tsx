import styles from './DayTabs.module.css';

type DayTabsProps = {
  days: string[];
  activeIndex: number;
  onChange: (index: number) => void;
};

/**
 * Onglets de jour (Aujourd'hui / Demain / …). L'actif passe en fond ink.
 */
export function DayTabs({ days, activeIndex, onChange }: DayTabsProps) {
  return (
    <div className={styles.daytabs}>
      {days.map((d, i) => (
        <button
          key={d}
          type="button"
          className={`${styles.daytab} ${i === activeIndex ? styles.on : ''}`}
          onClick={() => onChange(i)}
        >
          {d}
        </button>
      ))}
    </div>
  );
}
