import { getInvoices } from "@/lib/actions/invoice"
import { Search, Plus, Receipt, Calendar } from "lucide-react"
import Link from "next/link"

export default async function InvoicesPage() {
  let invoices: any[] = []
  let error = null

  try {
    invoices = await getInvoices()
  } catch (e: any) {
    error = "Failed to load invoices. Database might be out of sync. Please run `npx prisma db push`."
  }

  const formatCurrency = (amount: number, currency: string = "USD") => {
    try {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: currency }).format(amount)
    } catch {
      return `${currency} ${amount.toFixed(2)}`
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "bg-gray-100 text-gray-800 ring-1 ring-gray-600/20 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700"
      case "SENT":
        return "bg-blue-50 text-blue-700 ring-1 ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30"
      case "PAID":
        return "bg-green-50 text-green-700 ring-1 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20"
      case "OVERDUE":
        return "bg-red-50 text-red-700 ring-1 ring-red-600/10 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20"
      case "CANCELLED":
        return "bg-yellow-50 text-yellow-800 ring-1 ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20"
      default:
        return "bg-gray-50 text-gray-600 ring-1 ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Invoices</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Generate and manage invoices, track client payments, and print copies.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/invoices/new"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Plus className="-ml-0.5 h-4 w-4" aria-hidden="true" />
            Create Invoice
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
                    Invoice Number
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Project
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Client
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Amount
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Dates
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Status
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="whitespace-nowrap py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Receipt className="h-8 w-8 text-gray-400" />
                        <span className="font-medium text-gray-600 dark:text-gray-300">No invoices found.</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs">
                          Create an invoice by linking it to a project. Client info will be pulled automatically.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                        <Link href={`/admin/invoices/${invoice.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5">
                          <Receipt className="h-4 w-4 text-gray-400" />
                          {invoice.invoiceNumber}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white font-medium">
                        {invoice.project.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {invoice.project.client.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-950 dark:text-white font-semibold">
                        {formatCurrency(invoice.amount, invoice.currency)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="text-xs">
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-gray-400">Issued:</span>
                            {invoice.issueDate ? new Date(invoice.issueDate).toLocaleDateString() : "-"}
                          </div>
                          {invoice.dueDate && (
                            <div className="flex items-center gap-1 mt-0.5">
                              <span className="font-semibold text-gray-400">Due:</span>
                              {new Date(invoice.dueDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          href={`/admin/invoices/${invoice.id}/edit`}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 font-semibold"
                        >
                          Edit
                        </Link>
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
