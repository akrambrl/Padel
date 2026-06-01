# CLAUDE.md — PADOK (réservation de padel, Maroc)

> Contexte projet pour Claude Code. Garder à la racine du repo.
> "PADOK" = nom placeholder, à renommer.
> Direction visuelle ACTUELLE : COPIE du style Anybuddy réel — fond NOIR, panneaux/feuilles
> BLANCS, accent VERT vif ; le "bleu" vient des PHOTOS de courts. Typo grasse (voir §5).
> L'ancien prototype clair `docs/padok-prototype-v3.html` est conservé pour mémoire.

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

## 5. SYSTÈME DE DESIGN (COPIE du style Anybuddy réel — noir / blanc / vert)
Principes : fond NOIR pour l'accueil, panneaux & feuilles BLANCS pour le contenu,
accent VERT vif (CTA, jour/créneau actif, pilules). Le "bleu" vient des PHOTOS de
courts. Cartes sombres ponctuelles (calendrier). Typo grasse, punchy.
Source de vérité : `src/styles/tokens.css`.

Tokens (CSS variables, voir `src/styles/tokens.css`) :
- Fond page : --bg #0A0A0B (noir) ; cartes sombres : --card-dark #000
- Surfaces claires : --panel #FFF ; --panel-2 #EEF0F3 (pilules) ; --panel-line #E6E8EC
- Texte : --ink #0C0F14 (sur clair) ; --muted #8B94A3 ; --on-dark #FFF (sur sombre)
- --accent #20DF63 (vert) ; --accent-ink #06210F (texte quasi noir sur le vert)
- --danger #FF4D4F ("1 dispo") ; --star #FFC02E
- Visuels de courts : dégradés "photo de court" (bleus/verts), cf. src/data/gradients.ts
- Rayons --r-sm 14 / --r-md 18 / --r-lg 26 / --r-pill 50

Typo :
- Gros titres : "Archivo" (grotesque, poids 800-900), aspect bold/sportif.
- UI / corps : "Manrope" (400-800).

Composants clés (dans `src/components/`, 1 dossier par composant) :
- Accueil : entête noir (stats ⚡🏆 + accroche "Let's go Akram !") puis CARTE DE
  RECHERCHE blanche = SearchPill (lieu + icônes) + DayStrip + chips de filtres.
- Carte club (ClubCard) : grande photo de court, nom + note (★, avis, distance)
  superposés EN HAUT, cœur en rond blanc, bandeau d'info en bas (prix/dispo).
- Nav du bas (BottomNav) : barre BLANCHE, 4 onglets (Recherche, Matchs Publics,
  Discussions, Profil), actif en noir.
- Fiche club "Réserver" : hero photo (× / partage / cœur), feuille blanche, titre
  centré + sous-titre, onglets segmentés Réserver/Infos, pilule "Padel ▾",
  CARTE NOIRE = DayStrip (ton sombre) + SlotGrid (créneaux blancs heure+prix,
  sélectionné = vert, "1 dispo" rouge), section "Terrains disponibles", CTA sticky vert.

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
