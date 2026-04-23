"use client";
import { useEffect, useState } from "react";
import SummaryCard from "../../../components/ui/Admin_director/SummaryCard";
import SummaryCard2 from "../../../components/ui/Admin_director/SummaryCard2";
import RankingCard from "@/components/ui/Admin_director/RankingCard";
import DataTable from "@/components/ui/Admin_director/DataTable";
import { Case } from "../../../services/DataProvider"; 
import type { ComponentType, SVGProps } from 'react'
import { ClockIcon, ClipboardDocumentListIcon, UsersIcon, LightBulbIcon, TrashIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { BsTree } from "react-icons/bs";
import { IoWaterOutline } from "react-icons/io5";
import { FaTools } from "react-icons/fa";
import { FabButton } from "@/components/ui/Admin_director/FabButton";


//สำหรับใส่ค่าส่งไปที่ components card ต่างๆ อิงส่วน ui และเนื้อหาจากหน้า // lib/summaryDashboard.ts ที่เป็นส่วนคำนวณ
interface SummaryItem {
  id: number;
  icon?: ComponentType<SVGProps<SVGSVGElement>> | string;
  title: string;
  value: number | string;
  subvalue: number;
  color?: string;
}

interface SummaryData {
  topCards: SummaryItem[];
  bottomCards: SummaryItem[];
  RankingCards: SummaryItem[];
}


function Dashboard() {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  //ปุ่ม ดูทั้งหมด default = 3 -> ดูทั้งหมด 6 (กดเลื่อนเรื่อยๆ) -> กดปุ่มดูทั้งหมดกลับ สี thead เปลี่ยน -> default
  const [showAll, setShowAll] = useState(false);
  const displayedData = showAll ? tableData : tableData.slice(0, 3);
 

  //table 
  const columns = [
  { key: "id", title: "รหัสรายการ" },
  { key: "problems", title: "หัวข้อร้องเรียน", className: "font-bold" },
  { key: "area",title: "พื้นที่", className:"text-gray-500"
   },
  {
    key: "status",
    title: "สถานะ",
    render: (value: string) => {
    let bgColor = "";
    let textColor = "";
    let text = "";

    switch (value) {
      case "pending":
        bgColor = "bg-red-400/20";
        textColor = "text-red-700";
        text = "ยังไม่ได้รับเรื่อง" ;
        break;
      case "in_progress":
        bgColor = "bg-yellow-400/20";
        textColor = "text-yellow-700";
         text = "กำลังดำเนินการ" ;
        break;
      case "resolved":
        bgColor = "bg-green-400/20";
        textColor = "text-green-700";
         text = "แก้ไขเสร็จสิ้น" ;
        break;
      default:
        bgColor = "bg-grey-400/20";
        break;
    }

    return (
      <div className={`w-24 h-6 flex items-center justify-center rounded-full ${bgColor} ${textColor} font-bold  text-xs`}>
        {text}
      </div>
    )},
  },
  { key: "time", title: "เวลาที่แจ้ง" },
  ];
  
   useEffect(() => {
   fetch("/api/table")
    .then((res) => res.json())
    .then((cases: Case[]) => {
      const formatted = cases.map((c) => ({
        id: `REQ-${String(c.id).padStart(3, "0")}`, // รหัส
        problems: c.description,             
        area: c.location,                  
        status: c.status,
        time: new Date(c.datetime).toLocaleString(), // แปลงเป็น local time ? ไหม ? 
      }));
      setTableData(formatted);
    })
    .catch((err) => console.error("Fetch error:", err));
    }, []);

   useEffect(() => {
    fetch("/api/summary")
      .then(res => res.json())
      .then(data => {
        setSummary(data);
        console.log("Data parsed:", data);
      })
      .catch(err => console.error("Fetch error:", err));
   }, []);
  

  {/*รับค่า title เลือกเฉพาะส่วน keyword เนื้อหาปรับเปลี่ยนได้ มาแมพกับสีและicon ของcardส่วนที่2 */ }
  const getConfig = (title: string) => {
    if (title.includes("เวลา")) {
      return {
        icon:  (props: React.SVGProps<SVGSVGElement>) => (
        <ClockIcon {...props} stroke="#564500" />
       ),
        color: "#FFE07F"
      }
    }
    if (title.includes("ร้องเรียน")) {
      return {
        icon: ClipboardDocumentListIcon,
        color: "#EAEDFF"
      }
    }
    //เอาออกไปแล้ว
    if (title.includes("เจ้าหน้าที่")) {
      return {
        icon: UsersIcon,
        color: "#EAEDFF"
      }
    }

    return {
      color: "#5c5c5c"
    }
  }

  {/*รับค่าidของ ploblems มาแมพกับ icon*/ }
  const getConfigRanking: Record<number, ComponentType<SVGProps<SVGSVGElement>> | string> = {
    1: LightBulbIcon , //ไฟฟ้า
    2: FaTools, //ถนน
    3: IoWaterOutline, //น้ำประปา
    4: TrashIcon, //ขยะ
    5: BsTree, //ต้นไม้
    6: FunnelIcon  //ท่อระบายน้ำ

  }

  return (
    <div className="min-h-screen bg-background flex  justify-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-7">แดชบอร์ด</h1>

        {/*การ์ดส่วน1*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {summary?.topCards.map((item, index) => (
            <SummaryCard
              key={index}
              title={item.title}
              value={item.value}
              subvalue={item.subvalue}
              color={item.color}
            />
          ))}
        </div>

        {/*การ์ดส่วน2*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {summary?.bottomCards.map((item, index) => {
            const { icon, color } = getConfig(item.title)
            return (
              <SummaryCard2
                key={index}
                icon={icon}
                title={item.title}
                value={item.value}
                subvalue={item.subvalue}
                color={color}
              />
            )
          })}
        </div>

        {/*การ์ดส่วน3*/}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mx-12  mb-8">
          {summary?.RankingCards.map((item, index) => (
            <RankingCard
              key = {index}
              rank={index + 1}
              icon={getConfigRanking[item.id]}
              title={item.title}
              value={item.value}
              subvalue={item.subvalue}
            />
          ))}
        </div>

        {/* table */}
        <div className=" rounded-xl border border-[#F2F3FF] border-t-surface overflow-hidden mx-12 ">
          {/* header */}
          <div
            className={`flex items-center justify-between px-6 py-6 border-b ${
              showAll
                ? "bg-surface border-surface"
                : "bg-[#EAEDFF] border-[#EAEDFF]"
            }`}
          >
            <h2 className="font-bold text-foreground text-xl">
              รายการร้องเรียนล่าสุด
            </h2>
            {tableData.length > 3 && (
              <button
                className="text-sm text-[#725C00] font-medium hover:underline"
                onClick={() => setShowAll(!showAll)}
              >
                {"ดูทั้งหมด"}
              </button>
            )}
          </div>
          {/* table */}
          <div className="overflow-x-auto">
            <DataTable columns={columns} data={displayedData} theadClassName="text-[#64748B] text-xs" className="border-b text-sm border-[#EAEDFF]"/>
          </div>

        </div>
        <div className="flex justify-end"><FabButton  style={{ backgroundColor: "#FFD100", color: "#161B29" }} onClick={() => console.log("เพิ่ม")}/></div>
      </div>
    </div>

  )
}

export default Dashboard;

