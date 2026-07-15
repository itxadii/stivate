"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  Inbox, 
  Search, 
  Trash2, 
  Archive, 
  CheckCircle, 
  Flame, 
  ExternalLink,
  Mail,
  Phone,
  Clock,
  Building
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

interface EnquiriesListProps {
  initialEnquiries: Enquiry[]
}

export default function EnquiriesList({ initialEnquiries }: EnquiriesListProps) {
  const router = useRouter()
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<string>("ALL")
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleStatusChange = async (id: string, newStatus: "NEW" | "CONTACTED" | "ARCHIVED") => {
    setLoadingId(id)
    try {
      await updateEnquiryStatus(id, newStatus)
      setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e))
      router.refresh()
    } catch (err) {
      console.error(err)
      alert("Failed to update status. Please try again.")
    } finally {
      setLoadingId(null)
    }
  }

  const handleConvertToLead = async (id: string) => {
    setLoadingId(id)
    try {
      const result = await convertEnquiryToLead(id)
      setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: "CONVERTED" } : e))
      router.push(`/admin/leads/${result.lead.id}`)
      router.refresh()
    } catch (err) {
      console.error(err)
      alert("Failed to convert enquiry to lead. Please try again.")
    } finally {
      setLoadingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this enquiry?")) return
    setLoadingId(id)
    try {
      await deleteEnquiry(id)
      setEnquiries(prev => prev.filter(e => e.id !== id))
      router.refresh()
    } catch (err) {
      console.error(err)
      alert("Failed to delete enquiry. Please try again.")
    } finally {
      setLoadingId(null)
    }
  }

  // Filter and Search logic
  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesTab = activeTab === "ALL" || enquiry.status === activeTab
    const matchesSearch = 
      enquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.whatsapp.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.businessType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.erpSystem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.challenge.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesSearch
  })

  const getStatusBadge = (status: Enquiry["status"]) => {
    switch (status) {
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

  const tabs = [
    { label: "All Enquiries", value: "ALL", count: enquiries.length },
    { label: "New", value: "NEW", count: enquiries.filter(e => e.status === "NEW").length },
    { label: "Contacted", value: "CONTACTED", count: enquiries.filter(e => e.status === "CONTACTED").length },
    { label: "Converted to Lead", value: "CONVERTED", count: enquiries.filter(e => e.status === "CONVERTED").length },
    { label: "Archived", value: "ARCHIVED", count: enquiries.filter(e => e.status === "ARCHIVED").length },
  ]

  return (
    <div className="space-y-6">
      {/* Search & Tabs Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search enquiries by name, email, sector, ERP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-850 bg-gray-50 dark:bg-gray-950 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab.value
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-750"
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xxs ${
                activeTab === tab.value 
                  ? "bg-blue-700 text-blue-100" 
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Table/List */}
      {filteredEnquiries.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          <Inbox className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-700 mb-4" />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">No enquiries found</h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            No submissions matched your search or status selection.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50">
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                    Company / Sector
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Contact Details
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    System of Record
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Submitted
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
                {filteredEnquiries.map((enquiry) => {
                  const isActionLoading = loadingId === enquiry.id
                  return (
                    <tr 
                      key={enquiry.id} 
                      className={`hover:bg-gray-50/50 dark:hover:bg-gray-850/50 transition-colors ${
                        isActionLoading ? "opacity-50 pointer-events-none" : ""
                      }`}
                    >
                      {/* Company/Sector */}
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/20">
                            <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="ml-4">
                            <Link
                              href={`/admin/enquiries/${enquiry.id}`}
                              className="font-semibold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 block hover:underline"
                            >
                              {enquiry.businessType}
                            </Link>
                            <span className="text-gray-500 text-xs truncate max-w-[200px] block">
                              By {enquiry.name}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Contact Details */}
                      <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs">
                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                            <a href={`mailto:${enquiry.email}`} className="hover:underline text-gray-650 dark:text-gray-300">
                              {enquiry.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            <a href={`https://wa.me/${enquiry.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-650 dark:text-gray-300">
                              {enquiry.whatsapp}
                            </a>
                          </div>
                        </div>
                      </td>

                      {/* Current ERP */}
                      <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-[200px] truncate">
                        <div className="truncate" title={enquiry.erpSystem}>
                          {enquiry.erpSystem}
                        </div>
                        <div className="text-xxs text-gray-450 truncate" title={enquiry.challenge}>
                          {enquiry.challenge}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusBadge(enquiry.status)}`}>
                          {enquiry.status}
                        </span>
                      </td>

                      {/* Date Submitted */}
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-550 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{mounted ? new Date(enquiry.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          }) : ""}</span>
                        </div>
                      </td>

                      {/* Action Links */}
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex items-center justify-end gap-2">
                          {/* Convert to Lead (only if not already converted) */}
                          {enquiry.status !== "CONVERTED" && (
                            <button
                              onClick={() => handleConvertToLead(enquiry.id)}
                              className="text-emerald-600 hover:text-emerald-950 dark:hover:text-emerald-400 p-1.5 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition cursor-pointer"
                              title="Convert to CRM Lead"
                            >
                              <Flame className="w-4 h-4" />
                            </button>
                          )}

                          {/* Mark Contacted */}
                          {enquiry.status === "NEW" && (
                            <button
                              onClick={() => handleStatusChange(enquiry.id, "CONTACTED")}
                              className="text-amber-600 hover:text-amber-950 dark:hover:text-amber-400 p-1.5 rounded-md hover:bg-amber-50 dark:hover:bg-amber-950/20 transition cursor-pointer"
                              title="Mark as Contacted"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}

                          {/* Archive */}
                          {enquiry.status !== "ARCHIVED" && (
                            <button
                              onClick={() => handleStatusChange(enquiry.id, "ARCHIVED")}
                              className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
                              title="Archive Enquiry"
                            >
                              <Archive className="w-4 h-4" />
                            </button>
                          )}

                          {/* Restore if Archived */}
                          {enquiry.status === "ARCHIVED" && (
                            <button
                              onClick={() => handleStatusChange(enquiry.id, "NEW")}
                              className="text-blue-500 hover:text-blue-800 dark:hover:text-blue-300 p-1.5 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition cursor-pointer"
                              title="Restore Enquiry"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}

                          {/* View details */}
                          <Link
                            href={`/admin/enquiries/${enquiry.id}`}
                            className="text-blue-600 hover:text-blue-950 dark:text-blue-400 dark:hover:text-blue-300 p-1.5 rounded-md hover:bg-blue-50 dark:hover:bg-blue-950/20 transition"
                            title="View Full Details"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(enquiry.id)}
                            className="text-rose-600 hover:text-rose-950 dark:hover:text-rose-450 p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/20 transition cursor-pointer"
                            title="Permanently Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
