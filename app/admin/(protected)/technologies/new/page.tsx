import { saveTechnology } from '../actions'
import Link from 'next/link'
import IconPicker from '../icon-picker'

export default function NewTechnology() {
  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/technologies" className="text-zinc-400 hover:text-white">← Back</Link>
        <h1 className="text-3xl font-serif text-white">Add Technology</h1>
      </div>
      
      <form action={saveTechnology} className="space-y-6 bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-xl">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
          <input type="text" name="name" required className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-md text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Category (e.g. Frontend, Backend, Tools)</label>
          <input type="text" name="category" required className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-md text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Technology Icon</label>
          <IconPicker name="icon_name" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Display Order</label>
            <input type="number" name="display_order" defaultValue="0" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-md text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
          </div>
          <div className="flex items-center mt-6">
            <input type="checkbox" name="show_on_home" id="show_on_home" defaultChecked className="mr-2 h-4 w-4 rounded border-zinc-700 bg-zinc-950 text-blue-500 focus:ring-blue-500 focus:ring-offset-zinc-900" />
            <label htmlFor="show_on_home" className="text-sm font-medium text-white">Show on Home</label>
          </div>
        </div>

        <button type="submit" className="px-4 py-2 bg-white text-zinc-950 font-medium rounded-md hover:bg-zinc-200 transition-colors shadow-sm">
          Save Technology
        </button>
      </form>
    </div>
  )
}
