//สำหรับcardที่มีส่วนคล้าบกัย การ์ดส่วนที่1ของหน้า dashboard
interface SummaryCardProps {
  title: string;
  value: number | string;
  subvalue?: string | number ;
  color?: string;
}

export default function SummaryCard({title,value,subvalue,color}: SummaryCardProps) {
  return (
    <div
      className="bg-white rounded-lg border-l-4 p-5 border-[#D9D9D9]  shadow-xs gap-x-5 space-y-2  h-28"
      style={{ borderColor: color }}
    >
      {/* title */}
      <p className="text-md text-[#575E72] mb-1">{title}</p>

      {/* value row */}
      <div className="flex items-end gap-2 gap-x-24 sm:gap-x-16">
        <span className="text-3xl font-bold text-[var(--foreground)]">
          {typeof value === "number" ? String(value).padStart(2, "0") : value}
        </span>

        {/* sub */}
        {subvalue && (
          <span className="text-xs text-gray-400  my-1 ">
            {subvalue}
          </span>
        )}

      </div>
    </div>
  );
}