"use client"
import React from 'react'
import EmojiButton from '@/components/ui/Director/EmojiButton'
import EmojiButton2 from '@/components/ui/Director/EmojiButton2'
import ComplaintSearchInput from '@/components/ui/Admin_director/ComplainSearchInput'
import { RiDropdownList } from 'react-icons/ri'
import ManualToolbar from '@/components/ui/Director/ManualToolbar'
import ComplaintPagination from '@/components/ui/Admin_director/PageNavigation'
import FileCard from '@/components/ui/Director/fileCard'
import { FaPlus } from 'react-icons/fa6'
import { Sarabun} from "next/font/google";

const thaiFont = Sarabun({
  subsets: ["thai"],
  weight: ["400", "500", "700"],
});

type FileItem = {
  title: string
  description: string
  date: string
  datasize: string
  filetype?: string
  viewcount: string
  image?: string
}

const data: FileItem[] = [
  {
    title: "คู่มือการรับเรื่องร้องเรียนเบื้องต้น",
    description: "อธิบายขึ้นตอนการรับเรื่อง การตรวจสอบข้อมูลพื้นฐาน และการคัดกรองประเภท...",
    date: "12 Oct 2023",
    datasize: "2.4 MB",
    filetype: "PDF",
    viewcount: "1240",
  },
  {
    title: "คู่มือการอัพเดตสถานะเรื่องร้อง...",
    description: "คู่มือสำหรับเจ้าหน้าที่ในการเปลี่ยนแปลงสถานะ แจ้งความคืบหน้า และปิดงานอย่า...",
    date: "14 Oct 2023",
    datasize: "1.8 MB",
    filetype: "PDF",
    viewcount: "890",
  },
  {
    title: "Infographic ขั้นตอนการทำงาน",
    description: "สรุปขั้นตอนการทำงานทั้งหมดแบบเห็นภาพเดียวจบ เข้าใจง่าย เหมาะสำหรับบอร์ด...",
    date: "1920x1080 px",
    datasize: "4.5 MB",
    filetype: "IMAGE",
    viewcount: "2,105",
  }
]


const StaffManualPage = () => {
    const [currentPage, setCurrentPage] = React.useState(1)

  return (
    <div className={`${thaiFont.className} min-h-screen bg-background flex  justify-center`}>
        <div className="max-w-7xl mx-3 px-6 sm:px-6 lg:px-8 py-8 w-full mt-5">
            <div className="flex items-start justify-between">
            <div>
                <h1 className="text-3xl font-bold text-secondary mb-7">คู่มือการใช้งาน</h1>
                <p className="text-lg text-muted-foreground -mt-4">
                เอกสารสำหรับผู้ใช้งานระบบ KaiFongAI
                </p>
            </div>

            <button className="bg-accent px-4 py-3 rounded-xl font-bold shadow-md cursor-pointer hover:bg-yellow-500 transition flex items-center gap-2">
                <FaPlus />
                <span className="text-black text-md">อัพโหลดคู่มือใหม่</span>
            </button>
        </div>

            {/* <div className="flex gap-5 mt-8">
                {/* อันนี้เดี๋ยวเปลี่ยนทีหลังให้มันตามลิงค์ไม่ใช่staticแบบนี้ (มีcomponentsอยู่แล้ว) */}
                {/* <button className='bg-white p-4 rounded-xl font-bold shadow-xs cursor-pointer hover:bg-gray-200 transition border-1 border-gray-200'>
                    <span className='ml-1 text-[#575E72]'>
                        🧑‍💼 คู่มือการใช้งานเจ้าหน้าที่
                    </span>
                    <span className="bg-[#DEE2F5] text-[#575E72] text-xs rounded-xl ml-4 mr-1 px-2.5 py-1.5">
                        12
                    </span>
                </button>
                <button className='bg-accent p-4 rounded-xl font-bold shadow-md cursor-pointer hover:bg-yellow-500 transition'>
                    <span className='ml-1 text-black'>
                        📣 คู่มือการใช้งานผู้แจ้งเรื่อง
                    </span>
                    <span className="bg-black text-accent text-xs rounded-xl ml-4 mr-1 px-2 py-1">
                        05
                    </span>
                </button> */}
            {/* </div>  */}

            <div className='mt-8'>
                <ManualToolbar/>
            </div>

            <div className='flex flex-row gap-10 mt-10'>
                {data.map((item, index) => (
                    <FileCard key={index} item={item} />
                ))}
            </div>

            <div className='mb-10 mt-40'>
                <ComplaintPagination
                    currentPage={1}
                    totalPages={3}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    </div>
  )
}

export default StaffManualPage
