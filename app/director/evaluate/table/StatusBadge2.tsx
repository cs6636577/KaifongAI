import { FaCircle } from "react-icons/fa6"

type Props = {
  status: "กำลังดำเนินการ" | "ประเมินผลเสร็จสิ้น" | "ไม่รับเรื่อง"
}

export default function StatusBadge({ status }: Props) {
  return (
<span
  className={`px-3 py-1.5 rounded-full text-sm font-bold border whitespace-nowrap absolute
    ${status === "ประเมินผลเสร็จสิ้น" && "bg-green-100 text-green-700 border-green-700/20"}
    ${status === "กำลังดำเนินการ" && "bg-yellow-100 text-yellow-800 border-yellow-700/20"}
    ${status === "ไม่รับเรื่อง" && "bg-red-100 text-red-700 border-red-700/20"}
  `}
>
    <span className="flex items-center gap-2">
        <FaCircle size={11}/>
          {status}
    </span>
</span>
  )
}