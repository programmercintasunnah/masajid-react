import { create } from "zustand";
import type { PrayerTimes, HijriDate, NextPrayer } from "@/types";

interface PrayerState {
  prayerTimes: PrayerTimes;
  hijriDate: HijriDate;
  loading: boolean;
  error: string | null;
  nextPrayer: NextPrayer;
  setPrayerTimes: (prayerTimes: PrayerTimes) => void;
  setHijriDate: (hijriDate: HijriDate) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setNextPrayer: (nextPrayer: NextPrayer) => void;
}

const EMPTY_PRAYER_TIMES: PrayerTimes = {
  Fajr: "-",
  Sunrise: "-",
  Dhuhr: "-",
  Asr: "-",
  Maghrib: "-",
  Isha: "-",
};

const EMPTY_HIJRI: HijriDate = {
  day: 0,
  month: "-",
  year: 0,
};

export const usePrayerStore = create<PrayerState>((set) => ({
  prayerTimes: EMPTY_PRAYER_TIMES,
  hijriDate: EMPTY_HIJRI,
  loading: true,
  error: null,
  nextPrayer: { name: "Subuh", minutesLeft: 0 },
  setPrayerTimes: (prayerTimes) => set({ prayerTimes }),
  setHijriDate: (hijriDate) => set({ hijriDate }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setNextPrayer: (nextPrayer) => set({ nextPrayer }),
}));
