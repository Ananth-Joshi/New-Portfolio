import { createClient } from '@/lib/supabase/server'
import { updateHero } from './actions'

export default async function HeroAdmin() {
  const supabase = await createClient()
  const { data: hero } = await supabase.from('hero').select('*').eq('id', 1).single()

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-serif mb-8 text-white">Manage Hero Section</h1>
      
      <form action={updateHero} className="space-y-6 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <input type="hidden" name="existing_image_url" value={hero?.image_url || ''} />
        <input type="hidden" name="existing_resume_url" value={hero?.resume_url || ''} />

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
          <input 
            type="text" 
            name="name" 
            defaultValue={hero?.name || ''} 
            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Role</label>
          <input 
            type="text" 
            name="role" 
            defaultValue={hero?.role || ''} 
            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Description</label>
          <textarea 
            name="description" 
            rows={4}
            defaultValue={hero?.description || ''} 
            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Hero Image</label>
          {hero?.image_url && (
            <div className="mb-2">
              <img src={hero.image_url} alt="Current Hero" className="h-32 object-cover rounded-md" />
            </div>
          )}
          <input 
            type="file" 
            name="image" 
            accept="image/*"
            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white"
          />
          <p className="text-xs text-zinc-500 mt-1">Leave empty to keep current image</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Resume</label>
          {hero?.resume_url && (
            <div className="mb-2 text-sm text-blue-400">
              <a href={hero.resume_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                View Current Resume
              </a>
            </div>
          )}
          <input 
            type="file" 
            name="resume" 
            accept=".pdf,.doc,.docx"
            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white"
          />
          <p className="text-xs text-zinc-500 mt-1">Upload a new resume to replace the current one. Leave empty to keep.</p>
        </div>

        <button 
          type="submit" 
          className="px-4 py-2 bg-white text-zinc-950 font-medium rounded-md hover:bg-zinc-200 transition-colors cursor-pointer"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}
