import { getClientWithProjects } from "@/lib/actions/client"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Edit, Plus, Folder, Calendar, Mail, Phone, MapPin, Building, FileText, Clock, MessageSquare } from "lucide-react"
import FollowUpForm from "./FollowUpForm"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ClientDetailPage({ params }: PageProps) {
  const { id } = await params
  const client = await getClientWithProjects(id)

  if (!client) {
    notFound()
  }



  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/25 dark:bg-emerald-950/30 dark:text-emerald-400"
      case "PROPOSAL":
        return "bg-blue-50 text-blue-700 ring-1 ring-blue-700/10 dark:bg-blue-950/30 dark:text-blue-400"
      case "LEAD":
        return "bg-amber-50 text-amber-800 ring-1 ring-amber-600/25 dark:bg-amber-950/30 dark:text-amber-400"
      case "COMPLETED":
        return "bg-violet-50 text-violet-700 ring-1 ring-violet-600/25 dark:bg-violet-950/30 dark:text-violet-400"
      case "ARCHIVED":
        return "bg-red-50 text-red-700 ring-1 ring-red-600/20 dark:bg-red-950/30 dark:text-red-400"
      default:
        return "bg-gray-50 text-gray-600 ring-1 ring-gray-500/10 dark:bg-gray-800/40 dark:text-gray-400"
    }
  }

  const formatCurrency = (amount: number | null, currencyCode: string = "USD") => {
    if (!amount) return new Intl.NumberFormat("en-US", { style: "currency", currency: currencyCode }).format(0)
    try {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: currencyCode }).format(amount)
    } catch {
      return `${currencyCode} ${amount.toFixed(2)}`
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/clients"
            className="p-2 -ml-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{client.name}</h1>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Client details and assigned projects.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/admin/clients/${client.id}/edit`}
            className="inline-flex items-center gap-2 rounded-md bg-white dark:bg-gray-800 px-3.5 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-75 transition"
          >
            <Edit className="w-4 h-4" />
            Edit Client
          </Link>
          <Link
            href={`/admin/projects/new?clientId=${client.id}`}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Projects & FollowUp Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Projects List Card */}
          <div className="bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-white flex items-center gap-2">
                <Folder className="w-5 h-5 text-gray-400" />
                Assigned Projects
              </h3>
              <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/20 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-450/20">
                {client.projects.length} Total
              </span>
            </div>

            {client.projects.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl space-y-3">
                <Folder className="h-8 w-8 text-gray-400 mx-auto" />
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">No projects assigned</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                  Create a project to track milestones, record invoices, and monitor work for this client.
                </p>
                <div className="pt-2">
                  <Link
                    href={`/admin/projects/new?clientId=${client.id}`}
                    className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-500"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add First Project
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {client.projects.map((project: any) => (
                  <div
                    key={project.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-xl border border-gray-150 dark:border-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-800/20 transition gap-4"
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:underline truncate text-sm"
                        >
                          {project.name}
                        </Link>
                        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-2xs font-semibold ring-1 ring-inset ${getProjectStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                      {project.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 max-w-xl">
                          {project.description}
                        </p>
                      )}
                      
                      {/* Project Meta Dates */}
                      <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500 flex-wrap">
                        {project.startDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                            Start: {new Date(project.startDate).toLocaleDateString()}
                          </span>
                        )}
                        {project.dueDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                            Due: {new Date(project.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex sm:flex-col sm:items-end justify-between items-center shrink-0 gap-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(project.value, project.currency)}
                      </span>
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="text-xs text-blue-600 hover:underline dark:text-blue-400 font-semibold"
                      >
                        Edit Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FollowUp Log Form */}
          <FollowUpForm clientId={client.id} />
        </div>

        {/* Right Column: Follow-up timeline */}
        <div className="lg:col-span-1 space-y-6">
          {/* Follow-up History timeline */}
          <div className="bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6 space-y-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              Follow-up History
            </h3>

            <div className="flow-root">
              {client.followUps.length === 0 ? (
                <div className="text-center py-8 text-sm text-gray-500 dark:text-gray-400">
                  <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  No follow-ups logged yet. Add your first update!
                </div>
              ) : (
                <ul className="-mb-8">
                  {client.followUps.map((item: any, itemIdx: number) => (
                    <li key={item.id}>
                      <div className="relative pb-8">
                        {itemIdx !== client.followUps.length - 1 ? (
                          <span className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-800" aria-hidden="true" />
                        ) : null}
                        <div className="relative flex items-start space-x-3">
                          <div className="relative">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 ring-8 ring-white dark:ring-gray-900">
                              <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 py-1.5">
                            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
                              <span className="font-semibold text-gray-905 dark:text-white">
                                {item.leadId ? "Pitch Phase" : "Client Meeting"}
                              </span>
                              <span>{new Date(item.date).toLocaleDateString()}</span>
                            </div>
                            <div className="mt-2 text-sm text-gray-850 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/40 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                              <p className="font-medium text-gray-900 dark:text-white text-xs mb-1">Discussed:</p>
                              <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">{item.discussed}</p>
                              {item.notes && (
                                <div className="mt-2 border-t border-gray-200 dark:border-gray-800 pt-2 text-xs text-gray-600 dark:text-gray-400">
                                  <p className="font-medium text-gray-900 dark:text-white mb-0.5">Notes / Actions:</p>
                                  <p className="whitespace-pre-wrap text-gray-600 dark:text-gray-400">{item.notes}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
