"use client"

import { useState } from "react"
import { createFollowUp } from "@/lib/actions/lead"
import { Save, Plus } from "lucide-react"

export default function FollowUpForm({ leadId }: { leadId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Manage form fields to clear them on success
  const [discussed, setDiscussed] = useState("")
  const [notes, setNotes] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      await createFollowUp({
        leadId,
        discussed,
        date: date || null,
        notes: notes || undefined,
      })
      setDiscussed("")
      setNotes("")
      setDate(new Date().toISOString().split("T")[0])
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Failed to add follow-up log")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6 sm:p-8 space-y-4">
      <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white flex items-center gap-2">
        <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        Log New Follow-up / Pitch Meeting
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4 text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-md bg-green-50 dark:bg-green-900/30 p-4 text-sm text-green-700 dark:text-green-400">
            Follow-up logged successfully! Lead status updated.
          </div>
        )}

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-6 sm:gap-x-6">
          <div className="sm:col-span-2">
            <label htmlFor="followUpDate" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
              Meeting / Follow-up Date
            </label>
            <div className="mt-1">
              <input
                required
                type="date"
                name="followUpDate"
                id="followUpDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="discussed" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
              What was discussed? <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <textarea
                required
                id="discussed"
                name="discussed"
                rows={3}
                value={discussed}
                onChange={(e) => setDiscussed(e.target.value)}
                placeholder="Detail meeting takeaways, current client interest, questions raised, etc."
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="followUpNotes" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
              More Info / Notes <span className="text-xs text-gray-500 dark:text-gray-400">(Optional)</span>
            </label>
            <div className="mt-1">
              <textarea
                id="followUpNotes"
                name="followUpNotes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Action items, required preparation, or details for next scheduled follow-up."
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end border-t border-gray-900/10 dark:border-gray-800 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? (
              "Saving..."
            ) : (
              <>
                <Save className="w-4 h-4" />
                Log Follow-up
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
