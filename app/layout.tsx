import './globals.css'
import 'katex/dist/katex.min.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Examly',
  description: 'Plan and build exam preparation from your own material.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden">
        {/* background layers should never affect layout width */}
        <div className="fixed inset-0 grid-bg pointer-events-none" aria-hidden="true" />
        <div className="fixed inset-0 glow pointer-events-none" aria-hidden="true" />

        <Navbar />

        {/* Main wrapper: prevents page-wide overflow without clipping content */}
        <main className="mx-auto w-full max-w-7xl px-4 py-6 overflow-x-hidden">
          {children}
        </main>

        <footer className="border-t border-white/5 mt-24">
          <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-white/50">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <span>© {new Date().getFullYear()} Examly</span>
              <span className="text-white/40">Built for structured learning.</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
