import { useState, useEffect } from "react";
import type { Page } from "../../types";
import { Home, Heart, Banknote, CheckSquare, User } from "lucide-react";

const NAV_ITEMS = [
  { id: "home" as Page, icon: Home, label: "Beranda" },
  { id: "favorites" as Page, icon: Heart, label: "Favorit" },
  { id: "infaq" as Page, icon: Banknote, label: "Infaq" },
  { id: "amal" as Page, icon: CheckSquare, label: "Amal" },
  { id: "profile" as Page, icon: User, label: "Profil" },
];

interface MobileContainerProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function MobileContainer({ children, currentPage, onNavigate }: MobileContainerProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  if (isDesktop) {
    return (
      <div className="flex min-h-screen bg-gray-100" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        
        {/* Desktop Sidebar */}
        <aside className="w-56 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-gray-100">
            <h1 className="text-lg font-bold text-[#0b3d2e]">Masajid</h1>
          </div>
          <nav className="flex-1 p-3">
            {NAV_ITEMS.map((n) => {
              const Icon = n.icon;
              const isActive = currentPage === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => onNavigate(n.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-colors ${
                    isActive 
                      ? "bg-[#0b3d2e] text-white" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{n.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="w-full h-[100dvh] flex flex-col bg-[#f5f7f5]">
      <div className="flex-1 overflow-y-auto animate-fade-up" key={currentPage}>
        {children}
      </div>
      <BottomNav current={currentPage} onChange={onNavigate} />
    </div>
  );
}

interface BottomNavProps {
  current: Page;
  onChange: (page: Page) => void;
}

export function BottomNav({ current, onChange }: BottomNavProps) {
  return (
    <div className="bg-white border-t border-black/[0.06] flex justify-around pt-1.5 pb-6 px-1 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] flex-shrink-0">
      {NAV_ITEMS.map((n) => {
        const Icon = n.icon;
        return (
          <button
            key={n.id}
            onClick={() => onChange(n.id)}
            className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl active:scale-90 transition-transform"
          >
            <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center transition-all ${current === n.id ? "bg-[#0b3d2e]" : ""}`}>
              <Icon className={`w-5 h-5 ${current === n.id ? "text-white" : "text-gray-400"}`} />
            </div>
            <span className={`text-[9px] font-semibold tracking-tight ${current === n.id ? "text-[#0b3d2e]" : "text-gray-400"}`}>
              {n.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
