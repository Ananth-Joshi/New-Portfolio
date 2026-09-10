import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { ToastProvider } from '@/components/ToastProvider'
import { Sidebar } from '@/components/Sidebar'

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
      
      <Sidebar email={data.user.email || 'Admin'} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-zinc-950/50">
        <div className="max-w-6xl mx-auto p-6 md:p-10 pt-16 md:pt-10">
          {children}
        </div>
      </main>
    </div>
  )
}
