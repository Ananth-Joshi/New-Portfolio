import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { deleteProject } from './actions'

export default async function ProjectsAdmin() {
  const supabase = await createClient()
  const { data: projects } = await supabase.from('projects').select('*').order('display_order', { ascending: true })

  return (
    <div className="max-w-4xl w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-serif text-white">Manage Projects</h1>
        <Link 
          href="/admin/projects/new"
          className="w-full sm:w-auto text-center px-4 py-2 bg-white text-zinc-950 font-medium rounded-md hover:bg-zinc-200 transition-colors"
        >
          Add Project
        </Link>
      </div>
      
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        {/* Mobile: cards */}
        <div className="md:hidden divide-y divide-zinc-800">
          {projects?.map((project) => (
            <div key={project.id} className="p-4 space-y-3">
              <div className="min-w-0">
                <p className="font-medium text-white break-words">{project.title}</p>
                <p className="text-xs text-zinc-500 mt-0.5">Order: {project.display_order}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${project.featured ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'}`}>
                  {project.featured ? 'Featured' : 'Not featured'}
                </span>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${project.show_on_home ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'}`}>
                  {project.show_on_home ? 'On home' : 'Not on home'}
                </span>
              </div>
              <div className="flex gap-2 pt-1">
                <Link href={`/admin/projects/${project.id}`} className="flex-1 text-center px-3 py-2 text-sm text-blue-400 hover:text-blue-300 border border-zinc-700 rounded-md hover:bg-zinc-800/60 transition-colors">Edit</Link>
                <form action={deleteProject} className="flex-1">
                  <input type="hidden" name="id" value={project.id} />
                  <button type="submit" className="w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 border border-zinc-700 rounded-md hover:bg-zinc-800/60 transition-colors">Delete</button>
                </form>
              </div>
            </div>
          ))}
          {!projects?.length && (
            <p className="px-6 py-8 text-center text-zinc-500">No projects found.</p>
          )}
        </div>

        {/* Tablet/desktop: table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 text-sm">
              <tr>
                <th className="px-6 py-3 font-medium">Order</th>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Featured</th>
                <th className="px-6 py-3 font-medium">Home</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {projects?.map((project) => (
                <tr key={project.id} className="hover:bg-zinc-800/50">
                  <td className="px-6 py-4">{project.display_order}</td>
                  <td className="px-6 py-4 font-medium">{project.title}</td>
                  <td className="px-6 py-4">{project.featured ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4">{project.show_on_home ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <Link href={`/admin/projects/${project.id}`} className="text-blue-400 hover:text-blue-300">Edit</Link>
                      <form action={deleteProject}>
                        <input type="hidden" name="id" value={project.id} />
                        <button type="submit" className="text-red-400 hover:text-red-300">Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {!projects?.length && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">No projects found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}