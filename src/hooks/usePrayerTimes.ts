import { useState, useEffect } from "react";

export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface HijriDate {
  day: number;
  month: string;
  year: number;
}

const DEFAULT_PRAYER_TIMES: PrayerTimes = {
  Fajr: "05:10",
  Sunrise: "06:22",
  Dhuhr: "12:32",
  Asr: "15:50",
  Maghrib: "18:34",
  Isha: "19:45",
};

const DEFAULT_HIJRI: HijriDate = {
  day: 25,
  month: "Sha'ban",
  year: 1447,
};

const CITY_CODE = "0412"; // Pekanbaru

export function usePrayerTimes(_latitude?: number, _longitude?: number) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>(DEFAULT_PRAYER_TIMES);
  const [hijriDate, setHijriDate] = useState<HijriDate>(DEFAULT_HIJRI);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        
        const response = await fetch(
          `https://api.myquran.com/v1/sholat/jadwal/${CITY_CODE}/${year}/${month}/${day}`
        );
        
        if (!response.ok) throw new Error("Failed to fetch prayer times");
        
        const data = await response.json();
        
        if (!data.status || !data.data || !data.data.jadwal) {
          throw new Error("Invalid API response");
        }
        
        const jadwal = data.data.jadwal;
        
        setPrayerTimes({
          Fajr: jadwal.subuh,
          Sunrise: jadwal.terbit,
          Dhuhr: jadwal.dzuhur,
          Asr: jadwal.ashar,
          Maghrib: jadwal.maghrib,
          Isha: jadwal.isya,
        });
        
        const hijriResponse = await fetch(
          `https://api.myquran.com/v1/hijri/gToH/${day}-${month}-${year}`
        );
        
        if (hijriResponse.ok) {
          const hijriData = await hijriResponse.json();
          if (hijriData.status && hijriData.data) {
            setHijriDate({
              day: hijriData.data.hijri.hari,
              month: hijriData.data.hijri.bulan,
              year: hijriData.data.hijri.tahun,
            });
          }
        }
        
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

    fetchPrayerTimes();
  }, []);

  return { prayerTimes, hijriDate, loading, error };
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
