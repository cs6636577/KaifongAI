// lib/summaryDashboard.ts
import { DashboardData } from "../services/DataProvider";
//วัน
export function summaryToday(data: DashboardData){
   const today = new Date().toISOString().slice(0, 10);
   const casesToday = data.cases.filter(c => c.datetime.slice(0, 10) === today).length;
   const yesterday = new Date();
   yesterday.setDate(yesterday.getDate() - 1);
   const yesterdayStr = yesterday.toISOString().slice(0, 10);

   const casesYesterday = data.cases.filter(c => c.datetime.slice(0, 10) === yesterdayStr).length;

   // % เพิ่มขึ้น = (วันนี้ - เมื่อวาน) / เมื่อวาน * 100
   const todayPercent = casesYesterday > 0 
    ? ((casesToday - casesYesterday) / casesYesterday * 100).toFixed(2) 
    : "100"; // ถ้าเมื่อวานไม่มีเลย ถือว่าเพิ่ม 100%

    return  [
    { label: "เรื่องที่ร้องเรียนวันนี้", total: casesToday, percent:todayPercent}
    ]
}
//เดือน 
export function summaryMonth(data: DashboardData) {
  const today = new Date();
  const currentMonth = today.toISOString().slice(0, 7);
  const lastMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonth = lastMonthDate.toISOString().slice(0, 7);

  const total = data.cases.filter(c => c.datetime.slice(0, 7) === currentMonth).length;
  const prev = data.cases.filter(c => c.datetime.slice(0, 7) === lastMonth).length;

  const percent = prev > 0 ? ((total - prev) / prev * 100).toFixed(2) : "100";

  return { label: "เรื่องที่ร้องเรียนเดือนนี้", total, percent: percent + "%" };
}

//pending
export function summaryPending(data: DashboardData) {
  const total = data.cases.filter(c => c.status === "pending").length;
  return { label: "รอดำเนินการ", total };
}

//success
export function summaryResolved(data: DashboardData) {
  const total = data.cases.filter(c => c.status === "resolved").length;
  const percent = ((total / data.cases.length) * 100).toFixed(1);
  return { label: "แก้ไขเสร็จสิ้นแล้ว", total, value: percent + "%" };
}

//สัปดาห์
export function summaryWeek(data: DashboardData) {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const total = data.cases.filter(c => new Date(c.datetime) >= weekAgo).length;
  return { label: "ร้องเรียนใหม่สัปดาห์นี้", total };
}

//เวลาเฉลี่ยในการปิดงาน (วัน)
export function summaryAvgCloseTime(data: DashboardData) {
  const resolvedCases = data.cases.filter(c => c.status === "resolved");
  const avgCloseTime = resolvedCases.length > 0
    ? resolvedCases
        .map(c => {
          const userCreated = data.users.find(u => u.id === c.user_id)?.created_at || c.datetime;
          return new Date(c.datetime).getTime() - new Date(userCreated).getTime();
        })
        .reduce((a, b) => a + b, 0) / resolvedCases.length / (1000 * 60 * 60) // ชั่วโมง
    : 0;
  const avgCloseTimeInDays = avgCloseTime / 24;
  return { label: "เวลาเฉลี่ยในการปิดงาน (ชม.)", total: avgCloseTimeInDays.toFixed(2), label2: "วัน" };
}

//เจ้าหน้าที่ออนไลน์
export function summaryOnlineTechnicians(data: DashboardData) {
  const total = data.technicians.filter(t => t.status === "approved").length;
  return { label: "เจ้าหน้าที่ออนไลน์", total, label2: "คน" };
}


export function getRanking(data: DashboardData) {
  const problemCount: Record<number, number> = {};
  data.cases.forEach(c => {
    problemCount[c.problem_id] = (problemCount[c.problem_id] || 0) + 1;
  });

  const rankingArray = Object.entries(problemCount)
    .map(([pid, count]) => {
      const problem = data.problems.find(p => p.id === Number(pid));
      return {
        problemName: problem?.name || "ไม่ทราบ",
        description: problem?.description || "",
        count
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  const totalCases = data.cases.length;
  return rankingArray.map((p, idx) => ({
    rank: idx + 1,
    problemName: p.problemName,
    description: p.description,
    percent: Math.round((p.count / totalCases) * 100)
  }));
}

// all
export async function getSummaryDataDashboard(data: DashboardData) {
  return {
    topCards: [
    summaryToday(data), summaryMonth(data),summaryPending(data),summaryResolved(data)
    ],
    bottomCards: [
    summaryWeek(data), summaryAvgCloseTime(data), summaryOnlineTechnicians(data)
    ],
    RankingCards: getRanking(data) 
  }
}
//***ลอจิคบางอันยังต้องแก้ เช่น เวลาปิดการใช้งาน เน้นดึง mock ให้มันเข้า card ก่อน