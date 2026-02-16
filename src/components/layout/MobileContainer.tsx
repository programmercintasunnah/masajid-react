import { useState, useEffect } from "react";
import type { Page } from "../../types";
import { BookOpen, ScrollText, GraduationCap, BookMarked, Sparkles, MoreHorizontal, Home, Heart, Banknote, CheckSquare, User } from "lucide-react";
import { TopNav } from "./TopNav";
import { RightPanel } from "./RightPanel";
import { MENUS } from "../../config/menus";
import { useThemeStore } from "../../stores";

const MENU_ICONS: Record<string, any> = {
  quran: BookOpen,
  hadits: ScrollText,
  kajian: GraduationCap,
  tahsin: BookMarked,
  dzikir: Sparkles,
  infaq: BookOpen,
  quiz: BookMarked,
  other: MoreHorizontal,
};

const NAV_ITEMS: { id: Page; icon: any; label: string }[] = [
  { id: "home", icon: Home, label: "Beranda" },
  { id: "favorites", icon: Heart, label: "Favorit" },
  { id: "infaq", icon: Banknote, label: "Infaq" },
  { id: "quiz", icon: CheckSquare, label: "Kuis" },
  { id: "profile", icon: User, label: "Profil" },
];

interface MobileContainerProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function MobileContainer({ children, currentPage, onNavigate }: MobileContainerProps) {
  const [screenSize, setScreenSize] = useState<"mobile" | "md" | "lg">("mobile");
  // Subscribe to theme store to trigger re-render when dark mode changes
  useThemeStore((state) => state.isDark);

  useEffect(() => {
    const checkSize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize("lg");
      } else if (window.innerWidth >= 768) {
        setScreenSize("md");
      } else {
        setScreenSize("mobile");
      }
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  if (screenSize === "lg" || screenSize === "md") {
    return (
      <div className="flex flex-col h-screen overflow-hidden bg-gray-100 dark:bg-gray-900" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        
        {/* Top Nav - fixed at top */}
        <TopNav currentPage={currentPage} onNavigate={onNavigate} />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - fixed, scrollable */}
          <aside className="w-56 flex-shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h1 className="text-lg font-bold text-[#0b3d2e]">Masajid<span className="text-gray-300">App</span></h1>
            </div>
            
            {/* MenuGrid */}
            <nav className="p-3">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Menu</div>
              {MENUS.map((m, i) => {
                const Icon = MENU_ICONS[m.page] || MoreHorizontal;
                return (
                  <button
                    key={i}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-colors text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${m.bg} flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium">{m.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content - scrollable only */}
          <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900">
            {children}
          </main>

          {/* Right Panel - fixed, only at lg */}
          {screenSize === "lg" && (
            <aside className="w-[300px] flex-shrink-0 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
              <RightPanel />
            </aside>
          )}
        </div>
      </div>
    );
  }

  // Mobile - < 768px
  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden bg-[#f5f7f5] dark:bg-gray-900">
      <div className="flex-1 overflow-y-auto" key={currentPage}>
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
    <div className="bg-white dark:bg-gray-800 border-t border-black/[0.06] dark:border-gray-700 flex justify-around pt-1.5 pb-6 px-1 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.3)] flex-shrink-0">
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
