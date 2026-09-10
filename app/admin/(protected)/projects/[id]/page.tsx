import { createClient } from '@/lib/supabase/server'
import { saveProject } from '../actions'
import Link from 'next/link'

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: project } = await supabase.from('projects').select('*').eq('id', id).single()

  if (!project) return <div>Project not found</div>

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/projects" className="text-zinc-400 hover:text-white">← Back</Link>
        <h1 className="text-3xl font-serif text-white">Edit Project</h1>
      </div>
      
      <form action={saveProject} className="space-y-6 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <input type="hidden" name="id" value={project.id} />
        <input type="hidden" name="existing_image_url" value={project.image_url || ''} />

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Title</label>
          <input type="text" name="title" defaultValue={project.title} required className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Description</label>
          <textarea name="description" rows={4} defaultValue={project.description} className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Technologies (comma separated)</label>
          <input type="text" name="technologies" defaultValue={project.technologies?.join(', ')} className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Image</label>
          {project.image_url && (
            <div className="mb-2">
              <img src={project.image_url} alt="Current" className="h-32 object-cover rounded-md" />
            </div>
          )}
          <input type="file" name="image" accept="image/*" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">GitHub URL</label>
            <input type="text" name="github_url" defaultValue={project.github_url} className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Demo URL</label>
            <input type="text" name="demo_url" defaultValue={project.demo_url} className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Display Order</label>
            <input type="number" name="display_order" defaultValue={project.display_order} className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
          <div className="flex items-center mt-6">
            <input type="checkbox" name="featured" id="featured" defaultChecked={project.featured} className="mr-2" />
            <label htmlFor="featured" className="text-sm font-medium text-white">Featured Project</label>
          </div>
          <div className="flex items-center mt-6">
            <input type="checkbox" name="show_on_home" id="show_on_home" defaultChecked={project.show_on_home} className="mr-2" />
            <label htmlFor="show_on_home" className="text-sm font-medium text-white">Show on Home</label>
          </div>
        </div>

        <button type="submit" className="px-4 py-2 bg-white text-zinc-950 font-medium rounded-md hover:bg-zinc-200 transition-colors cursor-pointer">
          Save Changes
        </button>
      </form>
    </div>
  )
}
