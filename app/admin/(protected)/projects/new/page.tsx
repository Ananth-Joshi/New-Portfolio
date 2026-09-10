import { SubmitButton } from '@/components/SubmitButton'
import { saveProject } from '../actions'
import Link from 'next/link'
import { Save } from 'lucide-react'

export default function NewProject() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/projects" className="text-zinc-400 hover:text-white">← Back</Link>
        <h1 className="text-3xl font-serif text-white">Add Project</h1>
      </div>
      
      <form action={saveProject} className="space-y-6 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Title</label>
          <input type="text" name="title" required className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Description</label>
          <textarea name="description" rows={4} className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Technologies (comma separated)</label>
          <input type="text" name="technologies" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Image</label>
          <input type="file" name="image" accept="image/*" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">GitHub URL</label>
            <input type="text" name="github_url" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Demo URL</label>
            <input type="text" name="demo_url" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Display Order</label>
            <input type="number" name="display_order" defaultValue="0" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
          <div className="flex items-center mt-6">
            <input type="checkbox" name="featured" id="featured" className="mr-2" />
            <label htmlFor="featured" className="text-sm font-medium text-white">Featured Project</label>
          </div>
          <div className="flex items-center mt-6">
            <input type="checkbox" name="show_on_home" id="show_on_home" defaultChecked className="mr-2" />
            <label htmlFor="show_on_home" className="text-sm font-medium text-white">Show on Home</label>
          </div>
        </div>

        <SubmitButton className="flex items-center gap-2 px-5 py-2.5 bg-white text-zinc-950 font-medium rounded-lg hover:bg-zinc-200 transition-colors shadow-sm">
          <Save className="w-4 h-4" />
          Save Project
        </SubmitButton>
      </form>
    </div>
  )
}
