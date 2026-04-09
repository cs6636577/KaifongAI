import { NextResponse } from "next/server";
import {  getpendingMembers } from "@/services/memberData";

export async function GET() {
  const data = await getpendingMembers();
  return NextResponse.json(data);
}