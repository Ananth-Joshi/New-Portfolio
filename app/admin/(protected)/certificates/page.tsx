import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { deleteCertificate } from './actions'

export default async function CertificatesAdmin() {
  const supabase = await createClient()
  const { data: certificates } = await supabase.from('certificates').select('*').order('display_order', { ascending: true })

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-white">Manage Certificates</h1>
        <Link 
          href="/admin/certificates/new"
          className="px-4 py-2 bg-white text-zinc-950 font-medium rounded-md hover:bg-zinc-200 transition-colors"
        >
          Add Certificate
        </Link>
      </div>
      
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 text-sm">
            <tr>
              <th className="px-6 py-3 font-medium">Order</th>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Organization</th>
              <th className="px-6 py-3 font-medium">Home</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {certificates?.map((cert) => (
              <tr key={cert.id} className="hover:bg-zinc-800/50">
                <td className="px-6 py-4">{cert.display_order}</td>
                <td className="px-6 py-4 font-medium">{cert.name}</td>
                <td className="px-6 py-4">{cert.organization}</td>
                <td className="px-6 py-4">{cert.show_on_home ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <Link href={`/admin/certificates/${cert.id}`} className="text-blue-400 hover:text-blue-300">Edit</Link>
                    <form action={deleteCertificate}>
                      <input type="hidden" name="id" value={cert.id} />
                      <button type="submit" className="text-red-400 hover:text-red-300">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {!certificates?.length && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">No certificates found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
