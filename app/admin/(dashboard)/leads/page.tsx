import { getLeads, archiveLead } from "@/lib/actions/lead"
import Link from "next/link"
import { Plus, Flame, Phone, Calendar, Trash2 } from "lucide-react"

export default async function LeadsPage() {
  let leads: any[] = []
  let error = null
  try {
    leads = await getLeads()
  } catch (e: any) {
    console.error("Failed to load leads:", e)
    error = "Failed to load leads. Please sync your database schema."
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
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Leads & Pitches</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track prospective leads, client pitches, and deal temperatures.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/admin/leads/new"
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Plus className="w-4 h-4" />
            Add Lead Pitch
          </Link>
        </div>
      </div>

      {error ? (
        <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/30 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                    Lead Pitch
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Client / Prospect
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Temperature
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Phone
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Initialized At
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {leads.map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-950/20">
                          <Flame className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                        </div>
                        <div className="ml-4">
                          <Link
                            href={`/admin/leads/${lead.id}`}
                            className="font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 block hover:underline"
                          >
                            {lead.name}
                          </Link>
                          {lead.notes && (
                            <div className="text-gray-500 truncate max-w-[200px] text-xs">{lead.notes}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {lead.clientId ? (
                        <Link href={`/admin/clients/${lead.clientId}`} className="text-blue-600 hover:underline dark:text-blue-400">
                          {lead.clientName}
                        </Link>
                      ) : (
                        <span>{lead.clientName}</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {lead.phone ? (
                        <div className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          {lead.phone}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(lead.initializedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <form
                        action={async () => {
                          "use server"
                          await archiveLead(lead.id)
                        }}
                      >
                        <button
                          type="submit"
                          className="text-red-600 hover:text-red-900 dark:hover:text-red-400 p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-950/20"
                          title="Archive Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}

                {leads.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500 dark:text-gray-400 text-sm">
                      No leads found. Initialize your first pitch!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
