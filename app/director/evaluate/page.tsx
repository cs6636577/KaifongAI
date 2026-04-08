"use client"

import React from "react"
import ComplaintToolbar from "../../../components/ui/Admin_director/ComplainToolbar"

const Page = () => {
  const [activeTab, setActiveTab] = React.useState<"all" | "pending">("all")
  const [search, setSearch] = React.useState("")
  const arrayCase = [
    
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
      </div>
    </div>
  )
}

export default Page