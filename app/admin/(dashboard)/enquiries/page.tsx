import { getEnquiries } from "@/lib/actions/enquiry"
import EnquiriesList from "./EnquiriesList"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Enquiries | Stivate Team",
  description: "Manage incoming operational process audit requests from the main website contact form.",
}

export const dynamic = "force-dynamic"

export default async function EnquiriesPage() {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }

  let enquiries: any[] = []
  let error = null

  try {
    enquiries = await getEnquiries()
  } catch (e: any) {
    console.error("Failed to load enquiries:", e)
    error = "Failed to load enquiries. Please sync database or check connection."
  }

  // Type assertion or mapping to fit the component's strict type
  const serializedEnquiries = enquiries.map((enquiry) => ({
    id: enquiry.id,
    name: enquiry.name,
    email: enquiry.email,
    whatsapp: enquiry.whatsapp,
    businessType: enquiry.businessType,
    erpSystem: enquiry.erpSystem,
    challenge: enquiry.challenge,
    status: enquiry.status,
    createdAt: enquiry.createdAt,
    updatedAt: enquiry.updatedAt,
  }))

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Enquiries & Audit Requests</h1>
          <p className="mt-1 text-sm text-gray-550 dark:text-gray-400">
            Incoming process audits and inquiries submitted from the website form.
          </p>
        </div>
      </div>

      {error ? (
        <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/30 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      ) : (
        <EnquiriesList initialEnquiries={serializedEnquiries} />
      )}
    </div>
  )
}
