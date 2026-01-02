import { supabase } from './supabaseClient'

/**
 * Returns headers used by authenticated API calls.
 * Adds:
 * - Authorization: Bearer <access_token>
 */
export async function getAuthHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession()
  const token = data?.session?.access_token
  if (!token) return {}
  return { Authorization: `Bearer ${token}` }
}
