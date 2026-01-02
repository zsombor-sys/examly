import type { NextRequest } from 'next/server'
import { supabaseAdmin } from './supabaseAdmin'
import { getUserFromRequest } from './authServer'

export type Plan = 'free' | 'pro' | 'pro_plus'

/**
 * Best-effort plan lookup.
 *
 * Expected tables (you can rename them, just update this file):
 * - profiles: { id: uuid (user id), plan: text }
 */
export async function getUserPlanFromRequest(req: NextRequest): Promise<Plan> {
  const user = await getUserFromRequest(req)
  if (!user) return 'free'

  // Try profiles table
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .maybeSingle()

  if (!error && data?.plan) {
    const p = String(data.plan)
    if (p === 'pro' || p === 'pro_plus' || p === 'free') return p
  }

  return 'free'
}
