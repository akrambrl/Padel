import styles from './UnderlineTabs.module.css';

type UnderlineTabsProps = {
  tabs: string[];
  activeIndex: number;
  onChange: (index: number) => void;
};

/** Onglets soulignés (style Anybuddy profil) : actif en noir + barre sous le texte. */
export function UnderlineTabs({ tabs, activeIndex, onChange }: UnderlineTabsProps) {
  return (
    <div className={styles.tabs}>
      {tabs.map((t, i) => (
        <button
          key={t}
          type="button"
          className={`${styles.tab} ${i === activeIndex ? styles.on : ''}`}
          onClick={() => onChange(i)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
