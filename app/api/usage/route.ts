import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { getUserPlanFromRequest } from '@/lib/getPlan'
import { supabase } from '@/lib/supabaseServer' // ha így hívod; ha más, szólj

const DEVICE_COOKIE = 'examly_device_id'

const LIMITS = {
  free: { amount: 12, expiresHours: 48 },
  pro: { amount: 30, period: 'month' },
  pro_plus: { amount: 60, period: 'month' },
  admin: { amount: 999999, period: '∞' },
} as const

export async function GET(req: Request) {
  const plan = await getUserPlanFromRequest(req)

  // user (be van-e lépve?)
  const { data: u } = await supabase.auth.getUser()
  const email = u.user?.email ?? null
  const loggedIn = !!email

  // FREE trial állapot: device_usage táblából
  let free = null as null | {
    used: number
    remaining: number
    expiresAt: string
  }

  const deviceId = cookies().get(DEVICE_COOKIE)?.value
  if (deviceId) {
    const { data } = await supabaseAdmin
      .from('device_usage')
      .select('*')
      .eq('device_id', deviceId)
      .maybeSingle()

    if (data) {
      const used = Number(data.trial_used ?? 0)
      const remaining = Math.max(0, LIMITS.free.amount - used)
      free = { used, remaining, expiresAt: data.trial_expires_at }
    } else {
      // még nem indult el a trial: 12 maradna, expiry majd első consume-nál
      free = { used: 0, remaining: LIMITS.free.amount, expiresAt: '' }
    }
  }

  return NextResponse.json({
    loggedIn,
    email,
    plan,
    limits: LIMITS,
    freeTrial: free,
  })
}
