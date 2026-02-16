export type Page = "home" | "favorites" | "infaq" | "quiz" | "profile";

export interface NavItem {
  id: Page;
  icon: string;
  label: string;
}

export type FavTab = "all" | "masjid" | "asatidz" | "jamaah" | "live" | "jadwal";

export type FeedType = "masjid" | "ustadz" | "jamaah";

export interface FeedItem {
  id: string;
  type: FeedType;
  author: {
    name: string;
    avatar?: string;
    username?: string;
    isVerified?: boolean;
  };
  repostedBy?: {
    name: string;
    username: string;
  };
  content: string;
  image?: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  tags?: string[];
  mentionedUstadz?: string[];
}

export type UserRole = "jamaah" | "mosque_admin" | "kajian_admin" | "tahsin_admin" | "super_admin";

export interface User {
  id: string;
  email: string;
  name: string;
  photo?: string;
  role: UserRole;
}

export interface Location {
  latitude: number;
  longitude: number;
  city: string;
  district: string;
  cityCode: string;
  error?: string;
}

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

export interface NextPrayer {
  name: string;
  minutesLeft: number;
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

export interface Mosque {
  id: string;
  name: string;
  address: string;
  distance?: string;
  studyCount?: number;
  bg: string;
}

export interface MasjidNearby {
  name: string;
  distance: string;
  address: string;
  kajianToday?: string;
  image?: string;
  bg: string;
}

export interface Study {
  id: string;
  icon: string;
  bg: string;
  title: string;
  tags: string[];
  date: string;
  time?: string;
  price?: string;
}

export interface Kajian {
  icon: string;
  bg: string;
  title: string;
  tags: string[];
  date: string;
  time?: string;
  harga?: string;
}

export interface Campaign {
  id: string;
  mosque: string;
  title: string;
  icon: string;
  percentage: number;
  raised: string;
  target: string;
  urgent: boolean;
  bg: string;
}

export interface FavMasjid {
  name: string;
  address: string;
  bg: string;
  chips: string[];
}

export interface FavUstadz {
  name: string;
  meta: string;
  bg: string;
}

export interface AmalItem {
  name: string;
  count: string;
  done: boolean;
}

export interface AmalSection {
  icon: string;
  label: string;
  items: AmalItem[];
}

export interface MenuItem {
  id: string;
  img: string;
  label: string;
  bg: string;
}

export interface ProfileActivity {
  icon: string;
  bg: string;
  label: string;
  sub: string;
}

export interface TagStyle {
  free: string;
  paid: string;
  kids: string;
  quiz: string;
  dauroh: string;
  online: string;
  tahsin: string;
}

export interface InfaqHistory {
  label: string;
  val: string;
}

export function formatTime(time: string): string {
  if (!time) return "00:00";
  return time.substring(0, 5);
}

export function formatCountdown(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours} jam ${mins} menit`;
  }
  return `${mins} menit`;
}

export function getGregorianDate(date: Date): string {
  const days = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}
