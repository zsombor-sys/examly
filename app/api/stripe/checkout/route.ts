import { NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/authServer'
import { PAID_PACK_CREDITS } from '@/lib/credits'
import { getSiteUrl, stripe } from '@/lib/stripe'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const user = await getUserFromRequest(req)
  if (!user) {
    return NextResponse.json({ error: 'LOGIN_REQUIRED' }, { status: 401 })
  }

  if (!stripe) {
    return NextResponse.json({ error: 'STRIPE_NOT_CONFIGURED' }, { status: 500 })
  }

  const priceId = process.env.STRIPE_PRICE_ID_CREDITS_30
  if (!priceId) {
    return NextResponse.json({ error: 'MISSING_STRIPE_PRICE_ID_CREDITS_30' }, { status: 500 })
  }

  const siteUrl = getSiteUrl()

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: `${siteUrl}/billing?success=1`,
    cancel_url: `${siteUrl}/billing?canceled=1`,
    customer_email: user.email ?? undefined,
    metadata: {
      userId: user.id,
      credits: String(PAID_PACK_CREDITS),
    },
  })

  return NextResponse.json({ url: session.url })
}
