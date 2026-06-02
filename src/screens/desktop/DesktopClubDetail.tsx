import { useState } from 'react';
import { SlotGrid, Button, Heart } from '../../components';
import { TopNav } from '../../components/desktop/TopNav';
import { CLUBS, DEMO_DAYS, DEMO_SLOTS, type Club } from '../../data/clubs';
import { PADEL_PHOTOS } from '../../data/photos';
import styles from './DesktopClubDetail.module.css';

type Props = {
  club: Club;
  onClose: () => void;
  onBooked: (slot: string) => void;
};

const TAGS = ['Intérieur', 'Éclairé', 'Double', 'Cristal'];
const AMENITIES = ['🎾 Terrains', '🚿 Vestiaires', '🅿️ Parking', '☕ Cafétéria', '🛍️ Boutique'];

/** Fiche club version PC (façon Anybuddy) : galerie + infos + réservation + avis. */
export function DesktopClubDetail({ club, onClose, onBooked }: Props) {
  const [day, setDay] = useState(0);
  const [duration, setDuration] = useState('90min');
  const [slot, setSlot] = useState<string | null>(null);

  const i = CLUBS.findIndex((c) => c.id === club.id);
  const photo = (n: number) => PADEL_PHOTOS[(i + n) % PADEL_PHOTOS.length];

  return (
    <div className={styles.page}>
      <TopNav />

      <div className={styles.container}>
        {/* Fil d'ariane */}
        <div className={styles.breadcrumb}>
          <button className={styles.crumbLink} onClick={onClose}>
            ← Les clubs
          </button>
          <span className={styles.sep}>›</span>
          <span>Padel</span>
          <span className={styles.sep}>›</span>
          <span>{club.location}</span>
          <span className={styles.crumbRight}>
            <button className={styles.crumbAction}>⤴ Partager</button>
            <button className={styles.crumbAction}>♡ Enregistrer</button>
          </span>
        </div>

        {/* Galerie photos */}
        <div className={styles.gallery}>
          <img className={styles.gMain} src={photo(0)} alt={club.name} />
          <img className={styles.gSide} src={photo(1)} alt="" />
          <img className={styles.gSide} src={photo(2)} alt="" />
        </div>

        {/* Titre */}
        <h1 className={styles.name}>{club.name}</h1>
        <div className={styles.metaRow}>
          <span className={styles.rating}>
            <i className={styles.star}>★</i> <b>{club.rating}</b> ({club.avis} avis)
          </span>
          <span className={styles.dot} />
          <span className={styles.loc}>📍 {club.location}</span>
        </div>

        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.tabOn}`}>Réserver</button>
          <button className={styles.tab}>Avis</button>
        </div>

        <hr className={styles.hr} />

        <h2 className={styles.h2}>Réserver un terrain de padel au {club.name}</h2>
        <p className={styles.desc}>
          {club.name} à {club.location} propose {club.courts} terrains de padel avec
          réservation en ligne. Consultez les disponibilités et choisissez votre créneau —
          confirmation par le club, paiement sur place.
        </p>

        {/* Cartes d'infos */}
        <div className={styles.infoCards}>
          <div className={styles.infoCard}>
            <small>TERRAINS</small>
            <b>{club.courts}</b>
          </div>
          <div className={styles.infoCard}>
            <small>PRIX</small>
            <b>Dès {club.price} DH</b>
          </div>
          <div className={styles.infoCard}>
            <small>RÉSERVATION</small>
            <b>En ligne</b>
          </div>
        </div>

        <div className={styles.tags}>
          {TAGS.map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
        </div>

        {/* Réservation : sidebar + créneaux */}
        <div className={styles.booking}>
          <aside className={styles.sidebar}>
            <div className={styles.sideLabel}>Date</div>
            <div className={styles.dates}>
              {DEMO_DAYS.slice(0, 5).map((d, idx) => (
                <button
                  key={`${d.dow}-${d.day}`}
                  className={`${styles.dateRow} ${idx === day ? styles.dateOn : ''}`}
                  onClick={() => setDay(idx)}
                >
                  <span>
                    {d.dow} {d.day}
                  </span>
                  <b>{club.price} DH</b>
                </button>
              ))}
            </div>

            <div className={styles.sideLabel}>Durée</div>
            <div className={styles.durations}>
              {['60min', '90min'].map((dur) => (
                <button
                  key={dur}
                  className={`${styles.dur} ${dur === duration ? styles.durOn : ''}`}
                  onClick={() => setDuration(dur)}
                >
                  {dur}
                </button>
              ))}
            </div>
          </aside>

          <div className={styles.slotsArea}>
            <div className={styles.slotsTitle}>
              🟩 {club.courts} pistes de padel disponibles
            </div>
            <div className={styles.slotsCard}>
              <div className={styles.slotsHead}>Sélectionner un créneau · {duration}</div>
              <SlotGrid slots={DEMO_SLOTS} selected={slot} onSelect={setSlot} />
            </div>

            <div className={styles.about}>
              <h3>À propos du padel au {club.name}</h3>
              <p>
                {club.name} dispose de {club.courts} terrains de padel ({club.type}). Ouvert
                tous les jours de 08h00 à 23h00. Réservez en ligne : disponibilités à jour,
                confirmation par le club.
              </p>
              <h3>Équipements</h3>
              <div className={styles.amen}>
                {AMENITIES.map((a) => (
                  <span key={a}>{a}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne infos pratiques */}
          <aside className={styles.practical}>
            <div className={styles.practTitle}>Infos pratiques</div>
            <div className={styles.practCard}>
              <div>
                <b>🕐 Horaires</b>
                <small>Ouvert · 08:00 – 23:00</small>
              </div>
              <span>›</span>
            </div>
            <div className={styles.practCard}>
              <div>
                <b>📍 Comment s'y rendre ?</b>
                <small>{club.location}, Maroc</small>
              </div>
              <span>›</span>
            </div>
            <div className={styles.practCard}>
              <div>
                <b>📞 Contacter le club</b>
                <small>Téléphone · WhatsApp</small>
              </div>
              <span>›</span>
            </div>

            <div className={styles.reviewBox}>
              <div className={styles.reviewBig}>{club.rating}</div>
              <div className={styles.reviewStars}>★★★★★</div>
              <div className={styles.reviewCount}>{club.avis} avis</div>
            </div>
          </aside>
        </div>
      </div>

      {/* CTA flottant */}
      <div className={styles.cta}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaPrice}>
            <b>{club.price} DH</b>
            <small>par 1h30 · {club.name}</small>
          </div>
          <div className={styles.ctaRight}>
            <Heart variant="round" />
            <Button disabled={!slot} onClick={() => slot && onBooked(slot)}>
              {slot ? `Réserver · ${slot}` : 'Choisis un créneau'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
