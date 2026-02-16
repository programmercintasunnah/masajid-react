import quranImg from "../assets/quran.png";
import manuscriptImg from "../assets/manuscript.png";
import studyImg from "../assets/study.png";
import prayImg from "../assets/pray.png";
import infaqImg from "../assets/infaq.png";
import iqroImg from "../assets/iqro.png";
import moreImg from "../assets/more.png";
import quizImg from "../assets/quiz.png";

export const MENUS: { img: string; label: string; bg: string; page: string }[] = [
  { img: quranImg, label: "Al-Quran", bg: "from-emerald-100 to-teal-200", page: "quran" },
  { img: manuscriptImg, label: "Hadits", bg: "from-amber-100 to-yellow-200", page: "hadits" },
  { img: studyImg, label: "Kajian", bg: "from-blue-100 to-blue-200", page: "kajian" },
  { img: iqroImg, label: "Tahsin", bg: "from-pink-100 to-pink-200", page: "tahsin" },
  { img: prayImg, label: "Dzikir & Doa", bg: "from-purple-100 to-purple-200", page: "dzikir" },
  { img: infaqImg, label: "Infaq", bg: "from-teal-100 to-emerald-200", page: "infaq" },
  { img: quizImg, label: "Kuis", bg: "from-orange-100 to-orange-200", page: "quiz" },
  { img: moreImg, label: "Lainnya", bg: "from-slate-100 to-slate-200", page: "other" },
];

export const MAIN_NAV = [
  { id: "home" as const, label: "Beranda" },
  { id: "favorites" as const, label: "Favorit" },
  { id: "infaq" as const, label: "Infaq" },
  { id: "quiz" as const, label: "Kuis" },
  { id: "profile" as const, label: "Profil" },
];
