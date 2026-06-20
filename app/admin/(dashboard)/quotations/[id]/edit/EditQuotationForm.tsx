"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateQuotation, archiveQuotation } from "@/lib/actions/quotation"
import { Plus, Trash2, Calendar, ClipboardList, Info, Sparkles, Trash, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Client {
  id: string
  name: string
  address: string | null
}

interface QuotationItemField {
  description: string
  quantity: number
  price: number
  isIncluded: boolean
}

interface Quotation {
  id: string
  clientId: string | null
  clientName: string
  clientAddress: string | null
  quotationNumber: string
  title: string
  introduction: string | null
  issueDate: string
  validUntil: string
  currency: string
  taxRate: number
  taxText: string | null
  discount: number
  marketComparison: string | null
  maintenancePlanPrice: number | null
  maintenancePlanDetails: string | null
  termsAndConditions: string | null
  items: (QuotationItemField & { isOptional: boolean })[]
}

interface EditQuotationFormProps {
  quotation: Quotation
  clients: Client[]
}

export default function EditQuotationForm({ quotation, clients }: EditQuotationFormProps) {
  const router = useRouter()
  const [selectedClientId, setSelectedClientId] = useState(quotation.clientId || "")
  const [clientName, setClientName] = useState(quotation.clientName)
  const [clientAddress, setClientAddress] = useState(quotation.clientAddress || "")
  const [quotationNumber, setQuotationNumber] = useState(quotation.quotationNumber)
  const [title, setTitle] = useState(quotation.title)
  const [introduction, setIntroduction] = useState(quotation.introduction || "")
  const [currency, setCurrency] = useState(quotation.currency)
  const [issueDate, setIssueDate] = useState(quotation.issueDate)
  const [validUntil, setValidUntil] = useState(quotation.validUntil)
  const [taxText, setTaxText] = useState(quotation.taxText || "Not Applicable")
  const [taxRate, setTaxRate] = useState(quotation.taxRate)
  const [discount, setDiscount] = useState(quotation.discount)

  // Split items into services vs optional
  const [services, setServices] = useState<QuotationItemField[]>(() =>
    quotation.items.filter((item) => !item.isOptional)
  )
  const [optionalItems, setOptionalItems] = useState<QuotationItemField[]>(() =>
    quotation.items.filter((item) => item.isOptional)
  )

  const [marketComparison, setMarketComparison] = useState(quotation.marketComparison || "")
  const [maintenancePlanPrice, setMaintenancePlanPrice] = useState(quotation.maintenancePlanPrice || 79)
  const [maintenancePlanDetails, setMaintenancePlanDetails] = useState(quotation.maintenancePlanDetails || "")
  const [termsAndConditions, setTermsAndConditions] = useState(quotation.termsAndConditions || "")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isArchiving, setIsArchiving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClientChange = (clientId: string) => {
    setSelectedClientId(clientId)
    const client = clients.find((c) => c.id === clientId)
    if (client) {
      setClientName(client.name)
      setClientAddress(client.address || "")
    } else {
      setClientName("")
      setClientAddress("")
    }
  }

  // Row modifications
  const addServiceRow = () => {
    setServices([...services, { description: "", quantity: 1, price: 0, isIncluded: false }])
  }
  const removeServiceRow = (idx: number) => {
    if (services.length > 1) {
      setServices(services.filter((_, i) => i !== idx))
    }
  }
  const handleServiceChange = (idx: number, field: keyof QuotationItemField, value: any) => {
    const updated = [...services]
    updated[idx] = { ...updated[idx], [field]: value }
    setServices(updated)
  }

  const addOptionalRow = () => {
    setOptionalItems([...optionalItems, { description: "", quantity: 1, price: 0, isIncluded: false }])
  }
  const removeOptionalRow = (idx: number) => {
    setOptionalItems(optionalItems.filter((_, i) => i !== idx))
  }
  const handleOptionalChange = (idx: number, field: keyof QuotationItemField, value: any) => {
    const updated = [...optionalItems]
    updated[idx] = { ...updated[idx], [field]: value }
    setOptionalItems(updated)
  }

  // Totals calculations
  const subtotal = services
    .filter((s) => !s.isIncluded)
    .reduce((sum, s) => sum + s.quantity * s.price, 0)
  const taxAmount = subtotal * (taxRate / 100)
  const total = Math.max(0, subtotal + taxAmount - discount)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientName.trim()) {
      setError("Please specify a client name.")
      return
    }
    if (!quotationNumber.trim()) {
      setError("Quotation number is required.")
      return
    }
    if (services.some((s) => !s.description.trim())) {
      setError("All services must have a description.")
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      const allItems = [
        ...services.map((s) => ({ ...s, isOptional: false })),
        ...optionalItems.map((o) => ({ ...o, isOptional: true })),
      ]

      await updateQuotation(quotation.id, {
        clientId: selectedClientId || null,
        clientName,
        clientAddress,
        quotationNumber,
        title,
        introduction,
        issueDate,
        validUntil,
        currency,
        taxRate,
        taxText,
        discount,
        marketComparison,
        maintenancePlanPrice,
        maintenancePlanDetails,
        termsAndConditions,
        items: allItems,
      })

      router.push("/admin/quotations")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Failed to update quotation.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleArchive = async () => {
    if (!confirm("Are you sure you want to archive this quotation? It will not be viewable or printable.")) return
    try {
      setIsArchiving(true)
      setError(null)
      await archiveQuotation(quotation.id)
      router.push("/admin/quotations")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Failed to archive quotation.")
    } finally {
      setIsArchiving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Action Header Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/quotations"
            className="p-2 -ml-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Edit Quotation: {quotation.quotationNumber}</h1>
          </div>
        </div>

        <button
          type="button"
          onClick={handleArchive}
          disabled={isArchiving || isSubmitting}
          className="inline-flex items-center gap-2 rounded-md bg-white dark:bg-gray-800 px-3.5 py-2 text-sm font-semibold text-red-650 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 transition"
        >
          <Trash2 className="w-4 h-4" />
          {isArchiving ? "Archiving..." : "Archive Quotation"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8">
        {error && (
          <div className="rounded-md bg-red-50 p-4 border border-red-200 dark:bg-red-900/20 dark:border-red-800">
            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Row 1: Client details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Select Saved Client (Optional)
            </label>
            <select
              value={selectedClientId}
              onChange={(e) => handleClientChange(e.target.value)}
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
            >
              <option value="">-- Manual Client Entry --</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Client Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Finsmart Consultants"
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Client Location/Address (prints exactly as typed)
            </label>
            <textarea
              rows={3}
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              placeholder="Office 310, 3rd Floor, Golden Sands 20, Dubai, UAE"
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
            />
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-800" />

        {/* Row 2: Quotation Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Quotation No
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <ClipboardList className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={quotationNumber}
                onChange={(e) => setQuotationNumber(e.target.value)}
                className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
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
              <option value="AED">AED (د.إ)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
              <option value="CAD">CAD (CA$)</option>
              <option value="AUD">AUD (A$)</option>
              <option value="SGD">SGD (SG$)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Issue Date
            </label>
            <input
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Valid Until
            </label>
            <input
              type="date"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
              required
            />
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-800" />

        {/* Row 3: Scope Details */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Project Scope Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700 font-semibold"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Introduction Paragraph
            </label>
            <textarea
              rows={3}
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
            />
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-800" />

        {/* Services Included Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-blue-500" />
              Services Included
            </h3>
            <button
              type="button"
              onClick={addServiceRow}
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-650 hover:text-blue-500 hover:underline"
            >
              <Plus className="h-4 w-4" />
              Add Row
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead>
                <tr>
                  <th scope="col" className="py-2 text-left text-xs font-semibold text-gray-555 uppercase w-[50%]">
                    Description
                  </th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-555 uppercase w-[10%]">
                    Qty
                  </th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-555 uppercase w-[15%]">
                    Price ({currency})
                  </th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-555 uppercase w-[15%]">
                    Is Included / Free
                  </th>
                  <th scope="col" className="relative py-2 px-3 w-[10%]">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 dark:divide-gray-800">
                {services.map((item, idx) => (
                  <tr key={idx} className="align-middle">
                    <td className="py-2">
                      <input
                        type="text"
                        placeholder="e.g. Home Page Development"
                        value={item.description}
                        onChange={(e) => handleServiceChange(idx, "description", e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-905 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-650 sm:text-sm dark:bg-gray-850 dark:text-white dark:ring-gray-700"
                        required
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleServiceChange(idx, "quantity", Number(e.target.value))}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-905 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-655 sm:text-sm dark:bg-gray-850 dark:text-white dark:ring-gray-700"
                        required
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        disabled={item.isIncluded}
                        value={item.price}
                        onChange={(e) => handleServiceChange(idx, "price", Number(e.target.value))}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-905 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-655 sm:text-sm dark:bg-gray-850 dark:text-white dark:ring-gray-700 disabled:opacity-40"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={item.isIncluded}
                          onChange={(e) => {
                            const val = e.target.checked
                            handleServiceChange(idx, "isIncluded", val)
                            if (val) handleServiceChange(idx, "price", 0)
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                        />
                        <span className="ml-2 text-xs font-semibold text-gray-600 dark:text-gray-400">Yes, Included</span>
                      </div>
                    </td>
                    <td className="py-2 pl-3 text-right">
                      <button
                        type="button"
                        disabled={services.length <= 1}
                        onClick={() => removeServiceRow(idx)}
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
        </div>

        <hr className="border-gray-200 dark:border-gray-800" />

        {/* Optional Items Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-purple-500" />
              Optional Items (If Required)
            </h3>
            <button
              type="button"
              onClick={addOptionalRow}
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-650 hover:text-blue-500 hover:underline"
            >
              <Plus className="h-4 w-4" />
              Add Row
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead>
                <tr>
                  <th scope="col" className="py-2 text-left text-xs font-semibold text-gray-555 uppercase w-[50%]">
                    Description
                  </th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-555 uppercase w-[10%]">
                    Qty
                  </th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-555 uppercase w-[15%]">
                    Price ({currency})
                  </th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-555 uppercase w-[15%]">
                    Is Included / Free
                  </th>
                  <th scope="col" className="relative py-2 px-3 w-[10%]">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 dark:divide-gray-800">
                {optionalItems.map((item, idx) => (
                  <tr key={idx} className="align-middle">
                    <td className="py-2">
                      <input
                        type="text"
                        placeholder="e.g. Domain Registration"
                        value={item.description}
                        onChange={(e) => handleOptionalChange(idx, "description", e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-955 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-655 sm:text-sm dark:bg-gray-850 dark:text-white dark:ring-gray-700"
                        required
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleOptionalChange(idx, "quantity", Number(e.target.value))}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-955 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-655 sm:text-sm dark:bg-gray-850 dark:text-white dark:ring-gray-700"
                        required
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        disabled={item.isIncluded}
                        value={item.price}
                        onChange={(e) => handleOptionalChange(idx, "price", Number(e.target.value))}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-955 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-655 sm:text-sm dark:bg-gray-850 dark:text-white dark:ring-gray-700 disabled:opacity-40"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={item.isIncluded}
                          onChange={(e) => {
                            const val = e.target.checked
                            handleOptionalChange(idx, "isIncluded", val)
                            if (val) handleOptionalChange(idx, "price", 0)
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                        />
                        <span className="ml-2 text-xs font-semibold text-gray-600 dark:text-gray-400">Yes, Included</span>
                      </div>
                    </td>
                    <td className="py-2 pl-3 text-right">
                      <button
                        type="button"
                        onClick={() => removeOptionalRow(idx)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {optionalItems.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-xs italic text-gray-400">
                      No optional items specified. Click &quot;Add Row&quot; to add optional hosting, domains, or support addons.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-800" />

        {/* Pricing Modifiers & Totals Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Tax Title/Text
              </label>
              <input
                type="text"
                value={taxText}
                onChange={(e) => setTaxText(e.target.value)}
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-650 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-650 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Flat Discount ({currency})
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-655 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50/50 dark:bg-gray-800/20 border border-gray-150 dark:border-gray-800 rounded-xl p-5 flex flex-col justify-center space-y-3 text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Services Subtotal: <span className="font-semibold text-gray-900 dark:text-white ml-2">{currency} {subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="text-sm text-green-600 font-medium">
                Discount: <span>-{currency} {discount.toFixed(2)}</span>
              </div>
            )}
            {taxRate > 0 && (
              <div className="text-sm text-red-650 font-medium">
                Tax ({taxRate}%): <span>+{currency} {taxAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 text-lg font-bold text-gray-900 dark:text-white">
              Grand Total: <span className="text-blue-600 dark:text-blue-400 ml-2">{currency} {total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-800" />

        {/* Custom Text Paragraphs */}
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Market Comparison Section (Paragraphs)
            </label>
            <textarea
              rows={4}
              value={marketComparison}
              onChange={(e) => setMarketComparison(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Optional Maintenance Plan - Price per Month ({currency})
              </label>
              <input
                type="number"
                min="0"
                value={maintenancePlanPrice}
                onChange={(e) => setMaintenancePlanPrice(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Optional Maintenance Plan Items (one bullet per line)
              </label>
              <textarea
                rows={6}
                value={maintenancePlanDetails}
                onChange={(e) => setMaintenancePlanDetails(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700 font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Terms & Conditions (one bullet per line)
            </label>
            <textarea
              rows={8}
              value={termsAndConditions}
              onChange={(e) => setTermsAndConditions(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700 font-mono text-xs"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
          <Link
            href="/admin/quotations"
            className="rounded-md bg-white dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
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
