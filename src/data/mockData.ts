import type {
  PrayerTime,
  MasjidNearby,
  Kajian,
  FavMasjid,
  FavUstadz,
  Campaign,
  AmalSection,
  NavItem,
  ProfileActivity,
} from "../types";

export const PRAYER_TIMES: PrayerTime[] = [
  { name: "Subuh", time: "05:10", icon: "🌅" },
  { name: "Dzuhur", time: "12:32", icon: "☀️" },
  { name: "Ashar", time: "15:50", icon: "🌤", active: true },
  { name: "Maghrib", time: "18:34", icon: "🌆" },
  { name: "Isya", time: "19:45", icon: "🌙" },
];

export const MASJID_NEARBY: MasjidNearby[] = [
  { name: "Masjid Al-Ikhlas", distance: "340m", study: 2, bg: "from-emerald-200 to-teal-300" },
  { name: "Masjid Ar-Rahman", distance: "800m", study: 5, bg: "from-blue-200 to-blue-300" },
  { name: "Masjid Nurul Iman", distance: "1.2km", study: 3, bg: "from-amber-200 to-yellow-300" },
];

export const KAJIAN_LIST: Kajian[] = [
  { icon: "📚", bg: "bg-emerald-50", title: "Fiqih Puasa Ramadhan — Ust. Abdurrahman", tags: ["free", "online"], date: "Jum'at, 14 Feb", time: "19:30" },
  { icon: "🎓", bg: "bg-amber-50", title: "Dauroh Aqidah Intensif 3 Hari", tags: ["paid", "dauroh", "quiz"], date: "15–17 Feb", harga: "Rp 150k" },
  { icon: "🧒", bg: "bg-pink-50", title: "Tahsin Al-Qur'an Anak (Usia 6–12)", tags: ["kids", "tahsin"], date: "Sabtu, 15 Feb", time: "08:00" },
];

export const FAV_MASJID: FavMasjid[] = [
  { name: "Masjid Al-Ikhlas", address: "Jl. Sudirman No.12", bg: "from-emerald-200 to-teal-300", chips: ["📚 2 Kajian", "🗣️ Tahsin", "🪙 Infaq"] },
  { name: "Masjid Ar-Rahman", address: "Jl. Imam Bonjol No.5", bg: "from-blue-200 to-blue-300", chips: ["🎓 5 Kajian", "🌙 I'tikaf"] },
  { name: "Masjid Nurul Iman", address: "Jl. Hang Tuah No.8", bg: "from-amber-200 to-yellow-300", chips: ["📖 Al-Qur'an", "🧒 Kajian Anak"] },
];

export const FAV_USTADZ: FavUstadz[] = [
  { name: "Ust. Abdurrahman, Lc.", meta: "12 kajian aktif · Fiqih & Aqidah", bg: "bg-emerald-50" },
  { name: "Ust. Muhammad Faiz", meta: "8 kajian aktif · Tahsin & Tajwid", bg: "bg-blue-50" },
  { name: "Ust. Abdullah Hakim", meta: "5 kajian aktif · Sirah Nabawiyah", bg: "bg-amber-50" },
  { name: "Ustadzah Fatimah", meta: "6 kajian aktif · Kajian Akhwat", bg: "bg-pink-50" },
];

export const FAV_KAJIAN: Kajian[] = [
  { icon: "📚", bg: "bg-emerald-50", title: "Kitab Tauhid — Ust. Abdurrahman", tags: ["free"], date: "Setiap Ahad", time: "08:00" },
  { icon: "🎓", bg: "bg-amber-50", title: "Fiqih Muamalat Modern", tags: ["paid", "quiz"], date: "Sabtu, 22 Feb", harga: "Rp 200k" },
  { icon: "🎓", bg: "bg-indigo-50", title: "Dauroh Ulumul Hadits", tags: ["dauroh"], date: "1–3 Maret", time: "08:00" },
];

export const CAMPAIGNS: Campaign[] = [
  { Masjid: "Masjid Al-Ikhlas", title: "Pembangunan Lantai 2 & Tempat Wudhu Baru", icon: "🏗️", pct: 68, raised: "Rp 340 juta", target: "Rp 500 juta", urgent: true, bg: "from-emerald-200 to-teal-300" },
  { Masjid: "Masjid Ar-Rahman", title: "Penggantian AC & Sound System Masjid", icon: "⚡", pct: 32, raised: "Rp 96 juta", target: "Rp 300 juta", urgent: false, bg: "from-blue-200 to-blue-300" },
  { Masjid: "Masjid Nurul Iman", title: "Beasiswa Santri Tahfidz Dhuafa", icon: "📚", pct: 55, raised: "Rp 55 juta", target: "Rp 100 juta", urgent: false, bg: "from-pink-100 to-pink-200" },
];

export const AMAL_SECTIONS: AmalSection[] = [
  {
    icon: "🌅", label: "Dzikir Pagi", items: [
      { name: "Dzikir setelah Subuh", count: "1x", done: true },
      { name: "Membaca Ayat Kursi", count: "1x", done: true },
      { name: "Subhanallah (33x)", count: "33x", done: true },
      { name: "Alhamdulillah (33x)", count: "33x", done: true },
      { name: "Allahu Akbar (34x)", count: "34x", done: false },
    ],
  },
  {
    icon: "🕌", label: "Shalat", items: [
      { name: "Shalat Subuh", count: "2 rakaat", done: true },
      { name: "Shalat Dzuhur", count: "4 rakaat", done: true },
      { name: "Shalat Sunnah Dzuhur", count: "4 rakaat", done: true },
      { name: "Shalat Ashar", count: "4 rakaat", done: false },
      { name: "Shalat Maghrib", count: "3 rakaat", done: false },
    ],
  },
  {
    icon: "✨", label: "Amal Lainnya", items: [
      { name: "Sedekah", count: "1x", done: true },
      { name: "Membaca Hadits harian", count: "1x", done: true },
      { name: "Dzikir Petang", count: "1x", done: false },
      { name: "Shalat Tahajud", count: "2 rakaat", done: false },
      { name: "Dzikir Sebelum Tidur", count: "1x", done: false },
    ],
  },
];

export const NAV_ITEMS: NavItem[] = [
  { id: "home", icon: "🏠", label: "Beranda" },
  { id: "favorites", icon: "❤️", label: "Favorit" },
  { id: "infaq", icon: "🪙", label: "Infaq" },
  { id: "amal", icon: "☑️", label: "Amal" },
  { id: "profile", icon: "👤", label: "Profil" },
];

export const PROFILE_ACTIVITY: ProfileActivity[] = [
  { icon: "📚", bg: "bg-emerald-50", label: "Riwayat Kajian", sub: "24 kajian diikuti" },
  { icon: "🏆", bg: "bg-amber-50", label: "Sertifikat & Quiz", sub: "7 sertifikat diperoleh" },
  { icon: "🪙", bg: "bg-teal-50", label: "Riwayat Infaq", sub: "Total Rp 850.000" },
  { icon: "☑️", bg: "bg-slate-50", label: "Progress Amal Harian", sub: "Streak 7 hari 🔥" },
];

export const PROFILE_SETTINGS: ProfileActivity[] = [
  { icon: "🔔", bg: "bg-purple-50", label: "Notifikasi", sub: "Pengingat shalat & kajian" },
  { icon: "📍", bg: "bg-blue-50", label: "Lokasi", sub: "Kota Pekanbaru, Riau" },
  { icon: "👤", bg: "bg-amber-50", label: "Edit Profil", sub: "Nama, foto, bio" },
  { icon: "🚪", bg: "bg-red-50", label: "Keluar", sub: "Logout dari akun" },
];

export const INFAQ_FILTERS = ["Semua", "Pembangunan", "Operasional", "Sosial", "Darurat"];

export const INFAQ_HISTORY = [
  { label: "Masjid Al-Ikhlas", val: "Rp 100k" },
  { label: "Beasiswa Santri", val: "Rp 250k" },
  { label: "Masjid Ar-Rahman", val: "Rp 500k" },
];

export const TAG_STYLES: Record<string, string> = {
  free: "bg-emerald-100 text-emerald-700",
  paid: "bg-amber-100 text-amber-700",
  kids: "bg-pink-100 text-pink-700",
  quiz: "bg-orange-100 text-orange-700",
  dauroh: "bg-red-100 text-red-700",
  online: "bg-indigo-100 text-indigo-700",
  tahsin: "bg-teal-100 text-teal-700",
};

export const TAG_LABELS: Record<string, string> = {
  free: "Gratis",
  paid: "Berbayar",
  kids: "Anak-anak",
  quiz: "Ada Quiz",
  dauroh: "Dauroh",
  online: "Online",
  tahsin: "Tahsin",
};

export const THEME = {
  primary: "#0b3d2e",
  primaryLight: "#1a6b4a",
  accent: "#f0c96a",
  background: "#f5f7f5",
};
