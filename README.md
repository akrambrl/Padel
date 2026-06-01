# Padok — réservation de padel au Maroc

App joueur (Phase 1) : trouver un club de padel autour de soi et envoyer une
**demande de réservation**. Web app **React + Vite** (PWA, pensée mobile/Safari iOS),
backend **Supabase** (à brancher), déploiement **Vercel**.

> Le contexte produit complet est dans [`CLAUDE.md`](./CLAUDE.md).
> La référence visuelle est le prototype [`docs/padok-prototype-v3.html`](./docs/padok-prototype-v3.html)
> (style premium clair, esprit Airbnb). Le design system le reproduit fidèlement.

## Démarrer (commandes terminal)

```bash
npm install      # installe les dépendances (à faire une fois)
npm run dev      # lance le serveur de dev → ouvre l'URL affichée (http://localhost:5173)
npm run build    # construit la version de production (dossier dist/)
npm run preview  # prévisualise le build de production
npm run lint     # vérifie le code (ESLint)
```

- **`npm run dev`** : pendant que ça tourne, chaque modif de fichier se recharge
  automatiquement dans le navigateur. `Ctrl + C` pour arrêter.
- Teste en priorité dans **Safari iOS** (outils dev → mode responsive iPhone).

## Ce qui est fait : le design system

Tous les composants réutilisables vivent dans `src/components/`, un dossier par
composant (`.tsx` + `.module.css`). Les couleurs/ombres/polices sont centralisées
dans **`src/styles/tokens.css`** (la source de vérité visuelle).

| Composant      | Rôle |
|----------------|------|
| `PhoneFrame`   | Cadre mobile (max 440px) qui contient l'écran |
| `TopBar`       | Barre du haut avec la marque `pad·ok` |
| `SearchPill`   | Barre de recherche en pilule |
| `CategoryBar`  | Filtres horizontaux (Tous, Indoor, Outdoor…) |
| `ClubCard`     | Carte club « photo-forward » (visuel + infos + prix) |
| `CourtGraphic` | Visuel de terrain stylisé (en attendant les vraies photos) |
| `Heart`        | Bouton favori ♡ / ♥ |
| `Pill`         | Petit badge (ex : « 📍 1.4 km ») |
| `Button`       | CTA accent / bouton secondaire |
| `BottomNav`    | Navigation 4 onglets (Explorer, Carte, Favoris, Profil) |
| `DayTabs`      | Sélecteur de jour |
| `SlotGrid`     | Grille de créneaux horaires |
| `Toast`        | Confirmation en bas d'écran |

`src/App.tsx` est une **vitrine** qui assemble ces composants pour reproduire
l'écran Explorer + la fiche club (données fictives dans `src/data/clubs.ts`).

## Prochaines étapes (voir CLAUDE.md §7)

1. Brancher **Supabase** (tables `clubs`, `courts`, `opening_hours`, `bookings`…).
2. Découper la vitrine en vrais écrans + routing (Explorer / Fiche / Favoris / Profil).
3. « Demande de réservation » → crée un `booking` en statut `en_attente`.

## Structure

```
src/
  components/   # design system (1 dossier par composant)
  data/         # données fictives (Phase 1)
  styles/       # tokens.css (couleurs, ombres, polices) + global.css
  App.tsx       # vitrine assemblant les composants
docs/
  padok-prototype-v3.html   # référence visuelle d'origine
```
