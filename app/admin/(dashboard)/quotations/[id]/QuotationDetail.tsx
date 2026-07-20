"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Printer, Edit } from "lucide-react"

interface QuotationItem {
  id: string
  description: string
  quantity: number
  price: number
  isIncluded: boolean
  isOptional: boolean
  isClientExpense: boolean
}

interface Quotation {
  id: string
  quotationNumber: string
  clientName: string
  clientAddress: string | null
  title: string
  introduction: string | null
  issueDate: Date | string | null
  validUntil: Date | string | null
  currency: string
  taxRate: number
  taxText: string | null
  discount: number
  marketComparison: string | null
  maintenancePlanPrice: number | null
  termsAndConditions: string | null
  maintenancePlanDetails: string | null
  items: QuotationItem[]
}

interface QuotationDetailProps {
  quotation: Quotation
}

export default function QuotationDetail({ quotation }: QuotationDetailProps) {
  const router = useRouter()

  const handlePrint = () => {
    window.print()
  }

  const formatCurrencyVal = (amount: number) => {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: quotation.currency || "AED",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(amount)
    } catch {
      return `${quotation.currency || "AED"} ${amount.toFixed(2)}`
    }
  }

  const formatItemPrice = (item: QuotationItem) => {
    if (item.isIncluded) return "Included"
    return `${quotation.currency} ${item.price.toLocaleString()}`
  }

  // Split items
  const services = quotation.items.filter((item) => !item.isOptional && !item.isClientExpense)
  const optionalItems = quotation.items.filter((item) => item.isOptional && !item.isClientExpense)
  const clientExpenses = quotation.items.filter((item) => item.isClientExpense)

  // Calculations
  const subtotal = services
    .filter((s) => !s.isIncluded)
    .reduce((sum, s) => sum + s.quantity * s.price, 0)

  const taxAmount = subtotal * (quotation.taxRate / 100)
  const grandTotal = Math.max(0, subtotal + taxAmount - quotation.discount)

  // Split bullets helper
  const getBullets = (text: string | null) => {
    if (!text) return []
    return text.split("\n").map((b) => b.trim()).filter((b) => b.length > 0)
  }

  const maintenanceBullets = getBullets(quotation.maintenancePlanDetails)
  const termsBullets = getBullets(quotation.termsAndConditions)

  return (
    <div className="space-y-6">
      {/* Print styles overrides */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0 !important;
          }
          /* Hide everything except the quotation container */
          body * {
            visibility: hidden !important;
          }
          .printable-quotation, .printable-quotation * {
            visibility: visible !important;
          }
          .printable-quotation {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none !important;
            box-shadow: none !important;
            padding: 1.5cm !important;
            margin: 0 !important;
            background: white !important;
            color: black !important;
          }
          
          /* Force backgrounds & text when printing */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Page break formatting guidelines */
          .section-break-avoid {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          
          .page-break-before {
            page-break-before: always !important;
            break-before: page !important;
          }
        }
      `}</style>

      {/* Top action bar: Not visible when printing */}
      <div className="no-print flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 dark:border-gray-800 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/quotations"
            className="inline-flex items-center gap-1 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Quotations
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/admin/quotations/${quotation.id}/edit`}
            className="inline-flex items-center gap-2 rounded-md bg-white dark:bg-gray-850 px-4 py-2 text-sm font-semibold text-gray-955 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <Edit className="h-4 w-4" />
            Edit Quotation
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

      {/* Main Quotation Sheet */}
      <div className="printable-quotation max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl p-8 sm:p-12 text-gray-900 dark:text-gray-100 leading-relaxed font-sans relative overflow-hidden">
        {/* Background decorative graphics */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/25 dark:bg-blue-950/10 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none z-0" />
        <div className="absolute top-1/4 left-0 w-48 h-48 bg-slate-200/35 dark:bg-slate-800/15 rounded-full -translate-x-1/2 pointer-events-none z-0" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-blue-100/20 dark:bg-blue-950/8 rounded-full pointer-events-none z-0" />
        <div className="absolute top-1/2 right-0 w-56 h-56 bg-slate-200/35 dark:bg-slate-800/15 rounded-full translate-x-1/2 pointer-events-none z-0" />
        <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-blue-100/20 dark:bg-blue-950/8 pointer-events-none rounded-full z-0" />
        <div className="absolute bottom-1/4 right-10 w-28 h-28 bg-slate-200/30 dark:bg-slate-800/12 rounded-full pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100/25 dark:bg-blue-950/10 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none z-0" />


        {/* PAGE 1: Header + Metadata + Intro */}
        <div className="space-y-6 relative z-10">
          {/* Company branding block */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-gray-200 dark:border-gray-800 pb-8">
            <div>
              <img
                src="/logo.png"
                alt="STIVATE"
                className="h-[216px] w-auto object-contain dark:invert print:invert-0 mb-4 -ml-[16.5px]"
              />
              <div className="text-sm text-gray-500 dark:text-gray-400 space-y-0.5">
                <p className="font-semibold text-gray-700 dark:text-gray-300">Stivate LLP</p>
                <p>Flat no.5 & 7 Sakar Appartment</p>
                <p>Pandit Colony Lane 7, Gangapur Rd,</p>
                <p>Nashik, Maharashtra</p>
                <p>hello@stivate.com</p>
              </div>
            </div>
            <div className="text-left sm:text-right pt-[40px] space-y-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white uppercase">
                QUOTATION
              </h2>
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                No. {quotation.quotationNumber}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 pt-3 space-y-0.5">
                <p>
                  <span className="font-semibold text-gray-600 dark:text-gray-400">Date Issued:</span>{" "}
                  {quotation.issueDate ? new Date(quotation.issueDate).toLocaleDateString("en-GB") : "-"}
                </p>
                <p>
                  <span className="font-semibold text-gray-600 dark:text-gray-400">Valid Until:</span>{" "}
                  {quotation.validUntil ? new Date(quotation.validUntil).toLocaleDateString("en-GB") : "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Client Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 border-b border-gray-200 dark:border-gray-800">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Billed To</span>
              <div className="text-sm space-y-1">
                <p className="font-bold text-base text-gray-900 dark:text-white">{quotation.clientName}</p>
                {quotation.clientAddress ? (
                  <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line text-xs">
                    {quotation.clientAddress}
                  </p>
                ) : (
                  <p className="text-gray-400 italic">No address specified</p>
                )}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Scope Summary</span>
              <div className="text-sm space-y-1 text-gray-850 dark:text-gray-300">
                <p className="font-semibold text-gray-950 dark:text-white">{quotation.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Detailed technical quotation for requested project implementation.
                </p>
              </div>
            </div>
          </div>

          {/* Introduction block */}
          {quotation.introduction && (
            <div className="py-2">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic">
                {quotation.introduction}
              </p>
            </div>
          )}

          <div className="border-t border-gray-200 dark:border-gray-800"></div>
        </div>

        {/* SERVICES INCLUDED TABLE */}
        <div className="py-6 section-break-avoid relative z-10">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-4">
            Services Included
          </h3>

          <div className="border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-slate-300 dark:divide-slate-700">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-850/60 border-b border-slate-300 dark:border-slate-700 divide-x divide-slate-300 dark:divide-slate-700">
                  <th scope="col" className="pl-4 pr-4 py-3 text-left text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider w-[15%]">
                    Qty
                  </th>
                  <th scope="col" className="pl-4 pr-4 py-3 text-right text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider w-[22%]">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 dark:divide-slate-700 bg-white dark:bg-gray-900">
                {services.map((item) => (
                  <tr key={item.id} className="divide-x divide-slate-300 dark:divide-slate-700">
                    <td className="pl-4 pr-4 py-4 text-sm font-normal text-gray-700 dark:text-gray-300">
                      {item.description}
                    </td>
                    <td className="px-4 py-4 text-sm text-center text-gray-600 dark:text-gray-400 font-normal">
                      {item.quantity}
                    </td>
                    <td className="pl-4 pr-4 py-4 text-sm text-right font-normal text-gray-700 dark:text-gray-300">
                      {formatItemPrice(item)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* EXPENSES PAID BY CLIENT TABLE */}
        {clientExpenses.length > 0 && (
          <div className="py-6 border-t border-gray-200 dark:border-gray-800 section-break-avoid relative z-10">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-4">
              Expenses Paid by Client (e.g. Third-party APIs & Server Infrastructure)
            </h3>

            <div className="border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-slate-300 dark:divide-slate-700">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-850/60 border-b border-slate-300 dark:border-slate-700 divide-x divide-slate-300 dark:divide-slate-700">
                    <th scope="col" className="pl-4 pr-4 py-3 text-left text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider w-[15%]">
                      Qty
                    </th>
                    <th scope="col" className="pl-4 pr-4 py-3 text-right text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider w-[22%]">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300 dark:divide-slate-700 bg-white dark:bg-gray-900">
                  {clientExpenses.map((item) => (
                    <tr key={item.id} className="divide-x divide-slate-300 dark:divide-slate-700">
                      <td className="pl-4 pr-4 py-4 text-sm font-normal text-gray-700 dark:text-gray-300">
                        {item.description}
                      </td>
                      <td className="px-4 py-4 text-sm text-center text-gray-600 dark:text-gray-400 font-normal">
                        {item.quantity}
                      </td>
                      <td className="pl-4 pr-4 py-4 text-sm text-right font-normal text-gray-700 dark:text-gray-300">
                        {formatItemPrice(item)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Totals & Calculations (styled like invoice math block) */}
        <div className="flex justify-end border-t border-gray-200 dark:border-gray-800 pt-6 pb-6 section-break-avoid relative z-10">
          <div className="w-full sm:w-64 space-y-2 text-right text-sm">
            <div className="flex justify-between text-gray-500 dark:text-gray-400">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatCurrencyVal(subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-gray-500 dark:text-gray-400">
              <span>Value-added Tax</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {quotation.taxText || "Not Applicable"}
              </span>
            </div>
            {quotation.discount > 0 && (
              <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
                <span>Discount</span>
                <span>-{formatCurrencyVal(quotation.discount)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-200 dark:border-gray-800 pt-2 text-base font-bold text-gray-955 dark:text-white">
              <span>Total Value</span>
              <span className="text-blue-600 dark:text-blue-400">
                {formatCurrencyVal(grandTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* OPTIONAL ITEMS SECTION */}
        {optionalItems.length > 0 && (
          <div className="py-6 border-t border-gray-200 dark:border-gray-800 section-break-avoid relative z-10">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-4">
              Optional Items (If Required)
            </h3>

            <div className="border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-slate-300 dark:divide-slate-700">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-850/60 border-b border-slate-300 dark:border-slate-700 divide-x divide-slate-300 dark:divide-slate-700">
                    <th scope="col" className="pl-4 pr-4 py-3 text-left text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider w-[15%]">
                      Qty
                    </th>
                    <th scope="col" className="pl-4 pr-4 py-3 text-right text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider w-[22%]">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300 dark:divide-slate-700 bg-white dark:bg-gray-900">
                  {optionalItems.map((item) => (
                    <tr key={item.id} className="divide-x divide-slate-300 dark:divide-slate-700">
                      <td className="pl-4 pr-4 py-4 text-sm font-normal text-gray-700 dark:text-gray-300">
                        {item.description}
                      </td>
                      <td className="px-4 py-4 text-sm text-center text-gray-600 dark:text-gray-400 font-normal">
                        {item.quantity}
                      </td>
                      <td className="pl-4 pr-4 py-4 text-sm text-right font-normal text-gray-700 dark:text-gray-300">
                        {formatItemPrice(item)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800/80">
              <p className="text-3xs sm:text-2xs text-gray-400 italic">
                Note: Domain registration and hosting are optional and are not included in the project price. If you already have an active hosting account and domain name, these services are not required.
              </p>
            </div>
          </div>
        )}

        {/* PAGE 3: Market Comparison + Maintenance + Terms */}
        <div className="page-break-before pt-6 space-y-8 border-t border-gray-200 dark:border-gray-800 relative z-10">

          {/* Market Comparison */}
          {quotation.marketComparison && (
            <div className="space-y-2 section-break-avoid">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Market Comparison
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                {quotation.marketComparison}
              </p>
            </div>
          )}

          {/* Optional Maintenance Plan */}
          {maintenanceBullets.length > 0 && (
            <div className="space-y-3 section-break-avoid">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Optional Maintenance Plan
              </h4>

              <div className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                Plan Rate: <span className="text-blue-600 dark:text-blue-400">{formatCurrencyVal(quotation.maintenancePlanPrice || 0)} / Month</span>
              </div>

              <div className="pl-1 pt-1">
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-500 dark:text-gray-450">
                  {maintenanceBullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Terms & Conditions */}
          {termsBullets.length > 0 && (
            <div className="space-y-3 section-break-avoid">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Terms & Conditions
              </h4>
              <ul className="list-decimal pl-5 space-y-2 text-xs text-gray-500 dark:text-gray-450 leading-relaxed">
                {termsBullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* PAGE 4: Client Acceptance Signature */}
        <div className="page-break-before pt-6 space-y-8 border-t border-gray-200 dark:border-gray-800 relative z-10">

          <div className="space-y-2 section-break-avoid">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Client Acceptance
            </h4>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-semibold leading-normal">
              I hereby confirm acceptance of this quotation and authorize STIVATE to commence the project.
            </p>
          </div>

          {/* Signature Lines */}
          <div className="grid grid-cols-2 gap-8 pt-6 text-xs sm:text-sm section-break-avoid">
            <div className="space-y-2">
              <p className="font-semibold text-gray-600 dark:text-gray-400">Client Signature:</p>
              <div className="border-b border-dashed border-gray-300 w-full pt-8"></div>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-gray-600 dark:text-gray-400">Date:</p>
              <div className="border-b border-dashed border-gray-300 w-full pt-8"></div>
            </div>
          </div>

          {/* Page Footer Logo */}
          <div className="flex justify-end pt-16 section-break-avoid">
            <img
              src="/logo.png"
              alt="STIVATE"
              className="h-8 w-auto opacity-20 object-contain dark:invert print:invert-0"
            />
          </div>
        </div>

      </div>
    </div>
  )
}
