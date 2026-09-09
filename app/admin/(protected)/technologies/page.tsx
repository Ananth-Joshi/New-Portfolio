import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { deleteTechnology } from './actions'

export default async function TechnologiesAdmin() {
  const supabase = await createClient()
  const { data: technologies } = await supabase.from('technologies').select('*').order('category', { ascending: true }).order('display_order', { ascending: true })

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-white">Manage Technologies</h1>
        <Link 
          href="/admin/technologies/new"
          className="px-4 py-2 bg-white text-zinc-950 font-medium rounded-md hover:bg-zinc-200 transition-colors"
        >
          Add Technology
        </Link>
      </div>
      
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 text-sm">
            <tr>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Order</th>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Icon</th>
              <th className="px-6 py-3 font-medium">Home</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {technologies?.map((tech) => (
              <tr key={tech.id} className="hover:bg-zinc-800/50">
                <td className="px-6 py-4">{tech.category}</td>
                <td className="px-6 py-4">{tech.display_order}</td>
                <td className="px-6 py-4 font-medium">{tech.name}</td>
                <td className="px-6 py-4 text-zinc-400">{tech.icon_name}</td>
                <td className="px-6 py-4">{tech.show_on_home ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <Link href={`/admin/technologies/${tech.id}`} className="text-blue-400 hover:text-blue-300">Edit</Link>
                    <form action={deleteTechnology}>
                      <input type="hidden" name="id" value={tech.id} />
                      <button type="submit" className="text-red-400 hover:text-red-300">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {!technologies?.length && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-zinc-500">No technologies found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
