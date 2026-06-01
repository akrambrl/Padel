import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'ghost';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
};

/**
 * Bouton du design system.
 * - primary : fond accent (vert profond), CTA principal.
 * - ghost   : contour filet, action secondaire.
 * Désactivé : gris doux, sans ombre.
 */
export function Button({
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...rest
}: ButtonProps) {
  const classes = [
    styles.btn,
    styles[variant],
    fullWidth ? styles.full : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <button className={classes} {...rest} />;
}
