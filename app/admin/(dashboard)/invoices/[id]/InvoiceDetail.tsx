"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { updateInvoiceStatus } from "@/lib/actions/invoice"
import { ArrowLeft, Printer, CheckCircle, Mail, AlertTriangle, XCircle, FileText } from "lucide-react"

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  price: number
}

interface Client {
  name: string
  address: string | null
}

interface Project {
  name: string
  client: Client
}

interface Invoice {
  id: string
  invoiceNumber: string
  amount: number
  paidAmount: number
  taxRate: number
  discountRate: number
  currency: string
  status: "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "CANCELLED" | string
  termsAndConditions: string | null
  issueDate: Date | string | null
  dueDate: Date | string | null
  paidDate: Date | string | null
  project: Project
  items: InvoiceItem[]
}

interface InvoiceDetailProps {
  invoice: Invoice
}

export default function InvoiceDetail({ invoice }: InvoiceDetailProps) {
  const router = useRouter()
  const [status, setStatus] = useState(invoice.status)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      setIsUpdating(true)
      await updateInvoiceStatus(invoice.id, newStatus)
      setStatus(newStatus)
      router.refresh()
    } catch (err) {
      alert("Failed to update status")
    } finally {
      setIsUpdating(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const formatCurrency = (amount: number) => {
    try {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: invoice.currency || "USD" }).format(amount)
    } catch {
      return `${invoice.currency || "USD"} ${amount.toFixed(2)}`
    }
  }

  const getStatusBadge = (invoiceStatus: string) => {
    switch (invoiceStatus) {
      case "DRAFT":
        return "bg-gray-100 text-gray-800 ring-1 ring-gray-600/20 dark:bg-gray-850 dark:text-gray-400 dark:ring-gray-700"
      case "SENT":
        return "bg-blue-50 text-blue-700 ring-1 ring-blue-700/10 dark:bg-blue-900/20 dark:text-blue-400 dark:ring-blue-900/30"
      case "PAID":
        return "bg-green-50 text-green-700 ring-1 ring-green-600/20 dark:bg-green-900/20 dark:text-green-400 dark:ring-green-900/30"
      case "OVERDUE":
        return "bg-red-50 text-red-700 ring-1 ring-red-600/10 dark:bg-red-900/20 dark:text-red-400 dark:ring-red-900/30"
      case "CANCELLED":
        return "bg-yellow-50 text-yellow-800 ring-1 ring-yellow-600/20 dark:bg-yellow-900/20 dark:text-yellow-400 dark:ring-yellow-900/30"
      default:
        return "bg-gray-50 text-gray-600 ring-1 ring-gray-500/10"
    }
  }

  const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
  const discountAmount = subtotal * ((invoice.discountRate || 0) / 100)
  const taxableAmount = subtotal - discountAmount
  const taxAmount = taxableAmount * ((invoice.taxRate || 0) / 100)
  const totalAmount = taxableAmount + taxAmount

  return (
    <div className="space-y-6">
      {/* Print styles overrides */}
      <style jsx global>{`
        @media print {
          /* Hide everything in the layout except our printable container */
          body * {
            visibility: hidden !important;
          }
          .printable-area, .printable-area * {
            visibility: visible !important;
          }
          .printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
            color: black !important;
          }
          /* Prevent page split inside tables and sections */
          tr, blockquote, pre {
            page-break-inside: avoid !important;
          }
        }
      `}</style>

      {/* Top action bar: Not visible when printing */}
      <div className="no-print flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 dark:border-gray-800 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/invoices"
            className="inline-flex items-center gap-1 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Invoices
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status quick controls */}
          <div className="flex items-center rounded-md bg-gray-100 dark:bg-gray-800 p-0.5 ring-1 ring-inset ring-gray-200 dark:ring-gray-700">
            <button
              onClick={() => handleStatusUpdate("SENT")}
              disabled={isUpdating || status === "SENT"}
              className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md transition ${status === "SENT"
                ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
            >
              <Mail className="h-3 w-3" />
              Mark Sent
            </button>
            <button
              onClick={() => handleStatusUpdate("PAID")}
              disabled={isUpdating || status === "PAID"}
              className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md transition ${status === "PAID"
                ? "bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
            >
              <CheckCircle className="h-3 w-3" />
              Mark Paid
            </button>
            <button
              onClick={() => handleStatusUpdate("CANCELLED")}
              disabled={isUpdating || status === "CANCELLED"}
              className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md transition ${status === "CANCELLED"
                ? "bg-white dark:bg-gray-700 text-yellow-600 dark:text-yellow-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
            >
              <XCircle className="h-3 w-3" />
              Cancel
            </button>
          </div>

          <Link
            href={`/admin/invoices/${invoice.id}/edit`}
            className="inline-flex items-center gap-2 rounded-md bg-white dark:bg-gray-850 px-4 py-2 text-sm font-semibold text-gray-950 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            Edit Invoice
          </Link>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition"
          >
            <Printer className="h-4 w-4" />
            Print / PDF
          </button>
        </div>
      </div>

      {/* Main Invoice Card (Target of printable-area) */}
      <div className="printable-area bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 sm:p-12 shadow-sm text-gray-900 dark:text-gray-100">
        {/* Header Grid */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-gray-200 dark:border-gray-800 pb-8">
          <div>
            <img
              src="/logo.png"
              alt="Stivate"
              className="h-30 w-auto object-contain dark:invert print:invert-0 mb-4"
            />
            <div className="text-sm text-gray-500 dark:text-gray-400 space-y-0.5">
              <p className="font-semibold text-gray-700 dark:text-gray-300">Stivate LLC</p>
              <p>Flat no.5 & 7 Sakar Appartment</p>
              <p>Pandit Colony Lane 7, Gangapur Rd,</p>
              <p>Nashik, Maharashtra</p>
              <p>hello@stivate.com</p>
            </div>
          </div>

          <div className="text-left sm:text-right space-y-1.5 pt-[40px]">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">INVOICE</h2>
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              No. {invoice.invoiceNumber}
            </div>
            <div className="inline-block mt-1">
              <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusBadge(status)}`}>
                {status}
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 pt-3 space-y-0.5">
              <p>
                <span className="font-semibold text-gray-600 dark:text-gray-400">Date Issued:</span>{" "}
                {invoice.issueDate ? new Date(invoice.issueDate).toLocaleDateString() : "-"}
              </p>
              <p>
                <span className="font-semibold text-gray-600 dark:text-gray-400">Date Due:</span>{" "}
                {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Billing Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-b border-gray-200 dark:border-gray-800">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Billed To</span>
            <div className="text-sm space-y-1">
              <p className="font-bold text-base text-gray-900 dark:text-white">{invoice.project.client.name}</p>
              {invoice.project.client.address ? (
                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                  {invoice.project.client.address}
                </p>
              ) : (
                <p className="text-gray-400 italic">No address specified</p>
              )}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Project Reference</span>
            <div className="text-sm space-y-1 text-gray-800 dark:text-gray-300">
              <p className="font-semibold text-gray-950 dark:text-white">{invoice.project.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                All services rendered under the scope of this project.
              </p>
            </div>
          </div>
        </div>

        {/* Invoice Items Table */}
        <div className="py-8">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th scope="col" className="py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-bold text-gray-400 uppercase tracking-wider w-[12%]">
                  Qty
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-bold text-gray-400 uppercase tracking-wider w-[20%]">
                  Unit Price
                </th>
                <th scope="col" className="pl-4 py-3 text-right text-xs font-bold text-gray-400 uppercase tracking-wider w-[20%]">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 dark:divide-gray-800">
              {invoice.items.map((item) => (
                <tr key={item.id}>
                  <td className="py-4 text-sm font-semibold text-gray-900 dark:text-white">
                    {item.description}
                  </td>
                  <td className="px-4 py-4 text-sm text-right text-gray-600 dark:text-gray-400">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-4 text-sm text-right text-gray-600 dark:text-gray-400">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="pl-4 py-4 text-sm text-right font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(item.quantity * item.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Math Summary Grid */}
        <div className="flex justify-end border-t border-gray-200 dark:border-gray-800 pt-8 pb-8">
          <div className="w-full sm:w-64 space-y-2 text-right">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatCurrency(subtotal)}
              </span>
            </div>
            {(invoice.discountRate || 0) > 0 && (
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Discount ({invoice.discountRate}%)</span>
                <span className="font-semibold text-green-600">
                  -{formatCurrency(discountAmount)}
                </span>
              </div>
            )}
            {(invoice.taxRate || 0) > 0 && (
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Tax / VAT ({invoice.taxRate}%)</span>
                <span className="font-semibold text-red-600">
                  +{formatCurrency(taxAmount)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-1.5 mt-1">
              <span>Total Amount</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatCurrency(totalAmount)}
              </span>
            </div>
            {(invoice.paidAmount || 0) > 0 && (
              <>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Amount Paid</span>
                  <span className="font-semibold text-green-600">
                    -{formatCurrency(invoice.paidAmount)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-800 pt-2 text-lg font-bold text-gray-955 dark:text-white">
                  <span>Balance Due</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    {formatCurrency(totalAmount - invoice.paidAmount)}
                  </span>
                </div>
              </>
            )}
            {!(invoice.paidAmount > 0) && (
              <div className="flex justify-between border-t border-gray-200 dark:border-gray-800 pt-2 text-lg font-bold text-gray-955 dark:text-white">
                <span>Total Due</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Terms & Conditions Section at the bottom */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Terms & Conditions</span>
          {invoice.termsAndConditions ? (
            <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-pre-line leading-relaxed">
              {invoice.termsAndConditions}
            </p>
          ) : (
            <p className="text-xs text-gray-400 italic">No specific terms specified.</p>
          )}
        </div>
      </div>
    </div>
  )
}
