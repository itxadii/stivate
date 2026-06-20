"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createProject } from "@/lib/actions/project"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"

interface Client {
  id: string
  name: string
  company: string | null
}

export default function NewProjectForm({ clients }: { clients: Client[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultClientId = searchParams?.get("clientId") || ""

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const valString = formData.get("value") as string
    const val = valString ? parseFloat(valString) : undefined

    try {
      await createProject({
        clientId: formData.get("clientId") as string,
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        status: formData.get("status") as string,
        value: val,
        startDate: formData.get("startDate") as string || null,
        dueDate: formData.get("dueDate") as string || null,
      })
      router.push("/admin/projects")
    } catch (err: any) {
      setError(err.message || "Failed to create project")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/projects"
          className="p-2 -ml-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">New Project</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Create a new project associated with a client.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="clientId" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Client <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <select
                  required
                  name="clientId"
                  id="clientId"
                  defaultValue={defaultClientId}
                  className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                >
                  <option value="" disabled>Select a client...</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.company ? `(${c.company})` : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Project Name <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Status
              </label>
              <div className="mt-2">
                <select
                  name="status"
                  id="status"
                  defaultValue="LEAD"
                  className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                >
                  <option value="LEAD">Lead</option>
                  <option value="PROPOSAL">Proposal</option>
                  <option value="ACTIVE">Active</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="value" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Project Value ($)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  step="0.01"
                  name="value"
                  id="value"
                  placeholder="0.00"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Start Date
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="dueDate" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Due Date
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-4 border-t border-gray-900/10 dark:border-gray-800 pt-6">
            <Link
              href="/admin/projects"
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? (
                "Saving..."
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
