import { NextResponse } from "next/server";
import type {Member} from "@/services/memberData";
import {readData} from "@/services/memberData" 

export async function GET() {
  const data = await getApprovedMembers();
  return NextResponse.json(data);
}

/* อนุมัติแล้ว */
export async function getApprovedMembers(): Promise<Member[]> {
  return readData().member.filter(
    (member) => member.status === "approved"
  );
}