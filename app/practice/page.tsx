'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button, Card, Textarea } from '@/components/ui'
import { Loader2, Play, RotateCcw } from 'lucide-react'
import { canUse, consume, formatReset } from '@/lib/freeLimits'
import MarkdownMath from '@/components/MarkdownMath'

type Q = { id: string; type: 'mcq' | 'short'; question: string; options?: string[]; answer: string }

type TestPayload = {
  title: string
  language: string
  duration_minutes: number
  questions: Q[]
}

export default function PracticePage() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<TestPayload | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [started, setStarted] = useState(false)
  const [leftSec, setLeftSec] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showKey, setShowKey] = useState(false)

  const score = useMemo(() => {
    if (!data) return null
    let correct = 0
    for (const q of data.questions) {
      const a = (answers[q.id] ?? '').trim().toLowerCase()
      const b = (q.answer ?? '').trim().toLowerCase()
      if (!a) continue
      if (q.type === 'mcq' ? a === b : b && a.includes(b.slice(0, 10))) {
        correct++
      }
    }
    return { correct, total: data.questions.length }
  }, [answers, data])

  useEffect(() => {
    if (!started || leftSec <= 0) return
    const t = setInterval(() => setLeftSec((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [started, leftSec])

  async function generate() {
    const lim = canUse('practice')
    if (!lim.ok) {
      setError(`Free limit reached. Resets in ${formatReset(lim.resetAt)}.`)
      return
    }

    setLoading(true)
    setError(null)
    setData(null)
    setStarted(false)
    setAnswers({})

    try {
      const res = await fetch('/api/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error ?? 'Failed')
      setData(json)
      consume('practice')
      setLeftSec(json.duration_minutes * 60)
    } catch (e: any) {
      setError(e?.message ?? 'Failed')
    } finally {
      setLoading(false)
    }
  }

  const mm = String(Math.max(0, Math.floor(leftSec / 60))).padStart(2, '0')
  const ss = String(Math.max(0, leftSec % 60)).padStart(2, '0')

  return (
    <div className="mx-auto w-full max-w-6xl px-3 sm:px-4 pt-8 overflow-x-hidden">
      <h1 className="text-2xl sm:text-3xl font-semibold">Practice</h1>
      <p className="mt-2 text-sm sm:text-base text-muted">
        Generate a quiz from your material.
      </p>

      <div className="mt-6 flex flex-col gap-4 md:grid md:grid-cols-2">
        {/* LEFT */}
        <Card className="p-4 sm:p-6">
          <div className="text-sm text-white/70">Test generator</div>

          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: World War II overview, 10 questions, 15 minutes."
            className="mt-3 w-full text-sm"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              onClick={generate}
              disabled={loading || !prompt}
              className="h-9 px-3 text-sm"
            >
              {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
              Generate
            </Button>

            {error && <span className="text-xs text-red-300">{error}</span>}
          </div>
        </Card>

        {/* RIGHT */}
        <Card className="p-4 sm:p-6">
          <div className="flex flex-col gap-3">
            <div className="text-sm text-white/70">Test</div>

            <div className="flex flex-wrap gap-2">
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs">
                {mm}:{ss}
              </div>

              <Button variant="ghost" onClick={() => setStarted(false)} className="h-8 px-3 text-xs">
                <RotateCcw size={14} />
              </Button>

              <Button onClick={() => setStarted(true)} className="h-8 px-3 text-xs">
                <Play size={14} />
              </Button>
            </div>
          </div>

          {!data ? (
            <div className="mt-4 text-xs text-white/40">Generate a test to see it here.</div>
          ) : (
            <div className="mt-4 space-y-3">
              {data.questions.map((q, i) => (
                <div key={q.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-sm">
                    {i + 1}. <MarkdownMath content={q.question} />
                  </div>

                  {q.type === 'mcq' && q.options ? (
                    <div className="mt-2 space-y-2">
                      {q.options.map((o) => (
                        <label key={o} className="flex gap-2 text-sm">
                          <input
                            type="radio"
                            name={q.id}
                            value={o}
                            checked={answers[q.id] === o}
                            onChange={() => setAnswers((a) => ({ ...a, [q.id]: o }))}
                          />
                          <span className="break-words">
                            <MarkdownMath content={o} />
                          </span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm"
                      value={answers[q.id] ?? ''}
                      onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
