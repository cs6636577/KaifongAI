//สำหรับcardที่มีส่วนคล้าบกัย การ์ดส่วนที่ของหน้า dashboard
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
      className="bg-white rounded-xl  shadow-sm flex border-[#D9D9D9]  gap-x-5 p-6"
    > 
    
      {/*bg+icon*/}
      <div className="size-14 rounded-full bg-muted flex items-center justify-center shrink-0 " style={{ backgroundColor: color}}>
                {icon}
      </div>
      <div className="column">
      {/* title */}
      <p className="text-sm text-[#575E72]">{title}</p>

      {/* value row */}
      <div className="flex items-end gap-x-2">
        <span className="text-3xl font-bold text-[#161B29]">
          {value}
        </span>

        {/* sub */}
        {subvalue && (
          <span className="text-xs text-gray-400 my-1">
            {subvalue}
          </span>
        )}
        </div>
      
    </div>
    </div>
  );
}