import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 hidden md:flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-xl font-bold font-serif tracking-tight">Portfolio Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors">Dashboard</Link>
          <Link href="/admin/hero" className="block px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors">Hero Section</Link>
          <Link href="/admin/projects" className="block px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors">Projects</Link>
          <Link href="/admin/experience" className="block px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors">Experience</Link>
          <Link href="/admin/technologies" className="block px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors">Technologies</Link>
          <Link href="/admin/certificates" className="block px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors">Certificates</Link>
          <Link href="/admin/about" className="block px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors">About</Link>
        </nav>
        <div className="p-4 border-t border-zinc-800">
          <form action="/auth/signout" method="post">
            <button type="submit" className="w-full text-left px-4 py-2 text-zinc-400 hover:text-white transition-colors">Sign Out</button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
