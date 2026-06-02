import { useMemo, useState } from 'react';
import { CLUBS, type Period } from '../data/clubs';

/** Normalise une chaîne pour comparer sans tenir compte des accents/majuscules. */
export function norm(s: string) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

export const WHEN_OPTIONS: { id: 'all' | Period; label: string }[] = [
  { id: 'all', label: 'Peu importe' },
  { id: 'morning', label: 'Matin' },
  { id: 'afternoon', label: 'Après-midi' },
  { id: 'evening', label: 'Soir' },
];

/**
 * État + logique de filtrage des clubs (recherche texte, moment de la journée,
 * intérieur/extérieur). Partagé entre la version mobile et la version PC.
 */
export function useClubFilters() {
  const [query, setQuery] = useState('');
  const [when, setWhen] = useState<'all' | Period>('all');
  const [indoor, setIndoor] = useState(false);
  const [outdoor, setOutdoor] = useState(false);

  const results = useMemo(() => {
    const q = norm(query.trim());
    return CLUBS.filter((c) => {
      if (q && !norm(`${c.name} ${c.location} ${c.type}`).includes(q)) return false;
      if (when !== 'all' && !c.periods.includes(when)) return false;
      if (indoor && !outdoor && !/indoor/i.test(c.type)) return false;
      if (outdoor && !indoor && !/outdoor/i.test(c.type)) return false;
      return true;
    });
  }, [query, when, indoor, outdoor]);

  const whenLabel =
    when === 'all' ? 'Quand' : (WHEN_OPTIONS.find((o) => o.id === when)?.label ?? 'Quand');

  return {
    query,
    setQuery,
    when,
    setWhen,
    indoor,
    setIndoor,
    outdoor,
    setOutdoor,
    results,
    whenLabel,
  };
}
