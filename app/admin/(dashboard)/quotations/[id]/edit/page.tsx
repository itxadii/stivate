import { prisma } from "@/lib/prisma"
import { getClients } from "@/lib/actions/client"
import { notFound } from "next/navigation"
import { auth } from "@/auth"
import EditQuotationForm from "./EditQuotationForm"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditQuotationPage({ params }: PageProps) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  const { id } = await params

  const quotation = await prisma.quotation.findUnique({
    where: { id },
    include: {
      items: true,
    },
  })

  if (!quotation || quotation.isArchived) {
    notFound()
  }

  const clients = await getClients()

  // Serialize properties to plain object values for Client Component form
  const serializedQuotation = {
    id: quotation.id,
    clientId: quotation.clientId,
    clientName: quotation.clientName,
    clientAddress: quotation.clientAddress,
    quotationNumber: quotation.quotationNumber,
    title: quotation.title,
    introduction: quotation.introduction,
    issueDate: quotation.issueDate ? quotation.issueDate.toISOString().split("T")[0] : "",
    validUntil: quotation.validUntil ? quotation.validUntil.toISOString().split("T")[0] : "",
    currency: quotation.currency,
    taxRate: quotation.taxRate,
    taxText: quotation.taxText,
    discount: quotation.discount,
    marketComparison: quotation.marketComparison,
    maintenancePlanPrice: quotation.maintenancePlanPrice,
    maintenancePlanDetails: quotation.maintenancePlanDetails,
    termsAndConditions: quotation.termsAndConditions,
    items: quotation.items.map((item) => ({
      id: item.id,
      description: item.description,
      quantity: item.quantity,
      price: item.price,
      isIncluded: item.isIncluded,
      isOptional: item.isOptional,
      isClientExpense: item.isClientExpense,
    })),
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Quotation</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Modify quotation scope details, pricing items, terms or optional maintenance blocks.
        </p>
      </div>

      <EditQuotationForm quotation={serializedQuotation} clients={clients} />
    </div>
  )
}
