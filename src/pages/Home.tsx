import { SectionLabel } from "../components/ui/SectionLabel";
import { MosqueCard } from "../components/ui/MosqueCard";
import { KajianCard } from "../components/ui/KajianCard";
import { Header } from "../components/layout/Header";

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
  { name: "Masjid Al-Ikhlas", distance: "340m", study: 2, bg: "from-emerald-200 to-teal-300", youtubeLive: "erjeTV" },
  { name: "Masjid Ar-Rahman", distance: "800m", study: 5, bg: "from-blue-200 to-blue-300", youtubeLive: "" },
  { name: "Masjid Nurul Iman", distance: "1.2km", study: 3, bg: "from-amber-200 to-yellow-300", youtubeLive: "" },
];

const KAJIAN_LIVE = [
  { id: 1, mosque: "Masjid Al-Ikhlas", title: "Kajian Kitab Tauhid", ustadz: "Ust. Abdurrahman, Lc.", youtubeId: "X9CEm2ZTK-8", isLive: false, viewers: 124, bg: "from-emerald-200 to-teal-300" },
  { id: 2, mosque: "Masjid Nurul Iman", title: "Tafsir Al-Quran", ustadz: "Ust. Ahmad", youtubeId: "", isLive: true, viewers: 45, bg: "from-amber-200 to-yellow-300" },
  { id: 3, mosque: "Masjid Al-Ikhsan", title: "Fiqih Shalat", ustadz: "Ust. Yazid", youtubeId: "", isLive: false, viewers: 0, bg: "from-blue-200 to-blue-300" },
];

const KAJIAN_LIST = [
  { icon: "📚", bg: "bg-emerald-50", title: "Fiqih Puasa Ramadhan — Ust. Abdurrahman", tags: ["free", "online"], date: "Jum'at, 14 Feb", time: "19:30" },
  { icon: "🎓", bg: "bg-amber-50", title: "Dauroh Aqidah Intensif 3 Hari", tags: ["paid", "dauroh", "quiz"], date: "15–17 Feb", harga: "Rp 150k" },
  { icon: "🧒", bg: "bg-pink-50", title: "Tahsin Al-Qur'an Anak (Usia 6–12)", tags: ["kids", "tahsin"], date: "Sabtu, 15 Feb", time: "08:00" },
];

export function PageHome() {
  return (
    <>
      <Header userName="Zakie Alelm" />

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
          {MASJID_NEARBY.map((m, i) => <MosqueCard key={i} item={m} />)}
        </div>

        <SectionLabel extra="Lihat semua →">Kajian Live</SectionLabel>
        <div className="flex gap-3 px-5 overflow-x-auto scrollbar-none pb-1">
          {KAJIAN_LIVE.map((k) => (
            <div key={k.id} className="min-w-[240px] bg-white rounded-2xl overflow-hidden shadow-sm border border-black/[0.04] flex-shrink-0 cursor-pointer">
              <div className="relative pt-[56.25%] bg-black">
                {k.youtubeId ? (
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${k.youtubeId}`}
                    title={k.title}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                    <span className="text-white/80 text-xs font-medium px-2 text-center">Tidak ada stream</span>
                  </div>
                )}
                {k.isLive && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    LIVE
                  </div>
                )}
              </div>
              <div className="p-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-[#0b3d2e]">{k.mosque}</span>
                  {k.isLive && <span className="text-[9px] text-gray-400">• {k.viewers} penonton</span>}
                </div>
                <div className="text-[11px] font-bold text-gray-900 mb-0.5 truncate">{k.title}</div>
                <div className="text-[10px] text-gray-500">{k.ustadz}</div>
              </div>
            </div>
          ))}
        </div>

        <SectionLabel extra="Lihat semua →">Kajian Mendatang</SectionLabel>
        {KAJIAN_LIST.map((k, i) => <KajianCard key={i} item={k} />)}
        <div className="h-6" />
      </div>
    </>
  );
}
