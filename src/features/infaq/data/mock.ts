import type { Campaign } from "@/types";

export const ACTIVE_CAMPAIGNS: Campaign[] = [
  { id: "1", mosque: "Masjid Al-Ikhlas", title: "Pembangunan Lantai 2 & Tempat Wudhu Baru", icon: "🏗️", percentage: 68, raised: "Rp 340 juta", target: "Rp 500 juta", urgent: true, bg: "from-emerald-200 to-teal-300" },
  { id: "2", mosque: "Masjid Ar-Rahman", title: "Penggantian AC & Sound System Masjid", icon: "⚡", percentage: 32, raised: "Rp 96 juta", target: "Rp 300 juta", urgent: false, bg: "from-blue-200 to-blue-300" },
  { id: "3", mosque: "Masjid Nurul Iman", title: "Beasiswa Santri Tahfidz Dhuafa", icon: "📚", percentage: 55, raised: "Rp 55 juta", target: "Rp 100 juta", urgent: false, bg: "from-pink-100 to-pink-200" },
];

export const INFAQ_HISTORY = [
  { label: "Masjid Al-Ikhlas", value: "Rp 100k" },
  { label: "Beasiswa Santri", value: "Rp 250k" },
  { label: "Masjid Ar-Rahman", value: "Rp 500k" },
];

export const INFAQ_FILTERS = ["Semua", "Pembangunan", "Operasional", "Sosial", "Darurat"];
