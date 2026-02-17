import { useState, useEffect } from "react";
import { PrayerTimes, HijriDate, NextPrayer } from "@/types";
import { getPrayerTimes } from "@/services/prayerApi";
import { getHijriDate } from "@/services/hijriApi";
import { formatDateForApi, formatDateForApiHijri } from "@/utils";
import { useLocation } from "./useLocation";

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

export function usePrayerTimes() {
  const { location } = useLocation();
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>(EMPTY_PRAYER_TIMES);
  const [hijriDate, setHijriDate] = useState<HijriDate>(EMPTY_HIJRI);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location?.cityCode) {
      setPrayerTimes(EMPTY_PRAYER_TIMES);
      setHijriDate(EMPTY_HIJRI);
      setLoading(false);
      return;
    }

    console.log("[PrayerTimes] Using cityCode:", location.cityCode, "for city:", location.city);

    const fetchData = async () => {
      try {
        const today = new Date();
        const dateForApi = formatDateForApi(today);
        const dateForHijri = formatDateForApiHijri(today);

        const [times, hijri] = await Promise.all([
          getPrayerTimes(location.cityCode, dateForApi),
          getHijriDate(dateForHijri),
        ]);

        console.log("[PrayerTimes] Got prayer times:", times);
        setPrayerTimes(times);
        setHijriDate(hijri);
        setError(null);
      } catch (err) {
        console.error("Prayer times error:", err);
        setError("Failed to fetch prayer schedule");
        setPrayerTimes(EMPTY_PRAYER_TIMES);
        setHijriDate(EMPTY_HIJRI);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchData();
  }, [location?.cityCode]);

  return { prayerTimes, hijriDate, loading, error };
}

export function getNextPrayer(prayerTimes: PrayerTimes): NextPrayer | null {
  // If no valid prayer times, return null
  if (prayerTimes.Fajr === "-" || !prayerTimes.Fajr) {
    return null;
  }
  
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
    return isNaN(h) ? Infinity : h * 60 + m;
  });
  
  for (let i = 0; i < prayerMinutes.length; i++) {
    if (currentMinutes < prayerMinutes[i]) {
      return { name: prayers[i].name, minutesLeft: prayerMinutes[i] - currentMinutes };
    }
  }
  
  return { name: "Subuh", minutesLeft: (24 * 60 - currentMinutes) + prayerMinutes[0] };
}
