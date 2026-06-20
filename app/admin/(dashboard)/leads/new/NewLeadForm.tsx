"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createLead } from "@/lib/actions/lead"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"

interface Client {
  id: string
  name: string
  company: string | null
  phone: string | null
  email: string | null
}

export default function NewLeadForm({ clients }: { clients: Client[] }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // State to manage input values for autofilling
  const [clientId, setClientId] = useState("")
  const [clientName, setClientName] = useState("")
  const [phone, setPhone] = useState("")

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value
    setClientId(selectedId)

    const selectedClient = clients.find((c) => c.id === selectedId)
    if (selectedClient) {
      setClientName(selectedClient.name)
      setPhone(selectedClient.phone || "")
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    try {
      await createLead({
        name: formData.get("name") as string,
        clientName: clientName || (formData.get("clientName") as string),
        clientId: clientId || null,
        phone: phone || (formData.get("phone") as string) || undefined,
        status: formData.get("status") as any,
        initializedAt: formData.get("initializedAt") as string || null,
        notes: (formData.get("notes") as string) || undefined,
      })
      router.push("/admin/leads")
    } catch (err: any) {
      setError(err.message || "Failed to initialize lead pitch")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/leads"
          className="p-2 -ml-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">New Lead Pitch</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Log a new prospective deal, pitch meeting, or warm lead.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
            
            {/* Optional: Associate with an existing Client */}
            <div className="col-span-full">
              <label htmlFor="clientId" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Associate with Existing Client <span className="text-xs text-gray-500 dark:text-gray-400">(Optional)</span>
              </label>
              <div className="mt-2">
                <select
                  name="clientId"
                  id="clientId"
                  value={clientId}
                  onChange={handleClientChange}
                  className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                >
                  <option value="">-- None (Create new prospect) --</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.company ? `(${c.company})` : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Lead / Pitch Name <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="name"
                  id="name"
                  placeholder="e.g. WMS Integration Proposal"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Temperature
              </label>
              <div className="mt-2">
                <select
                  name="status"
                  id="status"
                  defaultValue="WARM"
                  className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                >
                  <option value="HOTTEST">🔥 Hottest</option>
                  <option value="WARM">☀️ Warm</option>
                  <option value="COLD">❄️ Cold</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="clientName" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Prospect / Client Name <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="clientName"
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="initializedAt" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Pitch / Initialization Date
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="initializedAt"
                  id="initializedAt"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="notes" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Pitch / Notes Details
              </label>
              <div className="mt-2">
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  placeholder="Describe the discussion points, initial value estimates, or scheduled follow-ups..."
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-4 border-t border-gray-900/10 dark:border-gray-800 pt-6">
            <Link
              href="/admin/leads"
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? (
                "Initializing..."
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Lead Pitch
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
