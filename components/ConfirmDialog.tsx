'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AlertTriangle } from 'lucide-react'

type ConfirmDialogProps = {
  open: boolean
  onClose: () => void
  title: string
  description?: ReactNode
  /** The confirming action — a submit button, a form, or anything clickable. */
  children: ReactNode
  cancelLabel?: string
  /** Blocks Escape / backdrop / Cancel while an action is in flight. */
  busy?: boolean
  icon?: ReactNode
}

export function ConfirmDialog({
  open,
  onClose,
  title,
  description,
  children,
  cancelLabel = 'Cancel',
  busy = false,
  icon
}: ConfirmDialogProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Escape to dismiss + background scroll lock while open
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !busy) onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, busy, onClose])

  if (!mounted || !open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby={description ? 'confirm-dialog-description' : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => !busy && onClose()}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 shrink-0 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
            {icon ?? <AlertTriangle className="w-5 h-5" />}
          </div>

          <div className="flex-1 min-w-0">
            <h3
              id="confirm-dialog-title"
              className="text-base font-semibold text-white"
            >
              {title}
            </h3>

            {description && (
              <p
                id="confirm-dialog-description"
                className="mt-1 text-sm text-zinc-400"
              >
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 hover:text-white cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelLabel}
          </button>

          {children}
        </div>

      </div>
    </div>,
    document.body
  )
}