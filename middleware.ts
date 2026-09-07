import { NextResponse, type NextRequest } from "next/server"
import { updateSupabaseSession } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) {
    return NextResponse.next()
  }

  const { supabase, response, user } = await updateSupabaseSession(request)
  const isLogin = pathname === "/admin/login"

  if (isLogin) {
    if (user) {
      const { data: isAdmin } = await supabase.rpc("is_admin")
      if (isAdmin) {
        const adminUrl = request.nextUrl.clone()
        adminUrl.pathname = "/admin"
        adminUrl.search = ""
        return NextResponse.redirect(adminUrl)
      }
    }
    return response
  }

  if (!user) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
    }
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = "/admin/login"
    loginUrl.search = ""
    return NextResponse.redirect(loginUrl)
  }

  const { data: isAdmin } = await supabase.rpc("is_admin")
  if (!isAdmin) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 })
    }
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = "/admin/login"
    loginUrl.searchParams.set("pending", "1")
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
}
