'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteExperience(formData: FormData) {
  const id = formData.get('id') as string
  const supabase = await createClient()
  await supabase.from('experience').delete().eq('id', id)
  revalidatePath('/')
  revalidatePath('/admin/experience')
}

export async function saveExperience(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string | null
  const company = formData.get('company') as string
  const role = formData.get('role') as string
  const start_date = formData.get('start_date') as string
  const end_date = formData.get('end_date') as string
  const description = formData.get('description') as string
  const show_on_home = formData.get('show_on_home') === 'on'
  const display_order = parseInt(formData.get('display_order') as string) || 0
  
  const file = formData.get('image') as File | null
  let company_logo = formData.get('existing_image_url') as string | undefined

  if (file && file.size > 0) {
    const fileExt = file.name.split('.').pop()
    const fileName = `company-${Date.now()}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(`experience/${fileName}`, file)
      
    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(`experience/${fileName}`)
      company_logo = publicUrl
    }
  }

  const expData = {
    company,
    role,
    start_date,
    end_date,
    description,
    show_on_home,
    display_order,
    company_logo
  }

  if (id) {
    await supabase.from('experience').update(expData).eq('id', id)
  } else {
    await supabase.from('experience').insert(expData)
  }

  revalidatePath('/')
  revalidatePath('/admin/experience')
  redirect('/admin/experience')
}
