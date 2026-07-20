"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createInvoice } from "@/lib/actions/invoice"
import { Plus, Trash2, Calendar, DollarSign, Receipt, Info, Sparkles, Copy, CheckCircle } from "lucide-react"
import AIImportModal from "@/components/crm/AIImportModal"
import { mapInvoiceFields, INVOICE_PROMPT } from "@/lib/aiImport"

interface Client {
  id: string
  name: string
  address: string | null
}

interface Project {
  id: string
  name: string
  value: number | null
  currency: string
  client: Client
}

interface InvoiceItemField {
  description: string
  quantity: number
  price: number
}

interface NewInvoiceFormProps {
  projects: Project[]
}

export default function NewInvoiceForm({ projects }: NewInvoiceFormProps) {
  const router = useRouter()
  const [selectedProjectId, setSelectedProjectId] = useState("")
  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [paidAmount, setPaidAmount] = useState(0)
  const [taxRate, setTaxRate] = useState(0)
  const [discountRate, setDiscountRate] = useState(0)
  const [issueDate, setIssueDate] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [termsAndConditions, setTermsAndConditions] = useState(
    "1. Payment is due within 30 days of the invoice date.\n2. Please make all checks payable to Stivate LLP.\n3. Thank you for your business!"
  )
  const [items, setItems] = useState<InvoiceItemField[]>([
    { description: "", quantity: 1, price: 0 },
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [importSuccess, setImportSuccess] = useState<string | null>(null)
  const [importWarnings, setImportWarnings] = useState<string[]>([])
  const [highlighted, setHighlighted] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(INVOICE_PROMPT);
    setToastMessage("AI prompt copied. Paste it into your preferred AI and describe your quotation or invoice.");
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAIImportSuccess = (jsonData: any, warnings: string[]) => {
    try {
      const mapped = mapInvoiceFields(jsonData, projects)

      if (mapped.selectedProjectId) {
        setSelectedProjectId(mapped.selectedProjectId)
      }
      if (mapped.currency) setCurrency(mapped.currency)
      if (mapped.issueDate) setIssueDate(mapped.issueDate)
      if (mapped.dueDate) setDueDate(mapped.dueDate)
      setPaidAmount(mapped.paidAmount)
      setDiscountRate(mapped.discountRate)
      setTaxRate(mapped.taxRate)

      if (mapped.items.length > 0) {
        setItems(mapped.items.map(item => ({
          description: item.description,
          quantity: item.quantity,
          price: item.price
        })))
      }

      if (mapped.termsAndConditions) {
        setTermsAndConditions(mapped.termsAndConditions)
      }

      setImportSuccess("AI data imported successfully.")
      setImportWarnings(warnings)
      setHighlighted(true)
      setTimeout(() => setHighlighted(false), 2000)
    } catch (err: any) {
      setError("Import failed to apply: " + err.message)
    }
  }

  // Generate an invoice number automatically on mount
  useEffect(() => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    setInvoiceNumber(`INV-${year}${month}-${randomSuffix}`)

    // Default dates
    setIssueDate(today.toISOString().split("T")[0])
    const due = new Date(today)
    due.setDate(today.getDate() + 30)
    setDueDate(due.toISOString().split("T")[0])
  }, [])

  // Auto-fill details when a project is selected
  const handleProjectChange = (projectId: string) => {
    setSelectedProjectId(projectId)
    const project = projects.find((p) => p.id === projectId)
    if (project) {
      // Suggest the first item description and price matching the project value
      setItems([
        {
          description: `${project.name} Project Implementation Fee`,
          quantity: 1,
          price: project.value || 0,
        },
      ])
      setCurrency(project.currency || "USD")
    }
  }

  const handleItemChange = (index: number, field: keyof InvoiceItemField, value: string | number) => {
    const updated = [...items]
    if (field === "description") {
      updated[index].description = String(value)
    } else {
      updated[index][field] = Number(value)
    }
    setItems(updated)
  }

  const addItemRow = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }])
  }

  const removeItemRow = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index))
    }
  }

  // Calculate real-time totals
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  const discountAmount = subtotal * (discountRate / 100)
  const taxableAmount = subtotal - discountAmount
  const taxAmount = taxableAmount * (taxRate / 100)
  const totalAmount = taxableAmount + taxAmount

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

  const formatFormCurrency = (amount: number) => {
    try {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: currency }).format(amount)
    } catch {
      return `${currency} ${amount.toFixed(2)}`
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProjectId) {
      setError("Please select a project first.")
      return
    }
    if (!invoiceNumber.trim()) {
      setError("Invoice number is required.")
      return
    }
    if (items.some((item) => !item.description.trim() || item.quantity <= 0 || item.price < 0)) {
      setError("Please fill in descriptions and positive amounts for all items.")
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)
      await createInvoice({
        projectId: selectedProjectId,
        invoiceNumber,
        paidAmount,
        taxRate,
        discountRate,
        currency,
        issueDate,
        dueDate,
        termsAndConditions,
        items,
      })
      router.push("/admin/invoices")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Something went wrong while creating the invoice.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Selected project details for display
  const activeProject = projects.find((p) => p.id === selectedProjectId)

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Autofill this form using AI-generated JSON payloads</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopyPrompt}
            className="inline-flex items-center gap-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-750 transition-all border border-gray-300 dark:border-gray-700 shadow-sm cursor-pointer"
          >
            <Copy className="w-4 h-4 text-gray-400 dark:text-gray-300" />
            Copy AI Prompt
          </button>

          <button
            type="button"
            onClick={() => setIsImportModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 px-4 py-2 text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all border border-blue-200 dark:border-blue-900/30 shadow-sm cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-blue-500" />
            Import from AI
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={`space-y-8 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 ${highlighted ? "ring-2 ring-amber-500/50 bg-amber-50/10 dark:bg-amber-950/5 transition-all duration-300" : "transition-all duration-1000"}`}>
        {error && (
          <div className="rounded-md bg-red-50 p-4 border border-red-200 dark:bg-red-900/20 dark:border-red-800">
            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}

        {importSuccess && (
          <div className="rounded-md bg-green-50 p-4 border border-green-200 dark:bg-green-900/20 dark:border-green-800">
            <p className="text-sm text-green-700 dark:text-green-400 font-semibold">{importSuccess}</p>
            {importWarnings.length > 0 && (
              <div className="mt-2 text-xs text-amber-700 dark:text-amber-400 space-y-1">
                <p className="font-bold">Warnings:</p>
                <ul className="list-disc pl-5">
                  {importWarnings.map((w, idx) => (
                    <li key={idx}>{w}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

      {/* Row 1: Project & Client Autofill details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Select Project
          </label>
          <select
            value={selectedProjectId}
            onChange={(e) => handleProjectChange(e.target.value)}
            className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:focus:ring-blue-500"
            required
          >
            <option value="">-- Choose a Project --</option>
            {projects.map((proj) => (
              <option key={proj.id} value={proj.id}>
                {proj.name} ({proj.client.name})
              </option>
            ))}
          </select>
        </div>

        {/* Client details info banner */}
        <div className="rounded-lg bg-blue-50/50 dark:bg-gray-800/40 p-4 border border-blue-100/50 dark:border-gray-800 flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
          <div className="text-sm space-y-1">
            <span className="font-semibold text-gray-900 dark:text-white">Autofilled Client Details</span>
            {activeProject ? (
              <div className="text-gray-600 dark:text-gray-400 space-y-0.5">
                <p>
                  <span className="font-medium text-gray-800 dark:text-gray-300">Name:</span>{" "}
                  {activeProject.client.name}
                </p>
                <p>
                  <span className="font-medium text-gray-800 dark:text-gray-300">Location/Address:</span>{" "}
                  {activeProject.client.address || <em className="text-gray-400">No address specified</em>}
                </p>
                <p>
                  <span className="font-medium text-gray-800 dark:text-gray-300">Project Value:</span>{" "}
                  {activeProject.value ? (
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: activeProject.currency || "USD"
                    }).format(activeProject.value)
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                Select a project to automatically load client details and budget.
              </p>
            )}
          </div>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-800" />

      {/* Row 2: Invoice Metadata details */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Invoice Number
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Receipt className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
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
            Issue Date
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Calendar className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Due Date
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Calendar className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
              required
            />
          </div>
        </div>
      </div>

      {/* Row 3: Pricing Adjustments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Amount Paid
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
              <span className="text-gray-500 sm:text-sm">{getCurrencySymbol(currency)}</span>
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              value={paidAmount}
              onChange={(e) => setPaidAmount(Number(e.target.value))}
              className="block w-full rounded-md border-0 py-2 pl-7 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Discount (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={discountRate}
            onChange={(e) => setDiscountRate(Number(e.target.value))}
            className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Tax / VAT (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={taxRate}
            onChange={(e) => setTaxRate(Number(e.target.value))}
            className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
          />
        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-800" />

      {/* Row 3: Invoice Items Dynamic details */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Invoice Items</h3>
          <button
            type="button"
            onClick={addItemRow}
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 hover:underline"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead>
              <tr>
                <th scope="col" className="py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[50%]">
                  Description
                </th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[15%]">
                  Quantity
                </th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[20%]">
                  Price
                </th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[10%]">
                  Total
                </th>
                <th scope="col" className="relative py-2 px-3 w-[5%]">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 dark:divide-gray-800">
              {items.map((item, idx) => (
                <tr key={idx} className="align-middle">
                  <td className="py-3">
                    <input
                      type="text"
                      placeholder="e.g. Phase 1 Development"
                      value={item.description}
                      onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-850 dark:text-white dark:ring-gray-700"
                      required
                    />
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="number"
                      min="1"
                      placeholder="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-850 dark:text-white dark:ring-gray-700"
                      required
                    />
                  </td>
                  <td className="px-3 py-3">
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                        <span className="text-gray-500 sm:text-sm">{getCurrencySymbol(currency)}</span>
                      </div>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        value={item.price}
                        onChange={(e) => handleItemChange(idx, "price", e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 pl-6 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-855 dark:text-white dark:ring-gray-700"
                        required
                      />
                    </div>
                  </td>
                  <td className="px-3 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                    {formatFormCurrency(item.quantity * item.price)}
                  </td>
                  <td className="py-3 pl-3 text-right">
                    <button
                      type="button"
                      disabled={items.length <= 1}
                      onClick={() => removeItemRow(idx)}
                      className="text-red-500 hover:text-red-700 disabled:opacity-30 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Real-time Subtotal details */}
        <div className="flex justify-end pt-4">
          <div className="w-full sm:w-64 space-y-1.5 text-right">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span className="font-semibold">{formatFormCurrency(subtotal)}</span>
            </div>
            {discountRate > 0 && (
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Discount ({discountRate}%)</span>
                <span className="font-semibold text-green-600">-{formatFormCurrency(discountAmount)}</span>
              </div>
            )}
            {taxRate > 0 && (
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Tax / VAT ({taxRate}%)</span>
                <span className="font-semibold text-red-650">+{formatFormCurrency(taxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-1.5 mt-1">
              <span>Total Amount</span>
              <span className="font-semibold">{formatFormCurrency(totalAmount)}</span>
            </div>
            {paidAmount > 0 && (
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Amount Paid</span>
                <span className="font-semibold text-green-600 dark:text-green-400">-{formatFormCurrency(paidAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-800 pt-2 mt-1">
              <span>{paidAmount > 0 ? "Balance Due" : "Total Due"}</span>
              <span className="text-blue-600 dark:text-blue-400">{formatFormCurrency(totalAmount - paidAmount)}</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-800" />

      {/* Row 4: T&C */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          Terms & Conditions
        </label>
        <textarea
          rows={3}
          value={termsAndConditions}
          onChange={(e) => setTermsAndConditions(e.target.value)}
          placeholder="Specific terms, account bank info or details..."
          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
        />
      </div>

      {/* Submission Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/invoices")}
          className="rounded-md bg-white dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !selectedProjectId}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Invoice"}
        </button>
      </div>
    </form>

      <AIImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        expectedType="invoice"
        onImportSuccess={handleAIImportSuccess}
      />

      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-55 max-w-sm rounded-lg bg-gray-900 text-white text-xs py-3 px-4 shadow-xl flex items-center gap-2 border border-gray-800 dark:bg-white dark:text-gray-900 dark:border-gray-200 transition-all duration-300 animate-slide-in">
          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}
    </>
  )
}
