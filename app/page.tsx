import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { ArrowRight, Sparkles, Timer, FileUp, CheckCircle2 } from 'lucide-react'

const STRIPE_PRO_LINK = 'https://buy.stripe.com/IDE_ILLATSZ_LINKET'
const STRIPE_PROPLUS_LINK = 'https://buy.stripe.com/IDE_ILLATSZ_LINKET'

function MiniStat({ icon, label }: { icon: React.ReactNode; label: string }) {
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
    <div className={'grid items-center gap-10 py-14 md:grid-cols-2 ' + (reverse ? 'md:[&>div:first-child]:order-2' : '')}>
      <div>
        <div className="text-xs uppercase tracking-[0.18em] text-white/55">{kicker}</div>
        <h3 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-4 text-base leading-relaxed text-white/70 max-w-[52ch]">{body}</p>

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

function PricingCard({
  title,
  price,
  subtitle,
  bullets,
  cta,
  href,
  highlight
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
        'rounded-3xl border p-6 md:p-7 ' +
        (highlight
          ? 'border-white/20 bg-white/[0.06]'
          : 'border-white/10 bg-white/[0.03]')
      }
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-lg font-semibold">{title}</div>
        {highlight ? <span className="text-[11px] rounded-full border border-white/15 bg-white/5 px-2 py-1 text-white/70">Most popular</span> : null}
      </div>

      <div className="mt-4">
        <div className="text-4xl font-semibold tracking-tight">{price}</div>
        <div className="mt-1 text-sm text-white/55">{subtitle}</div>
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
        <a href={href}>
          <Button className={'w-full ' + (highlight ? '' : '')}>{cta}</Button>
        </a>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="relative">
      <main>
        <section className="mx-auto max-w-6xl px-4 pt-14 md:pt-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.02]">
              Turn messy notes into a clean study system.
            </h1>
            <p className="mt-5 text-dim text-lg md:text-xl max-w-2xl">
              Upload PDFs or photos and get study notes you can actually learn from, a daily plan with timers, and practice tests.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/plan">
                <Button className="gap-2">Build my plan <ArrowRight size={16} /></Button>
              </Link>
              <a href="#features">
                <Button variant="ghost" className="gap-2"><Sparkles size={16} /> See features</Button>
              </a>
            </div>

            <div className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
              <MiniStat icon={<Timer size={16} />} label="Built-in timers" />
              <MiniStat icon={<FileUp size={16} />} label="PDF + photo upload" />
              <MiniStat icon={<Sparkles size={16} />} label="AI-generated structure" />
            </div>
          </div>

          <div id="features" className="mt-10">
            <Feature
              kicker="Plan"
              title="Daily plan that fits your exam date."
              body="A schedule that actually makes sense. You get structure, priorities, and timers, based on your material."
              img="/assets/feature-a.png"
            />
            <Feature
              kicker="Notes"
              title="Notes you can learn from."
              body="Turns your PDFs or photos into clean, exam-ready notes with headings, definitions, examples, and recap sections."
              img="/assets/feature-b.png"
              reverse
            />
            <Feature
              kicker="Practice"
              title="Practice tests built from your content."
              body="Generate questions (mixed MCQ + short answer) with solutions, so you can check what you really know."
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
                  Learn how to upload material, generate structured notes, practice smart, and build vocab sets in 6 languages
                  (EN, HU, DE, ES, IT, LA).
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
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-white/55">Pricing</div>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight">Simple plans. Clear limits.</h3>
                <p className="mt-3 text-white/70 max-w-[70ch]">
                  Free is device-based (48h, up to 12 generations). Pro plans have monthly limits so costs stay predictable.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/login"><Button variant="ghost" className="gap-2">Log in <ArrowRight size={16} /></Button></Link>
                <Link href="/signup"><Button className="gap-2">Create account <ArrowRight size={16} /></Button></Link>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <PricingCard
                title="Pro"
                price="€8.9"
                subtitle="≈ 2500 HUF / month"
                bullets={['30 generations / month', 'Plan + Practice + Vocab', 'Works in 6 languages']}
                cta="Get Pro"
                href={STRIPE_PRO_LINK}
                highlight
              />
              <PricingCard
                title="Pro+"
                price="€14.9"
                subtitle="More room to generate"
                bullets={['60 generations / month', 'Everything in Pro', 'Priority stability']}
                cta="Get Pro+"
                href={STRIPE_PROPLUS_LINK}
              />
            </div>
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
