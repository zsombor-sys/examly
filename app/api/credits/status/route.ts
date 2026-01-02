import { NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/authServer'
import { getCreditsStatus } from '@/lib/credits'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  const user = await getUserFromRequest(req)
  if (!user) {
    return NextResponse.json({ loggedIn: false, total: 0 }, { status: 200 })
  }

  try {
    const status = await getCreditsStatus(user)
    return NextResponse.json({ loggedIn: true, ...status })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'CREDITS_ERROR' }, { status: 500 })
  }
}
