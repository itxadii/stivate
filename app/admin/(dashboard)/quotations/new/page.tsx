import { getClients } from "@/lib/actions/client"
import { getLeads } from "@/lib/actions/lead"
import NewQuotationForm from "./NewQuotationForm"
import { Suspense } from "react"

export default async function NewQuotationPage() {
  let clients: any[] = []
  let leads: any[] = []
  let error = null

  try {
    clients = await getClients()
    leads = await getLeads()
  } catch (e: any) {
    error = "Failed to load clients or leads data. Verify database sync is completed."
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Create New Quotation</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Build a high-fidelity business quotation detailing services, add-ons, optional items, and payment terms.
        </p>
      </div>

      {error ? (
        <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      ) : (
        <Suspense fallback={
          <div className="bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6 sm:p-8 text-center text-gray-500 dark:text-gray-400 animate-pulse">
            Loading quotation form...
          </div>
        }>
          <NewQuotationForm clients={clients} leads={leads} />
        </Suspense>
      )}
    </div>
  )
}
