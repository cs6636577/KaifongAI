interface SummaryCardProps {
  icon?: string;
  title: string;
  value: number | string;
  subvalue?: string | number;
  color: string ;

}

export default function SummaryCard2({icon,title,value,subvalue,color}: SummaryCardProps) {
  return (
    <div
      className="bg-white rounded-lg p-5 shadow-sm flex gap-3"
    > 
      {/*bg+icon*/}
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0" style={{ backgroundColor: color}}>
                {icon}
      </div>
      <div className="column">
      {/* title */}
      <p className="text-xs text-[#575E72] mb-1">{title}</p>

      {/* value row */}
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-[#161B29]">
          {value}
        </span>

        {/* sub */}
        {subvalue && (
          <span className="text-xs text-gray-400">
            {subvalue}
          </span>
        )}
        </div>

    </div>
    </div>
  );
}