"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateExpense, archiveExpense } from "@/lib/actions/expense"
import { Calendar, DollarSign, FileText, Tag, Trash2, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Expense {
  id: string
  title: string
  amount: number
  currency: string
  category: string
  date: string
  notes: string | null
}

interface EditExpenseFormProps {
  expense: Expense
}

export default function EditExpenseForm({ expense }: EditExpenseFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(expense.title)
  const [amount, setAmount] = useState<number | "">(expense.amount)
  const [currency, setCurrency] = useState(expense.currency)
  const [category, setCategory] = useState(expense.category)
  const [date, setDate] = useState(expense.date)
  const [notes, setNotes] = useState(expense.notes || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isArchiving, setIsArchiving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getCurrencySymbol = (code: string) => {
    switch (code) {
      case "EUR": return "€"
      case "GBP": return "£"
      case "INR": return "₹"
      case "AED": return "د.إ"
      case "CAD": return "CA$"
      case "AUD": return "A$"
      case "SGD": return "SG$"
      default: return "$"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setError("Please enter a title.")
      return
    }
    if (amount === "" || amount <= 0) {
      setError("Please enter a valid positive amount.")
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)
      await updateExpense(expense.id, {
        title,
        amount: Number(amount),
        currency,
        category,
        date: date ? new Date(date) : null,
        notes: notes || "",
      })
      router.push("/admin/expenses")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Failed to update expense.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleArchive = async () => {
    if (!confirm("Are you sure you want to archive this expense? It will be excluded from all dashboard metrics.")) return
    try {
      setIsArchiving(true)
      setError(null)
      await archiveExpense(expense.id)
      router.push("/admin/expenses")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Failed to archive expense.")
    } finally {
      setIsArchiving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/expenses"
            className="p-2 -ml-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Expense</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Update details or archive this expense record.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleArchive}
          disabled={isArchiving || isSubmitting}
          className="inline-flex items-center gap-2 rounded-md bg-white dark:bg-gray-800 px-3.5 py-2 text-sm font-semibold text-red-650 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 transition"
        >
          <Trash2 className="w-4 h-4" />
          {isArchiving ? "Archiving..." : "Archive Expense"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8">
        {error && (
          <div className="rounded-md bg-red-50 p-4 border border-red-200 dark:bg-red-900/20 dark:border-red-800">
            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Expense Title
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FileText className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Category
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Tag className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                required
              >
                <option value="Software">Software & Subscriptions</option>
                <option value="Marketing">Marketing & Ads</option>
                <option value="Rent">Rent & Infrastructure</option>
                <option value="Travel">Travel & Lodging</option>
                <option value="Office">Office & Equipment</option>
                <option value="Other">Other Expenses</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Amount
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm font-semibold">{getCurrencySymbol(currency)}</span>
              </div>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                className="block w-full rounded-md border-0 py-2 pl-8 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
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

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Date Incurred
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Notes (Optional)
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional details, invoice numbers, or descriptions..."
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link
            href="/admin/expenses"
            className="rounded-md bg-white dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
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
  )
}
