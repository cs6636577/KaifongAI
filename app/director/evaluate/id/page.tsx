import { notFound } from "next/navigation"
import Link from "next/link"
import { complaints } from "../data"

type Props = {
  params: {
    id: string
  }
}

export default function ComplaintDetailPage({ params }: Props) {
  const complaint = complaints.find((item) => item.id === params.id)

  if (!complaint) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background px-8 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <Link
            href="/admin/complaints"
            className="text-sm text-[#725C00] hover:underline"
          >
            ← กลับไปหน้ารายการคำร้องทุกข์
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-[#333847] mb-8">
          รายละเอียดคำร้องทุกข์
        </h1>

        <div className="rounded-2xl bg-white border border-[#EAEDFF] p-8 shadow-sm space-y-8">
          {/* ข้อมูลหลัก */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">เลขส่วนกลาง-เลขรับ</p>
              <p className="text-lg font-semibold text-[#725C00]">
                {complaint.problems}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">ช่องทาง</p>
              <p className="text-lg">{complaint.app}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">เรื่องร้องทุกข์</p>
              <p className="text-lg font-semibold">{complaint.title}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">สถานะ</p>
              <p className="text-lg">{complaint.status}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">ผู้ยื่นคำร้อง</p>
              <p className="text-lg">{complaint.person}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">เบอร์โทรศัพท์</p>
              <p className="text-lg">{complaint.phone}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">เจ้าหน้าที่ที่รับผิดชอบ</p>
              <p className="text-lg">{complaint.staff}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">วันที่แจ้ง</p>
              <p className="text-lg">{complaint.createdAt ?? "-"}</p>
            </div>
          </div>

          {/* รายละเอียด */}
          <div>
            <p className="text-sm text-gray-500 mb-2">รายละเอียด</p>
            <div className="rounded-xl bg-[#F8FAFC] p-4 text-[#333847]">
              {complaint.description ?? "-"}
            </div>
          </div>

          {/* สถานที่ */}
          <div>
            <p className="text-sm text-gray-500 mb-2">สถานที่</p>
            <div className="rounded-xl bg-[#F8FAFC] p-4 text-[#333847]">
              {complaint.location ?? "-"}
            </div>
          </div>

          {/* รูปภาพ */}
          {complaint.imageUrl && (
            <div>
              <p className="text-sm text-gray-500 mb-2">รูปภาพประกอบ</p>
              <img
                src={complaint.imageUrl}
                alt={complaint.title}
                className="w-full max-w-xl rounded-xl border border-gray-200 object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}