import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  isDark: boolean;
  toggleDark: () => void;
  setDark: (dark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      toggleDark: () => set((state) => {
        const newValue = !state.isDark;
        if (newValue) {
          document.documentElement.classList.add("dark");
          document.body.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
          document.body.classList.remove("dark");
        }
        return { isDark: newValue };
      }),
      setDark: (dark) => set(() => {
        if (dark) {
          document.documentElement.classList.add("dark");
          document.body.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
          document.body.classList.remove("dark");
        }
        return { isDark: dark };
      }),
    }),
    {
      name: "theme-storage",
    }
  )
);

// Initialize dark mode on load
if (typeof window !== "undefined") {
  const savedTheme = localStorage.getItem("theme-storage");
  if (savedTheme) {
    try {
      const { state } = JSON.parse(savedTheme);
      if (state?.isDark) {
        document.documentElement.classList.add("dark");
        document.body.classList.add("dark");
      }
    } catch {}
  }
}
