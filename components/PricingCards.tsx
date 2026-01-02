'use client'

import Link from 'next/link'
import { Button, Card } from '@/components/ui'

const PRO_LINK = process.env.NEXT_PUBLIC_STRIPE_PRO_LINK || ''
const PROPLUS_LINK = process.env.NEXT_PUBLIC_STRIPE_PROPLUS_LINK || ''

function PricePill({ left, right }: { left: string; right: string }) {
  return (
    <div className="mt-3 flex items-baseline gap-2">
      <div className="text-4xl font-semibold tracking-tight">{left}</div>
      <div className="text-sm text-white/60">{right}</div>
    </div>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return <li className="text-sm text-white/70 leading-relaxed">{children}</li>
}

export default function PricingCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-5 md:p-6">
        <div className="text-xs uppercase tracking-[0.18em] text-white/55">Pro</div>
        <PricePill left="€8.9" right="/ month" />
        <div className="mt-1 text-sm text-white/60">or ~2,500 HUF</div>

        <ul className="mt-5 space-y-2">
          <Bullet>30 AI generations / month</Bullet>
          <Bullet>Plans, Notes, Practice, Vocab</Bullet>
          <Bullet>PDF export</Bullet>
          <Bullet>Works in 6 languages</Bullet>
        </ul>

        <div className="mt-6">
          {PRO_LINK ? (
            <Link href={PRO_LINK}>
              <Button className="w-full">Get Pro</Button>
            </Link>
          ) : (
            <Button className="w-full" disabled title="Missing NEXT_PUBLIC_STRIPE_PRO_LINK">
              Add Stripe link in env
            </Button>
          )}
        </div>
      </Card>

      <Card className="p-5 md:p-6 border-white/15 bg-white/[0.045]">
        <div className="text-xs uppercase tracking-[0.18em] text-white/55">Pro Plus</div>
        <PricePill left="€14.9" right="/ month" />
        <div className="mt-1 text-sm text-white/60">more room to generate</div>

        <ul className="mt-5 space-y-2">
          <Bullet>60 AI generations / month</Bullet>
          <Bullet>Everything in Pro</Bullet>
          <Bullet>Priority output (best quality settings)</Bullet>
          <Bullet>Works in 6 languages</Bullet>
        </ul>

        <div className="mt-6">
          {PROPLUS_LINK ? (
            <Link href={PROPLUS_LINK}>
              <Button className="w-full">Get Pro Plus</Button>
            </Link>
          ) : (
            <Button className="w-full" disabled title="Missing NEXT_PUBLIC_STRIPE_PROPLUS_LINK">
              Add Stripe link in env
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
