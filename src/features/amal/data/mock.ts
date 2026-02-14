import type { AmalSection } from "@/types";

export const AMAL_SECTIONS: AmalSection[] = [
  {
    icon: "Morning",
    label: "Dzikir Pagi",
    items: [
      { name: "Dzikir setelah Subuh", count: "1x", done: true },
      { name: "Membaca Ayat Kursi", count: "1x", done: true },
      { name: "Subhanallah (33x)", count: "33x", done: true },
      { name: "Alhamdulillah (33x)", count: "33x", done: true },
      { name: "Allahu Akbar (34x)", count: "34x", done: false },
    ],
  },
  {
    icon: "Prayer",
    label: "Shalat",
    items: [
      { name: "Shalat Subuh", count: "2 rakaat", done: true },
      { name: "Shalat Dzuhur", count: "4 rakaat", done: true },
      { name: "Shalat Sunnah Dzuhur", count: "4 rakaat", done: true },
      { name: "Shalat Ashar", count: "4 rakaat", done: false },
      { name: "Shalat Maghrib", count: "3 rakaat", done: false },
    ],
  },
  {
    icon: "Other",
    label: "Amal Lainnya",
    items: [
      { name: "Sedekah", count: "1x", done: true },
      { name: "Membaca Hadits harian", count: "1x", done: true },
      { name: "Dzikir Petang", count: "1x", done: false },
      { name: "Shalat Tahajud", count: "2 rakaat", done: false },
      { name: "Dzikir Sebelum Tidur", count: "1x", done: false },
    ],
  },
];
