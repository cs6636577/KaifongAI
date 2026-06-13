import { NextResponse } from "next/server";
import {readData,writeData} from "@/services/memberData" 
import type {Member} from "@/services/memberData"

export async function POST(req: Request) {
  const body = await req.json();
  const { id, status } = body;

  const data = await updateMemberStatus(id, status);

  return NextResponse.json({
    success: true,
    data,
  });
}

/* update status */
export async function updateMemberStatus(
  id: number,
  status: string
): Promise<Member[]> {
  const data = readData();

  const updatedMembers = data.member.map((member) =>
    member.id === id
      ? {
          ...member,
          status,
          is_active: status === "approved",
          approve_at:
            status !== "pending"
              ? new Date().toISOString()
              : "",
        }
      : member
  );

  writeData({ member: updatedMembers });

  return updatedMembers;
}