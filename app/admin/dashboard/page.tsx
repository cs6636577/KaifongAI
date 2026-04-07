"use client";
import { useEffect, useState } from "react";
import SummaryCard from "../../../components/ui/Admin_director/SummaryCard";
import SummaryCard2 from "../../../components/ui/Admin_director/SummaryCard2";
import RankingCard from "@/components/ui/Admin_director/RankingCard";
import DataTable from "@/components/ui/Admin_director/DataTable";
import type { ComponentType, SVGProps } from 'react'
import { ClockIcon, ClipboardDocumentListIcon, UsersIcon } from '@heroicons/react/24/outline';
//สำหรับใส่ค่าส่งไปที่ components card ต่างๆ อิงส่วน ui และเนื้อหาจากหน้า // lib/summaryDashboard.ts ที่เป็นส่วนคำนวณ
interface SummaryItem {
  id: number;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
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
  const [summary, setSummary] = useState<SummaryData | null>(null);;

  //test datatable 
  const columns = [
    { key: "id", title: "รหัสรายการ" },
    { key: "problems", title: "หัวข้อร้องเรียน" },
    { key: "area", title: "พื้นที่" },
    {
      key: "status",
      title: "สถานะ",
      //ทดสอบ ตัวtoggle/components อื่นๆ
      render: (value: any) => (
        <div className={`w-10 h-5 rounded-full ${value ? "bg-yellow-400" : "bg-gray-300"
          }`} />
      )
    },
    {key:"time", title:"เวลาที่แจ้ง"}
  ];
  const data = [
  {
    id: "REQ-001",
    problems: "ไฟถนนดับ",
    area: "เขตบางเขน",
    status: true,
    time: "2026-04-01 08:30"
  },
  {
    id: "REQ-002",
    problems: "ขยะล้นถัง",
    area: "เขตลาดพร้าว",
    status: false,
    time: "2026-04-01 09:15"
  },
  {
    id: "REQ-003",
    problems: "ท่อระบายน้ำอุดตัน หน้าหมู่บ้านรวยรื่น",
    area: "เขตจตุจักร",
    status: true,
    time: "2026-04-02 10:05"
  },
  {
    id: "REQ-004",
    problems: "ถนนเป็นหลุม",
    area: "เขตบางซื่อ",
    status: false,
    time: "2026-04-02 11:40"
  },
  {
    id: "REQ-005",
    problems: "น้ำประปาไม่ไหล",
    area: "เขตดอนเมือง",
    status: true,
    time: "2026-04-03 07:50"
  },
  {
    id: "REQ-006",
    problems: "เสียงดังรบกวน",
    area: "เขตหลักสี่",
    status: false,
    time: "2026-04-03 13:20"
  }
  ];

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
  const getConfigRanking: Record<number, string> = {
    1: "ไฟฟ้า",
    2: "ถนน",
    3: "น้ำประปา",
    4: "ขยะ",
    5: "ต้นไม้",
    6: "ท่อระบายน้ำ"

  }

  return (
    <div className="min-h-screen bg-background flex  justify-center">
      <div className="max-w-7xl mx-3 px-6 sm:px-6 lg:px-8 py-8 w-full">
        <h1 className="text-3xl font-bold text-foreground mb-7">แดชบอร์ด</h1>

        {/*การ์ดส่วน1*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-12 mb-6">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-12 mb-6">
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
              rank={index + 1}
              icon={getConfigRanking[item.id]}
              title={item.title}
              value={item.value}
              subvalue={item.subvalue}
            />
          ))}
        </div>

        {/* table */}
        <div className=" rounded-xl border border-border overflow-hidden mx-12">
          {/* header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-[#EAEDFF]">
            <h2 className="font-bold text-foreground text-lg">
              รายการร้องเรียนล่าสุด
            </h2>
            <button className="text-sm text-[#725C00] font-medium hover:underline">
              ดูทั้งหมด
            </button>
          </div>
          {/* table */}
          <div className="overflow-x-auto">
            <DataTable columns={columns} data={data} theadClassName="text-[#64748B] text-sm" className="border-b  border-[#EAEDFF]"/>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard;

