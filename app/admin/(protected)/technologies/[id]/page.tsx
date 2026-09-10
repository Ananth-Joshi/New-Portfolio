import { createClient } from '@/lib/supabase/server'
import { saveTechnology } from '../actions'
import Link from 'next/link'
import IconPicker from '../icon-picker'
import { SubmitButton } from '@/components/SubmitButton'
import { Save } from 'lucide-react'

export default async function EditTechnology({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: tech } = await supabase.from('technologies').select('*').eq('id', id).single()
  
  if (!tech) return <div>Technology not found</div>

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/technologies" className="text-zinc-400 hover:text-white">← Back</Link>
        <h1 className="text-3xl font-serif text-white">Edit Technology</h1>
      </div>
      
      <form action={saveTechnology} className="space-y-6 bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-xl">
        <input type="hidden" name="id" value={tech.id} />
        
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
          <input type="text" name="name" defaultValue={tech.name} required className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-md text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Category (e.g. Frontend, Backend, Tools)</label>
          <input type="text" name="category" defaultValue={tech.category} required className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-md text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Technology Icon</label>
          <IconPicker name="icon_name" defaultValue={tech.icon_name} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Display Order</label>
            <input type="number" name="display_order" defaultValue={tech.display_order} className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-md text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
          </div>
          <div className="flex items-center mt-6">
            <input type="checkbox" name="show_on_home" id="show_on_home" defaultChecked={tech.show_on_home} className="mr-2 h-4 w-4 rounded border-zinc-700 bg-zinc-950 text-blue-500 focus:ring-blue-500 focus:ring-offset-zinc-900" />
            <label htmlFor="show_on_home" className="text-sm font-medium text-white">Show on Home</label>
          </div>
        </div>

        <SubmitButton className="flex items-center gap-2 px-5 py-2.5 bg-white text-zinc-950 font-medium rounded-lg hover:bg-zinc-200 transition-colors shadow-sm">
          <Save className="w-4 h-4" />
          Save Changes
        </SubmitButton>
      </form>
    </div>
  )
}
