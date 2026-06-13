import { NextResponse } from "next/server";
import type {MemberSummary} from "@/services/memberData";
import {readData} from "@/services/memberData" 

export async function GET() {
   const data = await getMemberSummary();
   return NextResponse.json(data);
}

/* summary */
export async function getMemberSummary(): Promise<MemberSummary> {
  const members = readData().member.filter(
    (m) => m.status === "approved"
  );

  return {
    admin: members.filter((m) => m.role === "แอดมิน").length,
    staff: members.filter((m) => m.role === "เจ้าหน้าที่").length,
    auditor: members.filter((m) => m.role === "ผู้ตรวจสอบ").length,
    inactive: members.filter((m) => !m.is_active).length,
  };
}
