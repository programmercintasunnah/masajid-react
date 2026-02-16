import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { MobileContainer } from "../components/layout/MobileContainer";
import { PageHome, PageFavorites, PageInfaq, PageQuiz, PageProfile, PageLogin } from "../pages";
import type { Page } from "../types";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentPage: Page = (location.pathname.slice(1) as Page) || "home";

  const handleNavigate = (page: Page) => {
    navigate(`/${page === "home" ? "" : page}`);
  };

  if (location.pathname === "/login") {
    return (
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<PageLogin />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <MobileContainer currentPage={currentPage} onNavigate={handleNavigate}>
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="/home" element={<PageHome />} />
          <Route path="/favorites" element={<PageFavorites />} />
          <Route path="/infaq" element={<PageInfaq />} />
          <Route path="/quiz" element={<PageQuiz />} />
          <Route path="/profile" element={<PageProfile />} />
        </Routes>
      </MobileContainer>
    </div>
  );
}
