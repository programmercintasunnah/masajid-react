import { useState } from "react";
import { AMAL_SECTIONS } from "../../data/mockData";

export function PageAmal() {
  const [sections, setSections] = useState(AMAL_SECTIONS.map(s => ({
    ...s,
    items: s.items.map(it => ({ ...it })),
  })));

  const total = sections.flatMap(s => s.items).length;
  const done = sections.flatMap(s => s.items).filter(it => it.done).length;
  const pct = Math.round((done / total) * 100);
  const circumference = 2 * Math.PI * 24;
  const offset = circumference - (pct / 100) * circumference;

  const toggle = (si: number, ii: number) => {
    setSections(prev => prev.map((s, sIdx) => sIdx !== si ? s : {
      ...s,
      items: s.items.map((it, iIdx) => iIdx !== ii ? it : { ...it, done: !it.done }),
    }));
  };

  return (
    <>
      <div className="flex-shrink-0 px-5 pt-10 pb-5" style={{ background: "linear-gradient(160deg,#0b3d2e 0%,#1a6b4a 70%)" }}>
        <h2 className="text-xl font-black text-white mb-3">☑️ Amal Harian</h2>
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-3.5 border border-white/10">
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="5" />
              <circle cx="30" cy="30" r="24" fill="none" stroke="#f0c96a" strokeWidth="5"
                strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[13px] font-black text-white">{pct}%</div>
          </div>
          <div>
            <div className="text-[14px] font-bold text-white mb-1">{done} dari {total} amal selesai</div>
            <div className="text-[11px] text-white/60">Kamis, 12 Februari 2026</div>
            <div className="text-[11px] text-amber-300 mt-1">🔥 Streak 7 hari berturut!</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#f5f7f5]">
        <div className="h-3.5" />

        <div className="mx-5 mb-3 bg-white rounded-2xl p-4 shadow-sm">
          <h4 className="text-[12px] font-bold text-gray-900 mb-2.5">📖 Target Baca Al-Qur'an Hari Ini</h4>
          <div className="h-2 bg-gray-100 rounded-full mb-2">
            <div className="h-full w-[45%] bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full" />
          </div>
          <div className="flex justify-between text-[11px] text-gray-400">
            <span>Sudah: <strong className="text-emerald-700">2 halaman</strong></span>
            <span>Target: <strong className="text-emerald-700">4 halaman</strong></span>
          </div>
        </div>

        {sections.map((sec, si) => {
          const doneCount = sec.items.filter(it => it.done).length;
          return (
            <div key={si} className="mx-5 mb-3 bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-black/[0.05]" style={{ background: "linear-gradient(90deg,rgba(30,107,74,0.06),transparent)" }}>
                <span className="text-base">{sec.icon}</span>
                <span className="text-[12px] font-bold text-gray-900 flex-1">{sec.label}</span>
                <span className="text-[10px] text-gray-400">{doneCount}/{sec.items.length} ✓</span>
              </div>
              {sec.items.map((it, ii) => (
                <button
                  key={ii}
                  onClick={() => toggle(si, ii)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-black/[0.04] last:border-b-0 hover:bg-black/[0.02] transition-colors`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-[12px] transition-all ${it.done ? "bg-emerald-500 border-emerald-500 text-white" : "border-gray-300"}`}>
                    {it.done ? "✓" : ""}
                  </div>
                  <span className={`text-[12px] font-semibold flex-1 transition-colors ${it.done ? "text-gray-400 line-through" : "text-gray-900"}`}>{it.name}</span>
                  <span className="text-[11px] text-gray-400">{it.count}</span>
                </button>
              ))}
            </div>
          );
        })}
        <div className="h-6" />
      </div>
    </>
  );
}
