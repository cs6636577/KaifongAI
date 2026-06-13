import { NextResponse } from "next/server";
import type {Member} from "@/services/memberData"
import {readData} from "@/services/memberData" 

export async function GET() {
  const data = await getMember();
  return NextResponse.json(data);
}

/* สมาชิกทั้งหมด */
export async function getMember(): Promise<Member[]> {
  return readData().member;
}
