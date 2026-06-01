import styles from './SlotGrid.module.css';

export type Slot = {
  time: string;
  /** Prix affiché (ex : "280 DH"). */
  price?: string;
  /** Mention au-dessus du créneau (ex : "1 dispo"). */
  note?: string;
  /** Indisponible (déjà réservé). */
  off?: boolean;
};

type SlotGridProps = {
  slots: Slot[];
  selected: string | null;
  onSelect: (time: string) => void;
};

/**
 * Grille de créneaux (style Anybuddy) : cartes blanches avec heure + prix.
 * Sélectionné = vert. Mention "1 dispo" en rouge. Indispo = barré.
 */
export function SlotGrid({ slots, selected, onSelect }: SlotGridProps) {
  return (
    <div className={styles.slots}>
      {slots.map((s) => {
        const cls = [
          styles.slot,
          s.off ? styles.off : '',
          s.time === selected ? styles.sel : '',
        ]
          .filter(Boolean)
          .join(' ');
        return (
          <button
            key={s.time}
            type="button"
            className={cls}
            disabled={s.off}
            onClick={() => onSelect(s.time)}
          >
            {s.note && <span className={styles.note}>{s.note}</span>}
            <span className={styles.time}>{s.time}</span>
            {s.price && <span className={styles.price}>{s.price}</span>}
          </button>
        );
      })}
    </div>
  );
}
