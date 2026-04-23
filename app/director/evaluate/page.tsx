"use client"

import React from "react"
import ComplaintToolbar from "@/components/ui/Admin_director/ComplainToolbar"
import { complaints } from "./table/data"
import ComplaintTable from "./table/complainTable"
import ComplaintPagination from "@/components/ui/Admin_director/PageNavigation"
import { Sarabun} from "next/font/google";

const thaiFont = Sarabun({
  subsets: ["thai"],
  weight: ["400", "500", "700"],
});

const columns = [
  { key: "id", title: "ลำดับ" },
  { key: "problems", title: "เลขส่วนกลาง-เลขรับ" },
  { key: "app", title: "ช่องทาง" },
  { key: "title", title: "เรื่องร้องทุกข์" },
  { key: "person", title: "ผู้ยื่นคำร้อง" },
  { key: "phone", title: "ติดต่อ" },
  { key: "status", title: "สถานะ" },
  { key: "staff", title: "เจ้าหน้าที่ที่รับผิดชอบ" },
]

export default function Page() {
  const [activeTab, setActiveTab] = React.useState<"all" | "pending">("all")
  const [search, setSearch] = React.useState("")
  const [currentPage, setCurrentPage] = React.useState(1)
  const pageSize = 5

  const filteredData = React.useMemo(() => {
    let result = complaints

    if (activeTab === "pending") {
      result = result.filter((item) => item.status === "กำลังดำเนินการ")
    }

    if (search.trim()) {
      result = result.filter(
        (item) =>
          item.problems.toLowerCase().includes(search.toLowerCase()) ||
          item.person.toLowerCase().includes(search.toLowerCase()) ||
          item.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    return result
  }, [activeTab, search])

  const totalPages = Math.ceil(filteredData.length / pageSize)

  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredData.slice(startIndex, startIndex + pageSize)
  }, [filteredData, currentPage])

  React.useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, search])

  return (
    <div className={`${thaiFont.className} min-h-screen bg-background`}>
      <div className="w-full px-8 py-8 mx-auto">
        <h1 className="text-3xl font-bold text-[#333847] mb-7 ml-10">
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

        <ComplaintTable columns={columns} data={paginatedData} />

        <ComplaintPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}