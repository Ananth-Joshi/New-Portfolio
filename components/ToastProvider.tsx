'use client'

import { useEffect, useRef } from 'react'
import { Toaster, toast } from 'sonner'

export function ToastProvider({ message }: { message?: string }) {
  const toastIdRef = useRef<string | number | null>(null)

  useEffect(() => {
    if (message) {
      // Clear the cookie immediately in the client
      document.cookie = "flash-toast=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // The message is now formatted as "Message text|timestamp"
      const actualMessage = message.split('|')[0]
      
      
      // Prevent duplicate toasts if React strict mode double-fires
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current)
      }
      
      toastIdRef.current = toast.success(actualMessage)
    }
  }, [message])

  return <Toaster theme="dark" position="bottom-right" richColors />
}
