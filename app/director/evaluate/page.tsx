"use client"

import React from "react"
import ComplaintToolbar from "../../../components/ui/Admin_director/ComplainToolbar"
import DataTable from "@/components/ui/Admin_director/DataTableBase"
import { FaRegUser } from "react-icons/fa"
import { MdOutlineLocalPhone } from "react-icons/md"

const Page = () => {
  const [activeTab, setActiveTab] = React.useState<"all" | "pending">("all")
  const [search, setSearch] = React.useState("")
  const columns = [
    {key: "id", title: "ลำดับ" },
    {key: "problems", title: "เลขส่วนกลาง-เลขรับ" },
    {key: "app", title: "ช่องทาง" },
    {key: "title", title: "เรื่องร้องทุกข์" },
    {key: "person", title:"ผู้ยื่นคำร้อง"},
    {key: "phone", title:"ติดต่อ"},
    {key: "status", title:"สถานะ"},
    {key: "staff", title:"เจ้าหน้าที่ที่รับผิดชอบ"},
  ]
const data = [
  {
    id: "1",
    problems: "REQ-001",
    app: "Line",
    title : "ไฟถนนดับ",
    person: "สมชาย ใจดี",
    phone: "0812345678",
    status: "กำลังดำเนินการ",
    staff: "วิชัย มุ่งมั่น"
  },
  {
    id: "2",
    problems: "REQ-002",
    app: "Web",
    title: "ถนนเป็นหลุม",
    person: "พิมพ์ชนก แสงทอง",
    phone: "0823456789",
    status: "กำลังดำเนินการ",
    staff: "ศุภกร แสนดี"
  },
  {
    id: "3",
    problems: "REQ-003",
    app: "Line",
    title: "น้ำประปาไม่ไหล",
    person: "ณัฐพล บุญมี",
    phone: "0834567890",
    status: "ไม่รับเรื่อง",
    staff: "อาคม มีชัย"
  },
  {
    id: "4",
    problems: "REQ-004",
    app: "App",
    title: "ขยะล้นถัง",
    person: "อรทัย สุขใจ",
    phone: "0845678901",
    status: "กำลังดำเนินการ",
    staff: "มยุรี ทองใบ"
  },
  {
    id: "5",
    problems: "REQ-005",
    app: "Web",
    title: "ไฟส่องสว่างเสีย",
    person: "ธีรภัทร วงศ์ดี",
    phone: "0856789012",
    status: "กำลังดำเนินการ",
    staff: "กิตติ รุ่งเรือง"
  },
  {
    id: "6",
    problems: "REQ-006",
    app: "Line",
    title: "ท่อระบายน้ำตัน",
    person: "กนกพร สิงห์คำ",
    phone: "0867890123",
    status: "กำลังดำเนินการ",
    staff: "วิชัย มุ่งมั่น"
  },
  {
    id: "7",
    problems: "REQ-007",
    app: "App",
    title: "เสียงดังรบกวน",
    person: "ชัยวัฒน์ รัตนโชติ",
    phone: "0878901234",
    status: "ไม่รับเรื่อง",
    staff: "ศุภกร แสนดี"
  },
  {
    id: "8",
    problems: "REQ-008",
    app: "Web",
    title: "ต้นไม้ล้มกีดขวาง",
    person: "สุพัตรา นาคสกุล",
    phone: "0889012345",
    status: "กำลังดำเนินการ",
    staff: "อาคม มีชัย"
  },
  {
    id: "9",
    problems: "REQ-009",
    app: "Line",
    title: "ไฟฟ้าตกบ่อย",
    person: "ธนกร มั่นคง",
    phone: "0890123456",
    status: "ประเมินผลเสร็จสิ้น",
    staff: "มยุรี ทองใบ"
  },
  {
    id: "10",
    problems: "REQ-010",
    app: "App",
    title: "ถนนทรุดตัว",
    person: "รัตนา ศรีสุข",
    phone: "0801234567",
    status: "กำลังดำเนินการ",
    staff: "กิตติ รุ่งเรือง"
  },
  {
    id: "11",
    problems: "REQ-011",
    app: "Web",
    title: "น้ำขังหลังฝนตก",
    person: "สมชาย ใจดี",
    phone: "0812345678",
    status: "กำลังดำเนินการ",
    staff: "วิชัย มุ่งมั่น"
  },
  {
    id: "12",
    problems: "REQ-012",
    app: "Line",
    title: "ไฟหน้าซอยไม่ติด",
    person: "พิมพ์ชนก แสงทอง",
    phone: "0823456789",
    status: "ประเมินผลเสร็จสิ้น",
    staff: "ศุภกร แสนดี"
  },
  {
    id: "13",
    problems: "REQ-013",
    app: "App",
    title: "กลิ่นขยะรบกวน",
    person: "ณัฐพล บุญมี",
    phone: "0834567890",
    status: "กำลังดำเนินการ",
    staff: "อาคม มีชัย"
  },
  {
    id: "14",
    problems: "REQ-014",
    app: "Web",
    title: "ท่อแตกน้ำรั่ว",
    person: "อรทัย สุขใจ",
    phone: "0845678901",
    status: "กำลังดำเนินการ",
    staff: "มยุรี ทองใบ"
  },
  {
    id: "15",
    problems: "REQ-015",
    app: "Line",
    title: "สายไฟห้อยต่ำ",
    person: "ธีรภัทร วงศ์ดี",
    phone: "0856789012",
    status: "กำลังดำเนินการ",
    staff: "กิตติ รุ่งเรือง"
  },
  {
    id: "16",
    problems: "REQ-016",
    app: "App",
    title: "ทางเท้าชำรุด",
    person: "กนกพร สิงห์คำ",
    phone: "0867890123",
    status: "ประเมินผลเสร็จสิ้น",
    staff: "วิชัย มุ่งมั่น"
  },
  {
    id: "17",
    problems: "REQ-017",
    app: "Web",
    title: "เสียงก่อสร้างกลางคืน",
    person: "ชัยวัฒน์ รัตนโชติ",
    phone: "0878901234",
    status: "ไม่รับเรื่อง",
    staff: "ศุภกร แสนดี"
  },
  {
    id: "18",
    problems: "REQ-018",
    app: "Line",
    title: "น้ำไหลอ่อน",
    person: "สุพัตรา นาคสกุล",
    phone: "0889012345",
    status: "กำลังดำเนินการ",
    staff: "อาคม มีชัย"
  },
  {
    id: "19",
    problems: "REQ-019",
    app: "App",
    title: "ไฟสัญญาณเสีย",
    person: "ธนกร มั่นคง",
    phone: "0890123456",
    status: "กำลังดำเนินการ",
    staff: "มยุรี ทองใบ"
  },
  {
    id: "20",
    problems: "REQ-020",
    app: "Web",
    title: "ถนนลื่นอันตราย",
    person: "รัตนา ศรีสุข",
    phone: "0801234567",
    status: "กำลังดำเนินการ",
    staff: "กิตติ รุ่งเรือง"
  },
  {
    id: "21",
    problems: "REQ-021",
    app: "Line",
    title: "ฝาท่อหาย",
    person: "สมชาย ใจดี",
    phone: "0812345678",
    status: "ประเมินผลเสร็จสิ้น",
    staff: "วิชัย มุ่งมั่น"
  },
  {
    id: "22",
    problems: "REQ-022",
    app: "App",
    title: "น้ำท่วมขัง",
    person: "พิมพ์ชนก แสงทอง",
    phone: "0823456789",
    status: "กำลังดำเนินการ",
    staff: "ศุภกร แสนดี"
  },
  {
    id: "23",
    problems: "REQ-023",
    app: "Web",
    title: "ไฟดับทั้งซอย",
    person: "ณัฐพล บุญมี",
    phone: "0834567890",
    status: "กำลังดำเนินการ",
    staff: "อาคม มีชัย"
  },
  {
    id: "24",
    problems: "REQ-024",
    app: "Line",
    title: "ขยะไม่ได้เก็บ",
    person: "อรทัย สุขใจ",
    phone: "0845678901",
    status: "ประเมินผลเสร็จสิ้น",
    staff: "มยุรี ทองใบ"
  },
  {
    id: "25",
    problems: "REQ-025",
    app: "App",
    title: "ถนนแตกร้าว",
    person: "ธีรภัทร วงศ์ดี",
    phone: "0856789012",
    status: "กำลังดำเนินการ",
    staff: "กิตติ รุ่งเรือง"
  }
]

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-8 py-8 mx-auto lg:max-w-auto">
        <h1 className="text-3xl font-bold text-[#333847] mb-7 pl-10">
          รายการคำร้องทุกข์
        </h1>

        <ComplaintToolbar
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          searchValue={search}
          onSearchChange={setSearch}
          onFilterClick={() => console.log("filter")}
          onExportClick={() => console.log("export")}
        />
        
        {/* ตารางข้อมูลคำร้องทุกข์ */}
        <div className=" rounded-xl border border-[#EAEDFF] overflow-hidden mx-12 mt-25">
          {/* table */}
            <div className="overflow-x-auto">
                <DataTable columns={columns} theadClassName="text-[#64748B] text-sm bg-foreground3 text-white h-16">
                  <tbody className="text-sm text-secondary">
                    {data.map((row) => (
                      <tr key={row.id} className="border-b border-gray-200 h-20">
                        <td className="px-6 py-4 text-[#575E72]">{row.id}</td>
                        <td className="px-6 py-4 text-[#725C00]">{row.problems}</td>
                        <td className="px-6 py-4 text-[#15803D]">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold
                                ${row.app === "Line" && "bg-green-100 text-green-700"}
                                ${row.app === "App" && "bg-blue-100 text-blue-700"}
                                ${row.app === "Web" && "bg-purple-100 text-purple-700"}
                              `}
                            >
                              {row.app}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 font-bold text-secondary">{row.title}</td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[#725C00]">
                              <FaRegUser/>
                            </span>
                            {row.person}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[#725C00]">
                              <MdOutlineLocalPhone size={18}/>
                            </span>
                            {row.phone}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-3 py-2 rounded-sm text-xs font-bold border-1
                                ${row.status === "ประเมินผลเสร็จสิ้น" && "bg-green-100 text-green-700 border-green-700/20"}
                                ${row.status === "กำลังดำเนินการ" && "bg-yellow-100 text-yellow-800 border-yellow-700/20"}
                                ${row.status === "ไม่รับเรื่อง" && "bg-red-100 text-red-700 border-red-700/20"}
                              `}
                            >
                              {row.status}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="px-5 py-4 rounded-full text-xs font-bold bg-[#DAE2FA] text-foreground3">
                              {row.staff.charAt(0)}
                            </span>
                          {row.staff}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </DataTable>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Page
