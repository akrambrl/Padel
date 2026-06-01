import styles from './DayStrip.module.css';

export type Day = { dow: string; day: number };

type DayStripProps = {
  days: Day[];
  activeIndex: number;
  onChange: (index: number) => void;
  /** 'light' : sur panneau blanc. 'dark' : sur carte noire. */
  tone?: 'light' | 'dark';
};

/**
 * Sélecteur de jours horizontal (style Anybuddy) : jour abrégé + numéro.
 * Jour actif = pastille verte arrondie, texte foncé.
 */
export function DayStrip({ days, activeIndex, onChange, tone = 'light' }: DayStripProps) {
  return (
    <div className={`${styles.strip} ${styles[tone]} no-scrollbar`}>
      {days.map((d, i) => (
        <button
          key={`${d.dow}-${d.day}`}
          type="button"
          className={`${styles.day} ${i === activeIndex ? styles.on : ''}`}
          onClick={() => onChange(i)}
        >
          <span className={styles.dow}>{d.dow}</span>
          <span className={styles.num}>{d.day}</span>
        </button>
      ))}
    </div>
  );
}
