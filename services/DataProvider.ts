import rawData from "../data/data.json";

export interface Case {
  id: number;
  user_id: number;
  problem_id: number;
  datetime: string;
  status: "pending" | "in_progress" | "resolved" | string;
  description?: string;
  location?: string;
  location_detail?: string;
  location_lat?: number;
  location_lng?: number;
  location_url?: string;
  picture_url?: string;
}

export interface User {
  id: number;
  created_at: string;
}

export interface Technician {
  id: number;
  status: "approved" | "offline";
}

export interface Problem {
  id: number;
  name: string;
  description: string;
}

export interface case_status_log{
  id: number,
  case_id: number,
  status: string,
  changed_at: string;
}

export interface DashboardData {
  cases: Case[];
  users: User[];
  technicians: Technician[];
  problems: Problem[];
  case_status_logs: case_status_log[]; 
}

export async function getData(): Promise<DashboardData> {
  return {
    cases: rawData.cases.map((c: any) => ({
      id: c.id,
      user_id: c.user_id,
      problem_id: c.problem_id,
      datetime: c.datetime,
      status:
        c.status === "pending" || c.status === "in_progress" || c.status === "resolved"
          ? c.status
          : "pending",
      description: c.description,
      location: c.location,
      location_detail: c.location_detail,
      location_lat: c.location_lat,
      location_lng: c.location_lng,
      location_url: c.location_url,
      picture_url: c.picture_url,
    })),

    users: rawData.users.map((u: any) => ({
      id: u.id,
      created_at: u.datetime, // map datetime -> created_at
    })),

    technicians: rawData.technicians.map((t: any) => ({
      id: t.id,
      status: t.status === "approved" ? "approved" : "offline",
    })),
    
    problems: rawData.problems,
    case_status_logs:  rawData.case_status_logs.map((cl: any) => ({
      id: cl.id,
      case_id: cl.case_id,
      status: cl.status,
      changed_at: cl.changed_at, 
    })),
  };
}
// ต่อไป ถ้าเปลี่ยนเป็น DB แค่แก้ getData() ให้ query DB แทน
// ยังไม่เสถียร ลอจิคผิด + ไม่ยืดหยุ่น งง 
// ถ้ามีไรเพี้ยน คือ หลังบ้าน แก้หลังบ้าน 