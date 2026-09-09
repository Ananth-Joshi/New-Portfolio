import { saveCertificate } from '../actions'
import Link from 'next/link'

export default function NewCertificate() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/certificates" className="text-zinc-400 hover:text-white">← Back</Link>
        <h1 className="text-3xl font-serif text-white">Add Certificate</h1>
      </div>
      
      <form action={saveCertificate} className="space-y-6 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
            <input type="text" name="name" required className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Organization</label>
            <input type="text" name="organization" required className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Date</label>
            <input type="text" name="date" placeholder="e.g. Oct 2023" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Certificate URL</label>
            <input type="text" name="certificate_url" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Image</label>
          <input type="file" name="image" accept="image/*" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Display Order</label>
            <input type="number" name="display_order" defaultValue="0" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
          <div className="flex items-center mt-6">
            <input type="checkbox" name="show_on_home" id="show_on_home" defaultChecked className="mr-2" />
            <label htmlFor="show_on_home" className="text-sm font-medium text-white">Show on Home</label>
          </div>
        </div>

        <button type="submit" className="px-4 py-2 bg-white text-zinc-950 font-medium rounded-md hover:bg-zinc-200 transition-colors">
          Save Certificate
        </button>
      </form>
    </div>
  )
}
