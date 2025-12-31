export const metadata = {
  title: 'Examly Guide',
  description: 'How to use Examly.'
}

const QA = [
  {
    q: 'How do I start?',
    a: `Go to **Plan**. Describe your exam (date, topic, level), then optionally upload PDFs or photos. Click **Generate**.`
  },
  {
    q: 'What does Plan do?',
    a: `Plan creates a realistic day-by-day schedule with focus blocks and breaks, so you don’t cram the night before.`
  },
  {
    q: 'What are Notes?',
    a: `Notes are a clean, learnable explanation of the topic with headings, key rules, worked examples, and common mistakes.`
  },
  {
    q: 'What is Practice?',
    a: `Practice generates exam-style questions (15–20). You answer first, then the app checks your answers and explains mistakes.`
  },
  {
    q: 'What is Vocab?',
    a: `Vocab turns a word list (or a photo) into **flip flashcards** and quizzes. You can swap direction (e.g., EN → HU or HU → EN).`
  },
  {
    q: 'Free limits',
    a: `Free plan includes **1 Plan**, **1 Notes**, **1 Practice**, and **1 Vocab set (max 70 words)**. Limits reset every **48 hours**.`
  },
]

import Link from 'next/link'
import MarkdownMath from '@/components/MarkdownMath'

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Guide</h1>
      <p className="mt-2 text-white/70">
        Quick Q&amp;A on how to use Examly.
      </p>

      <div className="mt-8 space-y-4">
        {QA.map((item) => (
          <div key={item.q} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="text-sm font-semibold">{item.q}</div>
            <div className="mt-2 text-sm text-white/75">
              <MarkdownMath content={item.a} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-sm text-white/60">
        Go to <Link className="text-white underline" href="/plan">Plan</Link> to start.
      </div>
    </div>
  )
}
