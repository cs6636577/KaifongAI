import React from 'react'
import { CiCalendar } from 'react-icons/ci';
import { FaRegFileAlt, FaRegTrashAlt } from 'react-icons/fa';
import { GoDatabase } from 'react-icons/go';
import { IoEyeOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiPencilLine } from 'react-icons/ri';

type data = [
  {
    title: "คู่มือการรับเรื่องร้องเรียนเบื้องต้น",
    description: "อธิบายขึ้นตอนการรับเรื่อง การตรวจสอบข้อมูลพื้นฐาน และการคัดกรองประเภท...",
    date: "12 Oct 2023",
    datasize: "2.4 MB",
    type: "pdf",
    viewcount: "1240"
  },
  {
    title: "คู่มือการอัพเดตสถานะเรื่องร้องเรียน",
    description: "คู่มือสำหรับเจ้าหน้าที่ในการเปลี่ยนแปลงสถานะ แจ้งความคืบหน้า และปิดงานอย่า..."
    date: "14 Oct 2023",
    datasize: "1.8 MB",
    type: "pdf",
    viewcount: "890"
  },{
    title: "Infographic ขั้นตอนการทำงาน",
    desciption: "สรุปขั้นตอนการทำงานทั้งหมดแบบเห็นภาพเดียวจบ เข้าใจง่าย เหมาะสำหรับบอร์ด...",
    date: "1920x1080 px",
    datasize: "4.5 MB",
    viewcount: "2,105"
  }
];

const fileCard = () => {
  return (
<div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-80 rounded-t-3xl">
  <div className="relative h-35 m-0 overflow-hidden text-white rounded-t-3xl">
    <img src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80" alt="card-image" />
  </div>

  <div className="p-4">
    <h6 className="mb-2 text-slate-800 text-lg font-semibold">
      หัวข้อยาวยาวยาวยาว
    </h6>
    <p className="text-[#575E72]/80 leading-normal font-light text-md">
      The place is close to Barceloneta Beach and bus stop just 2 min by walk
      and near to &quot;Naviglio&quot; where you can enjoy the main night life in
      Barcelona.
    </p>

    {/* sub */}
    <div className='relative mt-4 flex flex-row gap-3 text-sm text-[#575E72]/80'>
      <div className='flex flex-row items-center'>
        <span>
          <CiCalendar/>
        </span>
        <span className='px-1'>
          วันที่
        </span>
      </div>

      <div className='flex flex-row items-center'>
        <span>
          <GoDatabase />
        </span>
        <span className='px-1'>
          พื้นที่
        </span>
      </div>
    </div>
  </div>

  <div className="px-4 pb-4 pt-0 mt-4 text-[#575E72]/80 text-sm">
    <hr/>
    <div className='flex flex-row justify-between'>
      <div className='flex flex-row items-center mt-5'>
        <span>
          <IoEyeOutline/>
        </span>
        <span className='px-1'>
          เลขวิว
        </span>
      </div>

      <div className='text-lg text-[#161B29] flex flex-row mt-5 gap-3'>
        <span>
          <MdOutlineRemoveRedEye/>
        </span>
        <span>
          <RiPencilLine/>
        </span>
        <span className='text-[#575E72]/80'>
          <FaRegTrashAlt/>
        </span>
      </div>
    </div>
  </div>
</div>  
  )
}

export default fileCard;
