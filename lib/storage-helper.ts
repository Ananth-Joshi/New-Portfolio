import { createClient } from '@/lib/supabase/server'

export async function deleteStorageFile(publicUrl: string | undefined | null, bucket: string = 'portfolio-images') {
  if (!publicUrl) return
  
  try {
    // Handle query strings if any exist
    const urlWithoutQuery = publicUrl.split('?')[0]
    
    const urlParts = urlWithoutQuery.split(`/public/${bucket}/`)
    console.log('[deleteStorageFile] Attempting to delete url:', publicUrl, 'Parts:', urlParts)
    
    if (urlParts.length === 2) {
      // Decode URI component to handle spaces or special characters in filenames
      const path = decodeURIComponent(urlParts[1])
      
      if (path) {
        console.log('[deleteStorageFile] Target path:', path)
        const supabase = await createClient()
        const { data, error } = await supabase.storage.from(bucket).remove([path])
        
        if (error) {
          console.error('[deleteStorageFile] Supabase Error:', error)
          // Let's also throw the error so it's visible if we want, or just log it
        } else {
          console.log('[deleteStorageFile] Successfully deleted:', data)
        }
      }
    } else {
      console.log('[deleteStorageFile] URL did not split properly.')
    }
  } catch (error) {
    console.error('[deleteStorageFile] Exception:', error)
  }
}
