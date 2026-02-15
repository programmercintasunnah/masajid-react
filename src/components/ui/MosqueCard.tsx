import type { MasjidNearby } from "../../types";
import { MapPin, Navigation } from "lucide-react";
import mosqueImg from "../../assets/mosque.png";

interface MosqueCardProps {
  item: MasjidNearby;
}

export function MosqueCard({ item }: MosqueCardProps) {
  return (
    <div className="min-w-[150px] bg-white rounded-2xl overflow-hidden shadow-sm border border-black/[0.04] flex-shrink-0 cursor-pointer hover:-translate-y-0.5 transition-transform lg:min-w-[240px]">
      <div className={`h-20 lg:h-28 bg-gradient-to-br ${item.bg} flex items-center justify-center relative`}>
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <img src={mosqueImg} alt="Mosque" className="w-10 h-10 lg:w-14 lg:h-14" />
        )}
        <span className="absolute top-2 right-2 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 lg:text-xs">
          <MapPin className="w-2.5 h-2.5" />
          {item.distance}
        </span>
      </div>
      <div className="p-2.5 lg:p-4">
        <div className="text-[11px] font-bold text-gray-900 mb-0.5 lg:text-sm">{item.name}</div>
        <div className="text-[10px] text-gray-400 mb-1 lg:text-xs truncate">{item.address}</div>
        <div className="flex items-center justify-between">
          <div className="text-[10px] text-[#0b3d2e] font-medium lg:text-xs">
            📚 {item.kajianToday || "Kajian Hari Ini"}
          </div>
          <button className="text-[#0b3d2e] hover:opacity-70">
            <Navigation className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
