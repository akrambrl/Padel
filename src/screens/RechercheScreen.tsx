import { useMemo, useState } from 'react';
import { SearchPill, DayStrip, ClubCard, Chip, COURT_GRADIENTS } from '../components';
import { CLUBS, DEMO_DAYS, type Club } from '../data/clubs';
import styles from './RechercheScreen.module.css';

type RechercheScreenProps = {
  onOpenClub: (club: Club) => void;
};

/** Normalise une chaîne pour comparer sans tenir compte des accents/majuscules. */
function norm(s: string) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

/** Écran d'accueil "Recherche" : entête + recherche + filtres + liste des clubs. */
export function RechercheScreen({ onOpenClub }: RechercheScreenProps) {
  const [day, setDay] = useState(0);
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = norm(query.trim());
    if (!q) return CLUBS;
    return CLUBS.filter((c) => norm(`${c.name} ${c.location} ${c.type}`).includes(q));
  }, [query]);

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <div className={styles.stats}>
          <span className={styles.stat}>
            ⚡ <b>6</b>
          </span>
          <span className={styles.stat}>
            🏆 <b>0</b>
          </span>
        </div>
        <h1 className={styles.greeting}>Let&apos;s go Akram&nbsp;! 🔥</h1>
      </header>

      <div className={styles.searchCard}>
        <SearchPill value={query} onChange={setQuery} />
        <div className={styles.days}>
          <DayStrip days={DEMO_DAYS} activeIndex={day} onChange={setDay} tone="light" />
        </div>
        <div className={`${styles.filters} no-scrollbar`}>
          <Chip variant="accent">Padel ▾</Chip>
          <Chip variant="ghost">🕐 Quand ▾</Chip>
          <Chip variant="muted">int.</Chip>
          <Chip variant="muted">ext.</Chip>
          <Chip variant="ghost">⚙︎</Chip>
        </div>
      </div>

      <div className={styles.list}>
        {results.length > 0 ? (
          results.map((club, i) => (
            <ClubCard
              key={club.id}
              club={club}
              gradient={COURT_GRADIENTS[i % COURT_GRADIENTS.length]}
              delay={i * 65}
              onClick={onOpenClub}
            />
          ))
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🔍</div>
            <p>Aucun club trouvé pour «&nbsp;{query.trim()}&nbsp;»</p>
          </div>
        )}
      </div>
    </div>
  );
}
