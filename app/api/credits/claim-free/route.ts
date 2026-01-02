import { NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/authServer'
import { claimFreeCreditsOrThrow, getCreditsStatus } from '@/lib/credits'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const user = await getUserFromRequest(req)
  if (!user) {
    return NextResponse.json({ error: 'LOGIN_REQUIRED' }, { status: 401 })
  }

  try {
    await claimFreeCreditsOrThrow(user)
    const status = await getCreditsStatus(user)
    return NextResponse.json({ ok: true, ...status })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'FREE_CLAIM_ERROR' }, { status: 400 })
  }
}
