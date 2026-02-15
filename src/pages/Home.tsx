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
  { name: "Masjid Al-Hijrah", distance: "340m", study: 2, bg: "from-emerald-200 to-teal-300", youtubeLive: "erjeTV" },
  { name: "Masjid Abu Darda", distance: "800m", study: 5, bg: "from-blue-200 to-blue-300", youtubeLive: "" },
  { name: "Masjid Umar bin Khattab", distance: "1.2km", study: 3, bg: "from-amber-200 to-yellow-300", youtubeLive: "" },
  { name: "Masjid Al-Mansur", distance: "2.1km", study: 4, bg: "from-purple-200 to-purple-300", youtubeLive: "" },
  { name: "Masjid Baiturrahman", distance: "3.5km", study: 6, bg: "from-pink-200 to-pink-300", youtubeLive: "" },
];

const KAJIAN_LIVE = [
  { id: 1, mosque: "Masjid Al-Ikhlas", title: "Kajian Kitab Tauhid", ustadz: "Ust. Abdurrahman, Lc.", youtubeId: "X9CEm2ZTK-8", isLive: true, bg: "from-emerald-200 to-teal-300" },
  { id: 2, mosque: "Masjid Nurul Iman", title: "Tafsir Al-Quran", ustadz: "Ust. Ahmad", youtubeId: "CpDGDo3NDgg", isLive: false, bg: "from-amber-200 to-yellow-300" },
  { id: 3, mosque: "Masjid Abu Darda", title: "Fiqih Shalat", ustadz: "Ust. Yazid", youtubeId: "71iNGcW8yDc", isLive: false, bg: "from-blue-200 to-blue-300" },
  { id: 4, mosque: "Masjid Al-Badr", title: "Kajian Akhlaq", ustadz: "Ust. Faiz", youtubeId: "ULmp9aYw5jM", isLive: true, bg: "from-purple-200 to-purple-300" },
  { id: 5, mosque: "Masjid RJ", title: "Sirah Nabawiyah", ustadz: "Ust. Khalid", youtubeId: "QB8CoT7XMmU", isLive: false, bg: "from-pink-200 to-pink-300" },
];

const MASJID_SUCIPRAY = [
  { id: 1, name: "Masjidil Haram", youtubeId: "vcO5boQBTdg", isLive: true },
  { id: 2, name: "Masjid Nabawi", youtubeId: "3L7Gf0BD0gc", isLive: true },
  { id: 3, name: "Kajian Masjid Nabawi (ID)", youtubeId: "bXVOv5WDRkg", isLive: true },
];

const YOUTUBE_SHORTS = [
  { id: 1, title: "3 Amalan Agar Diterima di Bulan Ramadhan", author: "Ust. Abdurrahman", youtubeId: "dQw4w9WgXcQ", views: "125RB" },
  { id: 2, title: "Keutamaan Shalat Subuh Berjamaah", author: "Ust. Ahmad Faiz", youtubeId: "dQw4w9WgXcQ", views: "89RB" },
  { id: 3, title: "Cara Menghilangkan Sifat Riya", author: "Ust. Yazid", youtubeId: "dQw4w9WgXcQ", views: "67RB" },
  { id: 4, title: "Niat Puasa: Ini yang Benar!", author: "Ust. Khalid", youtubeId: "dQw4w9WgXcQ", views: "156RB" },
  { id: 5, title: "Doa Agar Dimudahkan Rezeki", author: "Ust. Faiz", youtubeId: "dQw4w9WgXcQ", views: "234RB" },
];

const KAJIAN_LIST = [
  { icon: "📚", bg: "bg-emerald-50", title: "Fiqih Puasa Ramadhan — Ust. Abdurrahman", tags: ["free", "online"], date: "Jum'at, 14 Feb", time: "19:30" },
  { icon: "🎓", bg: "bg-amber-50", title: "Dauroh Aqidah Intensif 3 Hari", tags: ["paid", "dauroh", "quiz"], date: "15–17 Feb", harga: "Rp 150k" },
  { icon: "🧒", bg: "bg-pink-50", title: "Tahsin Al-Qur'an Anak (Usia 6–12)", tags: ["kids", "tahsin"], date: "Sabtu, 15 Feb", time: "08:00" },
  { icon: "📖", bg: "bg-blue-50", title: "Kajian Tafsir Al-Baqarah", tags: ["free"], date: "Minggu, 16 Feb", time: "16:00" },
  { icon: "🕌", bg: "bg-purple-50", title: "Kajian Sirah Nabawiyah", tags: ["free", "online"], date: "Senin, 17 Feb", time: "20:00" },
];

export function PageHome() {
  return (
    <>
      <Header userName="Zakie Alelm" />

      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none bg-[#f5f7f5] lg:px-8">
        <SectionLabel>Menu</SectionLabel>
        <div className="grid grid-cols-4 gap-3 px-5 lg:grid-cols-8 lg:gap-6 lg:px-0">
          {MENUS.map((m, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer group">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.bg} flex items-center justify-center group-hover:scale-105 transition-transform lg:w-20 lg:h-20`}>
                <img src={m.img} alt={m.label} className="w-7 h-7 lg:w-10 lg:h-10" />
              </div>
              <span className="text-[10px] font-semibold text-gray-600 text-center leading-tight lg:text-sm">{m.label}</span>
            </div>
          ))}
        </div>

        <SectionLabel extra="Lihat semua →">Masjid Terdekat</SectionLabel>
        <div className="flex gap-3 px-5 overflow-x-auto scrollbar-none pb-1 lg:overflow-x-auto">
          {MASJID_NEARBY.map((m, i) => <MosqueCard key={i} item={m} />)}
        </div>

        <SectionLabel extra="Lihat semua →">Kajian Live</SectionLabel>
        <div className="flex gap-3 px-5 overflow-x-auto scrollbar-none pb-1 lg:overflow-x-auto">
          {KAJIAN_LIVE.map((k) => (
            <div key={k.id} className="min-w-[240px] lg:min-w-[280px] bg-white rounded-2xl overflow-hidden shadow-sm border border-black/[0.04] flex-shrink-0 cursor-pointer">
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
                    <span className="text-white/80 text-xs font-medium px-2 text-center">Tidak ada video</span>
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
                  {k.isLive && <span className="text-[9px] text-gray-400"></span>}
                </div>
                <div className="text-[11px] font-bold text-gray-900 mb-0.5 truncate">{k.title}</div>
                <div className="text-[10px] text-gray-500">{k.ustadz}</div>
              </div>
            </div>
          ))}
        </div>

        <SectionLabel extra="Lihat semua →">Kajian Mendatang</SectionLabel>
        {KAJIAN_LIST.map((k, i) => <KajianCard key={i} item={k} />)}

        <SectionLabel>Live Haramain</SectionLabel>
        <div className="flex gap-3 px-5 overflow-x-auto scrollbar-none pb-1 lg:grid lg:grid-cols-3 lg:gap-4">
          {MASJID_SUCIPRAY.map((m) => (
            <div key={m.id} className="min-w-[280px] lg:min-w-0 lg:flex-1 bg-white rounded-2xl overflow-hidden shadow-sm border border-black/[0.04] cursor-pointer">
              <div className="relative pt-[56.25%] bg-black">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${m.youtubeId}`}
                  title={m.name}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                {m.isLive && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    LIVE
                  </div>
                )}
              </div>
              <div className="p-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-[#0b3d2e]">{m.name}</span>
                </div>
                <div className="text-[10px] text-gray-500">Live Streaming</div>
              </div>
            </div>
          ))}
        </div>

        <SectionLabel extra="Lihat semua →">YouTube Shorts</SectionLabel>
        <div className="flex gap-3 px-5 overflow-x-auto scrollbar-none pb-1 lg:overflow-x-auto">
          {YOUTUBE_SHORTS.map((s) => (
            <div key={s.id} className="min-w-[140px] lg:min-w-[180px] bg-white rounded-2xl overflow-hidden shadow-sm border border-black/[0.04] flex-shrink-0 cursor-pointer">
              <div className="relative pt-[177%] bg-black">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${s.youtubeId}`}
                  title={s.title}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-2">
                <div className="text-[10px] font-bold text-gray-900 mb-0.5 line-clamp-2">{s.title}</div>
                <div className="text-[9px] text-gray-400">{s.views} views</div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-6" />
      </div>
    </>
  );
}
