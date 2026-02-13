import type { MasjidNearby } from "../../types";

interface MasjidCardProps {
  item: MasjidNearby;
}

export function MasjidCard({ item }: MasjidCardProps) {
  return (
    <div className="min-w-[150px] bg-white rounded-2xl overflow-hidden shadow-sm border border-black/[0.04] flex-shrink-0 cursor-pointer hover:-translate-y-0.5 transition-transform">
      <div className={`h-20 bg-gradient-to-br ${item.bg} flex items-center justify-center text-3xl relative`}>
        🕌
        <span className="absolute top-2 right-2 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">{item.jarak}</span>
      </div>
      <div className="p-2.5">
        <div className="text-[11px] font-bold text-gray-900 mb-0.5">{item.name}</div>
        <div className="text-[10px] text-gray-400">⭐ 4.8 · {item.kajian} kajian aktif</div>
      </div>
    </div>
  );
}
