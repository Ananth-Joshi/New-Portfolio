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
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 p-4">
      <Link href="/" className="text-zinc-500 hover:text-white mb-8 text-sm">← Back to Portfolio</Link>
      <div className="w-full max-w-sm p-8 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl">
        <h1 className="text-2xl font-serif mb-6 text-white text-center">Admin Login</h1>
        
        {!isSupabaseConfigured ? (
          <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg text-sm text-orange-200 text-center">
            <p className="font-medium mb-2">Supabase is not fully setup yet!</p>
            <p className="text-orange-200/70">
              Please enter your Supabase URL and Public Key in the environment settings to enable the admin dashboard.
            </p>
          </div>
        ) : (
          <form action={login} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1" htmlFor="email">Email</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                required 
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white focus:outline-none focus:border-accent-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1" htmlFor="password">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                required 
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white focus:outline-none focus:border-accent-orange"
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-2 px-4 bg-white text-zinc-950 font-medium rounded-md hover:bg-zinc-200 transition-colors"
            >
              Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
