import { SectionLabel } from "../components/ui/SectionLabel";
import { MasjidCard } from "../components/ui/MasjidCard";
import { KajianCard } from "../components/ui/KajianCard";
import { Header } from "../components/layout/Header";
import { Landmark } from "lucide-react";

import quranImg from "../assets/quran.png";
import manuscriptImg from "../assets/manuscript.png";
import studyImg from "../assets/study.png";
import prayImg from "../assets/pray.png";
import infaqImg from "../assets/infaq.png";
import iqroImg from "../assets/iqro.png";
import mosqueImg from "../assets/prophets-mosque.png";
import moreImg from "../assets/more.png";

const MENUS: { img: string; label: string; bg: string }[] = [
  { img: quranImg, label: "Al-Qur'an", bg: "from-emerald-100 to-teal-200" },
  { img: manuscriptImg, label: "Hadits", bg: "from-amber-100 to-yellow-200" },
  { img: studyImg, label: "Kajian", bg: "from-blue-100 to-blue-200" },
  { img: iqroImg, label: "Tahsin", bg: "from-pink-100 to-pink-200" },
  { img: prayImg, label: "Dzikir & Doa", bg: "from-purple-100 to-purple-200" },
  { img: infaqImg, label: "Infaq", bg: "from-teal-100 to-emerald-200" },
  { img: mosqueImg, label: "Masjid", bg: "from-yellow-100 to-amber-200" },
  { img: moreImg, label: "Lainnya", bg: "from-slate-100 to-slate-200" },
];

const MASJID_NEARBY = [
  { name: "Masjid Al-Ikhlas", distance: "340m", study: 2, bg: "from-emerald-200 to-teal-300" },
  { name: "Masjid Ar-Rahman", distance: "800m", study: 5, bg: "from-blue-200 to-blue-300" },
  { name: "Masjid Nurul Iman", distance: "1.2km", study: 3, bg: "from-amber-200 to-yellow-300" },
];

const KAJIAN_LIST = [
  { icon: "📚", bg: "bg-emerald-50", title: "Fiqih Puasa Ramadhan — Ust. Abdurrahman", tags: ["free", "online"], date: "Jum'at, 14 Feb", time: "19:30" },
  { icon: "🎓", bg: "bg-amber-50", title: "Dauroh Aqidah Intensif 3 Hari", tags: ["paid", "dauroh", "quiz"], date: "15–17 Feb", harga: "Rp 150k" },
  { icon: "🧒", bg: "bg-pink-50", title: "Tahsin Al-Qur'an Anak (Usia 6–12)", tags: ["kids", "tahsin"], date: "Sabtu, 15 Feb", time: "08:00" },
];

export function PageHome() {
  return (
    <>
      <Header userName="Ahmad Fauzan" />

      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none bg-[#f5f7f5]">
        <SectionLabel>Menu</SectionLabel>
        <div className="grid grid-cols-4 gap-3 px-5">
          {MENUS.map((m, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer group">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.bg} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                <img src={m.img} alt={m.label} className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-semibold text-gray-600 text-center leading-tight">{m.label}</span>
            </div>
          ))}
        </div>

        <SectionLabel extra="Lihat semua →">Masjid Terdekat</SectionLabel>
        <div className="flex gap-3 px-5 overflow-x-auto scrollbar-none pb-1">
          {MASJID_NEARBY.map((m, i) => <MasjidCard key={i} item={m} />)}
        </div>

        <SectionLabel>Infaq Terkini</SectionLabel>
        <div className="mx-5 mb-2.5 rounded-2xl p-4 flex justify-between items-center relative overflow-hidden" style={{ background: "linear-gradient(130deg,#0b3d2e,#1a6b4a)" }}>
          <div className="absolute right-4 bottom-[-6px] opacity-10">
            <Landmark className="w-[50px] h-[50px] text-white" />
          </div>
          <div className="relative z-10">
            <div className="text-[13px] font-bold text-white mb-1">Pembangunan Masjid At-Taqwa</div>
            <div className="text-[10px] text-white/60 mb-2">Bantu selesaikan pembangunan lantai 2</div>
            <div className="w-40 h-[3px] bg-white/20 rounded-full mb-1.5">
              <div className="h-full w-[68%] bg-amber-300 rounded-full" />
            </div>
            <div className="text-[9px] text-amber-300">68% · Rp 340jt dari Rp 500jt</div>
          </div>
          <button className="relative z-10 bg-amber-500 text-white text-[12px] font-bold px-4 py-2 rounded-xl">Infaq</button>
        </div>

        <SectionLabel extra="Lihat semua →">Kajian Mendatang</SectionLabel>
        {KAJIAN_LIST.map((k, i) => <KajianCard key={i} item={k} />)}
        <div className="h-6" />
      </div>
    </>
  );
}
