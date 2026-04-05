interface SummaryCardProps {
  key: number ;
  title: string;
  value: number | string;
  subvalue?: string | number;
  color?: string;

  trend?: "up" | "down";
  change?: number;
  percent?: string;
}

export default function RankingCard({title,value,subvalue,color,trend,change,percent}: SummaryCardProps) {
  return (
    <div
      className="bg-white rounded-lg border-l-4 p-5 shadow-sm"
      style={{ borderColor: color }}
    >
      {/* title */}
      <p className="text-xs text-[#575E72] mb-1">{title}</p>

      {/* value row */}
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-[#161B29]">
          {value}
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
          <span className="text-xs text-gray-400">
            {subvalue}
          </span>
        )}

        {/* percent */}
        {percent && (
          <span className="text-sm font-semibold text-green-600">
            {percent}
          </span>
        )}
      </div>
    </div>
  );
}