import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_NAME = 'examly_device_id'

function newId() {
  // egyszerű, jó minőségű ID (nem kell crypto lib)
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`
}

export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const existing = req.cookies.get(COOKIE_NAME)?.value

  if (!existing) {
    res.cookies.set(COOKIE_NAME, newId(), {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 év
    })
  }
  return res
}

// csak az app + api útvonalakon fusson
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
