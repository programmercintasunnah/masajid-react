interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap border transition-all ${active ? "bg-[#0b3d2e] text-white border-[#0b3d2e]" : "bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 border-black/10 dark:border-gray-600"}`}
    >
      {label}
    </button>
  );
}
