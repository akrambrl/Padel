import { useState } from 'react';
import { CourtGraphic } from '../components/CourtGraphic/CourtGraphic';
import { DayStrip, SlotGrid, Button, Heart, COURT_GRADIENTS } from '../components';
import { CLUBS, DEMO_DAYS, DEMO_SLOTS, type Club } from '../data/clubs';
import { PADEL_PHOTOS } from '../data/photos';
import styles from './ClubDetail.module.css';

type ClubDetailProps = {
  club: Club;
  onClose: () => void;
  onBooked: (slot: string) => void;
};

const AMENITIES = [
  { icon: '🎾', label: 'terrains' },
  { icon: '🚿', label: 'Vestiaires' },
  { icon: '🅿️', label: 'Parking gratuit' },
  { icon: '☕', label: 'Cafétéria' },
  { icon: '💡', label: 'Éclairage LED' },
  { icon: '🛍️', label: 'Location raquettes' },
];

/** Fiche club "Réserver / Infos club" (feuille qui glisse depuis la droite). */
export function ClubDetail({ club, onClose, onBooked }: ClubDetailProps) {
  const [view, setView] = useState<'reserver' | 'infos'>('reserver');
  const [detailDay, setDetailDay] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);

  const [heroError, setHeroError] = useState(false);
  const index = CLUBS.findIndex((c) => c.id === club.id);
  const hero = COURT_GRADIENTS[index % COURT_GRADIENTS.length];
  const heroPhoto = PADEL_PHOTOS[index % PADEL_PHOTOS.length];

  return (
    <section className={styles.detail}>
      <div className={styles.dhero} style={{ background: hero }}>
        <CourtGraphic />
        {!heroError && (
          <img
            className={styles.dimg}
            src={heroPhoto}
            alt={`Court de ${club.name}`}
            onError={() => setHeroError(true)}
          />
        )}
        <button type="button" className={styles.dicon} onClick={onClose} aria-label="Fermer">
          ✕
        </button>
        <div className={styles.dheart}>
          <Heart variant="round" />
        </div>
      </div>

      <div className={styles.sheet}>
        <h2>{club.name}</h2>
        <div className={styles.sub}>{club.location}</div>

        <div className={styles.seg}>
          <button
            className={`${styles.segBtn} ${view === 'reserver' ? styles.segOn : ''}`}
            onClick={() => setView('reserver')}
          >
            📅 Réserver
          </button>
          <button
            className={`${styles.segBtn} ${view === 'infos' ? styles.segOn : ''}`}
            onClick={() => setView('infos')}
          >
            Infos club
          </button>
        </div>

        {view === 'reserver' ? (
          <>
            <div className={styles.calCard}>
              <DayStrip
                days={DEMO_DAYS.slice(1)}
                activeIndex={detailDay}
                onChange={setDetailDay}
                tone="dark"
              />
              <div className={styles.calLine} />
              <SlotGrid slots={DEMO_SLOTS} selected={slot} onSelect={setSlot} />
            </div>

            <div className={styles.secTitle}>
              <span>🟩</span> Terrains disponibles
            </div>
            <div className={styles.courtTeaser} style={{ background: hero }}>
              <CourtGraphic />
              <div className={styles.courtTags}>
                <span>Intérieur</span>
                <span>Éclairé</span>
                <span>Moquette</span>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.infos}>
            <div className={styles.meta}>
              <span>
                <i className={styles.star}>★</i> {club.rating}
              </span>
              <span className={styles.dot} />
              <span>{club.avis} avis</span>
              <span className={styles.dot} />
              <span>↗ {club.distanceKm} km</span>
            </div>

            <div className={styles.h3}>Ce que propose le club</div>
            <div className={styles.amen}>
              {AMENITIES.map((a) => (
                <span key={a.label}>
                  <i>{a.icon}</i>{' '}
                  {a.label === 'terrains' ? `${club.courts} terrains` : a.label}
                </span>
              ))}
            </div>

            <div className={styles.h3}>Adresse</div>
            <p className={styles.text}>{club.address ?? `${club.location}, Maroc`}</p>

            <div className={styles.h3}>Horaires</div>
            <p className={styles.text}>Tous les jours · 08h00 – 23h00</p>

            <div className={styles.contact}>
              <Button variant="ghost" className={styles.contactBtn}>
                📞 {club.phone ?? 'Appeler'}
              </Button>
              <Button variant="ghost" className={styles.contactBtn}>
                💬 WhatsApp
              </Button>
            </div>
          </div>
        )}
      </div>

      {view === 'reserver' && (
        <div className={styles.bar}>
          <div className={styles.barPrice}>
            <b>{club.price} DH</b>
            <small>par 1h30</small>
          </div>
          <Button fullWidth disabled={!slot} onClick={() => slot && onBooked(slot)}>
            {slot ? `Réserver · ${slot}` : 'Choisis un créneau'}
          </Button>
        </div>
      )}
    </section>
  );
}
