import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import Sidebar from "./Sidebar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Stivate Internal Team",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const logoutAction = async () => {
    "use server"
    await signOut({ redirectTo: "/login" })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col md:flex-row">
      <Sidebar session={session} logoutAction={logoutAction} />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
