import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { auth } from "@/auth"
import QuotationDetail from "./QuotationDetail"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function QuotationDetailPage({ params }: PageProps) {
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

  // Serialize properties to plain object values for Client Component
  const serializedQuotation = {
    id: quotation.id,
    quotationNumber: quotation.quotationNumber,
    clientName: quotation.clientName,
    clientAddress: quotation.clientAddress,
    title: quotation.title,
    introduction: quotation.introduction,
    issueDate: quotation.issueDate ? quotation.issueDate.toISOString() : null,
    validUntil: quotation.validUntil ? quotation.validUntil.toISOString() : null,
    currency: quotation.currency,
    taxRate: quotation.taxRate,
    taxText: quotation.taxText,
    discount: quotation.discount,
    marketComparison: quotation.marketComparison,
    maintenancePlanPrice: quotation.maintenancePlanPrice,
    termsAndConditions: quotation.termsAndConditions,
    maintenancePlanDetails: quotation.maintenancePlanDetails,
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
    <div className="space-y-6">
      <QuotationDetail quotation={serializedQuotation} />
    </div>
  )
}
