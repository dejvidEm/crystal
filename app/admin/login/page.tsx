"use client"

import { useEffect, useState, type FormEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

function AdminLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [schemaMissing, setSchemaMissing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()
    supabase.rpc("is_admin").then(({ error: rpcError }) => {
      if (rpcError) setSchemaMissing(true)
    })
  }, [])

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createSupabaseBrowserClient()

    try {
      const { error: signError } = await supabase.auth.signInWithPassword({ email, password })
      if (signError) throw signError
      const { data: isAdmin } = await supabase.rpc("is_admin")
      if (!isAdmin) {
        await supabase.auth.signOut()
        throw new Error("Tento účet nemá prístup do administrácie.")
      }
      router.replace("/admin")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Prihlásenie zlyhalo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border-white/10 bg-black/40">
        <CardContent className="p-8">
          <p className="mb-1 text-xs uppercase tracking-[0.2em] text-primary">Crystal Detailing</p>
          <h1 className="mb-6 text-2xl font-semibold">Administrácia</h1>

          {schemaMissing && (
            <div className="mb-6 rounded-md border border-primary/40 bg-primary/10 p-3 text-sm text-zinc-200">
              Databáza ešte nie je pripravená. V Supabase SQL Editore spustite súbor
              <code className="mx-1 text-primary">supabase/schema.sql</code>
              a obnovte túto stránku.
            </div>
          )}

          {searchParams.get("pending") === "1" && (
            <p className="mb-4 text-sm text-amber-300">
              Ste prihlásený, ale tento účet nemá prístup do administrácie.
            </p>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Heslo</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={8}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading || schemaMissing}>
              {loading ? "Čakajte…" : "Prihlásiť sa"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <AdminLoginForm />
    </Suspense>
  )
}
