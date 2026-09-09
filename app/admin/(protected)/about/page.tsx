import { createClient } from '@/lib/supabase/server'
import { updateAbout } from './actions'

export default async function AboutAdmin() {
  const supabase = await createClient()
  const { data: about } = await supabase.from('about').select('*').eq('id', 1).single()

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-serif mb-8 text-white">Manage About Section</h1>
      
      <form action={updateAbout} className="space-y-6 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Heading</label>
          <input 
            type="text" 
            name="heading" 
            defaultValue={about?.heading || ''} 
            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Text</label>
          <textarea 
            name="text" 
            rows={8}
            defaultValue={about?.text || ''} 
            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white"
          />
        </div>

        <button 
          type="submit" 
          className="px-4 py-2 bg-white text-zinc-950 font-medium rounded-md hover:bg-zinc-200 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}
