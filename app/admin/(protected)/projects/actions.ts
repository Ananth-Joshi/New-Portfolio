'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { deleteStorageFile } from '@/lib/storage-helper'

export async function deleteProject(formData: FormData) {
  const id = formData.get('id') as string
  const supabase = await createClient()

  const { data: project } = await supabase.from('projects').select('image_url').eq('id', id).single()

  await supabase.from('projects').delete().eq('id', id)
  
  if (project?.image_url) {
    await deleteStorageFile(project.image_url)
  }

  revalidatePath('/')
  revalidatePath('/admin/projects')
  const cookieStore = await cookies()
  cookieStore.set('flash-toast', 'Project deleted successfully!', { path: '/', httpOnly: false })
}

export async function saveProject(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string | null
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const technologiesStr = formData.get('technologies') as string
  const github_url = formData.get('github_url') as string
  const demo_url = formData.get('demo_url') as string
  const featured = formData.get('featured') === 'on'
  const show_on_home = formData.get('show_on_home') === 'on'
  const display_order = parseInt(formData.get('display_order') as string) || 0
  
  const technologies = technologiesStr.split(',').map(t => t.trim()).filter(t => t)
  
  const file = formData.get('image') as File | null
  const existing_image_url = formData.get('existing_image_url') as string | undefined
  let image_url = existing_image_url

  if (file && file.size > 0) {
    const fileExt = file.name.split('.').pop()
    const fileName = `project-${Date.now()}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(`projects/${fileName}`, file)
      
    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(`projects/${fileName}`)
      image_url = publicUrl

      if (existing_image_url) {
        await deleteStorageFile(existing_image_url)
      }
    }
  }

  const projectData = {
    title,
    description,
    technologies,
    github_url,
    demo_url,
    featured,
    show_on_home,
    display_order,
    image_url
  }

  if (id) {
    await supabase.from('projects').update(projectData).eq('id', id)
  } else {
    await supabase.from('projects').insert(projectData)
  }

  revalidatePath('/')
  revalidatePath('/admin/projects')
  const cookieStore = await cookies()
  cookieStore.set('flash-toast', 'Project saved successfully!', { path: '/', httpOnly: false })
  redirect('/admin/projects')
}
