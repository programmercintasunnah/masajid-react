const TAG_STYLES: Record<string, string> = {
  free: "bg-emerald-100 text-emerald-700",
  paid: "bg-amber-100 text-amber-700",
  kids: "bg-pink-100 text-pink-700",
  quiz: "bg-orange-100 text-orange-700",
  dauroh: "bg-red-100 text-red-700",
  online: "bg-indigo-100 text-indigo-700",
  tahsin: "bg-teal-100 text-teal-700",
};

const TAG_LABELS: Record<string, string> = {
  free: "Gratis",
  paid: "Berbayar",
  kids: "Anak-anak",
  quiz: "Ada Quiz",
  dauroh: "Dauroh",
  online: "Online",
  tahsin: "Tahsin",
};

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
