import { getAuthHeaders } from './authClient'

/**
 * Client helper: checks if user can generate and consumes 1 credit.
 * Throws if limit reached.
 */
export async function checkAndConsumeOrThrow() {
  const headers = await getAuthHeaders()
  const res = await fetch('/api/usage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers }
  })
  if (res.ok) return
  const data = await res.json().catch(() => null)
  const msg = data?.error || 'Limit reached'
  throw new Error(msg)
}
