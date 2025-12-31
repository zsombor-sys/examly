'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui'

export default function Navbar() {
  const [email, setEmail] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

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

  // Close mobile menu on route changes by link click (handled via onClick on each link)
  // and on resize to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setMobileOpen(false) // md breakpoint
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  async function signOut() {
    if (!supabase) return
    await supabase.auth.signOut()
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
            {/* logo lives in /public/assets/logo.png */}
            <img src="/assets/logo.png" alt="Examly" className="h-8 w-8" />
            <span className="text-sm font-semibold tracking-tight">Examly</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-dim">
            <Link href="/plan" className="hover:text-white">Plan</Link>
            <Link href="/practice" className="hover:text-white">Practice</Link>
            <Link href="/vocab" className="hover:text-white">Vocab</Link>
            <Link href="/guide" className="hover:text-white">Guide</Link>
            <a href="/#pricing" className="hover:text-white">Pricing</a>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {email ? (
              <>
                <span className="hidden sm:inline text-xs text-dim">{email}</span>
                <Button variant="ghost" onClick={signOut}>Sign out</Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)}>
                  <Button>Sign up</Button>
                </Link>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden ml-1 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden mt-3 rounded-2xl border border-white/10 bg-black/70 backdrop-blur p-2">
            <Link
              href="/plan"
              className="block rounded-xl px-4 py-3 text-sm text-white/90 hover:bg-white/10"
              onClick={() => setMobileOpen(false)}
            >
              Plan
            </Link>
            <Link
              href="/practice"
              className="block rounded-xl px-4 py-3 text-sm text-white/90 hover:bg-white/10"
              onClick={() => setMobileOpen(false)}
            >
              Practice
            </Link>
            <Link
              href="/vocab"
              className="block rounded-xl px-4 py-3 text-sm text-white/90 hover:bg-white/10"
              onClick={() => setMobileOpen(false)}
            >
              Vocab
            </Link>
            <Link
              href="/guide"
              className="block rounded-xl px-4 py-3 text-sm text-white/90 hover:bg-white/10"
              onClick={() => setMobileOpen(false)}
            >
              Guide
            </Link>
            <a
              href="/#pricing"
              className="block rounded-xl px-4 py-3 text-sm text-white/90 hover:bg-white/10"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </a>

            <div className="my-2 border-t border-white/10" />

            {email ? (
              <>
                <div className="px-4 py-2 text-xs text-white/60">{email}</div>
                <button
                  className="w-full rounded-xl px-4 py-3 text-left text-sm text-white/90 hover:bg-white/10"
                  onClick={signOut}
                >
                  Sign out
                </button>
              </>
            ) : (
              <div className="flex gap-2 p-2">
                <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full">Log in</Button>
                </Link>
                <Link href="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
