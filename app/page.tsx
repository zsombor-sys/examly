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
  reverse
}: {
  kicker: string
  title: string
  body: string
  img: string
  reverse?: boolean
}) {
  return (
    <div
      className={
        'grid items-center gap-10 py-14 md:grid-cols-2 ' +
        (reverse ? 'md:[&>div:first-child]:order-2' : '')
      }
    >
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-[0.18em] text-white/55">{kicker}</div>
        <h3 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-4 text-base leading-relaxed text-white/70 max-w-[52ch]">{body}</p>

        <ul className="mt-6 space-y-2 text-sm text-white/70">
          <li className="flex gap-2">
            <CheckCircle2 size={16} className="mt-[2px] text-white/70 shrink-0" />
            Built from your material
          </li>
          <li className="flex gap-2">
            <CheckCircle2 size={16} className="mt-[2px] text-white/70 shrink-0" />
            Clear structure, no fluff
          </li>
          <li className="flex gap-2">
            <CheckCircle2 size={16} className="mt-[2px] text-white/70 shrink-0" />
            Works in Hungarian and English
          </li>
        </ul>
      </div>

      <div className="fade-edges rounded-2xl min-w-0">
        <Image src={img} alt={title} width={1100} height={720} className="h-auto w-full" priority={false} />
      </div>
    </div>
  )
}

function PricingCards({
  proLink,
  proPlusLink
}: {
  proLink: string
  proPlusLink: string
}) {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-2">
      {/* PRO */}
      <div className="glass rounded-2xl p-6 md:p-7">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm text-white/60">Pro</div>
            <div className="mt-1 text-3xl font-semibold tracking-tight">
              €8.9<span className="text-base font-medium text-white/60"> / month</span>
            </div>
            <div className="mt-1 text-sm text-white/55">≈ 2 500 Ft / hó</div>
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
            30 generations
          </div>
        </div>

        <ul className="mt-6 space-y-2 text-sm text-white/70">
          <li className="flex gap-2"><CheckCircle2 size={16} className="mt-[2px] shrink-0" /> Notes, Plan, Practice, Vocab</li>
          <li className="flex gap-2"><CheckCircle2 size={16} className="mt-[2px] shrink-0" /> 6 languages for vocab</li>
          <li className="flex gap-2"><CheckCircle2 size={16} className="mt-[2px] shrink-0" /> Priority generation speed</li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href={proLink} target="_blank" rel="noreferrer">
            <Button className="gap-2">
              Subscribe <ArrowRight size={16} />
            </Button>
          </a>
          <Link href="/signup">
            <Button variant="ghost">Create account</Button>
          </Link>
        </div>

        <p className="mt-4 text-xs text-white/45">
          Best for regular studying. Clear monthly limit to keep costs predictable.
        </p>
      </div>

      {/* PRO+ */}
      <div className="glass rounded-2xl p-6 md:p-7">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm text-white/60">Pro+</div>
            <div className="mt-1 text-3xl font-semibold tracking-tight">
              €14.9<span className="text-base font-medium text-white/60"> / month</span>
            </div>
            <div className="mt-1 text-sm text-white/55">60 generations / hó</div>
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
            60 generations
          </div>
        </div>

        <ul className="mt-6 space-y-2 text-sm text-white/70">
          <li className="flex gap-2"><CheckCircle2 size={16} className="mt-[2px] shrink-0" /> Everything in Pro</li>
          <li className="flex gap-2"><CheckCircle2 size={16} className="mt-[2px] shrink-0" /> Higher monthly usage</li>
          <li className="flex gap-2"><CheckCircle2 size={16} className="mt-[2px] shrink-0" /> Best for intense exam weeks</li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href={proPlusLink} target="_blank" rel="noreferrer">
            <Button className="gap-2">
              Subscribe Pro+ <ArrowRight size={16} />
            </Button>
          </a>
          <Link href="/signup">
            <Button variant="ghost">Create account</Button>
          </Link>
        </div>

        <p className="mt-4 text-xs text-white/45">
          For heavy usage and faster iteration. Same structure, more runs.
        </p>
      </div>
    </div>
  )
}

export default function HomePage() {
  // ✅ Stripe Payment Linkek: MINDIG idézőjelek között legyenek!
  const STRIPE_PRO_LINK = "https://buy.stripe.com/9B69AV9g5cGG6U20Rp1Fe03"
  const STRIPE_PROPLUS_LINK = "https://buy.stripe.com/7sY8wR4ZP0XY92a1Vt1Fe04"

  return (
    <div className="relative">
      <main>
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-4 pt-14 md:pt-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.02]">
              Turn messy notes into a clean study system.
            </h1>
            <p className="mt-5 text-dim text-lg md:text-xl max-w-2xl">
              Upload PDFs or photos and get study notes you can actually learn from, a daily plan with timers, and practice
              tests.
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
            </div>

            <div className="mt-8 grid w-full grid-cols-1 gap-3 md:max-w-2xl md:grid-cols-3">
              <MiniStat icon={<FileUp size={16} />} label="PDFs + photos" />
              <MiniStat icon={<Timer size={16} />} label="Pomodoro daily flow" />
              <MiniStat icon={<Sparkles size={16} />} label="Notes + tests" />
            </div>

            <div className="mt-10 w-full fade-edges rounded-2xl">
              <Image src="/assets/hero.png" alt="Examly preview" width={1400} height={900} className="h-auto w-full" priority />
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="mx-auto max-w-6xl px-4 pt-6">
          <Feature
            kicker="Notes"
            title="Study notes that feel like a real notebook."
            body="Examly transforms your material into clear sections, key points, examples, and what teachers love to ask. No endless chat. Just learnable notes."
            img="/assets/feature-a.png"
          />

          <Feature
            kicker="Daily Plan"
            title="A daily plan you can actually follow."
            body="Start a session, focus, then take a break. Examly guides you with a progress bar and realistic blocks so you finish on time."
            img="/assets/feature-b.png"
            reverse
          />

          <Feature
            kicker="Vocab"
            title="Quizlet-style vocab from text or photos."
            body="Upload a photo of your vocab sheet or paste your list. Examly turns it into flashcards, learn mode, and timed tests. Supports 6 languages (EN, HU, DE, ES, IT, LA)."
            img="/assets/feature-vocab.png"
            reverse
          />

          <Feature
            kicker="Practice"
            title="Practice tests built from your content."
            body="Generate 15–20 questions (mixed MCQ + short answer) with solutions, so you can check what you really know."
            img="/assets/feature-c.png"
          />

          {/* GUIDE */}
          <div className="py-10">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <div className="text-xs uppercase tracking-[0.18em] text-white/55">Guide</div>
              <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
                A quick guide to use Examly well.
              </h3>
              <p className="mt-3 text-white/70 max-w-[70ch]">
                Learn how to upload material, generate structured notes, practice smart, and build vocab sets in 6 languages.
                Designed for learning, not cheating.
              </p>
              <div className="mt-5">
                <Link href="/guide">
                  <Button variant="ghost" className="gap-2">
                    Open guide <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-20">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-[0.18em] text-white/55">Pricing</div>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight">Simple plans. Clear limits.</h3>
                <p className="mt-3 text-white/70 max-w-[70ch]">
                  Free trial is device-based (48h, up to 12 generations). Pro and Pro+ unlock monthly generation limits.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/login">
                  <Button variant="ghost" className="gap-2">
                    Log in <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="gap-2">
                    Create account <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>

            {/* ✅ Pricing kockák (nincs import hibája) */}
            <PricingCards proLink={STRIPE_PRO_LINK} proPlusLink={STRIPE_PROPLUS_LINK} />
          </div>

          <footer className="mt-10 flex items-center justify-between text-xs text-white/50">
            <div className="flex items-center gap-2">
              <Image src="/assets/logo.png" alt="Examly" width={18} height={18} />
              <span>© {new Date().getFullYear()} Examly</span>
            </div>
            <div className="flex gap-4">
              <span>Privacy</span>
              <span>Terms</span>
            </div>
          </footer>
        </section>
      </main>
    </div>
  )
}
