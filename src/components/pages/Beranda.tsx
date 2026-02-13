import { SectionLabel } from "../ui/SectionLabel";
import { MasjidCard } from "../ui/MasjidCard";
import { KajianCard } from "../ui/KajianCard";
import { Header } from "../layout/Header";
import { Landmark, BookOpen, GraduationCap, ScrollText, HeartHandshake, Banknote, Mic, MoreHorizontal } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const MENUS: { icon: LucideIcon; label: string; bg: string }[] = [
  { icon: BookOpen, label: "Al-Qur'an", bg: "from-emerald-100 to-teal-200" },
  { icon: GraduationCap, label: "Kajian", bg: "from-blue-100 to-blue-200" },
  { icon: ScrollText, label: "Hadits", bg: "from-amber-100 to-yellow-200" },
  { icon: HeartHandshake, label: "Dzikir & Doa", bg: "from-purple-100 to-purple-200" },
  { icon: Banknote, label: "Infaq", bg: "from-teal-100 to-emerald-200" },
  { icon: Mic, label: "Tahsin", bg: "from-pink-100 to-pink-200" },
  { icon: Landmark, label: "Masjid", bg: "from-yellow-100 to-amber-200" },
  { icon: MoreHorizontal, label: "Lainnya", bg: "from-slate-100 to-slate-200" },
];

const MASJID_NEARBY = [
  { name: "Masjid Al-Ikhlas", jarak: "340m", kajian: 2, bg: "from-emerald-200 to-teal-300" },
  { name: "Masjid Ar-Rahman", jarak: "800m", kajian: 5, bg: "from-blue-200 to-blue-300" },
  { name: "Masjid Nurul Iman", jarak: "1.2km", kajian: 3, bg: "from-amber-200 to-yellow-300" },
];

const KAJIAN_LIST = [
  { icon: "📚", bg: "bg-emerald-50", title: "Fiqih Puasa Ramadhan — Ust. Abdurrahman", tags: ["free", "online"], date: "Jum'at, 14 Feb", time: "19:30" },
  { icon: "🎓", bg: "bg-amber-50", title: "Dauroh Aqidah Intensif 3 Hari", tags: ["paid", "dauroh", "quiz"], date: "15–17 Feb", harga: "Rp 150k" },
  { icon: "🧒", bg: "bg-pink-50", title: "Tahsin Al-Qur'an Anak (Usia 6–12)", tags: ["kids", "tahsin"], date: "Sabtu, 15 Feb", time: "08:00" },
];

export function PageBeranda() {
  return (
    <>
      <Header userName="Ahmad Fauzan" />

      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none bg-[#f5f7f5]">
        <SectionLabel>Menu</SectionLabel>
        <div className="grid grid-cols-4 gap-3 px-5">
          {MENUS.map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.bg} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-semibold text-gray-600 text-center leading-tight">{m.label}</span>
              </div>
            );
          })}
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
