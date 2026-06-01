import styles from './TopBar.module.css';

type TopBarProps = {
  /** Action à droite (menu, etc.). */
  onMenu?: () => void;
};

/**
 * Barre supérieure sticky : marque "pad·ok" (le "ok" en accent) + bouton rond.
 */
export function TopBar({ onMenu }: TopBarProps) {
  return (
    <header className={styles.topbar}>
      <div className={styles.brand}>
        pad<b>ok</b>
      </div>
      <button type="button" className={styles.ic} onClick={onMenu} aria-label="Menu">
        ☰
      </button>
    </header>
  );
}
