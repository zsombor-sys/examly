import { Suspense } from 'react'
import AuthCallbackClient from './AuthCallbackClient'

export const dynamic = 'force-dynamic'

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div className="p-6 text-white">Signing you in…</div>}>
      <AuthCallbackClient />
    </Suspense>
  )
}
