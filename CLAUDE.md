# CLAUDE.md — PADOK (réservation de padel, Maroc)

> Contexte projet pour Claude Code. Garder à la racine du repo.
> "PADOK" = nom placeholder, à renommer.
> Référence visuelle : le fichier `padok-prototype-v3.html` (à mettre dans le repo). Reproduire SON look exact.

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

## 5. SYSTÈME DE DESIGN (reproduire exactement la v3 — style épuré/premium, esprit Airbnb)
Principes : beaucoup de blanc, photos en grand, UNE seule couleur d'accent utilisée avec parcimonie, ombres très douces, séparateurs en filet, zéro contour épais, zéro dégradé criard.

Tokens (CSS variables) :
- --bg: #FCFCFB ; --surface: #FFFFFF
- --ink: #1C1C1A ; --muted: #75746E ; --soft: #9E9D96
- --line: #ECEBE7 (séparateurs filet)
- --accent: #0F7A63 (vert profond, UNIQUEMENT prix / état sélectionné / CTA)
- --accent-soft: #EAF4F0
- Ombres douces : 0 10px 30px -16px rgba(28,28,26,.22)

Typo :
- Titres : "Fraunces" (serif optique, poids 500-600), aspect premium/boutique.
- UI / corps : "Manrope" (sans propre, 400-800).

Composants clés (voir prototype) :
- Carte club "photo-forward" : grande image arrondie (rayon ~18px) + sous l'image, minimal : nom (700), note "★ 4.8" en ligne à droite, lieu (muted), type+terrains (soft), prix en gras "300 DH /1h30". Séparateur filet entre cartes.
- Barre de recherche en pilule (rayon 50px) avec icône loupe, ombre douce.
- Barre de catégories horizontale, item actif souligné en bas (2px ink), icônes en emoji discrets.
- Cœur favori sur l'image (♡ / ♥ accent).
- Nav du bas : 4 onglets (Explorer, Carte, Favoris, Profil), icône + label, actif en couleur accent.
- Fiche club : grande hero image, retour + cœur en ronds blancs flottants, titre Fraunces, "★ note · lieu", filets de séparation, équipements en grille 2 colonnes (icône + label), onglets de jour, créneaux en grille 4 colonnes (sélectionné = fond accent), barre de réservation sticky en bas (prix à gauche, bouton accent à droite).

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
