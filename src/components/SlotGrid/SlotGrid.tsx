import styles from './SlotGrid.module.css';

export type Slot = {
  time: string;
  /** Indisponible (déjà réservé) : barré et non cliquable. */
  off?: boolean;
};

type SlotGridProps = {
  slots: Slot[];
  selected: string | null;
  onSelect: (time: string) => void;
};

/**
 * Grille de créneaux (4 colonnes). Sélectionné = fond accent. Indispo = barré.
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
            {s.time}
          </button>
        );
      })}
    </div>
  );
}
