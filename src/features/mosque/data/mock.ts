import type { Mosque } from "@/types";

export const MOSQUE_NEARBY: Mosque[] = [
  { id: "1", name: "Masjid Al-Ikhlas", address: "Jl. Sudirman No.12", distance: "340m", studyCount: 2, bg: "from-emerald-200 to-teal-300" },
  { id: "2", name: "Masjid Ar-Rahman", address: "Jl. Imam Bonjol No.5", distance: "800m", studyCount: 5, bg: "from-blue-200 to-blue-300" },
  { id: "3", name: "Masjid Nurul Iman", address: "Jl. Hang Tuah No.8", distance: "1.2km", studyCount: 3, bg: "from-amber-200 to-yellow-300" },
];

export const FAVORITE_MOSQUES: Mosque[] = [
  { id: "1", name: "Masjid Al-Ikhlas", address: "Jl. Sudirman No.12", bg: "from-emerald-200 to-teal-300", studyCount: 2 },
  { id: "2", name: "Masjid Ar-Rahman", address: "Jl. Imam Bonjol No.5", bg: "from-blue-200 to-blue-300", studyCount: 5 },
  { id: "3", name: "Masjid Nurul Iman", address: "Jl. Hang Tuah No.8", bg: "from-amber-200 to-yellow-300", studyCount: 3 },
];
