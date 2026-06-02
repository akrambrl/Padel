import { useState } from 'react';
import { PhoneFrame, BottomNav, Toast, useToast, DEFAULT_TABS } from './components';
import { MatchsScreen } from './screens/MatchsScreen';
import { DiscussionsScreen } from './screens/DiscussionsScreen';
import { ProfilScreen } from './screens/ProfilScreen';
import { ClubDetail } from './screens/ClubDetail';
import { DesktopHome } from './screens/desktop/DesktopHome';
import { DesktopClubDetail } from './screens/desktop/DesktopClubDetail';
import { useIsDesktop } from './hooks/useIsDesktop';
import type { Club } from './data/clubs';

/**
 * Coquille de l'app (style Anybuddy).
 * - Accueil "Recherche" : landing (hero + recherche + clubs + sections),
 *   responsive — même page sur mobile et PC.
 * - Mobile : nav du bas (Recherche, Matchs, Discussions, Profil) + fiche club plein écran.
 * - PC : fiche club pleine page (sans nav du bas).
 */
export default function App() {
  const isDesktop = useIsDesktop();
  const [tab, setTab] = useState('recherche');
  const [openClub, setOpenClub] = useState<Club | null>(null);
  const { toast, props: toastProps } = useToast();

  function handleBooked(slot: string) {
    toast(`Demande envoyée pour ${slot} — le club confirme.`);
    setOpenClub(null);
  }

  // ----- Version PC -----
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
          <DesktopHome onOpenClub={setOpenClub} />
        )}
        <Toast {...toastProps} />
      </>
    );
  }

  // ----- Version mobile -----
  return (
    <>
      {tab === 'recherche' ? (
        // Accueil = landing responsive (façon Anybuddy)
        <DesktopHome onOpenClub={setOpenClub} />
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
