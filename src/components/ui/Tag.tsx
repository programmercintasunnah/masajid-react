import { TAG_STYLES, TAG_LABELS } from "../../data/mockData";

interface TagProps {
  type: string;
}

export function Tag({ type }: TagProps) {
  return (
    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${TAG_STYLES[type] ?? "bg-gray-100 text-gray-600"}`}>
      {TAG_LABELS[type] ?? type}
    </span>
  );
}
