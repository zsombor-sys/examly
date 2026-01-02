import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { addPaidCredits } from '@/lib/credits'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json({ error: 'STRIPE_NOT_CONFIGURED' }, { status: 500 })
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'MISSING_STRIPE_WEBHOOK_SECRET' }, { status: 500 })
  }

  const sig = req.headers.get('stripe-signature')
  if (!sig) return NextResponse.json({ error: 'MISSING_SIGNATURE' }, { status: 400 })

  const body = await req.text()

  let event: any
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret)
  } catch (err: any) {
    return NextResponse.json({ error: `INVALID_SIGNATURE: ${err?.message ?? ''}` }, { status: 400 })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const userId = session?.metadata?.userId
      const credits = Number(session?.metadata?.credits ?? 0)
      if (userId && credits > 0) {
        await addPaidCredits(userId, credits)
      }
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'WEBHOOK_ERROR' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
