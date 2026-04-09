//สำหรับcardที่มีส่วนคล้าบกัย การ์ดส่วนที่1ของหน้า dashboard
interface SummaryCardProps {
  title: string;
  value: number | string;
  subvalue?: string | number;
  color?: string;

  trend?: "up" | "down";
  change?: number;
  percent?: string;
}

export default function SummaryCard({title,value,subvalue,color,trend,change,percent}: SummaryCardProps) {
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

        {/* trend */}
        {change !== undefined && (
          <span
            className={`flex items-center text-xs font-medium ${
              trend === "up" ? "text-green-600" : "text-red-500"
            }`}
          >
            {trend === "up" ? "▲" : "▼"} {change}%
          </span>
        )}

        {/* sub */}
        {subvalue && (
          <span className="text-xs text-gray-400  my-1 ">
            {subvalue}
          </span>
        )}

        {/* percent */}
        {percent && (
          <span className="text-sm font-semibold text-green-600 my-1">
            {percent}
          </span>
        )}
      </div>
    </div>
  );
}