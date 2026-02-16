import type { Campaign } from "../../types";
import { Landmark, Flame } from "lucide-react";

interface CampaignCardProps {
  item: Campaign;
}

export function CampaignCard({ item }: CampaignCardProps) {
  return (
    <div className="mx-5 mb-3 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-black/[0.04] dark:border-gray-700 cursor-pointer hover:-translate-y-0.5 transition-transform">
      <div className={`h-28 bg-gradient-to-br ${item.bg} flex items-center justify-center relative`}>
        <Landmark className="w-12 h-12 text-white/80" />
        {item.urgent && (
          <span className="absolute top-2.5 left-2.5 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Flame className="w-3 h-3" />
            Hampir selesai!
          </span>
        )}
      </div>
      <div className="p-3.5">
        <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1">
          <Landmark className="w-3 h-3" />
          {item.mosque}
        </div>
        <div className="text-[13px] font-black text-gray-900 dark:text-white mb-2 leading-snug">{item.title}</div>
        <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full mb-2">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: `${item.percentage}%` }} />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">{item.raised}</div>
            <div className="text-[10px] text-gray-400 dark:text-gray-500">dari target {item.target}</div>
          </div>
          <button className="bg-amber-500 text-white text-[11px] font-bold px-4 py-1.5 rounded-xl">Infaq Sekarang</button>
        </div>
      </div>
    </div>
  );
}
