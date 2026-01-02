'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui'
import { Menu, X } from 'lucide-react'
import { getAuthHeaders } from '@/lib/authClient'

const NAV = [
  { href: '/plan', label: 'Plan' },
  { href: '/practice', label: 'Practice' },
  { href: '/vocab', label: 'Vocab' },
  { href: '/guide', label: 'Guide' },
  { href: '/#pricing', label: 'Pricing' },
]

export default function Navbar() {
  const [email, setEmail] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [credits, setCredits] = useState<number | null>(null)

  useEffect(() => {
    if (!supabase) return
    let mounted = true
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      const e = data.session?.user?.email ?? null
      setEmail(e)
      try {
        if (e) window.localStorage.setItem('examly_user_email_v1', e)
        else window.localStorage.removeItem('examly_user_email_v1')
      } catch {}
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const e = session?.user?.email ?? null
      setEmail(e)
      try {
        if (e) window.localStorage.setItem('examly_user_email_v1', e)
        else window.localStorage.removeItem('examly_user_email_v1')
      } catch {}
    })
    return () => {
      mounted = false
      sub?.subscription?.unsubscribe()
    }
  }, [])

  useEffect(() => {
    // fetch credits when logged in
    let alive = true
    async function load() {
      if (!email) { setCredits(null); return }
      try {
        const headers = await getAuthHeaders()
        const res = await fetch('/api/credits/status', { headers })
        const json = await res.json()
        if (!alive) return
        if (json?.loggedIn) setCredits(Number(json.total ?? 0))
        else setCredits(null)
      } catch {
        if (alive) setCredits(null)
      }
    }
    load()
    return () => { alive = false }
  }, [email])

  async function signOut() {
    if (!supabase) return
    await supabase.auth.signOut()
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3 minw-0" onClick={() => setOpen(false)}>
          <img src="/assets/logo.png" alt="Examly" className="h-8 w-8 shrink-0" />
          <span className="text-sm font-semibold tracking-tight truncate">Examly</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-dim">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-white">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Mobile menu button */}
          <button
            className="md:hidden rounded-lg border border-white/10 bg-white/[0.03] p-2 text-white/80 hover:bg-white/[0.06]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>

          {email ? (
            <>
              <Link
                href="/billing"
                className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/80 hover:bg-white/[0.06]"
                onClick={() => setOpen(false)}
                title="Credits"
              >
                Credits: <span className="text-white">{credits === null ? '…' : credits}</span>
              </Link>
              <span className="hidden sm:inline text-xs text-dim truncate max-w-[180px]">{email}</span>
              <Button variant="ghost" onClick={signOut} className="hidden md:inline-flex">Sign out</Button>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login"><Button variant="ghost">Log in</Button></Link>
              <Link href="/signup"><Button>Sign up</Button></Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <div className="flex flex-col gap-2 text-sm">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white/85 hover:bg-white/[0.06]"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              ))}

              {email ? (
                <button
                  onClick={signOut}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-white/85 hover:bg-white/[0.06]"
                >
                  Sign out
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/login" onClick={() => setOpen(false)} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-white/85 hover:bg-white/[0.06]">
                    Log in
                  </Link>
                  <Link href="/signup" onClick={() => setOpen(false)} className="rounded-xl border border-white/10 bg-white px-4 py-3 text-center text-black hover:bg-neutral-200">
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
