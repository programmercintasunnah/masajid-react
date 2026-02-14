import type { Study } from "@/types";

export const UPCOMING_STUDIES: Study[] = [
  { id: "1", icon: "📚", bg: "bg-emerald-50", title: "Fiqih Puasa Ramadhan — Ust. Abdurrahman", tags: ["free", "online"], date: "Jum'at, 14 Feb", time: "19:30" },
  { id: "2", icon: "🎓", bg: "bg-amber-50", title: "Dauroh Aqidah Intensif 3 Hari", tags: ["paid", "dauroh", "quiz"], date: "15–17 Feb", price: "Rp 150k" },
  { id: "3", icon: "🧒", bg: "bg-pink-50", title: "Tahsin Al-Qur'an Anak (Usia 6–12)", tags: ["kids", "tahsin"], date: "Sabtu, 15 Feb", time: "08:00" },
];

export const SAVED_STUDIES: Study[] = [
  { id: "4", icon: "📚", bg: "bg-emerald-50", title: "Kitab Tauhid — Ust. Abdurrahman", tags: ["free"], date: "Setiap Ahad", time: "08:00" },
  { id: "5", icon: "🎓", bg: "bg-amber-50", title: "Fiqih Muamalat Modern", tags: ["paid", "quiz"], date: "Sabtu, 22 Feb", price: "Rp 200k" },
  { id: "6", icon: "🎓", bg: "bg-indigo-50", title: "Dauroh Ulumul Hadits", tags: ["dauroh"], date: "1–3 Maret", time: "08:00" },
];
