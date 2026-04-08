import React from 'react'
import { GrDocumentText } from 'react-icons/gr'
import { IoFilterSharp } from 'react-icons/io5'

const Page = () => {
    return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-15 py-8">
        <h1 className="text-3xl font-bold text-[#333847] mb-7">
          รายการคำร้องทุกข์
        </h1>

        <div className="flex items-center justify-between gap-6 mb-6">
          {/* ฝั่งซ้าย */}
          <div className="flex items-center gap-4 shrink-0">
            <button className="bg-accent text-black px-12 py-2.5 rounded-full font-medium whitespace-nowrap">
              คำร้องทั้งหมด
            </button>
            <button className="bg-[#CCCCCC] text-muted-foreground px-12 py-2.5 rounded-full font-medium whitespace-nowrap">
              รอดำเนินการ
            </button>
          </div>

          {/* ฝั่งขวา */}
          <div className="flex items-center justify-end gap-4 flex-1">
            {/* search */}
            <div className="relative w-full max-w-[400px]">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="#7F765F"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>

              <input
                type="text"
                placeholder="ค้นหาเลขที่คำร้อง หรือชื่อผู้ยื่น..."
                className="w-full border border-[#D1C6AB]/30 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none"
              />
            </div>

            {/* filter */}
            <button className="flex items-center gap-2 bg-accent text-black px-6 py-3 rounded-xl whitespace-nowrap">
              <IoFilterSharp />
              กรองข้อมูล
            </button>

            {/* export */}
            <button className="flex items-center gap-2 bg-foreground3 text-white px-6 py-3 rounded-xl whitespace-nowrap">
              <GrDocumentText />
              ออกรายงาน
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page