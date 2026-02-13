interface SectionLabelProps {
  children: React.ReactNode;
  extra?: React.ReactNode;
}

export function SectionLabel({ children, extra }: SectionLabelProps) {
  return (
    <div className="flex justify-between items-center px-5 mt-5 mb-3">
      <span className="text-[13px] font-bold text-gray-900">{children}</span>
      {extra && <span className="text-[11px] font-semibold text-emerald-700 cursor-pointer">{extra}</span>}
    </div>
  );
}
