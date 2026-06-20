import { getLeadWithFollowUps, archiveLead, convertLeadToClient } from "@/lib/actions/lead"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Flame, Phone, Calendar, Clock, MessageSquare, Trash2, UserCheck } from "lucide-react"
import FollowUpForm from "./FollowUpForm"

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const lead = await getLeadWithFollowUps(id)

  if (!lead) {
    notFound()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "HOTTEST":
        return "bg-rose-50 text-rose-700 ring-rose-600/25 dark:bg-rose-950/30 dark:text-rose-400 dark:ring-rose-500/30"
      case "WARM":
        return "bg-amber-50 text-amber-800 ring-amber-600/20 dark:bg-amber-950/30 dark:text-amber-400 dark:ring-amber-500/30"
      case "COLD":
        return "bg-slate-50 text-slate-700 ring-slate-600/20 dark:bg-slate-800/40 dark:text-slate-400 dark:ring-slate-700/30"
      default:
        return "bg-gray-50 text-gray-600 ring-gray-500/10 dark:bg-gray-800/40 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/leads"
            className="p-2 -ml-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{lead.name}</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Lead Pitch & Follow-up History
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <form
            action={async () => {
              "use server"
              await convertLeadToClient(lead.id)
            }}
          >
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              <UserCheck className="w-4 h-4" />
              Convert to Client
            </button>
          </form>

          <form
            action={async () => {
              "use server"
              await archiveLead(lead.id)
            }}
          >
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="w-4 h-4" />
              Archive Lead
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Details & New Followup Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Details Card */}
          <div className="bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
              Lead Profile
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">
                  Client / Prospect
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white mt-1 block">
                  {lead.clientId ? (
                    <Link href={`/admin/clients/${lead.clientId}`} className="text-blue-600 hover:underline dark:text-blue-400">
                      {lead.clientName}
                    </Link>
                  ) : (
                    <span>{lead.clientName}</span>
                  )}
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">
                  Temperature
                </span>
                <div className="mt-1">
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(lead.status)}`}>
                    <Flame className="w-3.5 h-3.5 mr-1" />
                    {lead.status}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">
                  Phone Number
                </span>
                <span className="text-sm text-gray-900 dark:text-white mt-1 block flex items-center gap-1.5">
                  {lead.phone ? (
                    <>
                      <Phone className="w-4 h-4 text-gray-400" />
                      {lead.phone}
                    </>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">
                  Initialized Date
                </span>
                <span className="text-sm text-gray-900 dark:text-white mt-1 block flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {new Date(lead.initializedAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {lead.notes && (
              <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">
                  Initial Notes / Pitch Context
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 whitespace-pre-wrap bg-gray-50 dark:bg-gray-800/30 p-4 rounded-lg">
                  {lead.notes}
                </p>
              </div>
            )}
          </div>

          {/* Follow-up Form */}
          <FollowUpForm leadId={lead.id} />
        </div>

        {/* Right Column: Timeline / History */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              Follow-up History
            </h3>

            <div className="flow-root">
              {lead.followUps.length === 0 ? (
                <div className="text-center py-8 text-sm text-gray-500 dark:text-gray-400">
                  <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  No follow-ups logged yet. Add your first update!
                </div>
              ) : (
                <ul className="-mb-8">
                  {lead.followUps.map((item: any, itemIdx: number) => (
                    <li key={item.id}>
                      <div className="relative pb-8">
                        {itemIdx !== lead.followUps.length - 1 ? (
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
                              <span className="font-semibold text-gray-900 dark:text-white">Meeting Follow-up</span>
                              <span>{new Date(item.date).toLocaleDateString()}</span>
                            </div>
                            <div className="mt-2 text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/40 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                              <p className="font-medium text-gray-900 dark:text-white text-xs mb-1">Discussed:</p>
                              <p className="whitespace-pre-wrap">{item.discussed}</p>
                              {item.notes && (
                                <div className="mt-2 border-t border-gray-200 dark:border-gray-800 pt-2 text-xs text-gray-600 dark:text-gray-400">
                                  <p className="font-medium text-gray-900 dark:text-white mb-0.5">Notes / Actions:</p>
                                  <p className="whitespace-pre-wrap">{item.notes}</p>
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
