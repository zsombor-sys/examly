import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

// Billing scaffold.
// Wire Stripe later by returning a Checkout Session URL.
// Env you will need later:
// - STRIPE_SECRET_KEY
// - STRIPE_PRICE_ID_PRO (recurring €6/month price id)
// - NEXT_PUBLIC_SITE_URL
export async function POST() {
  return NextResponse.json({
    url: null,
    message: 'Billing scaffold ready. Connect Stripe to enable checkout.',
  })
}
