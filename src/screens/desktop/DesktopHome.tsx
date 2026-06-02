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

const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`;

const CITIES = [
  { name: 'Casablanca', grad: 'linear-gradient(135deg,#c9a36a,#6f5026)', img: px(19657040) },
  { name: 'Rabat', grad: 'linear-gradient(135deg,#6aa0c9,#2c4f6f)', img: px(12504063) },
  { name: 'Marrakech', grad: 'linear-gradient(135deg,#d98a5a,#9c3f24)', img: px(29824127) },
  { name: 'Tanger', grad: 'linear-gradient(135deg,#6ac9a0,#1c6f57)', img: px(13142301) },
  { name: 'Agadir', grad: 'linear-gradient(135deg,#d9c05a,#9c7a24)', img: px(30557503) },
  { name: 'Fès', grad: 'linear-gradient(135deg,#b06ac9,#5a2c6f)', img: px(30398385) },
];

const FEATURES = [
  {
    icon: '😎',
    title: 'Liberté totale',
    text: "Fini les adhésions annuelles. Vous réservez à l'heure, quand vous voulez.",
  },
  {
    icon: '💸',
    title: 'Les mêmes prix qu’au club',
    text: 'Les tarifs affichés sont ceux pratiqués directement par les clubs.',
  },
  {
    icon: '✅',
    title: 'Confirmation par le club',
    text: 'Le club valide votre demande ; paiement sur place (paiement en ligne bientôt).',
  },
];

const STEPS = [
  {
    n: 1,
    title: 'Choisissez votre ville et votre créneau',
    text: "Indiquez votre ville. Les clubs et les créneaux disponibles s'affichent.",
  },
  {
    n: 2,
    title: 'Envoyez votre demande',
    text: 'Sélectionnez un créneau et envoyez votre demande de réservation au club.',
  },
  {
    n: 3,
    title: 'Jouez !',
    text: "Le club confirme, vous recevez les infos d'accès. Paiement sur place.",
  },
];

/** Accueil version PC (façon Anybuddy) : hero + grille de clubs + sections landing. */
export function DesktopHome({ onOpenClub }: DesktopHomeProps) {
  const f = useClubFilters();
  const [whenOpen, setWhenOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const scrollToGrid = () =>
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const pickCity = (city: string) => {
    f.setQuery(city);
    scrollToGrid();
  };

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
            {f.results.length} club{f.results.length > 1 ? 's' : ''} de padel
            {f.query.trim() ? ` · « ${f.query.trim()} »` : ' à Casablanca'}
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
                ? `Aucun club trouvé pour « ${f.query.trim()} » — on démarre à Casablanca !`
                : 'Aucun club ne correspond à ces filtres.'}
            </p>
          </div>
        )}
      </section>

      {/* OÙ JOUER — VILLES */}
      <section className={styles.cities}>
        <h2 className={styles.secTitle}>Où jouer au padel ?</h2>
        <p className={styles.secSub}>Trouvez un terrain de padel dans votre ville</p>
        <div className={styles.popular}>🔥 Villes populaires</div>
        <div className={styles.cityGrid}>
          {CITIES.map((c) => (
            <button
              key={c.name}
              className={styles.city}
              style={{ background: c.grad }}
              onClick={() => pickCity(c.name)}
            >
              <img
                className={styles.cityImg}
                src={c.img}
                alt={c.name}
                loading="lazy"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <span className={styles.cityVeil} />
              <span className={styles.cityName}>
                <span className={styles.pin} /> {c.name}
              </span>
            </button>
          ))}
        </div>

        <div className={styles.nearBox}>
          <h3>📍 Trouvez un terrain près de chez vous</h3>
          <p>Recherchez votre ville ou un club</p>
          <div className={styles.nearBar}>
            <span className={styles.nearIcon}>🔍</span>
            <input
              className={styles.nearInput}
              value={f.query}
              placeholder="Ville, quartier, club…"
              onChange={(e) => f.setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && scrollToGrid()}
            />
            <button
              className={styles.nearBtn}
              onClick={() => {
                f.setQuery('');
                scrollToGrid();
              }}
            >
              ➤ Près de moi
            </button>
          </div>
        </div>
      </section>

      {/* POURQUOI RÉSERVER */}
      <section className={styles.why}>
        <h2 className={styles.secTitle}>Pourquoi réserver sur Padok ?</h2>
        <div className={styles.whyGrid}>
          {FEATURES.map((feat) => (
            <div key={feat.title} className={styles.whyCard}>
              <div className={styles.whyIcon}>{feat.icon}</div>
              <h3>{feat.title}</h3>
              <p>{feat.text}</p>
            </div>
          ))}
        </div>
        <div className={styles.badges}>
          <span>🔒 Sans abonnement</span>
          <span>🔄 Disponibilités à jour</span>
          <span>💬 Support réactif</span>
        </div>
      </section>

      {/* COMMENT RÉSERVER */}
      <section className={styles.how}>
        <h2 className={styles.secTitle}>Comment réserver un terrain de padel ?</h2>
        <p className={styles.secSub}>Réservez en quelques clics, sans abonnement</p>
        <div className={styles.steps}>
          {STEPS.map((s) => (
            <div key={s.n} className={styles.step}>
              <span className={styles.stepNum}>{s.n}</span>
              <div>
                <b>{s.title}</b>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.fBrand}>
          <span className={styles.fMark} /> PADOK
        </div>
        <p>Padel au Maroc · Casablanca · Phase 1 — annuaire & demande de réservation</p>
      </footer>
    </div>
  );
}
