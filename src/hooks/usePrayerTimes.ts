import { useState, useEffect } from "react";
import { PrayerTimes, HijriDate, NextPrayer } from "@/types";
import { getPrayerTimes } from "@/services/prayerApi";
import { getHijriDate } from "@/services/hijriApi";
import { formatDateForApi, formatDateForApiHijri } from "@/utils";
import { useLocation } from "./useLocation";
import { DEFAULT_PRAYER_TIMES, DEFAULT_HIJRI } from "@/config/constants";

export function usePrayerTimes() {
  const { location } = useLocation();
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>(DEFAULT_PRAYER_TIMES);
  const [hijriDate, setHijriDate] = useState<HijriDate>(DEFAULT_HIJRI);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) return;

    const fetchData = async () => {
      try {
        const today = new Date();
        const dateForApi = formatDateForApi(today);
        const dateForHijri = formatDateForApiHijri(today);

        const [times, hijri] = await Promise.all([
          getPrayerTimes(location.cityCode, dateForApi),
          getHijriDate(dateForHijri),
        ]);

        setPrayerTimes(times);
        setHijriDate(hijri);
        setError(null);
      } catch (err) {
        console.error("Prayer times error:", err);
        setError("Gagal mengambil jadwal solat");
        setPrayerTimes(DEFAULT_PRAYER_TIMES);
        setHijriDate(DEFAULT_HIJRI);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchData();
  }, [location?.cityCode]);

  return { prayerTimes, hijriDate, loading, error };
}

export function getNextPrayer(prayerTimes: PrayerTimes): NextPrayer {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  const prayers = [
    { name: "Subuh", time: prayerTimes.Fajr },
    { name: "Dzuhur", time: prayerTimes.Dhuhr },
    { name: "Ashar", time: prayerTimes.Asr },
    { name: "Maghrib", time: prayerTimes.Maghrib },
    { name: "Isya", time: prayerTimes.Isha },
  ];
  
  const prayerMinutes = prayers.map(p => {
    const [h, m] = p.time.split(":").map(Number);
    return h * 60 + m;
  });
  
  for (let i = 0; i < prayerMinutes.length; i++) {
    if (currentMinutes < prayerMinutes[i]) {
      return { name: prayers[i].name, minutesLeft: prayerMinutes[i] - currentMinutes };
    }
  }
  
  return { name: "Subuh", minutesLeft: (24 * 60 - currentMinutes) + prayerMinutes[0] };
}
