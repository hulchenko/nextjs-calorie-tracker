import { deleteSession, updateSession, verifySession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await verifySession();
  if (session) {
    const reqContent = request.headers.get("content-length") || 0;
    const isRefreshReq = reqContent == 0;
    let email = null;
    if (!isRefreshReq) email = await request.json();
    await updateSession(email);
    return NextResponse.json({ message: "Session updated" }, { status: 200 });
  } else {
    deleteSession();
    return NextResponse.json(
      { message: "No session present. Skipping.." },
      { status: 303 }
    );
  }
}

export async function GET() {
  // verify current session
  const session = await verifySession();
  if (session) {
    return NextResponse.json(session);
  } else {
    deleteSession();
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
