type Props = {
  status: "กำลังดำเนินการ" | "ประเมินผลเสร็จสิ้น" | "ไม่รับเรื่อง"
}

export default function StatusBadge({ status }: Props) {
  return (
<span
  className={`px-3 py-2 rounded-sm text-xs font-bold border whitespace-nowrap
    ${status === "ประเมินผลเสร็จสิ้น" && "bg-green-100 text-green-700 border-green-700/20"}
    ${status === "กำลังดำเนินการ" && "bg-yellow-100 text-yellow-800 border-yellow-700/20"}
    ${status === "ไม่รับเรื่อง" && "bg-red-100 text-red-700 border-red-700/20"}
  `}
>
  {status}
</span>
  )
}