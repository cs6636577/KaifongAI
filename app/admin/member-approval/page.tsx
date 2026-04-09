"use client";
import { useEffect, useState } from "react";
import SummaryCard from "../../../components/ui/Admin_director/SummaryCard";
import type { ComponentType, SVGProps } from 'react'
import DataTable from "@/components/ui/Admin_director/DataTableBase"
import { Member } from "@/services/memberData"
import ComplaintPagination from "@/components/ui/Admin_director/PageNavigation";
import OptionsMenu from "@/components/ui/Admin_director/OptionMenu";
import { IoIosCheckmark, IoIosClose } from "react-icons/io";
import FilterButton from "@/components/ui/Admin_director/FilterButton"



//สำหรับใส่ค่าส่งไปที่ components card ต่างๆ อิงส่วน ui และเนื้อหาจากหน้า ที่เป็นส่วนคำนวณ
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
}


function MemberApproval() {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [tableData, setTableData] = useState<Member[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const pageData = tableData.slice((currentPage - 1) * limit, currentPage * limit);
  const totalPages = Math.ceil(tableData.length / limit);

  const [buttonStates, setButtonStates] = useState<{ [id: number]: string }>({});

  //หัวตาราง 
  const columns = [
    { key: "id", title: "ลำดับ" },
    { key: "name", title: "ชื่อ-นามสกุล / อีเมลล์" },
    { key: "department", title: "หน่วยงาน" },
    { key: "time", title: "วันที่สมัคร" },
    {
      key: "status", title: "สถานะ",
    }
  ];

  function formatThaiDate(dateString: string) {
    const date = new Date(dateString);

    // กำหนด options
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short", // ต.ค., ม.ค. ฯลฯ
      year: "numeric",
    };

    // แปลงเป็น locale "th-TH"
    const formatted = date.toLocaleDateString("th-TH", options);

    return formatted;
  }

  useEffect(() => {
    fetch("/api/member-approval/table")
      .then((res) => res.json())
      .then((members: Member[]) => {
        const formatted = members.map((m) => ({
          ...m,
          datetime: formatThaiDate(m.datetime)
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



  return (
    <div className="h-screen bg-background">
      <div className="w-full px-8 py-8 mx-auto">

        <div className="w-full flex justify-between mr-24">
          <h1 className="text-3xl font-bold text-[#333847] mb-3 pl-10">อนุมัติสมาชิก{" "}{tableData.length}</h1>
          <div className="ml-6"><FilterButton onClick={() => console.log("กรองข้อมูล")} /></div>
        </div>
        
        <p className="text-xl text-muted-foreground mb-12 mx-10 ">ตรวจสอบและยืนยันตัวตนผู้ขอใช้งานระบบใหม่</p>
        {/*การ์ดส่วน1*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-6 ml-10 mt-10">
          {summary?.topCards?.map((item, index) => (
            <SummaryCard
              key={index}
              title={item.title}
              value={item.value}
              subvalue={item.subvalue}
              color={item.color}
            />
          ))}
        </div>

        {/* table */}
        <div className="overflow-x-auto mt-10 ml-6">
          <DataTable columns={columns}>
            <tbody>
              {pageData.map((row, index) => (
                <tr key={row.id} className="h-20">
                  <td className="px-8 py-4 text-[#4D4632]"> {String((currentPage - 1) * limit + index + 1).padStart(2, "0")}</td>
                  <td className="px-8 py-4">
                    <p className="font-bold">{row.name}{" "}{row.lastname}</p>
                    <p className="text-xs text-[#3D4457]">{row.email}</p>
                  </td>
                  <td className="px-6 py-4 text-[#4D4632]">{row.department}</td>
                  <td className="px-6 py-4 text-[#4D4632]">{row.datetime}</td>
                  <td className="px-6 py-4 flex items-center justify-between">

                    {/* Status div */}
                    <div
                      className={`rounded-2xl w-24 h-8 font-bold flex items-center justify-center text-white text-xs ${row.status === "approved" ? "bg-green-500/40" :
                        row.status === "rejected" ? "bg-red-500/40" :
                          "bg-yellow-400/30 text-yellow-800"
                        }`}
                    >
                      {row.status === "approved" ? "อนุมัติแล้ว" :
                        row.status === "rejected" ? "ถูกปฏิเสธ" :
                          "รอดำเนินการ"}
                    </div>

                    {/* Button */}
                    <button
                      className={`rounded-lg w-24 h-8 text-white ${(buttonStates[row.id] || "อนุมัติ") === "อนุมัติ" ? "bg-green-500" : "bg-red-600"
                        }`}
                      onClick={() => {
                        const val = buttonStates[row.id] || "อนุมัติ";
                        setTableData(prev =>
                          prev.map(m =>
                            m.id === row.id
                              ? { ...m, status: val === "อนุมัติ" ? "approved" : "rejected" }
                              : m
                          )
                        );
                      }}
                    >
                      <div className="flex items-center justify-center mr-3">
                        {(buttonStates[row.id] || "อนุมัติ") === "อนุมัติ" ? <IoIosCheckmark className="w-6 h-6" /> : <IoIosClose className="w-6 h-6" />}
                        {buttonStates[row.id] || "อนุมัติ"}
                      </div>
                    </button>

                    {/* OptionsMenu */}
                    <OptionsMenu
                      options={["อนุมัติ", "ปฏิเสธ"]}
                      defaultValue={buttonStates[row.id] || "อนุมัติ"}
                      onSelect={(val: string) => {
                        setButtonStates(prev => ({ ...prev, [row.id]: val }));
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </div>

        <div className="flex justify-center mt-6 ">
          <ComplaintPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

        </div>
      </div>
    </div>

  )
}

export default MemberApproval;