import styles from './TopNav.module.css';

/** Barre de navigation du haut (version PC, façon Anybuddy). */
export function TopNav() {
  return (
    <header className={styles.nav}>
      <div className={styles.brand}>
        <span className={styles.mark} aria-hidden="true" />
        PADOK
      </div>

      <div className={styles.right}>
        <button className={styles.link}>🌐 FR</button>
        <button className={styles.link}>Devenir partenaire</button>
        <button className={styles.login}>
          <span aria-hidden="true">👤</span> Connexion
        </button>
        <button className={styles.burger} aria-label="Menu">
          ☰
        </button>
      </div>
    </header>
  );
}
