"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Building, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle, 
  Flame, 
  Archive, 
  Trash2, 
  Database,
  AlertTriangle
} from "lucide-react"
import { updateEnquiryStatus, convertEnquiryToLead, deleteEnquiry } from "@/lib/actions/enquiry"

type Enquiry = {
  id: string
  name: string
  email: string
  whatsapp: string
  businessType: string
  erpSystem: string
  challenge: string
  status: "NEW" | "CONTACTED" | "CONVERTED" | "ARCHIVED"
  createdAt: Date
  updatedAt: Date
}

interface EnquiryDetailViewProps {
  enquiry: Enquiry
}

export default function EnquiryDetailView({ enquiry }: EnquiryDetailViewProps) {
  const router = useRouter()
  const [status, setStatus] = useState<Enquiry["status"]>(enquiry.status)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleStatusChange = async (newStatus: "NEW" | "CONTACTED" | "ARCHIVED") => {
    setLoading(true)
    try {
      await updateEnquiryStatus(enquiry.id, newStatus)
      setStatus(newStatus)
      router.refresh()
    } catch (err) {
      console.error(err)
      alert("Failed to update status. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleConvertToLead = async () => {
    setLoading(true)
    try {
      const result = await convertEnquiryToLead(enquiry.id)
      setStatus("CONVERTED")
      alert("Enquiry successfully converted to CRM Lead!")
      router.push(`/admin/leads/${result.lead.id}`)
      router.refresh()
    } catch (err) {
      console.error(err)
      alert("Failed to convert enquiry to lead. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to permanently delete this enquiry? This action is irreversible.")) return
    setLoading(true)
    try {
      await deleteEnquiry(enquiry.id)
      router.push("/admin/enquiries")
      router.refresh()
    } catch (err) {
      console.error(err)
      alert("Failed to delete enquiry. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (s: Enquiry["status"]) => {
    switch (s) {
      case "NEW":
        return "bg-blue-50 text-blue-700 ring-blue-600/25 dark:bg-blue-950/30 dark:text-blue-400 dark:ring-blue-500/30 font-bold"
      case "CONTACTED":
        return "bg-amber-50 text-amber-800 ring-amber-600/20 dark:bg-amber-950/30 dark:text-amber-400 dark:ring-amber-500/30 font-medium"
      case "CONVERTED":
        return "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-950/30 dark:text-emerald-400 dark:ring-emerald-500/30 font-semibold"
      case "ARCHIVED":
        return "bg-slate-50 text-slate-700 ring-slate-600/20 dark:bg-slate-800/40 dark:text-slate-400 dark:ring-slate-700/30"
      default:
        return "bg-gray-50 text-gray-600 ring-gray-500/10 dark:bg-gray-800/40 dark:text-gray-400"
    }
  }

  return (
    <div className={`space-y-6 ${loading ? "opacity-75 pointer-events-none" : ""}`}>
      {/* Header breadcrumb */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/enquiries"
          className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Enquiry Profile</h1>
          <p className="text-xs text-gray-500 dark:text-gray-450">ID: {enquiry.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact info card (Left column) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 space-y-6">
            <div className="text-center pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="h-16 w-16 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/20">
                <Building className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate" title={enquiry.name}>
                {enquiry.name}
              </h2>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
                {enquiry.businessType}
              </p>
              <div className="mt-4">
                <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusBadge(status)}`}>
                  {status}
                </span>
              </div>
            </div>

            {/* Direct contact actions */}
            <div className="space-y-4 text-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contact Methods</h3>
              
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-950">
                  <Mail className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xxs text-gray-400 font-medium">Corporate Email</p>
                  <a href={`mailto:${enquiry.email}`} className="text-blue-650 hover:underline dark:text-blue-400 text-sm font-semibold truncate block">
                    {enquiry.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-950">
                  <Phone className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xxs text-gray-400 font-medium">WhatsApp / Phone</p>
                  <a 
                    href={`https://wa.me/${enquiry.whatsapp.replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-655 hover:underline dark:text-blue-400 text-sm font-semibold block"
                  >
                    {enquiry.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-950">
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xxs text-gray-400 font-medium">Submitted On</p>
                  <p className="text-gray-900 dark:text-white text-sm font-medium">
                    {mounted ? new Date(enquiry.createdAt).toLocaleString(undefined, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    }) : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Status Action Controls */}
            {status !== "CONVERTED" && (
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Quick Actions</h3>
                
                {status === "NEW" && (
                  <button
                    onClick={() => handleStatusChange("CONTACTED")}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-950/40 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark as Contacted
                  </button>
                )}

                {status === "CONTACTED" && (
                  <button
                    onClick={() => handleStatusChange("NEW")}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-950/40 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <Clock className="w-4 h-4" />
                    Mark as New / Unread
                  </button>
                )}

                {status !== "ARCHIVED" && (
                  <button
                    onClick={() => handleStatusChange("ARCHIVED")}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/80 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-750 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <Archive className="w-4 h-4" />
                    Archive Enquiry
                  </button>
                )}

                {status === "ARCHIVED" && (
                  <button
                    onClick={() => handleStatusChange("NEW")}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-950/40 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <Archive className="w-4 h-4" />
                    Restore from Archive
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Detailed Operational Data & Challenge Details (Right column) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 space-y-6">
            <div className="flex items-center gap-2 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
              <Database className="w-5 h-5 text-blue-500" />
              <h3 className="font-bold text-base">Operational Process Profile</h3>
            </div>

            {/* ERP / System of Record */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Current ERP / Systems of Record</h4>
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-150 dark:border-gray-800">
                <p className="text-gray-900 dark:text-gray-250 text-sm leading-relaxed whitespace-pre-line font-medium">
                  {enquiry.erpSystem}
                </p>
              </div>
            </div>

            {/* Challenge / Bottleneck */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Biggest Operational Bottlenecks & Challenges</h4>
              <div className="p-4 rounded-lg bg-red-50/50 dark:bg-rose-950/10 border border-red-100 dark:border-rose-900/25">
                <p className="text-gray-900 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-line font-medium">
                  {enquiry.challenge}
                </p>
              </div>
            </div>
          </div>

          {/* CRM Conversion & Lead management Panel */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <div className="sm:flex sm:items-center sm:justify-between gap-4">
              <div className="max-w-md">
                <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
                  <Flame className="w-5 h-5 text-rose-500" />
                  CRM Lead Conversion
                </h3>
                <p className="text-xs text-gray-550 dark:text-gray-400 mt-1 leading-relaxed">
                  Convert this audit request into a pipeline Lead. It will create a Lead card pre-populated with contact details, ERP systems, and bottleneck notes.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex-shrink-0 flex flex-col sm:flex-row gap-2">
                {status !== "CONVERTED" ? (
                  <button
                    onClick={handleConvertToLead}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition cursor-pointer"
                  >
                    <Flame className="w-4 h-4" />
                    Convert to Lead Pitch
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-450 text-sm font-semibold bg-emerald-50 dark:bg-emerald-950/20 px-4 py-2.5 rounded-lg border border-emerald-250 dark:border-emerald-900/30">
                    <CheckCircle className="w-4.5 h-4.5" />
                    Converted to Lead
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dangerous/Archival Panel */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Danger Zone
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Permanently delete this enquiry. This record will be erased from the database logs.
                </p>
              </div>
              <div>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/45 px-3 py-2 text-sm font-semibold text-red-700 dark:text-red-400 shadow-sm transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
