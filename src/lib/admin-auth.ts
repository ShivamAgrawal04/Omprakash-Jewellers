import { createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"

const COOKIE = "opj_admin"

function username() {
  return process.env.ADMIN_USERNAME?.trim() ?? ""
}

function password() {
  return process.env.ADMIN_PASSWORD ?? ""
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  if (left.length !== right.length) {
    timingSafeEqual(left, left)
    return false
  }
  return timingSafeEqual(left, right)
}

export function isAdminConfigured() {
  return username().length >= 1 && password().length >= 6
}

export function signAdminToken() {
  return createHmac("sha256", `${username()}:${password()}`)
    .update("opj-admin-ok")
    .digest("hex")
}

export function credentialsMatch(user: string, pass: string) {
  return safeEqual(user, username()) && safeEqual(pass, password())
}

export async function isAdminAuthenticated() {
  if (!isAdminConfigured()) return false
  const jar = await cookies()
  const token = jar.get(COOKIE)?.value
  if (!token) return false
  return safeEqual(token, signAdminToken())
}

export function adminCookieHeader() {
  return {
    name: COOKIE,
    value: signAdminToken(),
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  }
}
