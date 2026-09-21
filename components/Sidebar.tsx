'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import {
  LayoutDashboard,
  MonitorPlay,
  Briefcase,
  Code2,
  Award,
  User,
  LogOut,
  FolderOpen,
  Menu,
  X
} from 'lucide-react'

export function Sidebar({ email }: { email: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showSignOutModal, setShowSignOutModal] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => setIsOpen(!isOpen)
  const closeSidebar = () => setIsOpen(false)

  const linkClass = (active: boolean) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${
      active
        ? 'bg-zinc-800 text-white'
        : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white'
    }`

  const iconClass = (active: boolean) =>
    `w-4 h-4 ${
      active
        ? 'text-white'
        : 'text-zinc-400 group-hover:text-white'
    }`

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className={`md:hidden fixed cursor-pointer top-4 z-50 p-2 bg-zinc-900 border border-zinc-800 rounded-md text-white shadow-lg transition-all duration-300 ${
          isOpen ? 'left-[17rem]' : 'left-4'
        }`}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40
          w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col shadow-xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-800/60 bg-zinc-950/20">
          <Link
            href="/admin"
            onClick={closeSidebar}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
              <MonitorPlay className="w-4 h-4" />
            </div>

            <h2 className="text-lg font-semibold tracking-tight text-white">
              Admin Panel
            </h2>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">

          {/* General */}
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 mt-2 px-2">
            General
          </div>

          {/* Dashboard */}
          <Link
            href="/admin"
            onClick={closeSidebar}
            className={linkClass(pathname === '/admin')}
          >
            <LayoutDashboard className={iconClass(pathname === '/admin')} />
            <span className="font-medium text-sm">Dashboard</span>
          </Link>

          {/* Hero */}
          <Link
            href="/admin/hero"
            onClick={closeSidebar}
            className={linkClass(pathname.startsWith('/admin/hero'))}
          >
            <MonitorPlay className={iconClass(pathname.startsWith('/admin/hero'))} />
            <span className="font-medium text-sm">Hero Section</span>
          </Link>

          {/* About */}
          <Link
            href="/admin/about"
            onClick={closeSidebar}
            className={linkClass(pathname.startsWith('/admin/about'))}
          >
            <User className={iconClass(pathname.startsWith('/admin/about'))} />
            <span className="font-medium text-sm">About</span>
          </Link>

          {/* Content */}
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 mt-6 px-2">
            Content
          </div>

          {/* Projects */}
          <Link
            href="/admin/projects"
            onClick={closeSidebar}
            className={linkClass(pathname.startsWith('/admin/projects'))}
          >
            <FolderOpen className={iconClass(pathname.startsWith('/admin/projects'))} />
            <span className="font-medium text-sm">Projects</span>
          </Link>

          {/* Experience */}
          <Link
            href="/admin/experience"
            onClick={closeSidebar}
            className={linkClass(pathname.startsWith('/admin/experience'))}
          >
            <Briefcase className={iconClass(pathname.startsWith('/admin/experience'))} />
            <span className="font-medium text-sm">Experience</span>
          </Link>

          {/* Technologies */}
          <Link
            href="/admin/technologies"
            onClick={closeSidebar}
            className={linkClass(pathname.startsWith('/admin/technologies'))}
          >
            <Code2 className={iconClass(pathname.startsWith('/admin/technologies'))} />
            <span className="font-medium text-sm">Technologies</span>
          </Link>

          {/* Certificates */}
          <Link
            href="/admin/certificates"
            onClick={closeSidebar}
            className={linkClass(pathname.startsWith('/admin/certificates'))}
          >
            <Award className={iconClass(pathname.startsWith('/admin/certificates'))} />
            <span className="font-medium text-sm">Certificates</span>
          </Link>
        </nav>

        {/* User / Sign Out */}
        <div className="p-4 border-t border-zinc-800/60 bg-zinc-950/20">

          <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
              <User className="w-4 h-4 text-zinc-400" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {email}
              </p>

              <p className="text-xs text-zinc-500 truncate">
                Administrator
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowSignOutModal(true)}
            className="flex items-center gap-3 w-full px-3 py-2 text-zinc-400 hover:text-white hover:bg-red-500/10 cursor-pointer rounded-lg transition-all group text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>

        </div>
      </aside>

      {/* Sign Out Confirmation */}
      <ConfirmDialog
        open={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        busy={isSigningOut}
        icon={<LogOut className="w-5 h-5" />}
        title="Sign out?"
        description={
          <>
            You&apos;ll be signed out of{' '}
            <span className="text-zinc-300 font-medium break-all">{email}</span>{' '}
            and returned to the login page.
          </>
        }
      >
        <form
          action="/auth/signout"
          method="post"
          onSubmit={() => setIsSigningOut(true)}
        >
          <button
            type="submit"
            autoFocus
            disabled={isSigningOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-500 cursor-pointer transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <LogOut className="w-4 h-4" />
            {isSigningOut ? 'Signing out…' : 'Sign Out'}
          </button>
        </form>
      </ConfirmDialog>
    </>
  )
}