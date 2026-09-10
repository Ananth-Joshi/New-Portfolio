'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { deleteStorageFile } from '@/lib/storage-helper'

export async function deleteCertificate(formData: FormData) {
  const id = formData.get('id') as string
  const supabase = await createClient()

  const { data: cert } = await supabase.from('certificates').select('image_url').eq('id', id).single()

  await supabase.from('certificates').delete().eq('id', id)
  
  if (cert?.image_url) {
    await deleteStorageFile(cert.image_url)
  }

  revalidatePath('/')
  revalidatePath('/admin/certificates')
}

export async function saveCertificate(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string | null
  const name = formData.get('name') as string
  const organization = formData.get('organization') as string
  const date = formData.get('date') as string
  const certificate_url = formData.get('certificate_url') as string
  const show_on_home = formData.get('show_on_home') === 'on'
  const display_order = parseInt(formData.get('display_order') as string) || 0
  
  const file = formData.get('image') as File | null
  const existing_image_url = formData.get('existing_image_url') as string | undefined
  let image_url = existing_image_url

  if (file && file.size > 0) {
    const fileExt = file.name.split('.').pop()
    const fileName = `certificate-${Date.now()}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(`certificates/${fileName}`, file)
      
    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(`certificates/${fileName}`)
      image_url = publicUrl

      if (existing_image_url) {
        await deleteStorageFile(existing_image_url)
      }
    }
  }

  const certData = {
    name,
    organization,
    date,
    certificate_url,
    show_on_home,
    display_order,
    image_url
  }

  if (id) {
    await supabase.from('certificates').update(certData).eq('id', id)
  } else {
    await supabase.from('certificates').insert(certData)
  }

  revalidatePath('/')
  revalidatePath('/admin/certificates')
  redirect('/admin/certificates')
}
