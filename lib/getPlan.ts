import type { NextRequest } from 'next/server'
import { getUserPlanFromRequest as _getUserPlanFromRequest, type Plan } from '../../../Downloads/examly_fixed_ready/lib/getPlanFromRequest'

export type { Plan }

/** Backwards-compatible import path. */
export async function getUserPlanFromRequest(req: NextRequest) {
  return _getUserPlanFromRequest(req)
}
