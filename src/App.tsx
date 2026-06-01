import { useState } from 'react';
import {
  PhoneFrame,
  SearchPill,
  DayStrip,
  ClubCard,
  BottomNav,
  SlotGrid,
  Button,
  Heart,
  Toast,
  useToast,
  DEFAULT_TABS,
  COURT_GRADIENTS,
} from './components';
import { CourtGraphic } from './components/CourtGraphic/CourtGraphic';
import { CLUBS, DEMO_DAYS, DEMO_SLOTS, type Club } from './data/clubs';
import styles from './App.module.css';

/**
 * Vitrine du design system PADOK (style Anybuddy réel) :
 * - Accueil "Recherche" : entête sombre + carte de recherche blanche
 *   (lieu, jours, filtres) + cartes club photo, nav blanche.
 * - Fiche club "Réserver" : feuille blanche, calendrier sur carte noire,
 *   créneaux blancs (vert = sélectionné).
 * Données fictives — base des vrais écrans connectés à Supabase (Phase 1).
 */
export default function App() {
  const [tab, setTab] = useState('recherche');
  const [day, setDay] = useState(0);
  const [openClub, setOpenClub] = useState<Club | null>(null);
  const [detailDay, setDetailDay] = useState(1);
  const [slot, setSlot] = useState<string | null>(null);
  const { toast, props: toastProps } = useToast();

  const openIndex = openClub ? CLUBS.findIndex((c) => c.id === openClub.id) : 0;
  const heroGradient = COURT_GRADIENTS[openIndex % COURT_GRADIENTS.length];

  function open(club: Club) {
    setOpenClub(club);
    setSlot(null);
    setDetailDay(1);
  }

  function book() {
    if (!slot) return;
    toast(`Demande envoyée pour ${slot} — le club confirme.`);
    setOpenClub(null);
  }

  return (
    <PhoneFrame>
      {/* ----- Entête sombre : stats + accroche ----- */}
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

      {/* ----- Carte de recherche blanche : lieu + jours + filtres ----- */}
      <div className={styles.searchCard}>
        <SearchPill />
        <div className={styles.days}>
          <DayStrip days={DEMO_DAYS} activeIndex={day} onChange={setDay} tone="light" />
        </div>
        <div className={`${styles.filters} no-scrollbar`}>
          <button className={`${styles.chip} ${styles.chipAccent}`}>Padel ▾</button>
          <button className={`${styles.chip} ${styles.chipGhost}`}>🕐 Quand ▾</button>
          <button className={`${styles.chip} ${styles.chipMuted}`}>int.</button>
          <button className={`${styles.chip} ${styles.chipMuted}`}>ext.</button>
          <button className={`${styles.chip} ${styles.chipIcon}`}>⚙︎</button>
        </div>
      </div>

      {/* ----- Liste des clubs ----- */}
      <div className={styles.list}>
        {CLUBS.map((club, i) => (
          <ClubCard
            key={club.id}
            club={club}
            gradient={COURT_GRADIENTS[i % COURT_GRADIENTS.length]}
            delay={i * 65}
            onClick={open}
          />
        ))}
      </div>

      <BottomNav tabs={DEFAULT_TABS} activeId={tab} onChange={setTab} />

      {/* ----- Fiche club "Réserver" (feuille qui glisse) ----- */}
      <section className={`${styles.detail} ${openClub ? styles.show : ''}`}>
        {openClub && (
          <>
            <div className={styles.dhero} style={{ background: heroGradient }}>
              <CourtGraphic />
              <button
                type="button"
                className={styles.dicon}
                onClick={() => setOpenClub(null)}
                aria-label="Fermer"
              >
                ✕
              </button>
              <div className={styles.dheart}>
                <Heart variant="round" />
              </div>
            </div>

            <div className={styles.sheet}>
              <h2>{openClub.name}</h2>
              <div className={styles.sub}>{openClub.location}</div>

              {/* Onglets Réserver / Infos club */}
              <div className={styles.seg}>
                <button className={`${styles.segBtn} ${styles.segOn}`}>📅 Réserver</button>
                <button className={styles.segBtn}>Infos club</button>
              </div>

              <button className={`${styles.chip} ${styles.chipAccent} ${styles.padelPill}`}>
                Padel ▾
              </button>

              {/* Calendrier + créneaux sur carte noire */}
              <div className={styles.calCard}>
                <DayStrip
                  days={DEMO_DAYS.slice(1)}
                  activeIndex={detailDay - 1}
                  onChange={(i) => setDetailDay(i + 1)}
                  tone="dark"
                />
                <div className={styles.calLine} />
                <SlotGrid slots={DEMO_SLOTS} selected={slot} onSelect={setSlot} />
              </div>

              <div className={styles.secTitle}>
                <span className={styles.secIcon}>🟩</span> Terrains disponibles
              </div>
              <div className={styles.courtTeaser} style={{ background: heroGradient }}>
                <CourtGraphic />
                <div className={styles.courtTags}>
                  <span>Intérieur</span>
                  <span>Éclairé</span>
                  <span>Moquette</span>
                </div>
              </div>
            </div>

            {/* CTA sticky quand un créneau est choisi */}
            <div className={styles.bar}>
              <div className={styles.barPrice}>
                <b>{openClub.price} DH</b>
                <small>par 1h30</small>
              </div>
              <Button fullWidth disabled={!slot} onClick={book}>
                {slot ? `Réserver · ${slot}` : 'Choisis un créneau'}
              </Button>
            </div>
          </>
        )}
      </section>

      <Toast {...toastProps} />
    </PhoneFrame>
  );
}
