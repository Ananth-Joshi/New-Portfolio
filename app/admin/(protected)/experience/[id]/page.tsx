import { createClient } from '@/lib/supabase/server'
import { saveExperience } from '../actions'
import Link from 'next/link'
import { SubmitButton } from '@/components/SubmitButton'
import { Save } from 'lucide-react'

export default async function EditExperience({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: exp } = await supabase.from('experience').select('*').eq('id', id).single()

  if (!exp) return <div>Experience not found</div>

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/experience" className="text-zinc-400 hover:text-white">← Back</Link>
        <h1 className="text-3xl font-serif text-white">Edit Experience</h1>
      </div>
      
      <form action={saveExperience} className="space-y-6 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <input type="hidden" name="id" value={exp.id} />
        <input type="hidden" name="existing_image_url" value={exp.company_logo || ''} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Company</label>
            <input type="text" name="company" defaultValue={exp.company} required className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Role</label>
            <input type="text" name="role" defaultValue={exp.role} required className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Start Date</label>
            <input type="text" name="start_date" defaultValue={exp.start_date} placeholder="e.g. 2021" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">End Date</label>
            <input type="text" name="end_date" defaultValue={exp.end_date} placeholder="e.g. 2024 or Present" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Description</label>
          <textarea name="description" rows={4} defaultValue={exp.description} className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Company Logo (optional)</label>
          {exp.company_logo && (
            <div className="mb-2">
              <img src={exp.company_logo} alt="Logo" className="h-16 object-contain rounded-md" />
            </div>
          )}
          <input type="file" name="image" accept="image/*" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Display Order</label>
            <input type="number" name="display_order" defaultValue={exp.display_order} className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
          <div className="flex items-center mt-6">
            <input type="checkbox" name="show_on_home" id="show_on_home" defaultChecked={exp.show_on_home} className="mr-2" />
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
