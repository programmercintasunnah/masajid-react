import { SectionLabel } from "../ui/SectionLabel";
import { MasjidCard } from "../ui/MasjidCard";
import { KajianCard } from "../ui/KajianCard";
import { PRAYER_TIMES, MENUS, MASJID_NEARBY, KAJIAN_LIST } from "../../data/mockData";

export function PageBeranda() {
  return (
    <>
      <div className="relative overflow-hidden flex-shrink-0" style={{ background: "linear-gradient(160deg,#0b3d2e 0%,#1a6b4a 55%,#1f8a5e 100%)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 85% 15%,rgba(201,148,58,0.2) 0%,transparent 55%)" }} />
        <div className="relative z-10 px-5 pt-9 pb-5">
          <div className="flex justify-between text-[12px] text-white/60 font-medium mb-3">
            <span>Kamis, 12 Februari 2026</span>
            <span>24 Sha'ban 1447H</span>
          </div>
          <div className="text-center mb-1.5">
            <span className="text-[64px] font-black text-white leading-none tracking-[-3px]" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>14:17</span>
          </div>
          <div className="text-center text-[12px] text-white/60 mb-4">
            ± 1 jam 32 menit lagi menuju waktu <strong className="text-amber-300">Ashar</strong>
          </div>
          <div className="flex justify-between items-center bg-black/20 backdrop-blur-sm rounded-2xl px-3 py-2.5 border border-white/10">
            {PRAYER_TIMES.map((p, i) => (
              <div key={i} className={`flex flex-col items-center gap-1 flex-1 ${i > 0 ? "border-l border-white/10" : ""}`}>
                <span className="text-[17px]">{p.icon}</span>
                <span className={`text-[10px] font-medium ${p.active ? "text-amber-300" : "text-white/55"}`}>{p.name}</span>
                <span className={`text-[12px] font-bold ${p.active ? "text-amber-300" : "text-white"}`}>{p.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-[11px] text-white/50 px-5 pt-2 pb-0 flex-shrink-0" style={{ background: "linear-gradient(160deg,#0b3d2e,#1a6b4a 60%)" }}>
        📍 Kota Pekanbaru, Riau
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none bg-[#f5f7f5]">
        <SectionLabel>Menu</SectionLabel>
        <div className="grid grid-cols-4 gap-3 px-5">
          {MENUS.map((m, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer group">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.bg} flex items-center justify-center text-2xl group-hover:scale-105 transition-transform`}>
                {m.icon}
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
          <div className="absolute right-4 bottom-[-6px] text-[50px] opacity-10">🕌</div>
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
