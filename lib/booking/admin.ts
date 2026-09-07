import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { supabase, user: null, ok: false as const, status: 401 as const }
  }

  const { data: isAdmin, error } = await supabase.rpc("is_admin")
  if (error || !isAdmin) {
    return { supabase, user, ok: false as const, status: 403 as const }
  }

  return { supabase, user, ok: true as const, status: 200 as const }
}
