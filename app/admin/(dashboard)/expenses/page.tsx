import { getExpenses } from "@/lib/actions/expense"
import { Plus, Banknote, Calendar, Tag, FileText } from "lucide-react"
import Link from "next/link"

const exchangeRates: Record<string, number> = {
  USD: 1.0,
  EUR: 1.08,
  GBP: 1.27,
  INR: 0.012,
  AED: 0.272,
  CAD: 0.73,
  AUD: 0.66,
  SGD: 0.74,
}

export default async function ExpensesPage() {
  let expenses: any[] = []
  let error = null

  try {
    expenses = await getExpenses()
  } catch (e: any) {
    error = "Failed to load expenses. Database might be out of sync. Please run `npx prisma db push`."
  }

  const convertToUSD = (amount: number, currency: string) => {
    const rate = exchangeRates[currency.toUpperCase()] || 1.0
    return amount * rate
  }

  // Calculate sum of expenses in USD equivalent
  const totalUSD = expenses.reduce((acc, curr) => acc + convertToUSD(curr.amount, curr.currency), 0)

  // Calculate counts/totals by category
  const categoryTotals = expenses.reduce((acc, curr) => {
    const usdValue = convertToUSD(curr.amount, curr.currency)
    acc[curr.category] = (acc[curr.category] || 0) + usdValue
    return acc
  }, {} as Record<string, number>)

  const formatCurrency = (amount: number, currency: string = "USD") => {
    try {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: currency }).format(amount)
    } catch {
      return `${currency} ${amount.toFixed(2)}`
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toUpperCase()) {
      case "SOFTWARE":
        return "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-650/10 dark:bg-indigo-950/30 dark:text-indigo-400"
      case "MARKETING":
        return "bg-amber-50 text-amber-800 ring-1 ring-amber-600/20 dark:bg-amber-950/30 dark:text-amber-400"
      case "RENT":
        return "bg-purple-50 text-purple-700 ring-1 ring-purple-600/20 dark:bg-purple-950/30 dark:text-purple-400"
      case "TRAVEL":
        return "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-600/20 dark:bg-cyan-950/30 dark:text-cyan-400"
      case "OFFICE":
        return "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20 dark:bg-rose-950/30 dark:text-rose-400"
      default:
        return "bg-slate-50 text-slate-700 ring-1 ring-slate-600/20 dark:bg-slate-800/40 dark:text-slate-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Business Expenses</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Log, categorize, and track operational overheads and software licensing fees.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/expenses/new"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Plus className="-ml-0.5 h-4 w-4" aria-hidden="true" />
            Add Expense
          </Link>
        </div>
      </div>

      {error ? (
        <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      ) : (
        <>
          {/* Summary metrics widgets */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="overflow-hidden rounded-xl bg-white dark:bg-gray-900 p-5 shadow-sm border border-gray-150 dark:border-gray-800 flex items-center">
              <div className="flex-shrink-0 rounded-md bg-blue-50 dark:bg-blue-900/20 p-3">
                <Banknote className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-5">
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Total Expenses</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">{formatCurrency(totalUSD, "USD")} <span className="text-xs text-gray-400 font-normal">(USD Equiv)</span></p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl bg-white dark:bg-gray-900 p-5 shadow-sm border border-gray-150 dark:border-gray-800 flex items-center">
              <div className="flex-shrink-0 rounded-md bg-indigo-50 dark:bg-indigo-900/20 p-3">
                <Tag className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="ml-5">
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Software & Licensing</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">{formatCurrency(categoryTotals["Software"] || 0, "USD")}</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl bg-white dark:bg-gray-900 p-5 shadow-sm border border-gray-150 dark:border-gray-800 flex items-center">
              <div className="flex-shrink-0 rounded-md bg-purple-50 dark:bg-purple-900/20 p-3">
                <Tag className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-5">
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Rent & Infrastructure</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">{formatCurrency(categoryTotals["Rent"] || 0, "USD")}</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl bg-white dark:bg-gray-900 p-5 shadow-sm border border-gray-150 dark:border-gray-800 flex items-center">
              <div className="flex-shrink-0 rounded-md bg-amber-50 dark:bg-amber-900/20 p-3">
                <Tag className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="ml-5">
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Marketing & Ads</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">{formatCurrency(categoryTotals["Marketing"] || 0, "USD")}</p>
              </div>
            </div>
          </div>

          {/* Expenses Table */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-808 dark:bg-gray-900">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                      Title
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Category
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Amount
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Date Incurred
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
                  {expenses.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="whitespace-nowrap py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <Banknote className="h-8 w-8 text-gray-400" />
                          <span className="font-medium text-gray-650 dark:text-gray-300">No expenses recorded.</span>
                          <p className="text-xs text-gray-500 dark:text-gray-455 max-w-xs">
                            Create an expense record to start tracking outgoing cashflow and operational overheads.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    expenses.map((exp) => (
                      <tr key={exp.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                          <div className="flex items-center gap-1.5">
                            <FileText className="h-4 w-4 text-gray-400" />
                            <div>
                              <div>{exp.title}</div>
                              {exp.notes && (
                                <div className="text-xs text-gray-400 font-normal max-w-xs truncate">{exp.notes}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ring-inset ${getCategoryColor(exp.category)}`}>
                            {exp.category}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-955 dark:text-white font-semibold">
                          {formatCurrency(exp.amount, exp.currency)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1.5 text-xs">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            {exp.date ? new Date(exp.date).toLocaleDateString() : "-"}
                          </div>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link
                            href={`/admin/expenses/${exp.id}/edit`}
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
        </>
      )}
    </div>
  )
}
