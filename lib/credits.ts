import { supabaseAdmin } from './supabaseAdmin'

export type CreditsStatus = {
  remaining: number
  resetAt: string | null
  plan: 'free' | 'pro' | 'pro_plus'
}

const FREE_TOTAL = 12
const FREE_WINDOW_HOURS = 48

/**
 * Tables used:
 * - credit_buckets: { id, user_id, remaining, reset_at, plan }
 *
 * If these tables don't exist yet, create them in Supabase SQL.
 */
const TABLE = 'credit_buckets'

async function getOrCreateFreeBucket(userId: string) {
  const { data } = await supabaseAdmin
    .from(TABLE)
    .select('id, user_id, remaining, reset_at, plan')
    .eq('user_id', userId)
    .maybeSingle()

  if (data) return data

  const resetAt = new Date(Date.now() + FREE_WINDOW_HOURS * 3600 * 1000).toISOString()
  const { data: created, error } = await supabaseAdmin
    .from(TABLE)
    .insert({ user_id: userId, remaining: FREE_TOTAL, reset_at: resetAt, plan: 'free' })
    .select('id, user_id, remaining, reset_at, plan')
    .single()
  if (error) throw error
  return created
}

export async function getCreditsStatus(userId: string): Promise<CreditsStatus> {
  const bucket = await getOrCreateFreeBucket(userId)

  // Auto-reset free bucket when time window passed
  if (bucket.plan === 'free' && bucket.reset_at) {
    const resetTs = new Date(bucket.reset_at).getTime()
    if (Date.now() > resetTs) {
      const newReset = new Date(Date.now() + FREE_WINDOW_HOURS * 3600 * 1000).toISOString()
      const { data: updated, error } = await supabaseAdmin
        .from(TABLE)
        .update({ remaining: FREE_TOTAL, reset_at: newReset })
        .eq('id', bucket.id)
        .select('remaining, reset_at, plan')
        .single()
      if (error) throw error
      return { remaining: updated.remaining, resetAt: updated.reset_at, plan: updated.plan }
    }
  }

  return { remaining: bucket.remaining, resetAt: bucket.reset_at, plan: bucket.plan }
}

export async function claimFreeCreditsOrThrow(userId: string) {
  // If the row exists, we do nothing (free is one bucket that resets by time).
  await getOrCreateFreeBucket(userId)
}

/**
 * Adds paid credits (e.g. after a Stripe checkout).
 * By default we just increment remaining credits.
 */
export async function addPaidCredits(userId: string, amount: number) {
  const bucket = await getOrCreateFreeBucket(userId)
  const { error } = await supabaseAdmin
    .from(TABLE)
    .update({ remaining: (bucket.remaining || 0) + amount, plan: 'pro' })
    .eq('id', bucket.id)
  if (error) throw error
}
