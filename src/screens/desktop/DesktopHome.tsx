import { useRef, useState } from 'react';
import { ClubCard, Chip, COURT_GRADIENTS } from '../../components';
import { TopNav } from '../../components/desktop/TopNav';
import { CLUBS, type Club } from '../../data/clubs';
import { PADEL_PHOTOS, HERO_PHOTO } from '../../data/photos';
import { useClubFilters, WHEN_OPTIONS } from '../../hooks/useClubFilters';
import styles from './DesktopHome.module.css';

type DesktopHomeProps = {
  onOpenClub: (club: Club) => void;
};

/** Accueil version PC (façon Anybuddy) : entête + hero + grille de clubs. */
export function DesktopHome({ onOpenClub }: DesktopHomeProps) {
  const f = useClubFilters();
  const [whenOpen, setWhenOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const scrollToGrid = () =>
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className={styles.page}>
      <TopNav />

      {/* HERO */}
      <section className={styles.hero}>
        <img className={styles.heroImg} src={HERO_PHOTO} alt="" />
        <div className={styles.heroVeil} />
        <div className={styles.heroInner}>
          <h1 className={styles.title}>
            Réserve un terrain
            <br />
            <span className={styles.accent}>maintenant !</span>
          </h1>

          <div className={styles.searchBar}>
            <div className={styles.sbField}>
              <span className={styles.sbIcon}>📍</span>
              <div className={styles.sbCol}>
                <span className={styles.sbLabel}>Où jouer</span>
                <input
                  className={styles.sbInput}
                  value={f.query}
                  placeholder="Rechercher une ville, un club…"
                  onChange={(e) => f.setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && scrollToGrid()}
                />
              </div>
            </div>
            <div className={styles.sbDivider} />
            <div className={styles.sbField}>
              <span className={styles.sbIcon}>🗓️</span>
              <div className={styles.sbCol}>
                <span className={styles.sbLabel}>Quand</span>
                <span className={styles.sbValue}>Lun. 1 Juin</span>
              </div>
            </div>
            <button className={styles.sbBtn} onClick={scrollToGrid} aria-label="Rechercher">
              🔍
            </button>
          </div>

          <div className={styles.stats}>
            <span>
              <b>★ 4.8</b> · Avis joueurs
            </span>
            <span>
              <b>+1 000</b> joueurs
            </span>
            <span>
              <b>{CLUBS.length}</b> clubs à Casablanca
            </span>
          </div>
          <p className={styles.tagline}>
            Accède aux meilleurs terrains de padel du Maroc, en intérieur ou extérieur —
            sans licence ni abonnement.
          </p>
        </div>
      </section>

      {/* GRILLE DE CLUBS */}
      <section className={styles.listing} ref={gridRef}>
        <div className={styles.listHead}>
          <h2>
            {f.results.length} club{f.results.length > 1 ? 's' : ''} de padel à Casablanca
          </h2>

          <div className={styles.filters}>
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
              Intérieur
            </Chip>
            <Chip variant={f.outdoor ? 'accent' : 'muted'} onClick={() => f.setOutdoor((v) => !v)}>
              Extérieur
            </Chip>
          </div>
        </div>

        {f.results.length > 0 ? (
          <div className={styles.grid}>
            {f.results.map((club, i) => {
              const idx = CLUBS.indexOf(club);
              return (
                <ClubCard
                  key={club.id}
                  club={club}
                  gradient={COURT_GRADIENTS[idx % COURT_GRADIENTS.length]}
                  photo={PADEL_PHOTOS[idx % PADEL_PHOTOS.length]}
                  delay={i * 50}
                  onClick={onOpenClub}
                />
              );
            })}
          </div>
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
      </section>
    </div>
  );
}
