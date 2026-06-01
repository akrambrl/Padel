import { useState } from 'react';
import {
  PhoneFrame,
  TopBar,
  SearchPill,
  CategoryBar,
  DEFAULT_CATEGORIES,
  ClubCard,
  BottomNav,
  DayTabs,
  SlotGrid,
  Button,
  Heart,
  Toast,
  useToast,
  COURT_GRADIENTS,
} from './components';
import { CourtGraphic } from './components/CourtGraphic/CourtGraphic';
import { CLUBS, DEMO_SLOTS, type Club } from './data/clubs';
import styles from './App.module.css';

/**
 * Vitrine du design system PADOK : reproduit l'écran Explorer (style premium
 * clair) et la fiche club avec créneaux. Démo des composants — données fictives.
 * Servira de base aux vrais écrans connectés à Supabase (Phase 1).
 */
export default function App() {
  const [category, setCategory] = useState('all');
  const [tab, setTab] = useState('explore');
  const [openClub, setOpenClub] = useState<Club | null>(null);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const { toast, props: toastProps } = useToast();

  const openIndex = openClub ? CLUBS.findIndex((c) => c.id === openClub.id) : 0;
  const heroGradient = COURT_GRADIENTS[openIndex % COURT_GRADIENTS.length];

  function open(club: Club) {
    setOpenClub(club);
    setSlot(null);
    setDay(0);
  }

  function book() {
    if (!slot) return;
    toast(`Demande envoyée pour ${slot} — le club confirme.`);
    setOpenClub(null);
  }

  return (
    <PhoneFrame>
      <TopBar />

      <div className={styles.hello}>
        <h1>
          Bonsoir Akram.
          <br />
          Où veux-tu jouer&nbsp;?
        </h1>
        <p>12 clubs de padel autour de Casablanca.</p>

        <div className={styles.stats}>
          <span className={styles.stat} style={{ color: 'var(--c-yellow)' }}>
            ⚡ <b>6</b>
          </span>
          <span className={styles.stat} style={{ color: 'var(--c-orange)' }}>
            🏆 <b>0</b>
          </span>
          <span className={styles.stat} style={{ color: 'var(--c-violet)' }}>
            Niveau <b>NC</b>
          </span>
        </div>
      </div>

      <div className={styles.searchWrap}>
        <SearchPill />
      </div>

      <CategoryBar
        categories={DEFAULT_CATEGORIES}
        activeId={category}
        onChange={setCategory}
      />

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

      <BottomNav activeId={tab} onChange={setTab} />

      {/* Fiche club (panneau qui glisse depuis la droite) */}
      <section className={`${styles.detail} ${openClub ? styles.show : ''}`}>
        {openClub && (
          <>
            <div className={styles.dhero} style={{ background: heroGradient }}>
              <CourtGraphic />
              <button
                type="button"
                className={styles.dback}
                onClick={() => setOpenClub(null)}
                aria-label="Retour"
              >
                ←
              </button>
              <div className={styles.dheart}>
                <Heart variant="round" />
              </div>
            </div>

            <div className={styles.dbody}>
              <h2>{openClub.name}</h2>
              <div className={styles.dmeta}>
                <span>
                  <i className={styles.star}>★</i> {openClub.rating}
                </span>
                <span className={styles.dot} />
                <span>{openClub.location}</span>
              </div>

              <hr className={styles.hr} />

              <div className={styles.dh3}>Ce que propose le club</div>
              <div className={styles.amen}>
                <span>
                  <i>🎾</i> {openClub.courts} terrains
                </span>
                <span>
                  <i>🚿</i> Vestiaires
                </span>
                <span>
                  <i>🅿️</i> Parking gratuit
                </span>
                <span>
                  <i>☕</i> Cafétéria
                </span>
                <span>
                  <i>💡</i> Éclairage LED
                </span>
                <span>
                  <i>🛍️</i> Location raquettes
                </span>
              </div>

              <hr className={styles.hr} />

              <div className={styles.dh3}>Disponibilités</div>
              <div className={styles.daytabsWrap}>
                <DayTabs
                  days={['Aujourd’hui', 'Demain', 'Jeudi']}
                  activeIndex={day}
                  onChange={setDay}
                />
              </div>
              <SlotGrid slots={DEMO_SLOTS} selected={slot} onSelect={setSlot} />
            </div>

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
      <div className={styles.demo}>Prototype · données fictives</div>
    </PhoneFrame>
  );
}
