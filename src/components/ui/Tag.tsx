const TAG_STYLES: Record<string, string> = {
  free: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
  paid: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  kids: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
  quiz: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  dauroh: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  online: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
  tahsin: "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300",
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
    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${TAG_STYLES[type] ?? "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"}`}>
      {TAG_LABELS[type] ?? type}
    </span>
  );
}
