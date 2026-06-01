# CLAUDE.md — PADOK (réservation de padel, Maroc)

> Contexte projet pour Claude Code. Garder à la racine du repo.
> "PADOK" = nom placeholder, à renommer.
> Direction visuelle ACTUELLE : style "Anybuddy" — fond bleu court de padel, immersif,
> accent vert fluo, typo grasse (voir §5). L'ancien prototype clair `docs/padok-prototype-v3.html`
> est conservé pour mémoire mais n'est plus la référence.

## 1. Vision
Permettre aux joueurs de padel au Maroc de trouver et réserver un terrain en ligne. On attaque par les JOUEURS (annuaire des courts), on accumule trafic + stats, puis on s'en sert comme levier pour faire adopter aux clubs un agenda gratuit, et enfin on monétise par commission.

## 2. Modèle (ne pas dévier)
Hybride Planity + Anybuddy, séquencé :
- D'abord l'app joueur (annuaire + demande de réservation). C'est la Phase 1.
- Ensuite un back-office agenda GRATUIT pour les clubs, qui peut s'intégrer à leurs outils existants.
- Monétisation = COMMISSION sur les réservations passées via l'app (pas d'abonnement). Les résas saisies par le club (téléphone) ne sont pas commissionnées.
- Paiement en ligne au Maroc = CMI (Stripe indisponible pour société marocaine), nécessite un registre de commerce. EN MVP : paiement sur place + commission réconciliée plus tard. Ne pas implémenter le paiement en ligne maintenant.

## 3. Périmètre
- Sport : PADEL UNIQUEMENT. Mais schéma sport-agnostique (champ `sport` sur les terrains) pour ajouter le foot plus tard sans refonte.
- Géo : démarrage hyper-local (un quartier de Casablanca, un contact club existant).
- Phase 1 = APP JOUEUR seulement. Pas de back-office, pas de paiement en ligne, pas de foot.

## 4. Stack
- Frontend : React + Vite, single codebase (espaces joueur / club selon rôle, plus tard).
- Backend : Supabase (Postgres + Auth + RLS + Realtime).
- Déploiement : Vercel.
- PWA, testée en priorité sur Safari iOS.
- Le fondateur débute sur Claude Code (venait de GitHub web) : expliquer les commandes terminal clés.

## 5. SYSTÈME DE DESIGN (direction "Anybuddy" — fond bleu court de padel, immersif)
Principes : fond bleu immersif (la couleur d'un court de padel), texte blanc, accent
vert fluo réservé aux CTA / états actifs / prix, surfaces en "verre" translucide,
rayons généreux, typo grasse et punchy. Source de vérité : `src/styles/tokens.css`.

Tokens (CSS variables, voir `src/styles/tokens.css`) :
- Fond : dégradé --bg-top #1568B3 → --bg-bot #0A3C70 (court de padel)
- Texte : --ink #FFFFFF ; --muted rgba(255,255,255,.74) ; --soft rgba(255,255,255,.52)
- Surfaces verre : --surface rgba(255,255,255,.09) ; --line rgba(255,255,255,.16)
- --accent #2BE06A (vert fluo) ; --accent-ink #053A1D (texte foncé posé sur l'accent)
- --deep #082C52 (barres opaques : nav, toast)
- Ombres bleutées, rayons --r-sm 14 / --r-md 16 / --r-lg 22 / --r-pill 50

Typo :
- Gros titres : "Archivo" (grotesque, poids 800-900), aspect bold/sportif.
- UI / corps : "Manrope" (400-800).

Composants clés (dans `src/components/`, 1 dossier par composant) :
- Carte club immersive : grande photo de court (dégradé bleu + tracé), infos
  SUPERPOSÉES en bas via un voile sombre (nom blanc 800, lieu·type muted, note en
  chip verre, prix en vert). Distance (pill blanche) + cœur en haut.
- Barre de recherche : pilule en verre translucide, texte blanc, loupe blanche.
- Catégories : chips arrondis (verre) ; chip actif = pastille vert fluo, texte foncé.
- Nav du bas : 4 onglets sur barre bleu profond translucide, actif en vert.
- Fiche club : hero court, retour/cœur en ronds verre, titre Archivo blanc,
  équipements en grille 2 colonnes, onglets de jour (actif vert), créneaux en grille
  4 colonnes (sélectionné = vert), barre de résa sticky (prix à gauche, CTA vert à droite).

## 6. Modèle de données (Supabase / Postgres)
Principe : une seule table `bookings` partagée (source 'club' ou 'app'). La dispo se calcule (horaires − bookings), on ne stocke pas les créneaux vides.

- clubs : id, nom, ville, quartier, adresse, lat, lng, telephone, whatsapp, photos[], description, note, actif
- courts : id, club_id (FK), nom, sport (enum 'padel'|'foot5'|'foot7'), type (enum 'indoor'|'outdoor'), actif
- opening_hours : id, court_id (FK), jour_semaine (0-6), heure_ouverture, heure_fermeture, duree_creneau_min (90 padel), prix_creneau
- bookings : id, court_id (FK), debut (timestamptz), fin (timestamptz), statut (enum 'confirme'|'en_attente'|'bloque'|'annule'), source (enum 'club'|'app'), nom_client, tel_client, prix, commission, paiement_statut, created_at
- club_users : id, user_id (FK), club_id (FK), role (enum 'owner'|'staff') — pour le RLS
- players : id (FK auth.users), pseudo, niveau, ville, tel

Règles critiques :
- Anti double-réservation : contrainte d'exclusion Postgres (EXCLUDE USING gist) sur bookings, pas de chevauchement par court. EN BASE, pas en JS.
- RLS : un club_user ne voit que les données de son club_id ; les joueurs lisent les dispos publiques et écrivent leurs bookings (source 'app').
- Realtime activé sur bookings.

## 7. Phasage
- Phase 1 (MAINTENANT) : app joueur — annuaire des clubs (carte/liste), fiche club, dispo, "demande de réservation" qui crée un booking statut 'en_attente'. Données clubs saisies à la main au début.
- Phase 1.5 : confirmation côté club en 1 clic (dashboard léger).
- Phase 2 : back-office agenda club complet + dispo temps réel.
- Phase 3 : rappels SMS/WhatsApp, no-shows, matchmaking par niveau, paiement en ligne (CMI).

## 8. À NE PAS faire
- Ne pas commencer par le back-office. App joueur d'abord.
- Ne pas coder le foot, le multi-villes, ni le paiement en ligne en Phase 1.
- Ne pas stocker les créneaux dispo (les calculer).
- Ne pas gérer l'anti-double-booking uniquement en front.
- Ne pas dévier du système de design section 5 (pas de dégradés pop, pas de contours épais).

## 9. Conventions
- Commentaires en français OK. Simplicité et maintenabilité par une personne seule.
- Expliquer les nouvelles commandes terminal au fondateur.
