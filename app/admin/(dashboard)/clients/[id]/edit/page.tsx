"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { getClients, updateClient, archiveClient } from "@/lib/actions/client"
import Link from "next/link"
import { ArrowLeft, Save, Trash2 } from "lucide-react"

export default function EditClientPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [client, setClient] = useState<any>(null)

  useEffect(() => {
    async function fetchClient() {
      try {
        const clients = await getClients()
        const found = clients.find(c => c.id === id)
        if (!found) {
          setError("Client not found")
        } else {
          setClient(found)
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch client")
      } finally {
        setIsLoading(false)
      }
    }
    fetchClient()
  }, [id])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    try {
      await updateClient(id, {
        name: formData.get("name") as string,
        company: formData.get("company") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        address: formData.get("address") as string,
        notes: formData.get("notes") as string,
      })
      router.push("/admin/clients")
    } catch (err: any) {
      setError(err.message || "Failed to update client")
      setIsSubmitting(false)
    }
  }

  async function handleArchive() {
    if (!confirm("Are you sure you want to archive this client?")) return
    try {
      await archiveClient(id)
      router.push("/admin/clients")
    } catch (err: any) {
      alert("Failed to archive client")
    }
  }

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading client...</div>
  }

  if (!client && !isLoading) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>{error}</p>
        <Link href="/admin/clients" className="mt-4 text-blue-600 hover:underline">
          Go back
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/clients"
            className="p-2 -ml-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Client</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Update information for {client.name}.
            </p>
          </div>
        </div>

        <button
          onClick={handleArchive}
          className="inline-flex items-center gap-2 rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <Trash2 className="w-4 h-4" />
          Archive
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Full name <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={client.name}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Company
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="company"
                  id="company"
                  defaultValue={client.company || ""}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={client.email || ""}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Phone number
              </label>
              <div className="mt-2">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  defaultValue={client.phone || ""}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="address"
                  id="address"
                  defaultValue={client.address || ""}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="notes" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Notes
              </label>
              <div className="mt-2">
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  defaultValue={client.notes || ""}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-4 border-t border-gray-900/10 dark:border-gray-800 pt-6">
            <Link
              href="/admin/clients"
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
                "Saving..."
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
