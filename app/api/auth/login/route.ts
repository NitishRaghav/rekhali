import { db } from "@/server/db";
import { adminUsers } from "@/shared/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const user = await db.query.adminUsers.findFirst({
      where: eq(adminUsers.email, email),
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Hash the provided password and compare
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
    if (hashedPassword !== user.password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Set session cookie
    const response = NextResponse.json({ success: true, user: { id: user.id, email: user.email } });
    response.cookies.set("admin_session", user.id, { 
      httpOnly: true, 
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
