import { useState } from 'react';
import { PhoneFrame, BottomNav, Toast, useToast, DEFAULT_TABS } from './components';
import { RechercheScreen } from './screens/RechercheScreen';
import { MatchsScreen } from './screens/MatchsScreen';
import { DiscussionsScreen } from './screens/DiscussionsScreen';
import { ProfilScreen } from './screens/ProfilScreen';
import { ClubDetail } from './screens/ClubDetail';
import { DesktopHome } from './screens/desktop/DesktopHome';
import { DesktopClubDetail } from './screens/desktop/DesktopClubDetail';
import { useIsDesktop } from './hooks/useIsDesktop';
import type { Club } from './data/clubs';

/**
 * Coquille de l'app (style Anybuddy). Deux mises en page :
 * - PC : entête + hero + grille de clubs + fiche club pleine page.
 * - Mobile : colonne + nav du bas (Recherche, Matchs, Discussions, Profil).
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
    <PhoneFrame>
      {tab === 'recherche' && <RechercheScreen onOpenClub={setOpenClub} />}
      {tab === 'matchs' && <MatchsScreen />}
      {tab === 'discussions' && <DiscussionsScreen />}
      {tab === 'profil' && <ProfilScreen />}

      <BottomNav tabs={DEFAULT_TABS} activeId={tab} onChange={setTab} />

      {openClub && (
        <ClubDetail
          club={openClub}
          onClose={() => setOpenClub(null)}
          onBooked={handleBooked}
        />
      )}

      <Toast {...toastProps} />
    </PhoneFrame>
  );
}
