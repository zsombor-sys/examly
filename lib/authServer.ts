import type { NextRequest } from 'next/server'
import { supabaseAdmin } from './supabaseAdmin'

export type AuthUser = {
  id: string
  email?: string | null
}

export async function getUserFromRequest(req: NextRequest | Request): Promise<AuthUser | null> {
  const auth = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!auth?.startsWith('Bearer ')) return null
  const token = auth.slice('Bearer '.length).trim()
  if (!token) return null

  const { data, error } = await supabaseAdmin.auth.getUser(token)
  if (error || !data.user) return null
  return { id: data.user.id, email: data.user.email }
}
