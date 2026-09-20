import { login } from './actions';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function LoginPage() {
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (data?.user) {
      redirect('/admin');
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-950 p-4">
      {/* Background: soft glows + faint grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-accent-orange/10 blur-3xl" />
        <div className="absolute -bottom-48 -right-24 h-96 w-96 rounded-full bg-zinc-700/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <Link
          href="/"
          className="group mb-6 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
        >
          <svg
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Portfolio
        </Link>

        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/70 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-700/60 bg-zinc-800/60 text-accent-orange">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h1 className="text-2xl font-serif text-white">Admin Login</h1>
            <p className="mt-1.5 text-sm text-zinc-500">Sign in to manage your portfolio</p>
          </div>

          {!isSupabaseConfigured ? (
            <div className="rounded-lg border border-orange-500/20 bg-orange-500/10 p-4 text-center text-sm text-orange-200">
              <p className="mb-2 font-medium">Supabase is not fully setup yet!</p>
              <p className="text-orange-200/70">
                Please enter your Supabase URL and Public Key in the environment settings to enable the admin dashboard.
              </p>
            </div>
          ) : (
            <form action={login} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-400" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <svg
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 6L2 7" />
                  </svg>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950/80 py-2.5 pl-10 pr-3 text-white placeholder:text-zinc-600 transition-colors focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-accent-orange/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-400" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <svg
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                  </svg>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950/80 py-2.5 pl-10 pr-3 text-white placeholder:text-zinc-600 transition-colors focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-accent-orange/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 cursor-pointer rounded-lg bg-white px-4 py-2.5 font-medium text-zinc-950 transition-all hover:bg-zinc-200 active:scale-[0.98]"
              >
                Sign In
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}