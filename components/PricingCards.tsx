'use client'

import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui'

type Props = {
  proHref: string
  proPlusHref: string
}

function Card({
  title,
  price,
  subtitle,
  bullets,
  cta,
  href,
  highlight,
}: {
  title: string
  price: string
  subtitle: string
  bullets: string[]
  cta: string
  href: string
  highlight?: boolean
}) {
  return (
    <div
      className={
        'glass rounded-2xl p-6 md:p-7 ' +
        (highlight ? 'border-white/20 bg-white/[0.06]' : '')
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-white/60">{title}</div>
          <div className="mt-2 text-3xl font-semibold tracking-tight">{price}</div>
          <div className="mt-2 text-sm text-white/65">{subtitle}</div>
        </div>

        {highlight ? (
          <div className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs text-white/70">
            Most popular
          </div>
        ) : null}
      </div>

      <ul className="mt-5 space-y-2 text-sm text-white/70">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <CheckCircle2 size={16} className="mt-[2px] text-white/60" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Link href={href} target="_blank">
          <Button className="w-full">{cta}</Button>
        </Link>
      </div>
    </div>
  )
}

export default function PricingCards({ proHref, proPlusHref }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card
        title="Pro"
        price="€8.9 / month"
        subtitle="30 generations / month"
        bullets={[
          'Plans, notes, practice, vocab',
          'PDF export',
          'Mobile-friendly UI',
        ]}
        cta="Get Pro"
        href={proHref}
      />

      <Card
        title="Pro Plus"
        price="€14.9 / month"
        subtitle="60 generations / month"
        bullets={[
          'Everything in Pro',
          'More monthly generations',
          'Best for heavy users',
        ]}
        cta="Get Pro Plus"
        href={proPlusHref}
        highlight
      />
    </div>
  )
}
