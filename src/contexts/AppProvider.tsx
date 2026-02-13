import { ReactNode } from "react";
import { PrayerProvider } from "./PrayerContext";
import { LocationProvider } from "./LocationContext";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <LocationProvider>
      <PrayerProvider>
        {children}
      </PrayerProvider>
    </LocationProvider>
  );
}
