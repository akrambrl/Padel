import { useEffect, useState } from 'react';

/**
 * Vrai sur grand écran (PC). Sert à basculer entre la mise en page mobile
 * (colonne + nav du bas) et la mise en page bureau façon Anybuddy.
 */
export function useIsDesktop(min = 1000) {
  const query = `(min-width:${min}px)`;
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = () => setIsDesktop(mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return isDesktop;
}
