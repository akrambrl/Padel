import styles from './Toast.module.css';

type ToastProps = {
  message: string;
  show: boolean;
};

/**
 * Toast de confirmation (bas d'écran), fond ink + pastille accent ✓.
 */
export function Toast({ message, show }: ToastProps) {
  return (
    <div className={`${styles.toast} ${show ? styles.show : ''}`} role="status">
      <span className={styles.ck}>✓</span>
      <span>{message}</span>
    </div>
  );
}
