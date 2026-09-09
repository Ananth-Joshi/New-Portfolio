'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateSettings(formData: FormData) {
  const supabase = await createClient()

  const home_projects_count = parseInt(formData.get('home_projects_count') as string) || 3
  const home_experience_count = parseInt(formData.get('home_experience_count') as string) || 2
  const home_technologies_count = parseInt(formData.get('home_technologies_count') as string) || 8
  const home_certificates_count = parseInt(formData.get('home_certificates_count') as string) || 4

  await supabase.from('site_settings').update({
    home_projects_count,
    home_experience_count,
    home_technologies_count,
    home_certificates_count
  }).eq('id', 1)
  
  revalidatePath('/')
  revalidatePath('/admin')
}
