/**
 * Tiny client-side helper for displaying free usage reset state.
 *
 * The authoritative enforcement is server-side (API routes).
 */

export function formatReset(msUntilReset: number) {
  if (msUntilReset <= 0) return 'now'
  const totalSeconds = Math.ceil(msUntilReset / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  if (hours <= 0) return `${minutes}m`
  return `${hours}h ${minutes}m`
}

export type UsageStatus = {
  plan: 'free' | 'pro' | 'pro_plus' | string
  remaining: number
  resetAt?: string | null
}

export function canUse(status: UsageStatus | null | undefined) {
  if (!status) return false
  return status.remaining > 0
}

export function consume(status: UsageStatus | null | undefined) {
  if (!status) return status
  return { ...status, remaining: Math.max(0, status.remaining - 1) }
}
