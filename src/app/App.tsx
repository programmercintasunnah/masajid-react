import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { MobileContainer } from "../components/layout/MobileContainer";
import { PageHome, PageFavorites, PageInfaq, PageAmal, PageProfile, PageLogin } from "../pages";
import { IS_UI_MOBILE } from "../config/constants";
import type { Page } from "../types";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isMobile = IS_UI_MOBILE(location.pathname);
  const currentPage: Page = (location.pathname.slice(1) as Page) || "home";

  const handleNavigate = (page: Page) => {
    navigate(`/${page === "home" ? "" : page}`);
  };

  if (!isMobile) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<PageLogin />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <MobileContainer currentPage={currentPage} onNavigate={handleNavigate}>
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="/home" element={<PageHome />} />
          <Route path="/favorites" element={<PageFavorites />} />
          <Route path="/infaq" element={<PageInfaq />} />
          <Route path="/amal" element={<PageAmal />} />
          <Route path="/profile" element={<PageProfile />} />
        </Routes>
      </MobileContainer>
    </div>
  );
}
