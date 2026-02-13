import { useState } from "react";
import type { FavTab } from "../../types";
import { SectionLabel } from "../ui/SectionLabel";
import { KajianCard } from "../ui/KajianCard";
import { FAV_MASJID, FAV_USTADZ, FAV_KAJIAN } from "../../data/mockData";

export function PageFavorit() {
  const [tab, setTab] = useState<FavTab>("masjid");

  return (
    <>
      <div className="flex-shrink-0 px-5 pt-10 pb-4" style={{ background: "linear-gradient(160deg,#0b3d2e 0%,#1a6b4a 70%)" }}>
        <h2 className="text-xl font-black text-white mb-0.5">❤️ Favorit</h2>
        <p className="text-[12px] text-white/55">Masjid & ustadz yang kamu ikuti</p>
      </div>

      <div className="flex bg-white border-b border-black/[0.07] flex-shrink-0">
        {(["masjid", "ustadz", "kajian"] as FavTab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-[12px] font-bold border-b-2 transition-all ${tab === t ? "text-[#0b3d2e] border-[#0b3d2e]" : "text-gray-400 border-transparent"}`}
          >
            {t === "masjid" ? "🕌 Masjid (3)" : t === "ustadz" ? "👳 Ustadz (4)" : "📚 Kajian (3)"}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto bg-[#f5f7f5]">
        {tab === "masjid" && (
          <>
            <SectionLabel>Update Terbaru</SectionLabel>
            {FAV_MASJID.map((m, i) => (
              <div key={i} className="mx-5 mb-3 bg-white rounded-2xl overflow-hidden shadow-sm border border-black/[0.04] cursor-pointer hover:-translate-y-0.5 transition-transform">
                <div className={`h-24 bg-gradient-to-br ${m.bg} flex items-center justify-center text-4xl relative`}>🕌</div>
                <div className="p-3">
                  <div className="text-[14px] font-black text-gray-900 mb-1">{m.name}</div>
                  <div className="text-[11px] text-gray-400 mb-2.5">📍 {m.alamat}</div>
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

        {tab === "ustadz" && (
          <>
            <SectionLabel>Ustadz Diikuti</SectionLabel>
            {FAV_USTADZ.map((u, i) => (
              <div key={i} className="mx-5 mb-2.5 bg-white rounded-2xl p-3.5 flex gap-3 items-center shadow-sm border border-black/[0.04] cursor-pointer">
                <div className={`w-13 h-13 rounded-full flex items-center justify-center text-2xl border-2 border-emerald-100 flex-shrink-0 ${u.bg}`} style={{ width: 52, height: 52 }}>👳</div>
                <div className="flex-1">
                  <div className="text-[13px] font-bold text-gray-900 mb-1">{u.name}</div>
                  <div className="text-[11px] text-gray-400 mb-2">{u.meta}</div>
                  <button className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-lg">✓ Diikuti</button>
                </div>
              </div>
            ))}
          </>
        )}

        {tab === "kajian" && (
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
