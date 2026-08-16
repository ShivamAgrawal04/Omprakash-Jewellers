import { NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { persistUpload } from "@/lib/admin-content"

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const form = await request.formData()
  const file = form.get("file")
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 })
  }
  if (file.size > 3_500_000) {
    return NextResponse.json({ error: "Keep images under 3.5 MB." }, { status: 400 })
  }
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg"
  if (!["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) {
    return NextResponse.json({ error: "Use jpg, png or webp." }, { status: 400 })
  }
  const safe = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "").slice(-40)}`
  const bytes = Buffer.from(await file.arrayBuffer())
  const url = await persistUpload(safe, bytes)
  return NextResponse.json({ url })
}
