'use client'

import { useState } from 'react'
import { Button, Card } from '@/components/ui'
import { Loader2, Lock } from 'lucide-react'

export default function BillingPage() {
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  async function go() {
    setMsg(null)
    setLoading(true)
    try {
      const res = await fetch('/api/billing/checkout', { method: 'POST' })
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

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <Card>
        <div className="text-xs uppercase tracking-[0.18em] text-white/55">Pro</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Unlimited everything for €6/month</h1>
        <p className="mt-3 text-white/70">
          Unlimited plans, notes, practice tests, and vocab sets. Upload photos, build flashcards, and keep full history.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <Button onClick={go} disabled={loading} className="gap-2">
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Lock size={16} />}
            Continue
          </Button>
          <span className="text-xs text-white/50">Stripe wiring is the next step. This page is the scaffold.</span>
        </div>

        {msg && <p className="mt-4 text-sm text-white/70">{msg}</p>}

        <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-white/70">
          <div className="font-medium text-white">Free limits</div>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>1 Plan / 48h</li>
            <li>1 Notes / 48h</li>
            <li>1 Practice / 48h</li>
            <li>1 Vocab set / 48h (max 70 words)</li>
          </ul>
        </div>
      </Card>
    </div>
  )
}
