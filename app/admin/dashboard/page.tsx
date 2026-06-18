"use client";

import { useEffect, useState } from "react";

import SummaryCard from "../../../components/ui/Admin_director/SummaryCard";

import SummaryCard2 from "../../../components/ui/Admin_director/SummaryCard2";

import RankingCard from "@/components/ui/Admin_director/RankingCard";

import DataTable from "@/components/ui/Admin_director/DataTable";

import type { ComponentType, SVGProps } from "react";

import { ClockIcon, LightBulbIcon, TrashIcon, FunnelIcon } from "@heroicons/react/24/outline";

import { BsTree } from "react-icons/bs";

import { IoWaterOutline } from "react-icons/io5";

import { FaTools } from "react-icons/fa";

import { Sarabun } from "next/font/google";

import { CalendarCheck, CalendarPlus, CalendarDays } from "lucide-react";

import mockData from "../../../data/mock_data_may2026_fixed.json";

const thaiFont = Sarabun({

  subsets: ["thai"],

  weight: ["400", "500", "700"],

});

import { IoFilterSharp } from "react-icons/io5";

import ComplaintPagination from "@/components/ui/Admin_director/PageNavigation";

//สำหรับใส่ค่าส่งไปที่ components card ต่างๆ อิงส่วน ui และเนื้อหาจากหน้า // lib/summaryDashboard.ts ที่เป็นส่วนคำนวณ

interface SummaryItem {

  id: number;

  icon?: ComponentType<SVGProps<SVGSVGElement>> | string;

  title: string;

  value: number | string;

  subvalue: number | string;

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

  //ปุ่ม ดูทั้งหมด default = 3 -> ดูทั้งหมด 10 (กดเลื่อนเรื่อยๆ) -> กดปุ่มดูทั้งหมดกลับ สี thead เปลี่ยน -> default

  const [currentPage, setCurrentPage] = useState(1);

  const [showAll, setShowAll] = useState(false);

  const DEFAULT_LIMIT = 3;

  const PAGE_LIMIT = 10;

  const limit = showAll ? PAGE_LIMIT : DEFAULT_LIMIT;

  const [statusFilter, setStatusFilter] = useState("all");

  const [showFilter, setShowFilter] = useState(false);

  // ใช้ reference จาก mock_data_may2026.json เพื่อแปลง status/category ให้ตรงกับ mock

  const statuses = mockData.meta.reference_ids.statuses;

  const categories = mockData.meta.reference_ids.categories;

  //แปลงสถานะจาก mock เป็น key ภาษาอังกฤษ เพื่อให้ switch case เดิมใช้ต่อได้

  const getStatusKey = (statusId: string) => {

    const status = statuses.find((s) => s.status_id === statusId);

    if (status?.name === "เปิด") return "pending";

    if (status?.name === "กำลังดำเนินการ") return "in_progress";

    if (status?.name === "ปิด") return "resolved";

    if (status?.name === "แก้ไขแล้ว") return "resolved";

    if (status?.name === "พักงาน") return "paused";

    if (status?.name === "ถูกปฏิเสธ") return "rejected";

    

    return "pending";

  };

  //แปลงวันที่จาก mock ให้แสดงในตาราง

  const formatDate = (dateText: string) => {

    return new Date(dateText).toLocaleString("th-TH", {

      day: "2-digit",

      month: "2-digit",

      year: "numeric",

      hour: "2-digit",

      minute: "2-digit",

    });

  };

  const filteredTable = tableData.filter((item) => {

    if (statusFilter === "all") return true;

    return item.status === statusFilter;

  });

  const totalPages = Math.ceil(filteredTable.length / limit);

  const displayedData = filteredTable.slice(

    (currentPage - 1) * limit,

    currentPage * limit

  );

  useEffect(() => {

    setCurrentPage(1);

  }, [statusFilter, showAll]);

  //table

  const columns = [

    { key: "id", title: "รหัสรายการ", className: "font-bold" },

    { key: "problems", title: "หัวข้อร้องเรียน", className: "font-bold" },

    {

      key: "area",

      title: "พื้นที่",

      className: "text-gray-500",

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

            bgColor = "bg-yellow-100";

            textColor = "text-yellow-700";

            text = "รอดำเนินการ";

            break;

          case "in_progress":

            bgColor = "bg-blue-100";

            textColor = "text-blue-700";

            text = "กำลังดำเนินการ";

            break;

          case "resolved":

            bgColor = "bg-green-100";

            textColor = "text-green-700";

            text = "เสร็จสิ้น";

            break;

          case "paused":

            bgColor = "bg-gray-100";

            textColor = "text-gray-700";

            text = "พักงาน";

            break;

          case "rejected":

            bgColor = "bg-red-100";

            textColor = "text-red-700";

            text = "ถูกปฏิเสธ";

            break;

          default:

            bgColor = "bg-gray-100";

            textColor = "text-gray-700";

            text = value;

        }

        return (

          <div className={`w-24 h-6 flex items-center justify-center rounded-full ${bgColor} ${textColor} font-bold text-xs`}>

            {text}

          </div>

        );

      },

    },

    { key: "time", title: "เวลาที่แจ้ง", className: "text-sm text-gray-400" },

  ];

  

  //เปลี่ยนมาใช้ mock_data_may2026.json โดยตรง เพื่อให้เวลาแจ้งและ status ตรงกับ mock

  useEffect(() => {

    const formatted = mockData.complaints

      .map((item) => ({

        id: item.complaint_no,

        problems: item.title,

        area: item.location_text || item.district || item.province || "-",

        status: getStatusKey(item.current_status_id),

        time: formatDate(item.created_at),

        createdAt: item.created_at,

      }))

      .sort(

        (a, b) =>

          new Date(b.createdAt).getTime() -

          new Date(a.createdAt).getTime()

      );

    setTableData(formatted);

  }, []);

  //คำนวณ summary จาก mock_data_may2026.json แทน fetch("/api/summary")

  useEffect(() => {

    const complaints = mockData.complaints;

    const pendingCount = complaints.filter(

      (item) => getStatusKey(item.current_status_id) === "pending"

    ).length;

    const completedCount = complaints.filter(

      (item) => getStatusKey(item.current_status_id) === "resolved"

    ).length;

    const closedItems = complaints.filter(

      (item) => item.resolved_at && item.created_at

    );

    const avgCloseDays =

      closedItems.length > 0

        ? (

            closedItems.reduce((sum, item) => {

              const created = new Date(item.created_at).getTime();

              const resolved = new Date(item.resolved_at as string).getTime();

              return sum + (resolved - created) / (1000 * 60 * 60 * 24);

            }, 0) / closedItems.length

          ).toFixed(2)

        : "0";

    const today = new Date();

    const todayCount = complaints.filter((item) => {

      const created = new Date(item.created_at);

      return created.toDateString() === today.toDateString();

    }).length;

    const weekCount = complaints.filter((item) => {

      const created = new Date(item.created_at);

      const diffDays =

        (today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);

      return diffDays <= 7 && diffDays >= 0;

    }).length;

    const monthCount = complaints.filter((item) => {

      const created = new Date(item.created_at);

      return (

        created.getMonth() === today.getMonth() &&

        created.getFullYear() === today.getFullYear()

      );

    }).length;

    const categoryCounts = categories

      .map((category, index) => {

        const count = complaints.filter(

          (item) => item.category_id === category.category_id

        ).length;

        return {

          id: index + 1,

          title: category.name,

          value: count,

          subvalue: Math.round((count / complaints.length) * 100),

        };

      })

      .sort((a, b) => Number(b.value) - Number(a.value))

      .slice(0, 3);

    setSummary({

      topCards: [

        {

          id: 1,

          title: "รอดำเนินการ",

          value: pendingCount,

          subvalue: "",

          color: "#EF4444",

        },

        {

          id: 2,

          title: "แก้ไขเสร็จสิ้นแล้ว",

          value: completedCount,

          subvalue: "",

          color: "#22C55E",

        },

        {

          id: 3,

          title: "เวลาเฉลี่ยในการปิดงาน",

          value: avgCloseDays,

          subvalue: "วัน",

          color: "#FFD100",

        },

      ],

      bottomCards: [

        {

          id: 1,

          title: "เรื่องที่ร้องเรียนวันนี้",

          value: todayCount,

          subvalue: "",

        },

        {

          id: 2,

          title: "ร้องเรียนใหม่สัปดาห์นี้",

          value: weekCount,

          subvalue: "",

        },

        {

          id: 3,

          title: "เรื่องที่ร้องเรียนเดือนนี้",

          value: monthCount,

          subvalue: "",

        },

      ],

      RankingCards: categoryCounts,

    });

  }, []);

  {/*รับค่า title เลือกเฉพาะส่วน keyword เนื้อหาปรับเปลี่ยนได้ มาแมพกับสีและicon ของcardส่วนที่2 */ }

  const getConfig = (title: string) => {

    if (title.includes("เวลา")) {

      return {

        icon: (props: React.SVGProps<SVGSVGElement>) => (

          <ClockIcon {...props} stroke="#564500" />

        ),

        color: "#FFE07F",

      };

    }

    if (title.includes("วันนี้")) {

      return {

        icon: CalendarCheck,

        color: "#EAEDFF",

      };

    }

    if (title.includes("สัปดาห์")) {

      return {

        icon: CalendarPlus,

        color: "#FFE07F",

      };

    }

    if (title.includes("เดือน")) {

      return {

        icon: CalendarDays,

        color: "#dadcea",

      };

    }

    return {

      color: "#5c5c5c",

    };

  };

  {/*รับค่าidของ ploblems มาแมพกับ icon*/ }

  const getConfigRanking: Record<number, ComponentType<SVGProps<SVGSVGElement>> | string> = {

    1: LightBulbIcon, //ไฟฟ้า

    2: FaTools, //ถนน

    3: IoWaterOutline, //น้ำประปา

    4: TrashIcon, //ขยะ

    5: BsTree, //ต้นไม้

    6: FunnelIcon, //ท่อระบายน้ำ

  };

  return (

    <div className={`${thaiFont.className} min-h-screen bg-background flex justify-center`}>

      <div className="max-w-7xl mx-3 px-6 sm:px-6 lg:px-8 py-8 w-full">

        <h1 className="text-3xl font-bold text-foreground mb-7">แดชบอร์ด</h1>

        <h2 className="text-xl font-bold text-foreground mx-12 mb-4">

          จำนวนเรื่องร้องเรียน

        </h2>

        {/*การ์ดส่วน1*/}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mx-12 mb-6">

          {summary?.topCards.map((item, index) => {

            return (

              <SummaryCard

                key={index}

                title={item.title}

                value={item.value}

                subvalue={item.subvalue}

                color={item.color}

              />

            );

          })}

        </div>

        {/*การ์ดส่วน2*/}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mx-12 mb-6">

          {summary?.bottomCards.map((item, index) => {

            const { icon, color } = getConfig(item.title);

            return (

              <SummaryCard2

                key={index}

                icon={icon}

                title={item.title}

                value={item.value}

                subvalue={item.subvalue}

                color={color}

              />

            );

          })}

        </div>

        {/*การ์ดส่วน3*/}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mx-12 mb-8">

          {summary?.RankingCards.map((item, index) => (

            <RankingCard

              key={index}

              rank={index + 1}

              icon={getConfigRanking[item.id]}

              title={item.title}

              value={item.value}

              subvalue={item.subvalue}

            />

          ))}

        </div>

        {/* table */}

        <div className=" rounded-xl border border-[#F2F3FF] border-t-surface overflow-visible mx-12 ">

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

            {/* actions */}

            <div className="flex items-center gap-4 relative">

              {/* ดูทั้งหมด */}

              {tableData.length > 3 && (

                <button

                  className="text-sm text-[#725C00] font-medium hover:underline"

                  onClick={() => {

                    setShowAll(!showAll);

                    setShowFilter(false);

                  }}

                >

                  ดูทั้งหมด

                </button>

              )}

              {/* กรองข้อมูล */}

              <div className="relative">

                <button

                  className="flex items-center gap-1 text-sm text-[#725C00] font-medium cursor-pointer"

                  onClick={() => setShowFilter(!showFilter)}

                >

                  <div className="flex">

                    <IoFilterSharp />

                  </div>

                </button>

                {showFilter && (

                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl border border-gray-200 shadow-xl p-2 z-50 max-h-80 overflow-y-[9999]">

                    <button

                      onClick={() => {

                        setStatusFilter("pending");

                        setShowFilter(false);

                      }}

                      className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium hover:bg-gray-100"

                    >

                      รอดำเนินการ

                    </button>

                    <button

                      onClick={() => {

                        setStatusFilter("in_progress");

                        setShowFilter(false);

                      }}

                      className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium hover:bg-gray-100"

                    >

                      กำลังดำเนินการ

                    </button>

                    <button

                      onClick={() => {

                        setStatusFilter("resolved");

                        setShowFilter(false);

                      }}

                      className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium hover:bg-gray-100"

                    >

                      เสร็จสิ้น

                    </button>

                    <button

                      onClick={() => {

                        setStatusFilter("paused");

                        setShowFilter(false);

                      }}

                      className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium hover:bg-gray-100"

                    >

                      พักงาน

                    </button>

                    <button

                      onClick={() => {

                        setStatusFilter("rejected");

                        setShowFilter(false);

                      }}

                      className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium hover:bg-gray-100"

                    >

                      ถูกปฏิเสธ

                    </button>

                    <button

                      onClick={() => {

                        setStatusFilter("all");

                        setShowFilter(false);

                      }}

                      className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium hover:bg-gray-100"

                    >

                      ทั้งหมด

                    </button>

                  </div>

                )}

              </div>

            </div>

          </div>

          {/* table */}

          <div className="overflow-x-auto">

            <DataTable

              columns={columns}

              data={displayedData}

              theadClassName="text-[#64748B] text-xs"

              className="border-b text-sm border-[#EAEDFF]"

            />

          </div>

        </div>

        {showAll && (

          <div className="flex justify-center mt-6">

            <ComplaintPagination

              currentPage={currentPage}

              totalPages={totalPages}

              onPageChange={setCurrentPage}

            />

          </div>

        )}

      </div>

    </div>

  );

}

export default Dashboard;