import { getInvoiceWithDetails } from "@/lib/actions/invoice"
import { notFound } from "next/navigation"
import InvoiceDetail from "./InvoiceDetail"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function InvoiceDetailPage({ params }: PageProps) {
  const { id } = await params
  let invoice = null

  try {
    invoice = await getInvoiceWithDetails(id)
  } catch (e) {
    // Database or query error
  }

  if (!invoice) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <InvoiceDetail invoice={invoice} />
    </div>
  )
}
