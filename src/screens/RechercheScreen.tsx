import { useState } from 'react';
import { SearchPill, DayStrip, ClubCard, Chip, COURT_GRADIENTS } from '../components';
import { CLUBS, DEMO_DAYS, type Club } from '../data/clubs';
import { PADEL_PHOTOS } from '../data/photos';
import { useClubFilters, WHEN_OPTIONS } from '../hooks/useClubFilters';
import styles from './RechercheScreen.module.css';

type RechercheScreenProps = {
  onOpenClub: (club: Club) => void;
};

/** Écran d'accueil "Recherche" (mobile) : entête + recherche + filtres + liste. */
export function RechercheScreen({ onOpenClub }: RechercheScreenProps) {
  const [day, setDay] = useState(0);
  const [whenOpen, setWhenOpen] = useState(false);
  const f = useClubFilters();

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <h1 className={styles.greeting}>Let&apos;s go Akram&nbsp;! 🔥</h1>
      </header>

      <div className={styles.searchCard}>
        <SearchPill value={f.query} onChange={f.setQuery} />
        <div className={styles.days}>
          <DayStrip days={DEMO_DAYS} activeIndex={day} onChange={setDay} tone="light" />
        </div>

        <div className={`${styles.filters} no-scrollbar`}>
          <div className={styles.whenWrap}>
            <Chip
              variant={f.when === 'all' ? 'ghost' : 'accent'}
              onClick={() => setWhenOpen((o) => !o)}
            >
              🕐 {f.whenLabel} ▾
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
                      className={`${styles.menuItem} ${o.id === f.when ? styles.menuOn : ''}`}
                      onClick={() => {
                        f.setWhen(o.id);
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

          <Chip variant={f.indoor ? 'accent' : 'muted'} onClick={() => f.setIndoor((v) => !v)}>
            int.
          </Chip>
          <Chip variant={f.outdoor ? 'accent' : 'muted'} onClick={() => f.setOutdoor((v) => !v)}>
            ext.
          </Chip>
        </div>
      </div>

      <div className={styles.list}>
        {f.results.length > 0 ? (
          f.results.map((club, i) => {
            const idx = CLUBS.indexOf(club);
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
              {f.query.trim()
                ? `Aucun club trouvé pour « ${f.query.trim()} »`
                : 'Aucun club ne correspond à ces filtres.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
