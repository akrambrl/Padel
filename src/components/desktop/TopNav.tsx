import styles from './TopNav.module.css';

type TopNavProps = {
  /** Aller vers l'espace pro (clubs). */
  onPro?: () => void;
};

/** Barre de navigation du haut (version PC, façon Anybuddy). */
export function TopNav({ onPro }: TopNavProps) {
  return (
    <header className={styles.nav}>
      <div className={styles.brand}>
        <span className={styles.mark} aria-hidden="true" />
        PADOK
      </div>

      <div className={styles.right}>
        <button className={styles.link}>🌐 FR</button>
        <button className={styles.link} onClick={onPro}>
          Devenir partenaire
        </button>
        <button className={styles.login}>
          <span aria-hidden="true">👤</span> Connexion
        </button>
        <button className={styles.burger} aria-label="Menu" onClick={onPro}>
          ☰
        </button>
      </div>
    </header>
  );
}
