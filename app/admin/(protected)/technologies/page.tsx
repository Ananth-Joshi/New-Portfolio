import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { deleteTechnology } from './actions'
import { Plus, Edit2, Trash2, Code2 } from 'lucide-react'
import SimpleIcon from '@/components/simple-icon'

export default async function TechnologiesAdmin() {
  const supabase = await createClient()
  const { data: technologies } = await supabase.from('technologies')
    .select('*')
    .order('category', { ascending: true })
    .order('display_order', { ascending: true })

  return (
    <div className="max-w-5xl w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">Manage Technologies</h1>
        <Link 
          href="/admin/technologies/new"
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-white text-zinc-950 font-medium rounded-lg hover:bg-zinc-200 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Technology
        </Link>
      </div>
      
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-xl overflow-hidden">
        {/* Mobile: cards */}
        <div className="md:hidden divide-y divide-zinc-800/60">
          {technologies?.map((tech) => (
            <div key={tech.id} className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                  <SimpleIcon slug={tech.icon_name} className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-white break-words">{tech.name}</p>
                  <p className="text-xs text-zinc-500 break-all">{tech.icon_name} · Order {tech.display_order}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-0.5 bg-zinc-800 rounded-md text-xs font-medium text-zinc-300 border border-zinc-700">
                  {tech.category}
                </span>
                {tech.show_on_home ? (
                  <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20">On home</span>
                ) : (
                  <span className="px-2 py-0.5 bg-zinc-500/10 text-zinc-400 text-xs font-medium rounded-full border border-zinc-500/20">Not on home</span>
                )}
              </div>
              <div className="flex gap-2 pt-1">
                <Link
                  href={`/admin/technologies/${tech.id}`}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-blue-400 hover:text-blue-300 border border-zinc-700 rounded-lg hover:bg-zinc-800/60 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Link>
                <form action={deleteTechnology} className="flex-1">
                  <input type="hidden" name="id" value={tech.id} />
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 border border-zinc-700 rounded-lg hover:bg-zinc-800/60 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
          {!technologies?.length && (
            <div className="px-6 py-12 text-center text-zinc-500 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-3">
                <Code2 className="w-6 h-6 text-zinc-400" />
              </div>
              <p>No technologies found.</p>
              <Link href="/admin/technologies/new" className="text-blue-400 hover:underline mt-2 text-sm">
                Add your first technology
              </Link>
            </div>
          )}
        </div>

        {/* Tablet/desktop: table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-950/50 border-b border-zinc-800 text-zinc-400 text-sm">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Category</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Order</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Name</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Icon</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Home</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {technologies?.map((tech) => (
                <tr key={tech.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="px-6 py-4 text-zinc-300">
                    <span className="px-2.5 py-1 bg-zinc-800 rounded-md text-xs font-medium text-zinc-300 border border-zinc-700">
                      {tech.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">{tech.display_order}</td>
                  <td className="px-6 py-4 font-medium text-white">{tech.name}</td>
                  <td className="px-6 py-4 text-zinc-400">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                        <SimpleIcon slug={tech.icon_name} className="w-4 h-4" />
                      </div>
                      <span className="text-xs">{tech.icon_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {tech.show_on_home ? (
                      <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20">Yes</span>
                    ) : (
                      <span className="px-2 py-1 bg-zinc-500/10 text-zinc-400 text-xs font-medium rounded-full border border-zinc-500/20">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link 
                        href={`/admin/technologies/${tech.id}`} 
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <form action={deleteTechnology}>
                        <input type="hidden" name="id" value={tech.id} />
                        <button 
                          type="submit" 
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {!technologies?.length && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-3">
                        <Code2 className="w-6 h-6 text-zinc-400" />
                      </div>
                      <p>No technologies found.</p>
                      <Link href="/admin/technologies/new" className="text-blue-400 hover:underline mt-2 text-sm">
                        Add your first technology
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}