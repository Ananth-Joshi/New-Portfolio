import { createClient } from '@/lib/supabase/server'
import { updateSettings } from './actions'
import { Settings, Save } from 'lucide-react'
import { SubmitButton } from '@/components/SubmitButton'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: siteSettings } = await supabase.from('site_settings').select('*').eq('id', 1).single()
  
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <Settings className="w-6 h-6 text-blue-500" />
        </div>
        <h1 className="text-3xl font-serif text-white tracking-tight">Dashboard Settings</h1>
      </div>
      
      <div className="mb-10 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-blue-400 mb-2 flex items-center gap-2">
          Setup Instructions
        </h2>
        <p className="text-zinc-300 mb-4 text-sm leading-relaxed">
          To manage your portfolio content, you need to execute the SQL setup script in your Supabase SQL Editor.
        </p>
        <p className="text-zinc-300 text-sm">
          The setup script is located in your codebase at <code className="px-2 py-1 bg-zinc-900 border border-zinc-700 rounded text-blue-300 font-mono text-xs">supabase/setup.sql</code>.
        </p>
      </div>

      <form action={updateSettings} className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 shadow-xl">
        <div className="mb-8 border-b border-zinc-800 pb-4">
          <h2 className="text-xl font-semibold text-white tracking-tight">Home Page Configuration</h2>
          <p className="text-sm text-zinc-400 mt-1">Control how many items are displayed in each section on your home page.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-300">Projects Count</label>
            <input type="number" name="home_projects_count" defaultValue={siteSettings?.home_projects_count || 3} className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-300">Experience Count</label>
            <input type="number" name="home_experience_count" defaultValue={siteSettings?.home_experience_count || 2} className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-300">Technologies Count</label>
            <input type="number" name="home_technologies_count" defaultValue={siteSettings?.home_technologies_count || 8} className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-300">Certificates Count</label>
            <input type="number" name="home_certificates_count" defaultValue={siteSettings?.home_certificates_count || 4} className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" />
          </div>
        </div>

        <SubmitButton className="flex items-center gap-2 px-5 py-2.5 bg-white text-zinc-950 font-medium rounded-lg hover:bg-zinc-200 transition-colors shadow-sm">
          <Save className="w-4 h-4" />
          Save Settings
        </SubmitButton>
      </form>
    </div>
  )
}
