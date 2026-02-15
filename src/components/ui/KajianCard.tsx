import type { Kajian } from "../../types";
import { Tag } from "./Tag";
import { Calendar, Clock, Wallet } from "lucide-react";

interface KajianCardProps {
  item: Kajian;
}

export function KajianCard({ item }: KajianCardProps) {
  return (
    <div className="mx-5 mb-2.5 bg-white rounded-2xl p-3 flex gap-3 shadow-sm border border-black/5 hover:translate-x-1 transition-transform cursor-pointer lg:mx-8 lg:p-5 lg:mb-4">
      <div className={`w-13 h-13 rounded-xl flex items-center justify-center flex-shrink-0 ${item.bg}`} style={{ width: 52, height: 52 }}>
        <Calendar className="w-6 h-6 text-gray-600 lg:w-8 lg:h-8" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex gap-1 flex-wrap mb-1.5">
          {item.tags.map(t => <Tag key={t} type={t} />)}
        </div>
        <div className="text-[12px] font-bold text-gray-900 leading-snug mb-1 lg:text-base">{item.title}</div>
        <div className="flex gap-3 text-[10px] text-gray-400 lg:text-sm">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {item.date}
          </span>
          {"time" in item && item.time && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {item.time}
            </span>
          )}
          {"harga" in item && item.harga && (
            <span className="flex items-center gap-1">
              <Wallet className="w-3 h-3" />
              {item.harga}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
