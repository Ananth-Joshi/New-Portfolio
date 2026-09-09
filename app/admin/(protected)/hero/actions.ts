'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateHero(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const role = formData.get('role') as string
  const description = formData.get('description') as string
  const resume_url = formData.get('resume_url') as string
  const file = formData.get('image') as File | null

  let image_url = undefined

  if (file && file.size > 0) {
    const fileExt = file.name.split('.').pop()
    const fileName = `hero-${Date.now()}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(`hero/${fileName}`, file)
      
    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(`hero/${fileName}`)
      image_url = publicUrl
    }
  }

  const updates: any = { name, role, description, resume_url }
  if (image_url) updates.image_url = image_url

  await supabase.from('hero').update(updates).eq('id', 1)
  
  revalidatePath('/')
  revalidatePath('/admin/hero')
}
