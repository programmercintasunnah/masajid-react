import { SectionLabel } from "../components/ui/SectionLabel";
import { MosqueCard } from "../components/ui/MosqueCard";
import { Header } from "../components/layout/Header";
import abudardaMosque from "../assets/abudarda-mosque.jpeg"
import albadrMosque from "../assets/albadr-mosque.jpeg"

import quranImg from "../assets/quran.png";
import manuscriptImg from "../assets/manuscript.png";
import studyImg from "../assets/study.png";
import prayImg from "../assets/pray.png";
import infaqImg from "../assets/infaq.png";
import iqroImg from "../assets/iqro.png";
import moreImg from "../assets/more.png";
import quizImg from "../assets/quiz.png";

const MENUS: { img: string; label: string; bg: string }[] = [
  { img: quranImg, label: "Al-Qur'an", bg: "from-emerald-100 to-teal-200" },
  { img: manuscriptImg, label: "Hadits", bg: "from-amber-100 to-yellow-200" },
  { img: studyImg, label: "Kajian", bg: "from-blue-100 to-blue-200" },
  { img: iqroImg, label: "Tahsin", bg: "from-pink-100 to-pink-200" },
  { img: prayImg, label: "Dzikir & Doa", bg: "from-purple-100 to-purple-200" },
  { img: infaqImg, label: "Infaq", bg: "from-teal-100 to-emerald-200" },
  { img: quizImg, label: "Kuis", bg: "from-orange-100 to-orange-200" },
  { img: moreImg, label: "Lainnya", bg: "from-slate-100 to-slate-200" },
];

const MASJID_NEARBY = [
  { name: "Masjid Al-Badr", distance: "340m", address: "Jl. Sudirman No. 12, Pekanbaru", kajianToday: "19.30 - Tafsir", image: albadrMosque, bg: "from-emerald-200 to-teal-300", youtubeLive: "erjeTV" },
  { name: "Masjid Abu Darda", distance: "800m", address: "Jl. Imam Bonjol No. 5", kajianToday: "08.00 - Subuh", image: abudardaMosque, bg: "from-blue-200 to-blue-300", youtubeLive: "" },
  { name: "Masjid Umar bin Khattab", distance: "1.2km", address: "Jl. Hang Tuah No. 8, Sukajadi", kajianToday: "16.00 - Akbar", bg: "from-amber-200 to-yellow-300", youtubeLive: "" },
  { name: "Masjid Al-Hijrah", distance: "2.1km", address: "Jl. Pattimura No. 23", kajianToday: "20.00 - Doa", bg: "from-purple-200 to-purple-300", youtubeLive: "" },
  { name: "Masjid Baiturrahman", distance: "3.5km", address: "Jl. Ahmad Yani No. 100, Harapan Raya", kajianToday: "", bg: "from-pink-200 to-pink-300", youtubeLive: "" },
];

const KAJIAN_LIVE = [
  { id: 1, mosque: "Masjid Al-Ikhlas", title: "Kajian Kitab Tauhid", ustadz: "Ust. Abdurrahman, Lc.", youtubeId: "X9CEm2ZTK-8", isLive: true, bg: "from-emerald-200 to-teal-300" },
  { id: 2, mosque: "Masjid Nurul Iman", title: "Tafsir Al-Quran", ustadz: "Ust. Ahmad", youtubeId: "CpDGDo3NDgg", isLive: false, bg: "from-amber-200 to-yellow-300" },
  { id: 3, mosque: "Masjid Abu Darda", title: "Fiqih Shalat", ustadz: "Ust. Yazid", youtubeId: "71iNGcW8yDc", isLive: false, bg: "from-blue-200 to-blue-300" },
  { id: 4, mosque: "Masjid Al-Badr", title: "Kajian Akhlaq", ustadz: "Ust. Faiz", youtubeId: "ULmp9aYw5jM", isLive: true, bg: "from-purple-200 to-purple-300" },
  { id: 5, mosque: "Masjid RJ", title: "Sirah Nabawiyah", ustadz: "Ust. Khalid", youtubeId: "QB8CoT7XMmU", isLive: false, bg: "from-pink-200 to-pink-300" },
];

const MASJID_HARAMAIN = [
  { id: 1, name: "Masjidil Haram", youtubeId: "vcO5boQBTdg", isLive: true },
  { id: 2, name: "Masjid Nabawi", youtubeId: "3L7Gf0BD0gc", isLive: true },
  { id: 3, name: "Kajian Masjid Nabawi (ID)", youtubeId: "bXVOv5WDRkg", isLive: true },
];

const VIDEO_SHORTS = [
  { id: 1, title: "3 Amalan Agar Diterima di Bulan Ramadhan", author: "Ust. Abdurrahman", youtubeId: "8dHpL_sFwoM" },
  { id: 2, title: "Keutamaan Shalat Subuh Berjamaah", author: "Ust. Izzuddin Abdissalam", youtubeId: "74oRlKJkJHo" },
  { id: 3, title: "Cara Menghilangkan Sifat Riya", author: "Ust. Yazid", youtubeId: "KWkftxVeRZI" },
  { id: 4, title: "Niat Puasa: Ini yang Benar!", author: "Ust. Khalid", youtubeId: "zyUU-GPYWeo" },
  { id: 5, title: "Doa Agar Dimudahkan Rezeki", author: "Ust. El Khuzaimah", youtubeId: "13aBa0jI090" },
  { id: 6, title: "Keutamaan Memiliki Anak Perempuan", author: "Ust. Al Muzani", youtubeId: "Fvcd3QrsAUE" },
];

export function PageHome() {
  return (
    <>
      {/* Header - visible on mobile and md, hidden on lg (waktu solat di RightPanel) */}
      <div className="lg:hidden">
        <Header userName="Zakie Alelm" />
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none bg-[#f5f7f5] dark:bg-gray-900 lg:px-8">
        {/* MenuGrid - only visible on mobile (< md) */}
        <div className="md:hidden">
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
        </div>

        <SectionLabel extra="Lihat semua →">Masjid Terdekat</SectionLabel>
        <div className="flex gap-3 px-5 overflow-x-auto scrollbar-none pb-1 lg:overflow-x-auto">
          {MASJID_NEARBY.map((m, i) => <MosqueCard key={i} item={m} />)}
        </div>

        <SectionLabel extra="Lihat semua →">Kajian Live</SectionLabel>
        <div className="flex gap-3 px-5 overflow-x-auto scrollbar-none pb-1 lg:overflow-x-auto">
          {KAJIAN_LIVE.map((k) => (
            <div key={k.id} className="min-w-[240px] lg:min-w-[280px] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-black/[0.04] dark:border-gray-700 flex-shrink-0 cursor-pointer">
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
                  <span className="text-[10px] font-bold text-[#0b3d2e] dark:text-emerald-400">{k.mosque}</span>
                  {k.isLive && <span className="text-[9px] text-gray-400"></span>}
                </div>
                <div className="text-[11px] font-bold text-gray-900 dark:text-white mb-0.5 truncate">{k.title}</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400">{k.ustadz}</div>
              </div>
            </div>
          ))}
        </div>

        <SectionLabel extra="Lihat semua →">Video Pendek</SectionLabel>
        <div className="flex gap-3 px-5 overflow-x-auto scrollbar-none pb-1 lg:overflow-x-auto">
          {VIDEO_SHORTS.map((s) => (
            <div key={s.id} className="w-[140px] lg:w-[180px] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-black/[0.04] dark:border-gray-700 flex-shrink-0 cursor-pointer">
              <div className="pt-[177%] bg-black relative">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${s.youtubeId}`}
                  title={s.title}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-2">
                <div className="text-[10px] font-bold text-gray-900 dark:text-white mb-0.5 line-clamp-2">{s.title}</div>
                <div className="text-[9px] text-gray-400 dark:text-gray-500">{s.author}</div>
              </div>
            </div>
          ))}
        </div>

        <SectionLabel>Live Haramain</SectionLabel>
        <div className="flex gap-3 px-5 overflow-x-auto scrollbar-none pb-1 lg:grid lg:grid-cols-3 lg:gap-4">
          {MASJID_HARAMAIN.map((m) => (
            <div key={m.id} className="min-w-[280px] lg:min-w-0 lg:flex-1 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-black/[0.04] dark:border-gray-700 cursor-pointer">
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
                  <span className="text-[10px] font-bold text-[#0b3d2e] dark:text-emerald-400">{m.name}</span>
                </div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400">Live Streaming</div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-6" />
      </div>
    </>
  );
}
