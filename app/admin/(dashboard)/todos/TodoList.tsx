"use client"

import { useState, useTransition } from "react"
import { createTodo, toggleTodo, deleteTodo } from "@/lib/actions/todo"
import { CheckCircle2, Circle, Trash2, Plus, AlertCircle, ShieldCheck } from "lucide-react"

interface TodoItem {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

interface TodoListProps {
  initialTodos: TodoItem[]
  userEmail: string
}

export default function TodoList({ initialTodos, userEmail }: TodoListProps) {
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos)
  const [newTitle, setNewTitle] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    setError(null)
    const title = newTitle
    setNewTitle("")

    startTransition(async () => {
      try {
        const result = await createTodo(title)
        // Add to state
        setTodos((prev) => [
          {
            id: result.id,
            title: result.title,
            completed: result.completed,
            createdAt: new Date(result.createdAt),
          },
          ...prev,
        ])
      } catch (err: any) {
        setError(err.message || "Failed to create task")
        setNewTitle(title) // Restore title on failure
      }
    })
  }

  const handleToggle = async (id: string, currentCompleted: boolean) => {
    setError(null)
    const nextCompleted = !currentCompleted

    // Optimistic update
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: nextCompleted } : t))
    )

    try {
      await toggleTodo(id, nextCompleted)
    } catch (err: any) {
      // Revert on error
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: currentCompleted } : t))
      )
      setError(err.message || "Failed to update task")
    }
  }

  const handleDelete = async (id: string) => {
    setError(null)
    const previousTodos = [...todos]

    // Optimistic update
    setTodos((prev) => prev.filter((t) => t.id !== id))

    try {
      await deleteTodo(id)
    } catch (err: any) {
      // Revert on error
      setTodos(previousTodos)
      setError(err.message || "Failed to delete task")
    }
  }

  const activeCount = todos.filter((t) => !t.completed).length

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Account specific notice */}
      <div className="bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/50 rounded-xl p-4 flex items-start gap-3 shadow-xs">
        <ShieldCheck className="h-5 w-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-sky-900 dark:text-sky-400 uppercase tracking-wider">
            Account-Specific Workspace
          </h4>
          <p className="text-2xs text-sky-700 dark:text-sky-500 mt-0.5 leading-relaxed">
            These tasks are private to <span className="font-semibold underline">{userEmail}</span>. Other administrators cannot see or edit your todo list.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-150 dark:border-red-900/40 text-red-750 dark:text-red-400 rounded-xl p-3.5 flex items-center gap-2.5 text-xs font-medium">
          <AlertCircle className="h-4.5 w-4.5 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Main card */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-150 dark:border-gray-808 shadow-sm overflow-hidden">
        {/* Input box */}
        <form onSubmit={handleAdd} className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Add a new task to your list..."
              disabled={isPending}
              className="flex-1 min-w-0 rounded-lg border border-gray-250 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-hidden focus:ring-1 focus:ring-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={isPending || !newTitle.trim()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add Task
            </button>
          </div>
        </form>

        {/* Task list */}
        <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[480px] overflow-y-auto">
          {todos.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">
              <div className="flex flex-col items-center justify-center space-y-2">
                <CheckCircle2 className="h-8 w-8 text-gray-300 dark:text-gray-700" />
                <span className="font-semibold text-gray-750 dark:text-gray-300">All caught up!</span>
                <p className="text-2xs text-gray-400 dark:text-gray-500 max-w-xs leading-relaxed">
                  No pending tasks in your list. Create a task above to organize your administrative duties.
                </p>
              </div>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center justify-between gap-4 p-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition duration-150 group`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => handleToggle(todo.id, todo.completed)}
                    className="shrink-0 text-gray-400 hover:text-blue-600 dark:text-gray-600 dark:hover:text-blue-400 transition cursor-pointer"
                    title={todo.completed ? "Mark as active" : "Mark as completed"}
                  >
                    {todo.completed ? (
                      <CheckCircle2 className="h-5.5 w-5.5 text-emerald-500 dark:text-emerald-400" />
                    ) : (
                      <Circle className="h-5.5 w-5.5" />
                    )}
                  </button>
                  <span
                    className={`text-sm font-medium truncate py-0.5 transition-all duration-200 ${
                      todo.completed
                        ? "text-gray-400 dark:text-gray-550 line-through"
                        : "text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {todo.title}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(todo.id)}
                  className="p-1 rounded-lg text-gray-400 hover:text-red-650 hover:bg-red-50 dark:text-gray-500 dark:hover:text-red-400 dark:hover:bg-red-950/20 cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200"
                  title="Delete task"
                >
                  <Trash2 className="h-4.5 w-4.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Card footer summary */}
        {todos.length > 0 && (
          <div className="px-4 py-3 bg-gray-50/30 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-800 text-3xs text-gray-400 flex items-center justify-between font-semibold tracking-wide uppercase">
            <span>{activeCount} active {activeCount === 1 ? "task" : "tasks"} remaining</span>
            <span>Total: {todos.length} {todos.length === 1 ? "item" : "items"}</span>
          </div>
        )}
      </div>
    </div>
  );
}
