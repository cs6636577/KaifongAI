import { complaints } from "../../table/data"
import { notFound } from "next/navigation"
import StatusBadge from "../../table/statusBadge"
import StatusBadge2 from "../../table/StatusBadge2"

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function DetailPage({ params }: Props) {
  const { id } = await params

  const complaint = complaints.find((item) => item.id === id)

  if (!complaint) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-8 py-8 mx-auto">
        <div className="flex flex-row">
          <h1 className="text-3xl font-bold text-[#333847] mb-7 ml-10">
            รายละเอียดคำร้อง
          </h1>
          <h1 className="text-3xl font-bold text-[#725C00] mb-7 ml-8">
            {complaint.problems}
          </h1>
        </div>
        <div className="ml-10">
          <StatusBadge2 status={complaint.status}/>
        </div>
      </div>
    </div>
    // <div className="p-8">
    //   <h1 className="text-2xl font-bold">{complaint.title}</h1>
    //   <p>เลขรับเรื่อง: {complaint.problems}</p>
    //   <p>ผู้ยื่น: {complaint.person}</p>
    //   <p>เบอร์โทร: {complaint.phone}</p>
    //   <p>สถานะ: {complaint.status}</p>
    //   <p>เจ้าหน้าที่: {complaint.staff}</p>
    //   <p>ช่องทาง: {complaint.app}</p>
    //   <p>รายละเอียด: {complaint.description ?? "-"}</p>
    //   <p>สถานที่: {complaint.location ?? "-"}</p>
    //   <p>วันที่สร้าง: {complaint.createdAt ?? "-"}</p>
    // </div>
  )
}