# Padok — réservation de padel au Maroc

App joueur (Phase 1) : trouver un club de padel autour de soi et envoyer une
**demande de réservation**. Web app **React + Vite** (PWA, pensée mobile/Safari iOS),
backend **Supabase** (à brancher), déploiement **Vercel**.

> Le contexte produit complet est dans [`CLAUDE.md`](./CLAUDE.md).
> Direction visuelle : **copie du style Anybuddy** — fond **noir**, panneaux **blancs**,
> accent **vert** vif ; le bleu vient des **photos de courts**. Typo grasse (Archivo).
> Les tokens sont dans `src/styles/tokens.css`.

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
| `SearchPill`   | Barre de recherche (lieu + icônes), pilule gris clair |
| `DayStrip`     | Sélecteur de jours (ton clair ou sombre), actif en vert |
| `ClubCard`     | Carte club : photo de court + nom/note superposés + bandeau |
| `CourtGraphic` | Visuel de terrain stylisé (en attendant les vraies photos) |
| `Heart`        | Bouton favori ♡ / ♥ (rond blanc ou posé sur photo) |
| `Button`       | CTA vert / bouton secondaire |
| `BottomNav`    | Navigation blanche 4 onglets (Recherche, Matchs Publics, Discussions, Profil) |
| `SlotGrid`     | Grille de créneaux (heure + prix), sélectionné en vert |
| `Toast`        | Confirmation en bas d'écran |

### Écrans (`src/screens/`)

`src/App.tsx` est la coquille : 4 onglets + la fiche club en surimpression.

| Écran | Contenu |
|-------|---------|
| `RechercheScreen` | Accueil : recherche + jours + filtres + liste des clubs |
| `MatchsScreen`    | Matchs Publics : rejoindre un match de même niveau, en créer un |
| `DiscussionsScreen` | Groupes par ville + discussions récentes |
| `ProfilScreen`    | Profil joueur (niveau, classement) + onglets Matchs/Stats/Dispo |
| `ClubDetail`      | Fiche club « Réserver » (créneaux) / « Infos club » |

Données fictives dans `src/data/` (`clubs.ts`, `matches.ts`, `navigation.ts`).

## Prochaines étapes (voir CLAUDE.md §7)

1. Brancher **Supabase** (tables `clubs`, `courts`, `opening_hours`, `bookings`…).
2. Découper la vitrine en vrais écrans + routing (Explorer / Fiche / Favoris / Profil).
3. « Demande de réservation » → crée un `booking` en statut `en_attente`.

## Structure

```
src/
  components/   # design system (1 dossier par composant)
  screens/      # 1 écran par onglet + fiche club
  data/         # données fictives (Phase 1)
  styles/       # tokens.css (couleurs, ombres, polices) + global.css
  App.tsx       # coquille : onglets + fiche club
docs/
  padok-prototype-v3.html   # ancien prototype (clair), pour mémoire
```
