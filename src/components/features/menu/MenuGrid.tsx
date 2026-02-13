import { MenuItem } from "@/types";

interface MenuGridProps {
  menus: MenuItem[];
}

export function MenuGrid({ menus }: MenuGridProps) {
  return (
    <div className="grid grid-cols-4 gap-3 px-5">
      {menus.map((m, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer group">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.bg} flex items-center justify-center group-hover:scale-105 transition-transform`}>
            <img src={m.img} alt={m.label} className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-semibold text-gray-600 text-center leading-tight">{m.label}</span>
        </div>
      ))}
    </div>
  );
}
