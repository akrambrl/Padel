import styles from './ProLanding.module.css';

type Props = {
  onBack: () => void;
  onEnterClub: () => void;
};

const BEFORE = [
  'Réservations éparpillées sur WhatsApp',
  'Doubles réservations et oublis',
  'Aucune vue d’ensemble de la journée',
  'Créneaux creux jamais remplis',
  'Pas de stats, pas d’historique',
];

const AFTER = [
  'Toutes les réservations au même endroit',
  'Zéro double-réservation (bloqué automatiquement)',
  'Un agenda clair, terrain par terrain',
  'Vos créneaux vides remplis par de nouveaux joueurs',
  'Statistiques et suivi en temps réel',
];

const FEATURES = [
  { icon: '🗓️', title: 'Agenda en temps réel', text: 'Tous vos terrains, toute la journée, sur un seul écran.' },
  { icon: '🛡️', title: 'Zéro double-réservation', text: 'Deux personnes ne peuvent pas réserver le même créneau.' },
  { icon: '📈', title: 'Remplissez vos creux', text: 'Vos créneaux libres deviennent visibles par les joueurs de l’app.' },
  { icon: '📥', title: 'Réservations centralisées', text: 'App + téléphone réunis dans un même agenda.' },
  { icon: '📊', title: 'Statistiques', text: 'Taux de remplissage, chiffre d’affaires, clients fidèles.' },
  { icon: '🆓', title: 'Gratuit pour le club', text: 'L’agenda est offert. Commission uniquement sur les résas via l’app.' },
];

const STEPS = [
  { n: 1, title: 'Créez votre espace club', text: 'On ajoute vos terrains et vos horaires en quelques minutes.' },
  { n: 2, title: 'Recevez les réservations', text: 'Les joueurs réservent en ligne ; vous, vous saisissez celles du téléphone.' },
  { n: 3, title: 'Confirmez en 1 clic', text: 'Vous validez, le joueur est prévenu. Plus jamais de message perdu.' },
];

/** Landing "Pro" pour les clubs : pourquoi quitter WhatsApp pour Padok Pro. */
export function ProLanding({ onBack, onEnterClub }: Props) {
  return (
    <div className={styles.page}>
      <header className={styles.nav}>
        <div className={styles.brand}>
          <span className={styles.mark} /> Padok <b>Pro</b>
        </div>
        <div className={styles.navRight}>
          <button className={styles.ghost} onClick={onBack}>
            ← Retour
          </button>
          <button className={styles.cta} onClick={onEnterClub}>
            Voir la démo
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className={styles.hero}>
        <span className={styles.pill}>POUR LES CLUBS</span>
        <h1 className={styles.title}>
          Gérez votre club
          <br />
          <span className={styles.accent}>sans le chaos WhatsApp</span>
        </h1>
        <p className={styles.sub}>
          Un agenda en ligne gratuit pour recevoir et organiser toutes vos réservations de
          padel — fini les messages perdus et les doubles réservations.
        </p>
        <div className={styles.heroBtns}>
          <button className={styles.btnPrimary} onClick={onEnterClub}>
            🗓️ Découvrir l’espace club
          </button>
          <button className={styles.btnGhost}>Prendre rendez-vous</button>
        </div>
        <div className={styles.heroNote}>Gratuit · sans engagement · prêt en 10 minutes</div>
      </section>

      {/* AVANT / APRÈS */}
      <section className={styles.compare}>
        <h2 className={styles.secTitle}>WhatsApp, c’est fini.</h2>
        <div className={styles.compareGrid}>
          <div className={`${styles.col} ${styles.colBad}`}>
            <div className={styles.colHead}>😩 Aujourd’hui · WhatsApp</div>
            <ul>
              {BEFORE.map((t) => (
                <li key={t}>
                  <span className={styles.x}>✕</span> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.col} ${styles.colGood}`}>
            <div className={styles.colHead}>🚀 Avec Padok Pro</div>
            <ul>
              {AFTER.map((t) => (
                <li key={t}>
                  <span className={styles.check}>✓</span> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={styles.features}>
        <h2 className={styles.secTitle}>Tout ce qu’il vous faut, au même endroit</h2>
        <div className={styles.featGrid}>
          {FEATURES.map((f) => (
            <div key={f.title} className={styles.feat}>
              <div className={styles.featIcon}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className={styles.how}>
        <h2 className={styles.secTitle}>Comment ça marche ?</h2>
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

      {/* CTA FINAL */}
      <section className={styles.finalCta}>
        <h2>Prêt à remplir vos terrains ?</h2>
        <p>Rejoignez les clubs qui passent de WhatsApp à un vrai agenda — gratuitement.</p>
        <div className={styles.heroBtns}>
          <button className={styles.btnPrimary} onClick={onEnterClub}>
            Essayer l’espace club
          </button>
          <button className={styles.btnDark} onClick={onBack}>
            Revenir à l’app joueur
          </button>
        </div>
      </section>
    </div>
  );
}
