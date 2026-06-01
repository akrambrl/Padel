import { GROUPS, PROFILE } from '../data/matches';
import styles from './DiscussionsScreen.module.css';

/** Écran "Discussions" : groupes par ville + discussions récentes. */
export function DiscussionsScreen() {
  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <div className={styles.kicker}>👋 Groupes Padok · {PROFILE.ville}</div>
        <div className={`${styles.groups} no-scrollbar`}>
          {GROUPS.map((g) => (
            <article key={g.id} className={styles.group} style={{ background: g.color }}>
              <span className={styles.count}>
                {g.members.toLocaleString('fr-FR')} 🙂
              </span>
              <h3>{g.tag}</h3>
              <div className={styles.last}>{g.last}</div>
            </article>
          ))}
        </div>
      </header>

      <div className={styles.sheet}>
        <div className={styles.actions}>
          <button className={`${styles.act} ${styles.create}`}>👥 Créer un groupe</button>
          <button className={`${styles.act} ${styles.join}`}>↪ Rejoindre</button>
        </div>

        <div className={styles.recentTitle}>🕐 Discussions récentes</div>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>💬</div>
          <p>Aucune discussion récente</p>
        </div>
      </div>
    </div>
  );
}
