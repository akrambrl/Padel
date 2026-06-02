import { useState } from 'react';
import { PhoneFrame, BottomNav, Toast, useToast, DEFAULT_TABS } from './components';
import { MatchsScreen } from './screens/MatchsScreen';
import { DiscussionsScreen } from './screens/DiscussionsScreen';
import { ProfilScreen } from './screens/ProfilScreen';
import { ClubDetail } from './screens/ClubDetail';
import { DesktopHome } from './screens/desktop/DesktopHome';
import { DesktopClubDetail } from './screens/desktop/DesktopClubDetail';
import { ProLanding } from './screens/pro/ProLanding';
import { ClubDashboard } from './screens/pro/ClubDashboard';
import { useIsDesktop } from './hooks/useIsDesktop';
import type { Club } from './data/clubs';

type View = 'app' | 'pro' | 'club';

/**
 * Coquille de l'app.
 * - 'app'  : côté joueur (landing responsive + nav du bas sur mobile).
 * - 'pro'  : landing pour les clubs (pourquoi quitter WhatsApp).
 * - 'club' : espace pro / back-office (agenda + réservations).
 */
export default function App() {
  const isDesktop = useIsDesktop();
  const [view, setView] = useState<View>('app');
  const [tab, setTab] = useState('recherche');
  const [openClub, setOpenClub] = useState<Club | null>(null);
  const { toast, props: toastProps } = useToast();

  function handleBooked(slot: string) {
    toast(`Demande envoyée pour ${slot} — le club confirme.`);
    setOpenClub(null);
  }

  // ----- Espace pro (clubs) -----
  if (view === 'pro') {
    return <ProLanding onBack={() => setView('app')} onEnterClub={() => setView('club')} />;
  }
  if (view === 'club') {
    return <ClubDashboard onBack={() => setView('pro')} />;
  }

  // ----- Côté joueur, version PC -----
  if (isDesktop) {
    return (
      <>
        {openClub ? (
          <DesktopClubDetail
            club={openClub}
            onClose={() => setOpenClub(null)}
            onBooked={handleBooked}
          />
        ) : (
          <DesktopHome onOpenClub={setOpenClub} onPro={() => setView('pro')} />
        )}
        <Toast {...toastProps} />
      </>
    );
  }

  // ----- Côté joueur, version mobile -----
  return (
    <>
      {tab === 'recherche' ? (
        <DesktopHome onOpenClub={setOpenClub} onPro={() => setView('pro')} />
      ) : (
        <PhoneFrame>
          {tab === 'matchs' && <MatchsScreen />}
          {tab === 'discussions' && <DiscussionsScreen />}
          {tab === 'profil' && <ProfilScreen />}
        </PhoneFrame>
      )}

      <BottomNav tabs={DEFAULT_TABS} activeId={tab} onChange={setTab} />

      {openClub && (
        <ClubDetail
          club={openClub}
          onClose={() => setOpenClub(null)}
          onBooked={handleBooked}
        />
      )}

      <Toast {...toastProps} />
    </>
  );
}
