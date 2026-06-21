"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  Receipt, 
  FileText, 
  Settings, 
  LogOut, 
  Flame, 
  Banknote, 
  ClipboardList, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight,
  PanelLeft 
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface SidebarProps {
  session: {
    user?: {
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string | null
    }
  } | null
  logoutAction: () => Promise<void>
}

export default function Sidebar({ session, logoutAction }: SidebarProps) {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Load sidebar state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed")
    if (saved === "true") {
      setIsCollapsed(true)
    }
  }, [])

  // Close mobile sidebar on navigation
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  const toggleCollapse = () => {
    const newVal = !isCollapsed
    setIsCollapsed(newVal)
    localStorage.setItem("sidebar-collapsed", String(newVal))
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Clients", href: "/admin/clients", icon: Users },
    { name: "Leads", href: "/admin/leads", icon: Flame },
    { name: "Projects", href: "/admin/projects", icon: FolderKanban },
    { name: "Invoices", href: "/admin/invoices", icon: Receipt },
    { name: "Quotations", href: "/admin/quotations", icon: ClipboardList },
    { name: "Expenses", href: "/admin/expenses", icon: Banknote },
    { name: "Documents", href: "/admin/documents", icon: FileText },
  ]

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin"
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Top Header Bar */}
      <header className="md:hidden sticky top-0 z-30 flex items-center justify-between w-full px-4 py-3.5 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="h-16 flex items-center max-w-[200px]">
          <Image
            src="/logo.png"
            alt="Stivate Logo"
            width={300}
            height={90}
            priority
            className="w-full h-auto max-h-16 object-contain dark:invert"
          />
        </div>
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          aria-label="Open navigation menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Sidebar Backdrop */}
      <div 
        onClick={() => setIsMobileOpen(false)}
        className={`fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Sidebar Drawer */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 md:hidden flex flex-col h-full transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex h-20 shrink-0 items-center justify-between px-6 border-b border-gray-150 dark:border-gray-800">
          <div className="h-16 flex items-center max-w-[200px]">
            <Image
              src="/logo.png"
              alt="Stivate Logo"
              width={300}
              height={90}
              priority
              className="w-full h-auto max-h-16 object-contain dark:invert"
            />
          </div>
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Nav */}
        <nav className="flex-1 overflow-y-auto space-y-1.5 px-3 py-4">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  active 
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 font-semibold" 
                    : "text-gray-700 hover:text-blue-650 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/60"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
                    active ? "text-blue-650 dark:text-blue-400" : "text-gray-400 group-hover:text-blue-650 dark:group-hover:text-white"
                  }`}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Drawer Footer Profile & Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-3 px-3 py-2">
            <img
              src={session?.user?.image || `https://avatar.vercel.sh/${session?.user?.email || "user"}`}
              alt="Profile"
              className="h-9 w-9 rounded-full ring-2 ring-gray-100 dark:ring-gray-800"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col truncate">
              <span className="text-sm font-semibold text-gray-950 dark:text-white truncate">
                {session?.user?.name || "User"}
              </span>
              <span className="text-2xs text-gray-400 dark:text-gray-550 capitalize">
                {session?.user?.role?.toLowerCase() || "Staff"}
              </span>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <Link
              href="/admin/settings"
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive("/admin/settings")
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 font-semibold"
                  : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-850"
              }`}
            >
              <Settings className="mr-3 h-4.5 w-4.5 text-gray-400" />
              Settings
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="group flex w-full items-center px-3 py-2 text-sm font-medium rounded-lg text-red-650 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 transition-all duration-200"
              >
                <LogOut className="mr-3 h-4.5 w-4.5 text-red-500" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </aside>


      {/* Desktop Persistent Sidebar */}
      <aside 
        className={`hidden md:flex md:flex-col h-screen sticky top-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shrink-0 transition-all duration-300 relative z-25 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo & Toggle Header */}
        <div className={`flex h-32 shrink-0 items-center transition-all duration-300 ${
          isCollapsed 
            ? "justify-center px-2" 
            : "justify-between pl-[14px] pr-3"
        }`}>
          {isCollapsed ? (
            <button
              onClick={toggleCollapse}
              className="flex h-12 w-12 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200 cursor-pointer"
              title="Expand sidebar"
            >
              <Image
                src="/favicon.ico"
                alt="Expand sidebar"
                width={28}
                height={28}
                className="h-7 w-7 object-contain dark:invert animate-fade-in"
              />
            </button>
          ) : (
            <>
              <div className="h-30 flex-1 flex items-center max-w-[170px]">
                <Image
                  src="/logo.png"
                  alt="Stivate Logo"
                  width={720}
                  height={216}
                  priority
                  className="w-full h-auto max-h-30 object-contain dark:invert"
                />
              </div>
              <button
                onClick={toggleCollapse}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:text-blue-650 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition duration-200 cursor-pointer shrink-0 ml-2"
                title="Collapse sidebar"
              >
                <PanelLeft className="w-6.5 h-6.5 transition-transform duration-300" />
              </button>
            </>
          )}
        </div>

        {/* Scrollable Nav Area */}
        <nav className="flex-1 overflow-y-auto space-y-1.5 px-3 py-4">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                title={isCollapsed ? item.name : undefined}
                className={`group flex items-center py-2.5 rounded-lg transition-all duration-200 ${
                  isCollapsed ? "justify-center px-0" : "px-3"
                } ${
                  active 
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 font-semibold" 
                    : "text-gray-700 hover:text-blue-650 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/60"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 flex-shrink-0 transition-colors ${
                    isCollapsed ? "mr-0" : "mr-3"
                  } ${
                    active ? "text-blue-650 dark:text-blue-400" : "text-gray-400 group-hover:text-blue-650 dark:group-hover:text-white"
                  }`}
                />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Sticky Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
          <div className={`flex items-center gap-3 px-1 py-2 ${isCollapsed ? "justify-center" : ""}`}>
            <img
              src={session?.user?.image || `https://avatar.vercel.sh/${session?.user?.email || "user"}`}
              alt="Profile"
              className="h-9 w-9 rounded-full ring-2 ring-gray-100 dark:ring-gray-800 shrink-0"
              referrerPolicy="no-referrer"
            />
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="text-sm font-semibold text-gray-950 dark:text-white truncate">
                  {session?.user?.name || "User"}
                </span>
                <span className="text-2xs text-gray-400 dark:text-gray-550 capitalize">
                  {session?.user?.role?.toLowerCase() || "Staff"}
                </span>
              </div>
            )}
          </div>

          <div className="mt-3 space-y-1">
            <Link
              href="/admin/settings"
              title={isCollapsed ? "Settings" : undefined}
              className={`group flex items-center rounded-lg transition-all duration-200 py-2 ${
                isCollapsed ? "justify-center px-0" : "px-3"
              } ${
                isActive("/admin/settings")
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 font-semibold"
                  : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-850"
              }`}
            >
              <Settings className={`h-4.5 w-4.5 text-gray-400 shrink-0 ${isCollapsed ? "mr-0" : "mr-3"}`} />
              {!isCollapsed && <span>Settings</span>}
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                title={isCollapsed ? "Sign out" : undefined}
                className={`group flex w-full items-center rounded-lg text-red-650 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 transition-all duration-200 py-2 cursor-pointer ${
                  isCollapsed ? "justify-center px-0" : "px-3"
                }`}
              >
                <LogOut className={`h-4.5 w-4.5 text-red-500 shrink-0 ${isCollapsed ? "mr-0" : "mr-3"}`} />
                {!isCollapsed && <span>Sign out</span>}
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  )
}
