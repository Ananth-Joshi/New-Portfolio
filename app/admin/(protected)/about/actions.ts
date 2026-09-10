'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function updateAbout(formData: FormData) {
  const supabase = await createClient()
  const heading = formData.get('heading') as string
  const text = formData.get('text') as string

  await supabase.from('about').update({ heading, text }).eq('id', 1)
  
  revalidatePath('/')
  revalidatePath('/admin/about')
  
  const cookieStore = await cookies()
  cookieStore.set('flash-toast', 'About section updated successfully!|'+ Date.now(), { path: '/', httpOnly: false })
}
