import { createClient } from '@/lib/supabase/server'
import { updateSettings } from './actions'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: siteSettings } = await supabase.from('site_settings').select('*').eq('id', 1).single()
  
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-serif mb-8 text-white">Dashboard Settings</h1>
      
      <div className="mb-12 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <h2 className="text-xl font-medium text-blue-400 mb-2">Setup Instructions</h2>
        <p className="text-white/70 mb-4">
          To manage your portfolio content, you need to execute the SQL setup script in your Supabase SQL Editor.
        </p>
        <p className="text-white/70">
          The setup script is located in your codebase at <code>supabase/setup.sql</code>.
        </p>
      </div>

      <form action={updateSettings} className="space-y-6 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <h2 className="text-xl font-medium text-white mb-4">Home Page Display Counts</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Projects Count</label>
            <input type="number" name="home_projects_count" defaultValue={siteSettings?.home_projects_count || 3} className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Experience Count</label>
            <input type="number" name="home_experience_count" defaultValue={siteSettings?.home_experience_count || 2} className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Technologies Count</label>
            <input type="number" name="home_technologies_count" defaultValue={siteSettings?.home_technologies_count || 8} className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Certificates Count</label>
            <input type="number" name="home_certificates_count" defaultValue={siteSettings?.home_certificates_count || 4} className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
        </div>

        <button type="submit" className="px-4 py-2 bg-white text-zinc-950 font-medium rounded-md hover:bg-zinc-200 transition-colors">
          Save Settings
        </button>
      </form>
    </div>
  )
}
