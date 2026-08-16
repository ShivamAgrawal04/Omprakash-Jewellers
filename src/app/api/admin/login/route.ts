import { NextResponse } from "next/server"
import { adminCookieHeader, credentialsMatch, isAdminConfigured } from "@/lib/admin-auth"

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Set ADMIN_USERNAME and ADMIN_PASSWORD in .env.local (password 6+ characters)." },
      { status: 500 },
    )
  }
  const body = (await request.json()) as { username?: string; password?: string }
  if (!body.username || !body.password || !credentialsMatch(body.username, body.password)) {
    return NextResponse.json({ error: "Wrong username or password." }, { status: 401 })
  }
  const cookie = adminCookieHeader()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(cookie)
  return res
}
