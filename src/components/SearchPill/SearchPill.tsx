import styles from './SearchPill.module.css';

type SearchPillProps = {
  location?: string;
  onClick?: () => void;
};

/**
 * Barre de recherche (style Anybuddy) : pilule gris clair, loupe + lieu à
 * gauche, icônes "localiser" et "favori" à droite.
 */
export function SearchPill({ location = 'Casablanca, Maârif', onClick }: SearchPillProps) {
  return (
    <button type="button" className={styles.search} onClick={onClick}>
      <svg
        className={styles.glass}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4-4" />
      </svg>
      <span className={styles.loc}>{location}</span>
      <span className={styles.icons}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 3 3 10.5l7 2.5 2.5 7L21 3Z" />
        </svg>
        <span className={styles.sep} />
        <span className={styles.heart}>♡</span>
      </span>
    </button>
  );
}
