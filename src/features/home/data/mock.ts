import type { MenuItem } from "@/types";
import quranImg from "@/assets/quran.png";
import manuscriptImg from "@/assets/manuscript.png";
import studyImg from "@/assets/study.png";
import prayImg from "@/assets/pray.png";
import infaqImg from "@/assets/infaq.png";
import iqroImg from "@/assets/iqro.png";
import mosqueImg from "@/assets/prophets-mosque.png";
import moreImg from "@/assets/more.png";

export const MENUS: MenuItem[] = [
  { id: "quran", img: quranImg, label: "Al-Qur'an", bg: "from-emerald-100 to-teal-200" },
  { id: "hadits", img: manuscriptImg, label: "Hadits", bg: "from-amber-100 to-yellow-200" },
  { id: "kajian", img: studyImg, label: "Kajian", bg: "from-blue-100 to-blue-200" },
  { id: "tahsin", img: iqroImg, label: "Tahsin", bg: "from-pink-100 to-pink-200" },
  { id: "dzikir", img: prayImg, label: "Dzikir & Doa", bg: "from-purple-100 to-purple-200" },
  { id: "infaq", img: infaqImg, label: "Infaq", bg: "from-teal-100 to-emerald-200" },
  { id: "mosque", img: mosqueImg, label: "Masjid", bg: "from-yellow-100 to-amber-200" },
  { id: "more", img: moreImg, label: "Lainnya", bg: "from-slate-100 to-slate-200" },
];
