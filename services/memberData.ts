import rawData from "../data/member.json";

export interface Member {
    id: number,
    name: string,
    lastname: string,
    email: string,
    phone: string,
    line_id: string,
    status: "approved" | "rejected" | "pending"| string,
    is_active: boolean,
    role: "ผู้ตรวจสอบ"| "เจ้าหน้าที่" | "แอดมิน" | string,
    department: string,
    technician_type: string,
    datetime: string,
    approve_at?: string
}

export interface MemberSummary {
  admin: number;
  staff: number;
  auditor: number;
  inactive: number;
}

export async function getMember(): Promise<Member[]> {
  return rawData.member;
}

export async function getpendingMembers(): Promise<Member[]> {

  const allMembers = rawData.member;
  const pendingMembers = allMembers.filter(member => member.status === "pending");
  return pendingMembers;
}

export async function getApprovedMembers(): Promise<Member[]> {
  return rawData.member.filter(
    (m) => m.status === "approved"
  );
}

export async function getMemberSummary(): Promise<MemberSummary> {
  const members = rawData.member.filter(
    (m) => m.status === "approved"
  );

  return {
    admin: members.filter(m => m.role === "แอดมิน").length,
    staff: members.filter(m => m.role === "เจ้าหน้าที่").length,
    auditor: members.filter(m => m.role === "ผู้ตรวจสอบ").length,
    inactive: members.filter(m => !m.is_active).length,
  };
}






