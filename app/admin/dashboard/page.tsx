"use client";
import { useEffect, useState } from "react";
import SummaryCard from "../../../components/ui/Admin_director/SummaryCard";
import SummaryCard2 from "../../../components/ui/Admin_director/SummaryCard2";

interface SummaryItem {
  title: string;
  value: number;
  subvalue: number;
  color: string;
}

interface SummaryData {
  topCards: SummaryItem[];
  bottomCards: SummaryItem[];
  RankingCards: any; // ยังไม่ใช้ ใส่ any ไปก่อน
}


function Dashboard() {
  const [summary, setSummary] = useState<SummaryData | null>(null);;

  useEffect(() => {
    fetch("/api/summary")
      .then(res => res.json())
      .then(data => {
        setSummary(data);
        console.log("Data parsed:", data);
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const getConfig = (title: string) => {
    if (title.includes("เวลา")) {
      return {
        icon: "pic",
        color: "#d3a468"
      }
    }
    if (title.includes("ร้องเรียน")) {
      return {
        icon: "pic",
        color: "#adc1c7"
      }
    }
    if (title.includes("เจ้าหน้าที่")) {
      return {
        icon: "pic",
        color: "#87a0a8"
      }
    }

    return {
      color: "bg-gray-100"
    }
  }



  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-3 px-6 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-7">แดชบอร์ด</h1>
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-4 mx-12 mb-6">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 mx-12 mb-6">
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
        
      </div>
    </div>
  )
}

export default Dashboard;