import { getInvoiceWithDetails } from "@/lib/actions/invoice"
import { getProjects } from "@/lib/actions/project"
import { notFound } from "next/navigation"
import EditInvoiceForm from "./EditInvoiceForm"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditInvoicePage({ params }: PageProps) {
  const { id } = await params
  let invoice = null
  let projects: any[] = []
  let error = null

  try {
    const [inv, projs] = await Promise.all([
      getInvoiceWithDetails(id),
      getProjects()
    ])
    invoice = inv
    projects = projs
  } catch (e: any) {
    error = "Failed to load editing data. Ensure database is fully synced."
  }

  if (error || !invoice) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-400">{error || "Invoice not found"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Invoice</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Modify the itemized details, pricing, and terms of the invoice.
        </p>
      </div>

      <EditInvoiceForm invoice={invoice} projects={projects} />
    </div>
  )
}
