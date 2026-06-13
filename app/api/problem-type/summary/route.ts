import { NextResponse } from "next/server";
import rawData from "@/data/alternative/data2.json";

export async function GET() {
  const data = await  getProblemSummary();

  return NextResponse.json({
    data
  });
}

//summary 
export async function getProblemSummary() {
  const problems = rawData.problems;

  const total = problems.length;

  const active = problems.filter((p: any) => p.is_active).length;

  const inactive = total - active;

  return {
    total,
    active,
    inactive
  };
}