"use client";
import { useEffect, useState } from "react";
import { complaints } from "../../table/data"
import { notFound } from "next/navigation"
import StatusBadge from "../../table/statusBadge"
import StatusBadge2 from "../../table/StatusBadge2"
import SummaryCard from "@/components/ui/Admin_director/SummaryCard"
import type { ComponentType, SVGProps } from 'react'

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
<div className="w-full px-10 flex items-center justify-between mx-8">
  {/* ซ้าย */}
  <div>
    <div className="flex items-center gap-4 mt-2">
      <h1 className="text-3xl font-bold text-[#333847]">
        รายละเอียดคำร้อง
      </h1>
      <h1 className="text-3xl font-bold text-[#725C00]">
        {complaint.problems}
      </h1>
    </div>

    <div className="mt-6">
      <StatusBadge2 status={complaint.status} />
    </div>
  </div>

  {/* ขวา */}
  <div className="flex flex-col items-end gap-3 mr-14 mt-8">
    <div className="flex gap-3">
      <button className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-100 transition">
        ประวัติคำร้อง
      </button>

      <button className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-100 transition">
        ดูผลการดำเนินการ
      </button>
    </div>

    <button className="inline-flex items-center justify-center rounded-xl mr-24 bg-yellow-400 px-6 py-2 text-black hover:bg-yellow-500 transition">
      ประเมินการปฏิบัติงาน
    </button>
  </div>

  <div className="flex flex-col">
    {/*การ์ดส่วน1*/}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-12 mb-6">
      <SummaryCard
        key={complaint.id}
        title={complaint.title}
        value={complaint.app}
        subvalue={complaint.location}
        color="#4287f5"
        />
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