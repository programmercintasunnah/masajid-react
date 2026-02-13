import type { Kajian } from "../../types";
import { Tag } from "./Tag";

interface KajianCardProps {
  item: Kajian;
}

export function KajianCard({ item }: KajianCardProps) {
  return (
    <div className="mx-5 mb-2.5 bg-white rounded-2xl p-3 flex gap-3 shadow-sm border border-black/5 hover:translate-x-1 transition-transform cursor-pointer">
      <div className={`w-13 h-13 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${item.bg}`} style={{ width: 52, height: 52 }}>
        {item.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex gap-1 flex-wrap mb-1.5">
          {item.tags.map(t => <Tag key={t} type={t} />)}
        </div>
        <div className="text-[12px] font-bold text-gray-900 leading-snug mb-1">{item.title}</div>
        <div className="flex gap-3 text-[10px] text-gray-400">
          <span>📅 {item.date}</span>
          {"time" in item && item.time && <span>⏰ {item.time}</span>}
          {"harga" in item && item.harga && <span>💰 {item.harga}</span>}
        </div>
      </div>
    </div>
  );
}
