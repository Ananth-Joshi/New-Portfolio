import { createClient } from '@/lib/supabase/server'
import { saveCertificate } from '../actions'
import Link from 'next/link'

export default async function EditCertificate({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: cert } = await supabase.from('certificates').select('*').eq('id', id).single()

  if (!cert) return <div>Certificate not found</div>

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/certificates" className="text-zinc-400 hover:text-white">← Back</Link>
        <h1 className="text-3xl font-serif text-white">Edit Certificate</h1>
      </div>
      
      <form action={saveCertificate} className="space-y-6 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <input type="hidden" name="id" value={cert.id} />
        <input type="hidden" name="existing_image_url" value={cert.image_url || ''} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
            <input type="text" name="name" defaultValue={cert.name} required className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Organization</label>
            <input type="text" name="organization" defaultValue={cert.organization} required className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Date</label>
            <input type="text" name="date" defaultValue={cert.date} placeholder="e.g. Oct 2023" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Certificate URL</label>
            <input type="text" name="certificate_url" defaultValue={cert.certificate_url} className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Image</label>
          {cert.image_url && (
            <div className="mb-2">
              <img src={cert.image_url} alt="Certificate" className="h-32 object-cover rounded-md" />
            </div>
          )}
          <input type="file" name="image" accept="image/*" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Display Order</label>
            <input type="number" name="display_order" defaultValue={cert.display_order} className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white" />
          </div>
          <div className="flex items-center mt-6">
            <input type="checkbox" name="show_on_home" id="show_on_home" defaultChecked={cert.show_on_home} className="mr-2" />
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
