import { useMemo, useState } from 'react';
import { SearchPill, DayStrip, ClubCard, Chip, COURT_GRADIENTS } from '../components';
import { CLUBS, DEMO_DAYS, type Club, type Period } from '../data/clubs';
import { PADEL_PHOTOS } from '../data/photos';
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

const WHEN_OPTIONS: { id: 'all' | Period; label: string }[] = [
  { id: 'all', label: 'Peu importe' },
  { id: 'morning', label: 'Matin' },
  { id: 'afternoon', label: 'Après-midi' },
  { id: 'evening', label: 'Soir' },
];

/** Écran d'accueil "Recherche" : entête + recherche + filtres + liste des clubs. */
export function RechercheScreen({ onOpenClub }: RechercheScreenProps) {
  const [day, setDay] = useState(0);
  const [query, setQuery] = useState('');
  const [when, setWhen] = useState<'all' | Period>('all');
  const [whenOpen, setWhenOpen] = useState(false);
  const [indoor, setIndoor] = useState(false);
  const [outdoor, setOutdoor] = useState(false);

  const whenLabel =
    when === 'all' ? 'Quand' : (WHEN_OPTIONS.find((o) => o.id === when)?.label ?? 'Quand');

  const results = useMemo(() => {
    const q = norm(query.trim());
    return CLUBS.filter((c) => {
      if (q && !norm(`${c.name} ${c.location} ${c.type}`).includes(q)) return false;
      if (when !== 'all' && !c.periods.includes(when)) return false;
      if (indoor && !outdoor && !/indoor/i.test(c.type)) return false;
      if (outdoor && !indoor && !/outdoor/i.test(c.type)) return false;
      return true;
    });
  }, [query, when, indoor, outdoor]);

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
          <div className={styles.whenWrap}>
            <Chip
              variant={when === 'all' ? 'ghost' : 'accent'}
              onClick={() => setWhenOpen((o) => !o)}
            >
              🕐 {whenLabel} ▾
            </Chip>
            {whenOpen && (
              <>
                <button
                  className={styles.backdrop}
                  aria-label="Fermer"
                  onClick={() => setWhenOpen(false)}
                />
                <div className={styles.menu}>
                  {WHEN_OPTIONS.map((o) => (
                    <button
                      key={o.id}
                      className={`${styles.menuItem} ${o.id === when ? styles.menuOn : ''}`}
                      onClick={() => {
                        setWhen(o.id);
                        setWhenOpen(false);
                      }}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <Chip variant={indoor ? 'accent' : 'muted'} onClick={() => setIndoor((v) => !v)}>
            int.
          </Chip>
          <Chip variant={outdoor ? 'accent' : 'muted'} onClick={() => setOutdoor((v) => !v)}>
            ext.
          </Chip>
        </div>
      </div>

      <div className={styles.list}>
        {results.length > 0 ? (
          results.map((club, i) => {
            const idx = CLUBS.indexOf(club); // index stable (photo fixe par club)
            return (
              <ClubCard
                key={club.id}
                club={club}
                gradient={COURT_GRADIENTS[idx % COURT_GRADIENTS.length]}
                photo={PADEL_PHOTOS[idx % PADEL_PHOTOS.length]}
                delay={i * 65}
                onClick={onOpenClub}
              />
            );
          })
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🔍</div>
            <p>
              {query.trim()
                ? `Aucun club trouvé pour « ${query.trim()} »`
                : 'Aucun club ne correspond à ces filtres.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
