'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { deleteStorageFile } from '@/lib/storage-helper'

export async function updateHero(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const role = formData.get('role') as string
  const description = formData.get('description') as string
  
  const existing_image_url = formData.get('existing_image_url') as string
  const existing_resume_url = formData.get('existing_resume_url') as string

  const imageFile = formData.get('image') as File | null
  const resumeFile = formData.get('resume') as File | null

  let image_url = existing_image_url
  let resume_url = existing_resume_url

  // Upload new image
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `hero-${Date.now()}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(`hero/${fileName}`, imageFile)
      
    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(`hero/${fileName}`)
      image_url = publicUrl
      
      // Cleanup old image
      if (existing_image_url) {
        await deleteStorageFile(existing_image_url)
      }
    }
  }

  // Upload new resume
  if (resumeFile && resumeFile.size > 0) {
    const fileExt = resumeFile.name.split('.').pop()
    const fileName = `resume-${Date.now()}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(`resumes/${fileName}`, resumeFile)
      
    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(`resumes/${fileName}`)
      resume_url = publicUrl
      
      // Cleanup old resume
      if (existing_resume_url) {
        await deleteStorageFile(existing_resume_url)
      }
    }
  }

  const updates: any = { name, role, description }
  if (image_url !== undefined) updates.image_url = image_url
  if (resume_url !== undefined) updates.resume_url = resume_url

  await supabase.from('hero').update(updates).eq('id', 1)
  
  revalidatePath('/')
  revalidatePath('/admin/hero')
}
