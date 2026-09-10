import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { ToastProvider } from '@/components/ToastProvider'
import { 
  LayoutDashboard, 
  MonitorPlay, 
  Briefcase, 
  Code2, 
  Award, 
  User, 
  LogOut,
  FolderOpen
} from 'lucide-react'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/admin/login')
  }

  const cookieStore = await cookies()
  const flashToast = cookieStore.get('flash-toast')?.value

  return (
    <div className="h-screen overflow-hidden bg-zinc-950 text-zinc-300 font-sans flex selection:bg-blue-500/30">
      <ToastProvider message={flashToast} />
      
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 hidden md:flex flex-col shadow-xl z-10 relative">
        <div className="p-6 border-b border-zinc-800/60 bg-zinc-950/20">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
              <MonitorPlay className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-semibold tracking-tight text-white">Admin Panel</h2>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 mt-2 px-2">General</div>
          
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/60 hover:text-white transition-all group">
            <LayoutDashboard className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            <span className="font-medium text-sm">Dashboard</span>
          </Link>
          
          <Link href="/admin/hero" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/60 hover:text-white transition-all group">
            <MonitorPlay className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            <span className="font-medium text-sm">Hero Section</span>
          </Link>
          
          <Link href="/admin/about" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/60 hover:text-white transition-all group">
            <User className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            <span className="font-medium text-sm">About</span>
          </Link>

          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 mt-6 px-2">Content</div>

          <Link href="/admin/projects" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/60 hover:text-white transition-all group">
            <FolderOpen className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            <span className="font-medium text-sm">Projects</span>
          </Link>
          
          <Link href="/admin/experience" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/60 hover:text-white transition-all group">
            <Briefcase className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            <span className="font-medium text-sm">Experience</span>
          </Link>
          
          <Link href="/admin/technologies" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/60 hover:text-white transition-all group">
            <Code2 className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            <span className="font-medium text-sm">Technologies</span>
          </Link>
          
          <Link href="/admin/certificates" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/60 hover:text-white transition-all group">
            <Award className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            <span className="font-medium text-sm">Certificates</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-zinc-800/60 bg-zinc-950/20">
          <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
              <User className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{data.user.email}</p>
              <p className="text-xs text-zinc-500 truncate">Administrator</p>
            </div>
          </div>

          <form action="/auth/signout" method="post">
            <button type="submit" className="flex items-center gap-3 w-full px-3 py-2 text-zinc-400 hover:text-white hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all group text-sm font-medium">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-zinc-950/50">
        <div className="max-w-6xl mx-auto p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  )
}
