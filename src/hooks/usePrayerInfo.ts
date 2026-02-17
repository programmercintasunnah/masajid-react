import { useLocation } from "./useLocation";
import { usePrayerTimes, getNextPrayer } from "./usePrayerTimes";

export function usePrayerInfo() {
  const { location } = useLocation();
  const { prayerTimes, hijriDate } = usePrayerTimes();

  const hasValidLocation = location?.cityCode && prayerTimes.Fajr !== "-";
  const nextPrayer = hasValidLocation ? getNextPrayer(prayerTimes) : null;

  const gregorian = new Date().toLocaleDateString('id-ID', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  const prayerList = [
    { name: "Subuh", time: prayerTimes.Fajr || "-" },
    { name: "Dzuhur", time: prayerTimes.Dhuhr || "-" },
    { name: "Ashar", time: prayerTimes.Asr || "-" },
    { name: "Maghrib", time: prayerTimes.Maghrib || "-" },
    { name: "Isya", time: prayerTimes.Isha || "-" },
  ];

  return {
    location,
    prayerTimes,
    hijriDate,
    hasValidLocation,
    nextPrayer,
    gregorian,
    prayerList,
  };
}
