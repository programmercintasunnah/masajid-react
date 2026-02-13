import { createContext, useContext, ReactNode } from "react";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { PrayerTimes, HijriDate, NextPrayer, getNextPrayer } from "@/types";

interface PrayerContextValue {
  prayerTimes: PrayerTimes;
  hijriDate: HijriDate;
  loading: boolean;
  error: string | null;
  nextPrayer: NextPrayer;
}

const PrayerContext = createContext<PrayerContextValue | null>(null);

interface PrayerProviderProps {
  children: ReactNode;
}

export function PrayerProvider({ children }: PrayerProviderProps) {
  const { prayerTimes, hijriDate, loading, error } = usePrayerTimes();
  const nextPrayer = getNextPrayer(prayerTimes);

  return (
    <PrayerContext.Provider value={{ prayerTimes, hijriDate, loading, error, nextPrayer }}>
      {children}
    </PrayerContext.Provider>
  );
}

export function usePrayer() {
  const context = useContext(PrayerContext);
  if (!context) {
    throw new Error("usePrayer must be used within a PrayerProvider");
  }
  return context;
}
