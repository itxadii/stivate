import { signIn } from "@/auth"
import { headers } from "next/headers"
import { TrendingUp, Coins, Users, Shield, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default async function LoginPage() {
  const headersList = await headers()
  const host = headersList.get("host") || ""
  const isLocal = host.includes("localhost") && !host.includes("admin.localhost")
  const redirectPath = "/admin"

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Split Screen Container */}
      <div className="flex flex-1 flex-col lg:flex-row">
        
        {/* Left Side: Brand Showcase & Features (Hidden on mobile) */}
        <div className="relative hidden w-full lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-sky-100 via-sky-50 to-white p-12 overflow-hidden border-r border-slate-200">
          {/* Subtle Ambient Decorative Circles */}
          <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl pointer-events-none" />
          <div className="absolute right-12 bottom-12 h-80 w-80 rounded-full bg-blue-200/35 blur-3xl pointer-events-none" />

          {/* Header Section */}
          <div className="relative">
            <img
              src="/logo.png"
              alt="Stivate"
              className="h-30 w-auto object-contain"
            />
          </div>

          {/* Core Content - Features Showcase */}
          <div className="relative my-auto max-w-lg space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl leading-tight">
                Manage Operations <br />
                <span className="text-sky-600">
                  with complete control.
                </span>
              </h1>
              <p className="text-slate-600 text-base leading-relaxed font-normal">
                Welcome to the Stivate Administrative Workspace. Streamline client relationships, manage pricing proposals, issue invoices, and analyze revenue metrics in one centralized platform.
              </p>
            </div>

            {/* Feature Cards List */}
            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/50 transition duration-200">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/80 text-sky-600 border border-white/90 group-hover:scale-105 transition shadow-sm">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition">
                    Performance Analytics
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 font-normal">
                    Track cashflow aggregates, operating profit margins, and dynamic monthly category distributions in real-time.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/50 transition duration-200">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/80 text-sky-600 border border-white/90 group-hover:scale-105 transition shadow-sm">
                  <Coins className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition">
                    Smart Invoicing System
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 font-normal">
                    Generate client bills with automated tax and discount adjustments, paid balances, and PDF export templates.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/50 transition duration-200">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/80 text-sky-600 border border-white/90 group-hover:scale-105 transition shadow-sm">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition">
                    Client Pipeline & Quotations
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 font-normal">
                    Transition warm leads directly into billing accounts, schedule client follow-up timelines, and sign proposals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="relative text-xs text-slate-500 flex items-center justify-between border-t border-slate-200 pt-6">
            <span>© 2026 Stivate LLC. All rights reserved.</span>
            <Link
              href="/security-policy"
              className="flex items-center gap-1 hover:text-sky-600 cursor-pointer transition text-slate-500 hover:underline font-medium"
            >
              Security Policy <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Side: Login Panel */}
        <div className="flex w-full lg:w-1/2 items-center justify-center p-8 sm:p-12 lg:p-16">
          <div className="w-full max-w-md space-y-8">
            
            {/* Form Header */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6 flex h-30 items-center justify-center hover:scale-105 transition-all duration-300">
                {/* Logo Image */}
                <img
                  src="/logo.png"
                  alt="Stivate"
                  className="h-30 w-auto object-contain dark:invert"
                />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white">
                Admin Authentication
              </h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                Enter your administrative credentials via Google Workspace to access the management workspace dashboard.
              </p>
            </div>

            {/* Action Box */}
            <div className="mt-8 bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 space-y-6">
              
              <form
                action={async () => {
                  "use server"
                  await signIn("google", { redirectTo: redirectPath })
                }}
              >
                <button
                  type="submit"
                  className="group relative flex w-full items-center justify-center rounded-xl border border-gray-250 bg-white px-4 py-3.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all duration-200 cursor-pointer"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                    {/* Colorful Google G Logo SVG */}
                    <svg className="h-5 w-5 group-hover:scale-105 transition-transform" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        fill="#EA4335"
                      />
                    </svg>
                  </span>
                  Sign in with Google Account
                </button>
              </form>

              {/* Security footprint notes */}
              <div className="border-t border-gray-100 dark:border-gray-800 pt-5 text-center">
                <span className="inline-flex items-center gap-1.5 text-2xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  <Shield className="w-3.5 h-3.5 text-indigo-400" />
                  Secured Access Session
                </span>
                <p className="text-3xs text-gray-400 dark:text-gray-500 mt-2 leading-relaxed max-w-[280px] mx-auto">
                  Access is logged for auditing. Only authorized accounts listed in the security directory can initialize a session.
                </p>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  )
}
