import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui'
import { ArrowRight, Sparkles, Timer, FileUp, CheckCircle2 } from 'lucide-react'

function MiniStat({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left">
      <div className="flex items-center gap-2 text-sm text-white/90">
        <span className="text-white/80">{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
    </div>
  )
}

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
    <div className={'grid items-center gap-10 py-14 md:grid-cols-2 ' + (reverse ? 'md:[&>div:first-child]:order-2' : '')}>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-[0.18em] text-white/55">{kicker}</div>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h3>
        <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-white/70">{body}</p>

        <ul className="mt-6 space-y-2 text-sm text-white/70">
          <li className="flex gap-2">
            <CheckCircle2 size={16} className="mt-[2px] text-white/70" /> Built from your material
          </li>
          <li className="flex gap-2">
            <CheckCircle2 size={16} className="mt-[2px] text-white/70" /> Clear structure, no fluff
          </li>
          <li className="flex gap-2">
            <CheckCircle2 size={16} className="mt-[2px] text-white/70" /> Works in 6 languages
          </li>
        </ul>
      </div>

      <div className="fade-edges rounded-2xl">
        <Image src={img} alt={title} width={1100} height={720} className="h-auto w-full" priority={false} />
      </div>
    </div>
  )
}

function PricingSection() {
  // Ezeket Vercelben is fel tudod venni, és akkor nem kell kódban piszkálni:
  // NEXT_PUBLIC_STRIPE_PRO_LINK
  // NEXT_PUBLIC_STRIPE_PROPLUS_LINK
  const PRO_LINK = process.env.NEXT_PUBLIC_STRIPE_PRO_LINK || ''
  const PROPLUS_LINK = process.env.NEXT_PUBLIC_STRIPE_PROPLUS_LINK || ''

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:pb-24">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs uppercase tracking-[0.18em] text-white/55">Pricing</div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Pick a plan, keep your credits under control.</h2>
        <p className="mt-4 text-white/65">
          Free gives you a small taste. Pro plans give you predictable usage (so you don’t burn through API cost).
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {/* PRO */}
        <div className="glass rounded-2xl p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-white/70">Pro</div>
              <div className="mt-1 text-3xl font-semibold">€8.9<span className="text-base font-medium text-white/60"> / month</span></div>
              <div className="mt-1 text-sm text-white/55">≈ 2500 HUF</div>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">30 generations</div>
          </div>

          <ul className="mt-5 space-y-2 text-sm text-white/70">
            <li className="flex gap-2"><CheckCircle2 size={16} className="mt-[2px]" /> 30 AI generations / month</li>
            <li className="flex gap-2"><CheckCircle2 size={16} className="mt-[2px]" /> Plan + Practice + Vocab</li>
            <li className="flex gap-2"><CheckCircle2 size={16} className="mt-[2px]" /> PDF / photo uploads</li>
          </ul>

          <div className="mt-6">
            {PRO_LINK ? (
              <a href={PRO_LINK} className="inline-block w-full">
                <Button className="w-full">Get Pro</Button>
              </a>
            ) : (
              <Button className="w-full" disabled title="Add NEXT_PUBLIC_STRIPE_PRO_LINK in Vercel env vars">
                Add Stripe link to enable
              </Button>
            )}
          </div>
        </div>

        {/* PRO PLUS */}
        <div className="glass rounded-2xl p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-white/70">Pro Plus</div>
              <div className="mt-1 text-3xl font-semibold">€14.9<span className="text-base font-medium text-white/60"> / month</span></div>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">60 generations</div>
          </div>

          <ul className="mt-5 space-y-2 text-sm text-white/70">
            <li className="flex gap-2"><CheckCircle2 size={16} className="mt-[2px]" /> 60 AI generations / month</li>
            <li className="flex gap-2"><CheckCircle2 size={16} className="mt-[2px]" /> Everything in Pro</li>
            <li className="flex gap-2"><CheckCircle2 size={16} className="mt-[2px]" /> More room for heavy users</li>
          </ul>

          <div className="mt-6">
            {PROPLUS_LINK ? (
              <a href={PROPLUS_LINK} className="inline-block w-full">
                <Button className="w-full">Get Pro Plus</Button>
              </a>
            ) : (
              <Button className="w-full" disabled title="Add NEXT_PUBLIC_STRIPE_PROPLUS_LINK in Vercel env vars">
                Add Stripe link to enable
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-white/45">
        Tip: put the Stripe links into Vercel env vars so you never hardcode them in Git.
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="relative">
      <div className="grid-bg fixed inset-0 pointer-events-none" />
      <div className="glow fixed inset-0 pointer-events-none" />

      <main>
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-4 pt-14 md:pt-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h1 className="text-5xl font-semibold tracking-tight leading-[1.02] md:text-6xl">
              Turn messy notes into a clean study system.
            </h1>
            <p className="mt-5 text-lg text-dim md:text-xl max-w-2xl">
              Upload PDFs or photos and get study notes you can actually learn from, a daily plan with timers, and practice tests.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/plan">
                <Button className="gap-2">
                  Build my plan <ArrowRight size={16} />
                </Button>
              </Link>
              <a href="#features">
                <Button variant="ghost" className="gap-2">
                  <Sparkles size={16} /> See features
                </Button>
              </a>
              <a href="#pricing">
                <Button variant="ghost" className="gap-2">
                  Pricing
                </Button>
              </a>
            </div>

            <div className="mt-10 grid w-full gap-3 sm:grid-cols-3">
              <MiniStat icon={<FileUp size={16} />} label="Upload PDFs or photos" />
              <MiniStat icon={<Timer size={16} />} label="Plan + timers that keep you honest" />
              <MiniStat icon={<Sparkles size={16} />} label="Practice tests & vocab flashcards" />
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="mx-auto max-w-6xl px-4">
          <Feature
            kicker="PLAN"
            title="A real study plan. Not a chat."
            body="Get a structured plan generated from your own notes, broken into sessions you can actually follow."
            img="/images/plan.png"
          />
          <Feature
            kicker="PRACTICE"
            title="Exam-style questions, fast."
            body="Generate practice tests that match your material, with timers and simple grading."
            img="/images/practice.png"
            reverse
          />
          <Feature
            kicker="VOCAB"
            title="Flashcards that don’t feel like punishment."
            body="Paste or upload a vocab list and practice with cards, typing, or 4-choice mode. Works in 6 languages."
            img="/images/vocab.png"
          />
        </section>

        {/* PRICING */}
        <PricingSection />
      </main>
    </div>
  )
}
