"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { getProject, updateProject, archiveProject } from "@/lib/actions/project"
import { getClients } from "@/lib/actions/client"
import Link from "next/link"
import { ArrowLeft, Save, Trash2 } from "lucide-react"

interface Client {
  id: string
  name: string
  company: string | null
}

export default function EditProjectPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [project, setProject] = useState<any>(null)
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    async function loadData() {
      try {
        const [proj, clientsList] = await Promise.all([
          getProject(id),
          getClients()
        ])
        if (!proj) {
          setError("Project not found")
        } else {
          setProject(proj)
        }
        setClients(clientsList)
      } catch (err: any) {
        setError(err.message || "Failed to load project details")
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [id])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const valString = formData.get("value") as string
    const val = valString ? parseFloat(valString) : undefined

    try {
      await updateProject(id, {
        clientId: formData.get("clientId") as string,
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        status: formData.get("status") as string,
        value: val,
        currency: formData.get("currency") as string || "USD",
        startDate: formData.get("startDate") as string || null,
        dueDate: formData.get("dueDate") as string || null,
      })
      router.push("/admin/projects")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Failed to update project")
      setIsSubmitting(false)
    }
  }

  async function handleArchive() {
    if (!confirm("Are you sure you want to archive this project?")) return
    try {
      await archiveProject(id)
      router.push("/admin/projects")
      router.refresh()
    } catch (err: any) {
      alert("Failed to archive project")
    }
  }

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading project details...</div>
  }

  if (!project && !isLoading) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>{error}</p>
        <Link href="/admin/projects" className="mt-4 text-blue-600 hover:underline">
          Go back
        </Link>
      </div>
    )
  }

  // Format dates for input defaultValue
  const formattedStartDate = project.startDate
    ? new Date(project.startDate).toISOString().split("T")[0]
    : ""
  const formattedDueDate = project.dueDate
    ? new Date(project.dueDate).toISOString().split("T")[0]
    : ""

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/projects"
            className="p-2 -ml-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Project</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Update information for {project.name}.
            </p>
          </div>
        </div>

        <button
          onClick={handleArchive}
          className="inline-flex items-center gap-2 rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <Trash2 className="w-4 h-4" />
          Archive
        </button>
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
                  defaultValue={project.clientId}
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
                  defaultValue={project.name}
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
                  defaultValue={project.status}
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
                  defaultValue={project.description || ""}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="value" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Project Value
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  step="0.01"
                  name="value"
                  id="value"
                  defaultValue={project.value || ""}
                  placeholder="0.00"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="currency" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Currency
              </label>
              <div className="mt-2">
                <select
                  name="currency"
                  id="currency"
                  defaultValue={project.currency || "USD"}
                  className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="AED">AED (د.إ)</option>
                  <option value="CAD">CAD (CA$)</option>
                  <option value="AUD">AUD (A$)</option>
                  <option value="SGD">SGD (SG$)</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Start Date
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  defaultValue={formattedStartDate}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="dueDate" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Due Date
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  defaultValue={formattedDueDate}
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
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
