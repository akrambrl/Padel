import { useState } from 'react';
import { DayStrip, MatchCard, Chip } from '../components';
import { DEMO_DAYS } from '../data/clubs';
import { SAME_LEVEL_MATCHES, PROFILE } from '../data/matches';
import styles from './MatchsScreen.module.css';

/** Écran "Matchs Publics" : rejoindre un match de même niveau, ou en créer un. */
export function MatchsScreen() {
  const [day, setDay] = useState(0);

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <div className={styles.stats}>
          <span className={styles.stat}>
            ⚡ <b>{PROFILE.eclairs}</b>
          </span>
          <span className={styles.stat}>
            🏆 <b>{PROFILE.trophees}</b>
          </span>
        </div>
        <h1 className={styles.hero}>
          <span className={styles.accent}>Pas de partenaire&nbsp;?</span>
          <br />
          Rejoins un match déjà prêt&nbsp;!
        </h1>
      </header>

      <div className={styles.sheet}>
        <div className={styles.days}>
          <DayStrip days={DEMO_DAYS} activeIndex={day} onChange={setDay} tone="light" />
        </div>
        <div className={styles.filters}>
          <Chip variant="accent">Padel ▾</Chip>
          <span className={styles.class}>
            Class. <b>{PROFILE.classement}</b>
          </span>
        </div>

        <div className={styles.secTitle}>👌 Matchs de même niveau</div>
        <p className={styles.secSub}>Rejoins ces matchs directement&nbsp;!</p>

        {SAME_LEVEL_MATCHES.map((m) => (
          <MatchCard key={m.id} match={m} action="Rejoindre" />
        ))}

        <button className={styles.create}>＋ Créer ton match</button>
      </div>
    </div>
  );
}
