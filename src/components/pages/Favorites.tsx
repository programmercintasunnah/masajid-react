import { useState } from "react";
import type { FavTab } from "../../types";
import { SectionLabel } from "../ui/SectionLabel";
import { KajianCard } from "../ui/KajianCard";
import { Heart, Landmark, User, BookOpen, MapPin, Check } from "lucide-react";

const FAV_MASJID = [
  { name: "Masjid Al-Ikhlas", alamat: "Jl. Sudirman No.12", bg: "from-emerald-200 to-teal-300", chips: ["📚 2 Kajian", "🗣️ Tahsin", "🪙 Infaq"] },
  { name: "Masjid Ar-Rahman", alamat: "Jl. Imam Bonjol No.5", bg: "from-blue-200 to-blue-300", chips: ["🎓 5 Kajian", "🌙 I'tikaf"] },
  { name: "Masjid Nurul Iman", alamat: "Jl. Hang Tuah No.8", bg: "from-amber-200 to-yellow-300", chips: ["📖 Al-Qur'an", "🧒 Kajian Anak"] },
];

const FAV_USTADZ = [
  { name: "Ust. Abdurrahman, Lc.", meta: "12 kajian aktif · Fiqih & Aqidah", bg: "bg-emerald-50" },
  { name: "Ust. Muhammad Faiz", meta: "8 kajian aktif · Tahsin & Tajwid", bg: "bg-blue-50" },
  { name: "Ust. Abdullah Hakim", meta: "5 kajian aktif · Sirah Nabawiyah", bg: "bg-amber-50" },
  { name: "Ustadzah Fatimah", meta: "6 kajian aktif · Kajian Akhwat", bg: "bg-pink-50" },
];

const FAV_KAJIAN = [
  { icon: "📚", bg: "bg-emerald-50", title: "Kitab Tauhid — Ust. Abdurrahman", tags: ["free"], date: "Setiap Ahad", time: "08:00" },
  { icon: "🎓", bg: "bg-amber-50", title: "Fiqih Muamalat Modern", tags: ["paid", "quiz"], date: "Sabtu, 22 Feb", harga: "Rp 200k" },
  { icon: "🎓", bg: "bg-indigo-50", title: "Dauroh Ulumul Hadits", tags: ["dauroh"], date: "1–3 Maret", time: "08:00" },
];

export function PageFavorites() {
  const [tab, setTab] = useState<FavTab>("mosque");

  return (
    <>
      <div className="flex-shrink-0 px-5 pt-10 pb-4" style={{ background: "linear-gradient(160deg,#0b3d2e 0%,#1a6b4a 70%)" }}>
        <h2 className="text-xl font-black text-white mb-0.5 flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Favorit
        </h2>
        <p className="text-[12px] text-white/55">Masjid & ustadz yang kamu ikuti</p>
      </div>

      <div className="flex bg-white border-b border-black/[0.07] flex-shrink-0">
        {[
          { id: "mosque" as FavTab, icon: Landmark, label: "Masjid (3)" },
          { id: "teacher" as FavTab, icon: User, label: "Ustadz (4)" },
          { id: "study" as FavTab, icon: BookOpen, label: "Kajian (3)" },
        ].map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-3 text-[12px] font-bold border-b-2 transition-all flex items-center justify-center gap-1 ${tab === t.id ? "text-[#0b3d2e] border-[#0b3d2e]" : "text-gray-400 border-transparent"}`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto bg-[#f5f7f5]">
        {tab === "mosque" && (
          <>
            <SectionLabel>Update Terbaru</SectionLabel>
            {FAV_MASJID.map((m, i) => (
              <div key={i} className="mx-5 mb-3 bg-white rounded-2xl overflow-hidden shadow-sm border border-black/[0.04] cursor-pointer hover:-translate-y-0.5 transition-transform">
                <div className={`h-24 bg-gradient-to-br ${m.bg} flex items-center justify-center relative`}>
                  <Landmark className="w-12 h-12 text-white/80" />
                </div>
                <div className="p-3">
                  <div className="text-[14px] font-black text-gray-900 mb-1">{m.name}</div>
                  <div className="text-[11px] text-gray-400 mb-2.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {m.alamat}
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {m.chips.map((c, j) => (
                      <span key={j} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {tab === "teacher" && (
          <>
            <SectionLabel>Ustadz Diikuti</SectionLabel>
            {FAV_USTADZ.map((u, i) => (
              <div key={i} className="mx-5 mb-2.5 bg-white rounded-2xl p-3.5 flex gap-3 items-center shadow-sm border border-black/[0.04] cursor-pointer">
                <div className={`w-13 h-13 rounded-full flex items-center justify-center border-2 border-emerald-100 flex-shrink-0 ${u.bg}`} style={{ width: 52, height: 52 }}>
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-bold text-gray-900 mb-1">{u.name}</div>
                  <div className="text-[11px] text-gray-400 mb-2">{u.meta}</div>
                  <button className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Diikuti
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {tab === "study" && (
          <>
            <SectionLabel>Kajian Tersimpan</SectionLabel>
            {FAV_KAJIAN.map((k, i) => <KajianCard key={i} item={k} />)}
          </>
        )}
        <div className="h-6" />
      </div>
    </>
  );
}
