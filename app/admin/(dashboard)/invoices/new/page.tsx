import { getProjects } from "@/lib/actions/project"
import NewInvoiceForm from "./NewInvoiceForm"

export default async function NewInvoicePage() {
  let projects: any[] = []
  let error = null

  try {
    projects = await getProjects()
  } catch (e: any) {
    error = "Failed to load projects. Ensure database is fully synced."
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Create New Invoice</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Create an itemized invoice for a client by selecting a project.
        </p>
      </div>

      {error ? (
        <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      ) : (
        <NewInvoiceForm projects={projects} />
      )}
    </div>
  )
}
