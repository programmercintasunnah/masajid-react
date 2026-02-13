import { useState, useEffect } from "react";

export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

const DEFAULT_PRAYER_TIMES: PrayerTimes = {
  Fajr: "05:10",
  Sunrise: "06:22",
  Dhuhr: "12:32",
  Asr: "15:50",
  Maghrib: "18:34",
  Isha: "19:45",
};

export function usePrayerTimes(latitude?: number, longitude?: number) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>(DEFAULT_PRAYER_TIMES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (latitude === undefined || longitude === undefined) {
      setLoading(false);
      return;
    }

    const fetchPrayerTimes = async () => {
      try {
        const today = new Date();
        const dateStr = today.toISOString().split('T')[0];
        
        const response = await fetch(
          `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${latitude}&longitude=${longitude}&method=2&timezone=Asia/Jakarta`
        );
        
        if (!response.ok) throw new Error("Failed to fetch prayer times");
        
        const data = await response.json();
        
        console.log("Aladhan API response:", data);
        
        if (!data.data || !data.data.timings) {
          throw new Error("Invalid API response");
        }
        
        const timings = data.data.timings;
        
        const formatTime = (time: string) => {
          if (!time) return "00:00";
          return time.substring(0, 5);
        };
        
        setPrayerTimes({
          Fajr: formatTime(timings.Fajr),
          Sunrise: formatTime(timings.Sunrise),
          Dhuhr: formatTime(timings.Dhuhr),
          Asr: formatTime(timings.Asr),
          Maghrib: formatTime(timings.Maghrib),
          Isha: formatTime(timings.Isha),
        });
        
        setError(null);
      } catch (err) {
        console.error("Prayer times error:", err);
        setError("Gagal mengambil jadwal solat");
        setPrayerTimes(DEFAULT_PRAYER_TIMES);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [latitude, longitude]);

  return { prayerTimes, loading, error };
}

export function getNextPrayer(prayerTimes: PrayerTimes): { name: string; minutesLeft: number } {
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
