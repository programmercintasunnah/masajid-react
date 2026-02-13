import { createContext, useContext, ReactNode } from "react";
import { useLocation } from "@/hooks/useLocation";
import { Location } from "@/types";

interface LocationContextValue {
  location: Location | null;
  loading: boolean;
}

const LocationContext = createContext<LocationContextValue | null>(null);

interface LocationProviderProps {
  children: ReactNode;
}

export function LocationProvider({ children }: LocationProviderProps) {
  const { location, loading } = useLocation();

  return (
    <LocationContext.Provider value={{ location, loading }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocationContext must be used within a LocationProvider");
  }
  return context;
}
