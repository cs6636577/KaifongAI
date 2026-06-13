import { NextResponse } from "next/server";
import type {MemberApprovalSummary} from "@/services/memberData"
import {readData} from "@/services/memberData" 

export async function GET() {
  const data = await getMemberApprovalSummary();

  return NextResponse.json(data);
}

/*member-approved*/
export async function getMemberApprovalSummary(): Promise<MemberApprovalSummary> {
  // [MOCK] ดึงจาก JSON — เปลี่ยนเป็น db.query("SELECT * FROM members") เมื่อใช้ DB
  const members = readData().member;
  const today = new Date().toISOString().split("T")[0];

  /* คำขอวันนี้ */
  const requestToday = members.filter(
    (m) => m.datetime?.split("T")[0] === today
  ).length;

  /* สถานะต่าง ๆ */
  const pending = members.filter(
    (m) => m.status === "pending"
  ).length;

  const rejected = members.filter(
    (m) => m.status === "rejected"
  ).length;

  const approved = members.filter(
    (m) => m.status === "approved"
  ).length;

  /* ความเร็วอนุมัติเฉลี่ย (ชม.) */
  const approvedMembers = members.filter(
    (m) => m.status === "approved" && m.approve_at
  );

  const totalHours = approvedMembers.reduce((sum, m) => {
    const requestTime = new Date(m.datetime).getTime();
    const approveTime = new Date(m.approve_at!).getTime();

    return sum + (approveTime - requestTime) / (1000 * 60 * 60); // ms → ชั่วโมง
  }, 0);
  // เฉลี่ย ทศนิยม 1 ตน. — ถ้าไม่มีข้อมูลคืน 0
  const avgApproveHours =
    approvedMembers.length > 0
      ? Number((totalHours / approvedMembers.length).toFixed(1))
      : 0;

  return {
    requestToday,
    pending,
    rejected,
    approved,
    avgApproveHours,
  }
}
