import { useState } from "react";
import { SectionLabel } from "../components/ui/SectionLabel";
import { FilterChip } from "../components/ui/FilterChip";
import { CampaignCard } from "../components/ui/CampaignCard";
import { Banknote } from "lucide-react";

const INFAQ_FILTERS = ["Semua", "Pembangunan", "Operasional", "Sosial", "Darurat"];

const CAMPAIGNS = [
  { id: "1", mosque: "Masjid Al-Ikhlas", title: "Pembangunan Lantai 2 & Tempat Wudhu Baru", icon: "🏗️", percentage: 68, raised: "Rp 340 juta", target: "Rp 500 juta", urgent: true, bg: "from-emerald-200 to-teal-300" },
  { id: "2", mosque: "Masjid Ar-Rahman", title: "Penggantian AC & Sound System Masjid", icon: "⚡", percentage: 32, raised: "Rp 96 juta", target: "Rp 300 juta", urgent: false, bg: "from-blue-200 to-blue-300" },
  { id: "3", mosque: "Masjid Nurul Iman", title: "Beasiswa Santri Tahfidz Dhuafa", icon: "📚", percentage: 55, raised: "Rp 55 juta", target: "Rp 100 juta", urgent: false, bg: "from-pink-100 to-pink-200" },
];

const INFAQ_HISTORY = [
  { label: "Masjid Al-Ikhlas", val: "Rp 100k" },
  { label: "Beasiswa Santri", val: "Rp 250k" },
  { label: "Masjid Ar-Rahman", val: "Rp 500k" },
];

export function PageInfaq() {
  const [filter, setFilter] = useState("Semua");

  return (
    <>
      <div className="flex-shrink-0 px-5 pt-10 pb-5" style={{ background: "linear-gradient(160deg,#0b3d2e 0%,#1a6b4a 70%)" }}>
        <div className="flex justify-between items-start mb-0">
          <div className="flex items-center gap-2">
            <Banknote className="w-6 h-6 text-white" />
            <h2 className="text-xl font-black text-white">Infaq & Sedekah</h2>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2.5 border border-white/15 text-center">
            <div className="text-[11px] text-white/60">Total Infaqmu</div>
            <div className="text-[20px] font-black text-amber-300 leading-tight">Rp 850k</div>
          </div>
        </div>
        <p className="text-[12px] text-white/55 mt-2">Titip kebaikan lewat masjid</p>
      </div>

      <div className="flex gap-2 px-5 py-3 overflow-x-auto scrollbar-none bg-white dark:bg-gray-800 border-b border-black/[0.06] dark:border-gray-700 flex-shrink-0">
        {INFAQ_FILTERS.map(f => (
          <FilterChip key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
        ))}
      </div>

      <div className="flex-1 overflow-y-auto bg-[#f5f7f5] dark:bg-gray-900">
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
