import { getQuotations } from "@/lib/actions/quotation"
import { Plus, ClipboardList, Calendar } from "lucide-react"
import Link from "next/link"

export default async function QuotationsPage() {
  let quotations: any[] = []
  let error = null

  try {
    quotations = await getQuotations()
  } catch (e: any) {
    error = "Failed to load quotations. Please make sure database migrations are fully run."
  }

  const formatCurrency = (amount: number, currency: string = "AED") => {
    try {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: currency }).format(amount)
    } catch {
      return `${currency} ${amount.toFixed(2)}`
    }
  }

  const calculateTotal = (quote: any) => {
    const subtotal = quote.items
      .filter((item: any) => !item.isOptional && !item.isIncluded)
      .reduce((sum: number, item: any) => sum + item.quantity * item.price, 0)
    return Math.max(0, subtotal - (quote.discount || 0))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Quotations</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Create, manage, print and accept business project quotations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/quotations/new"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Plus className="-ml-0.5 h-4 w-4" aria-hidden="true" />
            Create Quotation
          </Link>
        </div>
      </div>

      {error ? (
        <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                    Quotation Number
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Title
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Client
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Total Value
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Validity
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
                {quotations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="whitespace-nowrap py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <ClipboardList className="h-8 w-8 text-gray-400" />
                        <span className="font-medium text-gray-650 dark:text-gray-300">No quotations found.</span>
                        <p className="text-xs text-gray-505 dark:text-gray-450 max-w-xs">
                          Generate your first client quotation to outline scope, pricing, terms and optional items.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  quotations.map((quote) => (
                    <tr key={quote.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                        <Link href={`/admin/quotations/${quote.id}`} className="hover:text-blue-650 dark:hover:text-blue-400 flex items-center gap-1.5">
                          <ClipboardList className="h-4 w-4 text-gray-400" />
                          {quote.quotationNumber}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white font-medium truncate max-w-[200px]">
                        {quote.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {quote.clientName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-955 dark:text-white font-semibold">
                        {formatCurrency(calculateTotal(quote), quote.currency)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="text-xs">
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-gray-400">Date:</span>
                            {quote.issueDate ? new Date(quote.issueDate).toLocaleDateString() : "-"}
                          </div>
                          {quote.validUntil && (
                            <div className="flex items-center gap-1 mt-0.5">
                              <span className="font-semibold text-gray-400">Valid Till:</span>
                              {new Date(quote.validUntil).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex items-center justify-end gap-3">
                          <Link
                            href={`/admin/quotations/${quote.id}`}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 font-semibold"
                          >
                            View Details
                          </Link>
                          <span className="text-gray-300">|</span>
                          <Link
                            href={`/admin/quotations/${quote.id}/edit`}
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-semibold"
                          >
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
