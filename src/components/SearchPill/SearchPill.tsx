import styles from './SearchPill.module.css';

type SearchPillProps = {
  title?: string;
  subtitle?: string;
  onClick?: () => void;
};

/**
 * Barre de recherche en pilule (loupe + intitulé + sous-texte).
 * Sert de point d'entrée vers l'écran de recherche.
 */
export function SearchPill({
  title = 'Rechercher un club',
  subtitle = 'Casablanca · ce soir · 4 joueurs',
  onClick,
}: SearchPillProps) {
  return (
    <button type="button" className={styles.search} onClick={onClick}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4-4" />
      </svg>
      <span className={styles.text}>
        <b>{title}</b>
        <small>{subtitle}</small>
      </span>
    </button>
  );
}
