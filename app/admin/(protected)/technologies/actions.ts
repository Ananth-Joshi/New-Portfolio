'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteTechnology(formData: FormData) {
  const id = formData.get('id') as string
  const supabase = await createClient()
  await supabase.from('technologies').delete().eq('id', id)
  revalidatePath('/')
  revalidatePath('/admin/technologies')
}

export async function saveTechnology(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string | null
  const name = formData.get('name') as string
  const category = formData.get('category') as string
  const icon_name = formData.get('icon_name') as string
  const show_on_home = formData.get('show_on_home') === 'on'
  const display_order = parseInt(formData.get('display_order') as string) || 0
  
  const techData = {
    name,
    category,
    icon_name,
    show_on_home,
    display_order
  }

  if (id) {
    await supabase.from('technologies').update(techData).eq('id', id)
  } else {
    await supabase.from('technologies').insert(techData)
  }

  revalidatePath('/')
  revalidatePath('/admin/technologies')
  redirect('/admin/technologies')
}
