import { SectionLabel } from "../ui/SectionLabel";
import { PROFILE_ACTIVITY, PROFILE_SETTINGS } from "../../data/mockData";

export function PageProfil() {
  return (
    <>
      <div className="flex-shrink-0 text-center px-5 pt-10 pb-6" style={{ background: "linear-gradient(160deg,#0b3d2e 0%,#1a6b4a 70%)" }}>
        <div className="w-18 h-18 rounded-full overflow-hidden mx-auto mb-2.5 border-[3px] border-white/30" style={{ width: 72, height: 72 }}>
          <img src="/image.png" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="text-[18px] font-black text-white mb-1">Izz Al-Islam</div>
        <div className="text-[12px] text-white/55 mb-4">izz.alislam@ukhuwah.tech</div>
        <div className="flex gap-3 justify-center">
          {[
            { val: "24", lbl: "Kajian" },
            { val: "7", lbl: "Sertifikat" },
            { val: "🔥7", lbl: "Hari streak" },
          ].map((s, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2.5 text-center border border-white/15">
              <div className="text-[18px] font-black text-white leading-none">{s.val}</div>
              <div className="text-[10px] text-white/55 mt-0.5">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#f5f7f5]">
        <SectionLabel>Aktivitas Saya</SectionLabel>
        <div className="mx-5 mb-3 bg-white rounded-2xl overflow-hidden shadow-sm">
          {PROFILE_ACTIVITY.map((m, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3.5 border-b border-black/[0.05] last:border-b-0 cursor-pointer hover:bg-black/[0.02] transition-colors`}>
              <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-[17px] flex-shrink-0 ${m.bg}`}>{m.icon}</div>
              <div className="flex-1">
                <div className="text-[13px] font-bold text-gray-900">{m.label}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{m.sub}</div>
              </div>
              <span className="text-gray-300 text-[14px]">›</span>
            </div>
          ))}
        </div>

        <SectionLabel>Pengaturan</SectionLabel>
        <div className="mx-5 mb-3 bg-white rounded-2xl overflow-hidden shadow-sm">
          {PROFILE_SETTINGS.map((m, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3.5 border-b border-black/[0.05] last:border-b-0 cursor-pointer hover:bg-black/[0.02] transition-colors`}>
              <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-[17px] flex-shrink-0 ${m.bg}`}>{m.icon}</div>
              <div className="flex-1">
                <div className="text-[13px] font-bold text-gray-900">{m.label}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{m.sub}</div>
              </div>
              <span className="text-gray-300 text-[14px]">›</span>
            </div>
          ))}
        </div>
        <div className="h-6" />
      </div>
    </>
  );
}
