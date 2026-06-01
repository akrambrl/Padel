import { useState } from 'react';
import { UnderlineTabs, MatchCard } from '../components';
import { PROFILE, PROFILE_HISTORY } from '../data/matches';
import styles from './ProfilScreen.module.css';

/** Écran "Profil" : entête joueur + onglets (Matchs / Stats / Dispo). */
export function ProfilScreen() {
  const [tab, setTab] = useState(0);

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <div className={styles.watermark}>PADOK</div>
        <div className={styles.stats}>
          <span className={styles.stat}>
            ⚡ <b>{PROFILE.eclairs}</b>
          </span>
          <span className={styles.stat}>
            🏆 <b>{PROFILE.trophees}</b>
          </span>
        </div>
        <div className={styles.me}>
          <div className={styles.avatar}>🙂</div>
          <div>
            <div className={styles.name}>{PROFILE.name}</div>
            <div className={styles.meta}>
              Niveau <b>{PROFILE.level}</b> · Class. <b>{PROFILE.classement}</b>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.sheet}>
        <UnderlineTabs tabs={['Matchs', 'Stats', 'Dispo']} activeIndex={tab} onChange={setTab} />

        {tab === 0 && (
          <div className={styles.list}>
            <div className={styles.listTitle}>🕐 Matchs terminés</div>
            {PROFILE_HISTORY.map((m) => (
              <MatchCard key={m.id} match={m} action="Voir" />
            ))}
          </div>
        )}

        {tab === 1 && (
          <div className={styles.placeholder}>
            <div className={styles.phIcon}>📊</div>
            <p>Tes statistiques arriveront bientôt.</p>
          </div>
        )}

        {tab === 2 && (
          <div className={styles.placeholder}>
            <div className={styles.phIcon}>🗓️</div>
            <p>Indique tes disponibilités pour qu'on te propose des matchs.</p>
          </div>
        )}
      </div>
    </div>
  );
}
