import type { Page } from "../../types";
import { NAV_ITEMS } from "../../data/mockData";

interface MobileContainerProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function MobileContainer({ children, currentPage, onNavigate }: MobileContainerProps) {
  return (
    <div className="w-[390px] h-full flex flex-col overflow-hidden bg-[#f5f7f5]">
      <div className="flex-1 flex flex-col overflow-hidden animate-fade-up" key={currentPage}>
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
    <div className="bg-white border-t border-black/[0.06] flex justify-around pt-1.5 pb-6 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] flex-shrink-0">
      {NAV_ITEMS.map((n) => (
        <button
          key={n.id}
          onClick={() => onChange(n.id)}
          className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl active:scale-90 transition-transform"
        >
          <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center text-xl transition-all ${current === n.id ? "bg-[#0b3d2e]" : ""}`}>
            {n.icon}
          </div>
          <span className={`text-[9px] font-semibold tracking-tight ${current === n.id ? "text-[#0b3d2e]" : "text-gray-400"}`}>
            {n.label}
          </span>
        </button>
      ))}
    </div>
  );
}
