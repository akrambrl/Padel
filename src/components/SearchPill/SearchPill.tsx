import styles from './SearchPill.module.css';

type SearchPillProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

/**
 * Barre de recherche (style Anybuddy) : pilule gris clair avec un vrai champ
 * de saisie (loupe à gauche, icônes "localiser"/"favori" à droite).
 */
export function SearchPill({
  value,
  onChange,
  placeholder = 'Rechercher un club, une ville…',
}: SearchPillProps) {
  return (
    <div className={styles.search}>
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

      <input
        type="text"
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Rechercher un club"
      />

      {value ? (
        <button
          type="button"
          className={styles.clear}
          onClick={() => onChange('')}
          aria-label="Effacer"
        >
          ✕
        </button>
      ) : (
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
      )}
    </div>
  );
}
