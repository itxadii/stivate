import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getTodos } from "@/lib/actions/todo"
import TodoList from "./TodoList"
import { CheckSquare } from "lucide-react"

export const metadata = {
  title: "My Todos | Admin Dashboard",
  description: "Manage your personal checklist in the administrator workspace.",
}

export default async function TodosPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  // Pre-load todos on the server side
  let initialTodos: any[] = []
  try {
    initialTodos = await getTodos()
  } catch (error) {
    console.error("Failed to load todos on server:", error)
  }

  // Map dates to JS Date objects and parse
  const formattedTodos = initialTodos.map((t) => ({
    id: t.id,
    title: t.title,
    completed: t.completed,
    createdAt: t.createdAt,
  }))

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <CheckSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          Personal Task List
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Stay organized with your private, account-specific administrative checklist.
        </p>
      </div>

      {/* Todo Container */}
      <TodoList initialTodos={formattedTodos} userEmail={session.user.email || "Unknown User"} />
    </div>
  )
}
