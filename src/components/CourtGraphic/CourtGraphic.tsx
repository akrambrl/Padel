import styles from './CourtGraphic.module.css';

/**
 * Habillage "terrain de padel" stylisé : quadrillage léger + tracé du court.
 * Sert de visuel par défaut tant qu'on n'a pas de vraies photos de clubs.
 * À poser dans un conteneur ayant un `background` (dégradé doux).
 */
export function CourtGraphic() {
  return (
    <>
      <div className={styles.lines} />
      <div className={styles.court} />
    </>
  );
}
