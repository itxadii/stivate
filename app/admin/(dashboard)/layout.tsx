import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { LayoutDashboard, Users, FolderKanban, Receipt, FileText, Settings, LogOut, Flame, Banknote, ClipboardList } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 hidden md:block">
        <div className="h-full flex flex-col">
          <div className="flex h-32 shrink-0 items-center px-6">
            <Image
              src="/logo.png"
              alt="Stivate"
              width={720}
              height={216}
              priority
              className="w-full h-auto max-h-30 object-contain dark:invert"
            />
          </div>

          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
              >
                <item.icon
                  className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-white"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <img
                src={session.user.image || `https://avatar.vercel.sh/${session.user.email}`}
                alt="Profile"
                className="h-10 w-10 rounded-full"
              />
              <div className="flex flex-col truncate">
                <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {session.user.name || "User"}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {session.user.role?.toLowerCase() || "Staff"}
                </span>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <Link
                href="/admin/settings"
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <Settings className="mr-3 h-4 w-4 text-gray-400" />
                Settings
              </Link>
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="group flex w-full items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <LogOut className="mr-3 h-4 w-4 text-red-500" />
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-white">Stivate</span>
          {/* Mobile menu button would go here */}
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
