import { NextResponse } from "next/server";
import type {Case} from "@/services/DataProvider";
import rawData from "@/data/alternative/data2.json";

export async function GET() {
  const sortData = await sortDate();
  return NextResponse.json(sortData);
}

//sort Date CaseTable /dashboard
export async function sortDate(): Promise<Case[]> {
  const cases = await getCases(); 
  // เรียงล่าสุด → เก่าสุด
  const sortedCases = cases.sort(
    (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
  );
  return sortedCases;
}

// ดึง Cases
export async function getCases(): Promise<Case[]> {
  return rawData.cases.map((c: any) => ({
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
  }));
}