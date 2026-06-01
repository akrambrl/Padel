import { useCallback, useState } from 'react';

/**
 * Petit hook pratique : `const { toast, props } = useToast();`
 * Appeler `toast('message')` pour l'afficher ~3,2 s, puis passer `props` au `<Toast />`.
 */
export function useToast(duration = 3200) {
  const [state, setState] = useState({ message: '', show: false });

  const toast = useCallback(
    (message: string) => {
      setState({ message, show: true });
      window.setTimeout(() => setState((s) => ({ ...s, show: false })), duration);
    },
    [duration],
  );

  return { toast, props: state };
}
