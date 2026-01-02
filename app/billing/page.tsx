'use client'

import { useEffect, useState } from 'react'
import { Button, Card } from '@/components/ui'
import { Loader2, Lock, Gift, Sparkles } from 'lucide-react'
import { getAuthHeaders } from '@/lib/authClient'

export default function BillingPage() {
  const [loading, setLoading] = useState(false)
  const [statusLoading, setStatusLoading] = useState(true)
  const [msg, setMsg] = useState<string | null>(null)
  const [credits, setCredits] = useState(0)
  const [freeExpires, setFreeExpires] = useState<string | null>(null)

  async function refresh() {
    setStatusLoading(true)
    try {
      const headers = await getAuthHeaders()
      const res = await fetch('/api/credits/status', { headers })
      const json = await res.json()
      if (json?.loggedIn) {
        setCredits(Number(json.total ?? 0))
        setFreeExpires(json.freeExpiresAt ?? null)
      } else {
        setCredits(0)
        setFreeExpires(null)
      }
    } catch {
      // ignore
    } finally {
      setStatusLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  async function go() {
    setMsg(null)
    setLoading(true)
    try {
      const headers = await getAuthHeaders()
      const res = await fetch('/api/billing/checkout', { method: 'POST', headers })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error ?? 'Billing unavailable')
      if (json?.url) window.location.href = json.url
      else setMsg(json?.message ?? 'Billing scaffold is ready. Connect Stripe keys to enable checkout.')
    } catch (e: any) {
      setMsg(e?.message ?? 'Error')
    } finally {
      setLoading(false)
    }
  }

  async function claimFree() {
    setMsg(null)
    setLoading(true)
    try {
      const headers = await getAuthHeaders()
      const res = await fetch('/api/credits/claim-free', { method: 'POST', headers })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error ?? 'Free claim failed')
      setMsg('Free credits activated ✅')
      setCredits(Number(json.total ?? 0))
      setFreeExpires(json.freeExpiresAt ?? null)
    } catch (e: any) {
      setMsg(e?.message ?? 'Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <Card>
        <div className="text-xs uppercase tracking-[0.18em] text-white/55">Credits</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Pay per 30 generations</h1>
        <p className="mt-3 text-white/70">
          Buy a pack of credits and use them across Plan, Practice, Vocab, and Ask. No subscriptions.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="text-xs text-white/55">Your remaining credits</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">
              {statusLoading ? '…' : credits}
            </div>
            {freeExpires ? (
              <div className="mt-1 text-xs text-white/50">Free expires: {new Date(freeExpires).toLocaleString()}</div>
            ) : null}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button onClick={go} disabled={loading} className="gap-2">
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Lock size={16} />}
            Buy 30 credits
          </Button>

          <Button variant="ghost" onClick={claimFree} disabled={loading} className="gap-2">
            <Gift size={16} /> Claim free (10 credits)
          </Button>

          <span className="text-xs text-white/50">Free is one-time per device + account. Paid credits never expire.</span>
        </div>

        {msg && <p className="mt-4 text-sm text-white/70">{msg}</p>}

        <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-white/70">
          <div className="flex items-center gap-2 font-medium text-white">
            <Sparkles size={16} /> How it works
          </div>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Every AI generation consumes 1 credit (Plan/Practice/Vocab/Ask).</li>
            <li>Free: 10 credits for 48 hours (one-time per device + account).</li>
            <li>Paid pack: 30 credits, no expiration.</li>
          </ul>
        </div>
      </Card>
    </div>
  )
}
