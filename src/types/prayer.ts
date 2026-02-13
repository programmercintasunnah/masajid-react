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

export interface PrayerTimeItem {
  name: string;
  time: string;
}

export interface NextPrayer {
  name: string;
  minutesLeft: number;
}

export function formatTime(time: string): string {
  if (!time) return "00:00";
  return time.substring(0, 5);
}

export function getNextPrayer(prayerTimes: PrayerTimes): NextPrayer {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  const prayers: PrayerTimeItem[] = [
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
