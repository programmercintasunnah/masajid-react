import { useState } from "react";
import type { Page } from "./types";
import { MobileContainer } from "./components/layout/MobileContainer";
import { PageBeranda, PageFavorit, PageInfaq, PageAmal, PageProfil } from "./components/pages";
import { AppProvider } from "./contexts";

export default function App() {
  const [page, setPage] = useState<Page>("beranda");

  const pages: Record<Page, React.ReactNode> = {
    beranda: <PageBeranda />,
    favorit: <PageFavorit />,
    infaq: <PageInfaq />,
    amal: <PageAmal />,
    profil: <PageProfil />,
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100 flex justify-center" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <MobileContainer currentPage={page} onNavigate={setPage}>
          {pages[page]}
        </MobileContainer>
      </div>
    </AppProvider>
  );
}
