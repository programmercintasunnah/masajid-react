import { useState } from "react";
import { SectionLabel } from "../ui/SectionLabel";
import { FilterChip } from "../ui/FilterChip";
import { CampaignCard } from "../ui/CampaignCard";
import { CAMPAIGNS, INFAQ_FILTERS, INFAQ_HISTORY } from "../../data/mockData";

export function PageInfaq() {
  const [filter, setFilter] = useState("Semua");

  return (
    <>
      <div className="flex-shrink-0 px-5 pt-10 pb-5" style={{ background: "linear-gradient(160deg,#0b3d2e 0%,#1a6b4a 70%)" }}>
        <div className="flex justify-between items-start mb-0">
          <div>
            <h2 className="text-xl font-black text-white">🪙 Infaq & Sedekah</h2>
            <p className="text-[12px] text-white/55 mt-0.5">Titip kebaikan lewat masjid</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2.5 border border-white/15 text-center">
            <div className="text-[11px] text-white/60">Total Infaqmu</div>
            <div className="text-[20px] font-black text-amber-300 leading-tight">Rp 850k</div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 px-5 py-3 overflow-x-auto scrollbar-none bg-white border-b border-black/[0.06] flex-shrink-0">
        {INFAQ_FILTERS.map(f => (
          <FilterChip key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
        ))}
      </div>

      <div className="flex-1 overflow-y-auto bg-[#f5f7f5]">
        <SectionLabel extra="12 campaign →">Campaign Aktif</SectionLabel>
        {CAMPAIGNS.map((c, i) => <CampaignCard key={i} item={c} />)}

        <SectionLabel>Riwayat Infaqmu</SectionLabel>
        <div className="mx-5 mb-3 bg-white rounded-2xl overflow-hidden shadow-sm">
          {INFAQ_HISTORY.map((r, i, arr) => (
            <div key={i} className={`flex justify-between items-center px-4 py-3 ${i < arr.length - 1 ? "border-b border-black/[0.05]" : ""}`}>
              <span className="text-[12px] font-bold text-gray-900">{r.label}</span>
              <span className="text-[13px] font-black text-emerald-700">{r.val}</span>
            </div>
          ))}
        </div>
        <div className="h-6" />
      </div>
    </>
  );
}
