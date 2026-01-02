import Image from 'next/image'
import Link from 'next/link'
import PricingCards from '@/components/PricingCards'
import { Button } from '@/components/ui'
import { ArrowRight } from 'lucide-react'

function Feature({
  kicker,
  title,
  body,
  img,
  reverse,
}: {
  kicker: string
  title: string
  body: string
  img: string
  reverse?: boolean
}) {
  return (
    <div className={'mt-10 grid items-center gap-8 md:grid-cols-2 ' + (reverse ? 'md:[&>*:first-child]:order-2' : '')}>
      <div>
        <div className="text-xs uppercase tracking-[0.18em] text-white/55">{kicker}</div>
        <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-3 text-white/70 leading-relaxed max-w-[60ch]">{body}</p>
      </div>

      <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-2">
        <div className="relative overflow-hidden rounded-xl media-card">
          <Image src={img} alt={title} width={1200} height={800} className="h-auto w-full" />
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="relative">
      <main className="mx-auto max-w-6xl px-4 pb-24">
        {/* HERO */}
        <section className="pt-14 md:pt-20">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.18em] text-white/55">Examly</div>

            <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              Where understanding comes first.
            </h1>

            <p className="mt-5 text-white/70 leading-relaxed max-w-[60ch]">
              Structured learning from your own material. Plans, notes, practice tests and vocab, in a clean workflow.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/plan">
                <Button className="gap-2">
                  Start <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="#pricing">
                <Button variant="ghost">See pricing</Button>
              </Link>
            </div>

            {/* HERO IMAGE */}
            <div className="mt-10 w-full fade-edges rounded-2xl">
              <Image src="/assets/hero.png" alt="Examly preview" width={1400} height={900} className="h-auto w-full" priority />
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="pt-10">
          <Feature
            kicker="Notes"
            title="Study notes that feel like a real notebook."
            body="Clear sections, key points, examples, and what teachers love to ask. No endless chat. Just learnable notes."
            img="/assets/feature-a.png"
          />
          <Feature
            kicker="Daily Plan"
            title="A daily plan you can actually follow."
            body="Start a session, focus, then take a break. Examly guides you with realistic blocks so you finish on time."
            img="/assets/feature-b.png"
            reverse
          />
          <Feature
            kicker="Vocab"
            title="Quizlet-style vocab from text or photos."
            body="Flashcards, learn mode, and timed tests. Works in 6 languages."
            img="/assets/feature-vocab.png"
            reverse
          />
          <Feature
            kicker="Practice"
            title="Practice tests built from your content."
            body="Generate mixed questions with solutions, so you can check what you really know."
            img="/assets/feature-c.png"
          />
        </section>

        {/* PRICING */}
        <section id="pricing" className="pt-16">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-white/55">Pricing</div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Pick your plan</h2>
                <p className="mt-3 text-white/70 max-w-[62ch]">
                  Free is limited. Pro unlocks more generations and unlimited workflow.
                </p>
              </div>
              <Link href="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
            </div>

            <div className="mt-8">
              <PricingCards />
            </div>

            <div className="mt-6 text-xs text-white/50">
              Tip: add your Stripe payment links as env vars (NEXT_PUBLIC_STRIPE_PRO_LINK, NEXT_PUBLIC_STRIPE_PROPLUS_LINK).
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
