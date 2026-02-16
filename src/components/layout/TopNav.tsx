import { Home, Heart, Banknote, CheckSquare, User, Moon, Sun } from "lucide-react";
import type { Page } from "../../types";
import { MAIN_NAV } from "../../config/menus";
import { useThemeStore } from "../../stores";
import masajidLogo from "../../assets/masajid_logo.png";

interface TopNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function TopNav({ currentPage, onNavigate }: TopNavProps) {
  const { isDark, toggleDark } = useThemeStore();

  const icons = {
    home: Home,
    favorites: Heart,
    infaq: Banknote,
    quiz: CheckSquare,
    profile: User,
  };

  return (
    <div className="hidden md:flex items-center px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
      {/* Logo - center between left edge and first menu item */}
      <div className="absolute left-16 -translate-x-1/2">
        <img
          src={masajidLogo}
          alt="MasajidApp"
          className="h-8 w-auto object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
            const parent = (e.target as HTMLImageElement).parentElement;
            if (parent) {
              parent.innerHTML = `<span class="text-lg font-bold px-2 py-0.5 rounded-md" style="background:#0b3d2e;color:#fff">مساجد</span>`;
            }
          }}
        />
      </div>

      {/* Nav Items - right side */}
      <div className="flex items-center gap-1 ml-64">
        {MAIN_NAV.map((nav) => {
          const Icon = icons[nav.id];
          const isActive = currentPage === nav.id;
          return (
            <button
              key={nav.id}
              onClick={() => onNavigate(nav.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#0b3d2e] text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              {nav.label}
            </button>
          );
        })}

        {/* Dark Mode Toggle - only show in lg mode (when header is hidden) */}
        <button
          onClick={toggleDark}
          className="hidden lg:block ml-4 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
