import { currentRole } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const role = await currentRole();

  if (role != "ADMIN") {
    return new NextResponse(null, { status: 403 });
  }

  return new NextResponse(null, { status: 200 });
}