import { NextResponse } from "next/server";
import rawData from "@/data/alternative/data2.json";

export async function GET() {
  const data = await getProblemWithCounts();

  return NextResponse.json({
    data
  });
}

//table
export async function getProblemWithCounts() {
  const cases = rawData.cases;
  const problems = rawData.problems;

  const countMap: Record<number, number> = {};

  for (const c of cases) {
    countMap[c.problem_id] = (countMap[c.problem_id] || 0) + 1;
  }

  //merge กับ problems
  return problems.map((p: any) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    is_active: p.is_active,
    total_cases: countMap[p.id] || 0
  }));
}