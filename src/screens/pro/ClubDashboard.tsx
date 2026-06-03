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

const HOUR_H = 56;

type Tab = 'agenda' | 'reservations' | 'caisse' | 'stats';
type Props = { onBack: () => void };

const emptyForm = {
  court: 0,
  start: 18,
  duration: 1.5,
  client: '',
  tel: '',
  price: 300,
  paid: false,
};

/** Espace pro du club : agenda + réservations + caisse + stats (démo). */
export function ClubDashboard({ onBack }: Props) {
  const [tab, setTab] = useState<Tab>('agenda');
  const [bookings, setBookings] = useState<Booking[]>(AGENDA);
  const [pending, setPending] = useState<PendingBooking[]>(PENDING);
  const [flash, setFlash] = useState('');
  const [selected, setSelected] = useState<Booking | null>(null);
  const [newOpen, setNewOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const hours = useMemo(
    () => Array.from({ length: CLOSE_HOUR - OPEN_HOUR }, (_, i) => OPEN_HOUR + i),
    [],
  );

  const stats = useMemo(() => {
    const slotsPerCourt = Math.floor((CLOSE_HOUR - OPEN_HOUR) / 1.5);
    const capacity = COURTS.length * slotsPerCourt;
    const revenue = bookings.reduce((s, b) => s + b.price, 0);
    const encaisse = bookings.filter((b) => b.paid).reduce((s, b) => s + b.price, 0);
    return {
      count: bookings.length,
      revenue,
      encaisse,
      due: revenue - encaisse,
      fill: Math.round((bookings.length / capacity) * 100),
      app: bookings.filter((b) => b.source === 'app').length,
      club: bookings.filter((b) => b.source === 'club').length,
    };
  }, [bookings]);

  const dayBookings = useMemo(
    () => [...bookings].sort((a, b) => a.start - b.start),
    [bookings],
  );

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

  function setPaid(id: string, paid: boolean) {
    setBookings((list) => list.map((b) => (b.id === id ? { ...b, paid } : b)));
    setSelected((s) => (s && s.id === id ? { ...s, paid } : s));
    if (paid) toast('Paiement encaissé 💸');
  }
  function cancelBooking(id: string) {
    setBookings((list) => list.filter((b) => b.id !== id));
    setSelected(null);
    toast('Réservation annulée');
  }

  function createBooking() {
    if (!form.client.trim()) {
      toast('Indique le nom du client');
      return;
    }
    setBookings((list) => [
      ...list,
      {
        id: 'n' + Date.now(),
        court: Number(form.court),
        start: Number(form.start),
        duration: Number(form.duration),
        client: form.client.trim(),
        source: 'club',
        price: Number(form.price),
        paid: form.paid,
      },
    ]);
    setNewOpen(false);
    setForm(emptyForm);
    toast('Réservation ajoutée ✓');
    setTab('agenda');
  }

  return (
    <div className={styles.page}>
      <aside className={styles.side}>
        <div className={styles.brand}>
          <span className={styles.mark} /> Padok <b>Pro</b>
        </div>
        <nav className={styles.nav}>
          {(
            [
              ['agenda', '🗓️ Agenda'],
              ['reservations', '📥 Réservations'],
              ['caisse', '💳 Caisse'],
              ['stats', '📊 Statistiques'],
            ] as [Tab, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              className={`${styles.navItem} ${tab === id ? styles.navOn : ''}`}
              onClick={() => setTab(id)}
            >
              {label}
              {id === 'reservations' && pending.length > 0 && (
                <span className={styles.badge}>{pending.length}</span>
              )}
            </button>
          ))}
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
          <button className={styles.add} onClick={() => setNewOpen(true)}>
            ＋ Nouvelle réservation
          </button>
        </header>

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
            <small>Encaissé</small>
            <b>{stats.encaisse.toLocaleString('fr-FR')} DH</b>
          </div>
          <div className={`${styles.stat} ${styles.statAccent}`}>
            <small>À encaisser</small>
            <b>{stats.due.toLocaleString('fr-FR')} DH</b>
          </div>
        </div>

        {/* ---------- AGENDA ---------- */}
        {tab === 'agenda' && (
          <div className={styles.agendaWrap}>
            <div className={styles.agenda}>
              <div className={styles.aHead}>
                <div className={styles.aCorner} />
                {COURTS.map((c) => (
                  <div key={c} className={styles.aCourtHead}>
                    {c}
                  </div>
                ))}
              </div>
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
                        <button
                          key={b.id}
                          className={`${styles.aBooking} ${
                            b.source === 'app' ? styles.bApp : styles.bClub
                          }`}
                          style={{
                            top: (b.start - OPEN_HOUR) * HOUR_H + 2,
                            height: b.duration * HOUR_H - 4,
                          }}
                          onClick={() => setSelected(b)}
                        >
                          <span className={styles.bTime}>
                            {fmtHour(b.start)}–{fmtHour(b.start + b.duration)}
                          </span>
                          <span className={styles.bClient}>{b.client}</span>
                          <span className={styles.bSrc}>
                            {b.paid ? '✓ payé' : '• à encaisser'}
                          </span>
                        </button>
                      ))}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.legend}>
              <span>
                <i className={styles.dotApp} /> Via l’app
              </span>
              <span>
                <i className={styles.dotClub} /> Saisie au club
              </span>
              <span className={styles.legendHint}>Cliquez un créneau pour l’encaisser</span>
            </div>
          </div>
        )}

        {/* ---------- RÉSERVATIONS ---------- */}
        {tab === 'reservations' && (
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
                      {p.price} DH · {p.tel}
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

        {/* ---------- CAISSE ---------- */}
        {tab === 'caisse' && (
          <div className={styles.caisse}>
            <div className={styles.caisseTotals}>
              <div className={styles.cTotal}>
                <small>Encaissé aujourd’hui</small>
                <b>{stats.encaisse.toLocaleString('fr-FR')} DH</b>
              </div>
              <div className={`${styles.cTotal} ${styles.cDue}`}>
                <small>Reste à encaisser</small>
                <b>{stats.due.toLocaleString('fr-FR')} DH</b>
              </div>
              <div className={styles.cTotal}>
                <small>Total journée</small>
                <b>{stats.revenue.toLocaleString('fr-FR')} DH</b>
              </div>
            </div>

            <div className={styles.caisseList}>
              {dayBookings.map((b) => (
                <div key={b.id} className={styles.cRow}>
                  <div className={styles.cInfo}>
                    <b>{b.client}</b>
                    <span>
                      {COURTS[b.court]} · {fmtHour(b.start)} · {b.source === 'app' ? 'App' : 'Club'}
                    </span>
                  </div>
                  <div className={styles.cPrice}>{b.price} DH</div>
                  {b.paid ? (
                    <span className={styles.cPaid}>✓ Payé</span>
                  ) : (
                    <button className={styles.cEncaisser} onClick={() => setPaid(b.id, true)}>
                      Encaisser
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------- STATISTIQUES ---------- */}
        {tab === 'stats' && (
          <div className={styles.statsTab}>
            <div className={styles.bigStats}>
              <div className={styles.stat}>
                <small>Chiffre d’affaires du jour</small>
                <b>{stats.revenue.toLocaleString('fr-FR')} DH</b>
              </div>
              <div className={styles.stat}>
                <small>Réservations</small>
                <b>{stats.count}</b>
              </div>
              <div className={styles.stat}>
                <small>Remplissage</small>
                <b>{stats.fill}%</b>
              </div>
            </div>
            <div className={styles.sourceCard}>
              <div className={styles.sourceTitle}>D’où viennent les réservations ?</div>
              <div className={styles.bar}>
                <div
                  className={styles.barApp}
                  style={{ width: `${(stats.app / stats.count) * 100 || 0}%` }}
                />
                <div
                  className={styles.barClub}
                  style={{ width: `${(stats.club / stats.count) * 100 || 0}%` }}
                />
              </div>
              <div className={styles.sourceLegend}>
                <span>
                  <i className={styles.dotApp} /> Via l’app : <b>{stats.app}</b>
                </span>
                <span>
                  <i className={styles.dotClub} /> Au club : <b>{stats.club}</b>
                </span>
              </div>
              <p className={styles.sourceNote}>
                💡 Les réservations via l’app vous amènent de nouveaux joueurs et remplissent
                vos créneaux creux.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Détail d'un créneau */}
      {selected && (
        <div className={styles.modalWrap} onClick={() => setSelected(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHead}>
              <h3>{selected.client}</h3>
              <button className={styles.modalX} onClick={() => setSelected(null)}>
                ✕
              </button>
            </div>
            <div className={styles.modalMeta}>
              {COURTS[selected.court]} · {fmtHour(selected.start)}–
              {fmtHour(selected.start + selected.duration)}
            </div>
            <div className={styles.modalRow}>
              <span>Source</span>
              <b>{selected.source === 'app' ? '📱 Via l’app' : '☎️ Saisie au club'}</b>
            </div>
            <div className={styles.modalRow}>
              <span>Prix</span>
              <b>{selected.price} DH</b>
            </div>
            <div className={styles.modalRow}>
              <span>Paiement</span>
              <b className={selected.paid ? styles.okText : styles.dueText}>
                {selected.paid ? 'Encaissé ✓' : 'À encaisser'}
              </b>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.refuse} onClick={() => cancelBooking(selected.id)}>
                Annuler la résa
              </button>
              {selected.paid ? (
                <button className={styles.ghostBtn} onClick={() => setPaid(selected.id, false)}>
                  Annuler le paiement
                </button>
              ) : (
                <button className={styles.confirm} onClick={() => setPaid(selected.id, true)}>
                  💸 Encaisser {selected.price} DH
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Nouvelle réservation */}
      {newOpen && (
        <div className={styles.modalWrap} onClick={() => setNewOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHead}>
              <h3>Nouvelle réservation</h3>
              <button className={styles.modalX} onClick={() => setNewOpen(false)}>
                ✕
              </button>
            </div>

            <label className={styles.field}>
              <span>Client</span>
              <input
                value={form.client}
                placeholder="Nom du client"
                onChange={(e) => setForm({ ...form, client: e.target.value })}
              />
            </label>
            <label className={styles.field}>
              <span>Téléphone</span>
              <input
                value={form.tel}
                placeholder="06 …"
                onChange={(e) => setForm({ ...form, tel: e.target.value })}
              />
            </label>
            <div className={styles.fieldRow}>
              <label className={styles.field}>
                <span>Terrain</span>
                <select
                  value={form.court}
                  onChange={(e) => setForm({ ...form, court: Number(e.target.value) })}
                >
                  {COURTS.map((c, i) => (
                    <option key={c} value={i}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.field}>
                <span>Heure</span>
                <select
                  value={form.start}
                  onChange={(e) => setForm({ ...form, start: Number(e.target.value) })}
                >
                  {hours.flatMap((h) => [h, h + 0.5]).map((t) => (
                    <option key={t} value={t}>
                      {fmtHour(t)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.field}>
                <span>Durée</span>
                <select
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
                >
                  <option value={1}>1h</option>
                  <option value={1.5}>1h30</option>
                </select>
              </label>
              <label className={styles.field}>
                <span>Prix (DH)</span>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                />
              </label>
            </div>
            <label className={styles.checkRow}>
              <input
                type="checkbox"
                checked={form.paid}
                onChange={(e) => setForm({ ...form, paid: e.target.checked })}
              />
              Payé immédiatement
            </label>

            <div className={styles.modalActions}>
              <button className={styles.refuse} onClick={() => setNewOpen(false)}>
                Annuler
              </button>
              <button className={styles.confirm} onClick={createBooking}>
                ✓ Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {flash && <div className={styles.flash}>{flash}</div>}
    </div>
  );
}
