import { useMemo, useState } from 'react';
import {
  AGENDA,
  PENDING,
  COURTS,
  CLUB_NAME,
  OPEN_HOUR,
  CLOSE_HOUR,
  fmtHour,
  type Booking,
  type PendingBooking,
} from '../../data/club';
import styles from './ClubDashboard.module.css';

const HOUR_H = 56; // hauteur d'une heure dans l'agenda (px)
const PRICE = 300; // prix moyen d'un créneau (DH) pour l'estimation CA

type Props = { onBack: () => void };

/** Espace pro du club : agenda des terrains + réservations entrantes + stats. */
export function ClubDashboard({ onBack }: Props) {
  const [tab, setTab] = useState<'agenda' | 'reservations'>('agenda');
  const [bookings, setBookings] = useState<Booking[]>(AGENDA);
  const [pending, setPending] = useState<PendingBooking[]>(PENDING);
  const [flash, setFlash] = useState('');

  const hours = useMemo(
    () => Array.from({ length: CLOSE_HOUR - OPEN_HOUR }, (_, i) => OPEN_HOUR + i),
    [],
  );

  const stats = useMemo(() => {
    const slotsPerCourt = Math.floor((CLOSE_HOUR - OPEN_HOUR) / 1.5);
    const capacity = COURTS.length * slotsPerCourt;
    return {
      count: bookings.length,
      revenue: bookings.length * PRICE,
      fill: Math.round((bookings.length / capacity) * 100),
    };
  }, [bookings]);

  function toast(msg: string) {
    setFlash(msg);
    window.setTimeout(() => setFlash(''), 2600);
  }

  function confirm(p: PendingBooking) {
    setBookings((b) => [...b, { ...p }]);
    setPending((list) => list.filter((x) => x.id !== p.id));
    toast(`Réservation de ${p.client} confirmée ✓`);
    setTab('agenda');
  }

  function refuse(p: PendingBooking) {
    setPending((list) => list.filter((x) => x.id !== p.id));
    toast(`Demande de ${p.client} refusée`);
  }

  return (
    <div className={styles.page}>
      {/* Barre latérale (desktop) / haut */}
      <aside className={styles.side}>
        <div className={styles.brand}>
          <span className={styles.mark} /> Padok <b>Pro</b>
        </div>
        <nav className={styles.nav}>
          <button
            className={`${styles.navItem} ${tab === 'agenda' ? styles.navOn : ''}`}
            onClick={() => setTab('agenda')}
          >
            🗓️ Agenda
          </button>
          <button
            className={`${styles.navItem} ${tab === 'reservations' ? styles.navOn : ''}`}
            onClick={() => setTab('reservations')}
          >
            📥 Réservations
            {pending.length > 0 && <span className={styles.badge}>{pending.length}</span>}
          </button>
          <button className={styles.navItem}>📊 Statistiques</button>
          <button className={styles.navItem}>⚙️ Réglages</button>
        </nav>
        <button className={styles.back} onClick={onBack}>
          ← Quitter la démo
        </button>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div>
            <div className={styles.clubName}>{CLUB_NAME}</div>
            <div className={styles.date}>
              <button className={styles.arrow}>‹</button>
              <b>Aujourd’hui · Lun. 1 juin</b>
              <button className={styles.arrow}>›</button>
            </div>
          </div>
          <button className={styles.add} onClick={() => toast('Nouvelle réservation (démo)')}>
            ＋ Nouvelle réservation
          </button>
        </header>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <small>Réservations du jour</small>
            <b>{stats.count}</b>
          </div>
          <div className={styles.stat}>
            <small>Taux de remplissage</small>
            <b>{stats.fill}%</b>
          </div>
          <div className={styles.stat}>
            <small>Chiffre d’affaires estimé</small>
            <b>{stats.revenue.toLocaleString('fr-FR')} DH</b>
          </div>
          <div className={`${styles.stat} ${styles.statAccent}`}>
            <small>Demandes en attente</small>
            <b>{pending.length}</b>
          </div>
        </div>

        {tab === 'agenda' ? (
          <div className={styles.agendaWrap}>
            <div className={styles.agenda}>
              {/* En-tête colonnes */}
              <div className={styles.aHead}>
                <div className={styles.aCorner} />
                {COURTS.map((c) => (
                  <div key={c} className={styles.aCourtHead}>
                    {c}
                  </div>
                ))}
              </div>

              {/* Corps : colonne d'heures + colonnes terrains */}
              <div className={styles.aBody}>
                <div className={styles.aTimes}>
                  {hours.map((h) => (
                    <div key={h} className={styles.aTime} style={{ height: HOUR_H }}>
                      {h}h
                    </div>
                  ))}
                </div>

                {COURTS.map((c, ci) => (
                  <div key={c} className={styles.aCol}>
                    {hours.map((h) => (
                      <div key={h} className={styles.aCell} style={{ height: HOUR_H }} />
                    ))}
                    {bookings
                      .filter((b) => b.court === ci)
                      .map((b) => (
                        <div
                          key={b.id}
                          className={`${styles.aBooking} ${
                            b.source === 'app' ? styles.bApp : styles.bClub
                          }`}
                          style={{
                            top: (b.start - OPEN_HOUR) * HOUR_H + 2,
                            height: b.duration * HOUR_H - 4,
                          }}
                        >
                          <span className={styles.bTime}>
                            {fmtHour(b.start)}–{fmtHour(b.start + b.duration)}
                          </span>
                          <span className={styles.bClient}>{b.client}</span>
                          <span className={styles.bSrc}>
                            {b.source === 'app' ? '📱 App' : '☎️ Club'}
                          </span>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.legend}>
              <span>
                <i className={styles.dotApp} /> Réservation via l’app
              </span>
              <span>
                <i className={styles.dotClub} /> Saisie au club (téléphone)
              </span>
            </div>
          </div>
        ) : (
          <div className={styles.resList}>
            {pending.length === 0 ? (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>✅</div>
                <p>Aucune demande en attente. Tout est à jour !</p>
              </div>
            ) : (
              pending.map((p) => (
                <div key={p.id} className={styles.resCard}>
                  <div className={styles.resInfo}>
                    <div className={styles.resTop}>
                      <b>{p.client}</b>
                      <span className={styles.resBadge}>📱 via l’app</span>
                    </div>
                    <div className={styles.resMeta}>
                      {COURTS[p.court]} · {fmtHour(p.start)}–{fmtHour(p.start + p.duration)} ·{' '}
                      {p.tel}
                    </div>
                  </div>
                  <div className={styles.resActions}>
                    <button className={styles.refuse} onClick={() => refuse(p)}>
                      Refuser
                    </button>
                    <button className={styles.confirm} onClick={() => confirm(p)}>
                      ✓ Confirmer
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {flash && <div className={styles.flash}>{flash}</div>}
    </div>
  );
}
