"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createQuotation } from "@/lib/actions/quotation"
import { Plus, Trash2, Calendar, ClipboardList, Info, Sparkles, DollarSign } from "lucide-react"

interface Client {
  id: string
  name: string
  address: string | null
}

interface NewQuotationFormProps {
  clients: Client[]
}

interface QuotationItemField {
  description: string
  quantity: number
  price: number
  isIncluded: boolean
}

export default function NewQuotationForm({ clients }: NewQuotationFormProps) {
  const router = useRouter()
  const [selectedClientId, setSelectedClientId] = useState("")
  const [clientName, setClientName] = useState("")
  const [clientAddress, setClientAddress] = useState("")
  const [quotationNumber, setQuotationNumber] = useState("")
  const [title, setTitle] = useState("FINSMART CONSULTANCY WEBSITE DEVELOPMENT (WORDPRESS)")
  const [introduction, setIntroduction] = useState(
    "A modern, responsive, and SEO-optimized website designed for financial consultancy businesses in the UAE, focused on credibility, lead generation, and customer engagement."
  )
  const [currency, setCurrency] = useState("AED")
  const [issueDate, setIssueDate] = useState("")
  const [validUntil, setValidUntil] = useState("")
  const [taxText, setTaxText] = useState("Not Applicable")
  const [taxRate, setTaxRate] = useState(0)
  const [discount, setDiscount] = useState(181)

  // Items and Optional Items
  const [services, setServices] = useState<QuotationItemField[]>([
    { description: "Project Setup & Core WordPress Configuration", quantity: 1, price: 200, isIncluded: false },
    { description: "Home Page Development", quantity: 1, price: 100, isIncluded: false },
    { description: "About Us Page Development", quantity: 1, price: 60, isIncluded: false },
    { description: "Services Overview Page", quantity: 1, price: 80, isIncluded: false },
    { description: "Mortgage Service Page", quantity: 1, price: 60, isIncluded: false },
    { description: "Investment Service Page", quantity: 1, price: 60, isIncluded: false },
    { description: "Insurance Service Page", quantity: 1, price: 60, isIncluded: false },
    { description: "Contact Us Page", quantity: 1, price: 50, isIncluded: false },
    { description: "Consultation Form Integration", quantity: 1, price: 80, isIncluded: false },
    { description: "WhatsApp Business Integration", quantity: 1, price: 0, isIncluded: true },
    { description: "FAQ Chatbot Integration", quantity: 1, price: 120, isIncluded: false },
    { description: "Testimonials & Trust Sections", quantity: 1, price: 60, isIncluded: false },
    { description: "Bank Partner Logo Showcase", quantity: 1, price: 0, isIncluded: true },
    { description: "Responsive Mobile Optimization", quantity: 1, price: 0, isIncluded: true },
    { description: "SEO Optimized Website Structure", quantity: 1, price: 120, isIncluded: false },
    { description: "Technical SEO Setup & Indexing", quantity: 1, price: 80, isIncluded: false },
    { description: "Google Analytics Integration", quantity: 1, price: 50, isIncluded: false },
    { description: "Google Search Console Setup", quantity: 1, price: 0, isIncluded: true },
    { description: "Google Indexing Setup", quantity: 1, price: 0, isIncluded: true },
    { description: "SSL Security Integration", quantity: 1, price: 0, isIncluded: true },
  ])

  const [optionalItems, setOptionalItems] = useState<QuotationItemField[]>([
    { description: "Business Hosting Setup (1 Year)", quantity: 1, price: 100, isIncluded: false },
    { description: "Domain Registration (1 Year)", quantity: 1, price: 118, isIncluded: false },
  ])

  // Custom text paragraphs/bullets
  const [marketComparison, setMarketComparison] = useState(
    "Similar financial consultancy websites in Dubai generally range between AED 3,500 – AED 8,000, depending on design quality, functionality, and agency pricing.\n\nStivate delivers a competitive solution with professional quality and direct development support without agency overhead costs."
  )
  const [maintenancePlanPrice, setMaintenancePlanPrice] = useState(79)
  const [maintenancePlanDetails, setMaintenancePlanDetails] = useState(
    "Security Monitoring\nMonthly Backups\nPlugin Updates\nMinor Content Updates\nTechnical Support\nWebsite Health Checks"
  )
  const [termsAndConditions, setTermsAndConditions] = useState(
    "This quotation covers one business website only.\nUp to seven pages are included within the scope.\nClient shall provide logo, content, images, and branding materials.\nFAQ chatbot includes predefined questions and answers.\nDomain and hosting are not included in the project total and may be purchased separately if required.\nIf the client already owns a domain and hosting account, access credentials must be provided before development begins.\nRenewal charges after one year are excluded.\nOne major revision cycle and two minor revision cycles are included.\nSEO includes technical setup only. Search rankings cannot be guaranteed.\nPost-launch support is included for 15 days.\n50% advance payment is required before project commencement.\nRemaining payment is due before final handover."
  )

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Generate Quotation Number & Defaults
  useEffect(() => {
    const today = new Date()
    const year = today.getFullYear()
    const rand = Math.floor(100 + Math.random() * 900)
    setQuotationNumber(`STV-UAE-WP-${rand}`)

    setIssueDate(today.toISOString().split("T")[0])
    const valid = new Date(today)
    valid.setDate(today.getDate() + 18) // ~18 days validity
    setValidUntil(valid.toISOString().split("T")[0])
  }, [])

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

      // Transform items to save
      const allItems = [
        ...services.map((s) => ({ ...s, isOptional: false })),
        ...optionalItems.map((o) => ({ ...o, isOptional: true })),
      ]

      await createQuotation({
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
      setError(err.message || "Failed to create quotation.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
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
                <th scope="col" className="py-2 text-left text-xs font-semibold text-gray-550 uppercase w-[50%]">
                  Description
                </th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-550 uppercase w-[10%]">
                  Qty
                </th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-550 uppercase w-[15%]">
                  Price ({currency})
                </th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-550 uppercase w-[15%]">
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
                      <span className="ml-2 text-xs font-semibold text-gray-600 dark:text-gray-400">Yes, show &quot;Included&quot;</span>
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
                <th scope="col" className="py-2 text-left text-xs font-semibold text-gray-550 uppercase w-[50%]">
                  Description
                </th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-550 uppercase w-[10%]">
                  Qty
                </th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-550 uppercase w-[15%]">
                  Price ({currency})
                </th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-gray-550 uppercase w-[15%]">
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
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-955 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-650 sm:text-sm dark:bg-gray-850 dark:text-white dark:ring-gray-700"
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
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
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
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
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
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-800 dark:text-white dark:ring-gray-700"
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

      {/* Row 4: Custom rich text blocks */}
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
        <button
          type="button"
          onClick={() => router.push("/admin/quotations")}
          className="rounded-md bg-white dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Save Quotation"}
        </button>
      </div>
    </form>
  )
}
