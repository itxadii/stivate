"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function getQuotations() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.quotation.findMany({
    where: { isArchived: false },
    include: {
      client: true,
      items: true,
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function getQuotationWithDetails(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.quotation.findUnique({
    where: { id },
    include: {
      client: true,
      items: true,
    },
  })
}

interface QuotationItemInput {
  description: string
  quantity: number
  price: number
  isIncluded: boolean
  isOptional: boolean
  isClientExpense?: boolean
}

interface CreateQuotationInput {
  clientId?: string | null
  clientName: string
  clientAddress?: string | null
  quotationNumber: string
  title: string
  introduction?: string | null
  issueDate?: Date | string | null
  validUntil?: Date | string | null
  currency?: string
  taxRate?: number
  taxText?: string | null
  discount?: number
  marketComparison?: string | null
  maintenancePlanPrice?: number | null
  maintenancePlanDetails?: string | null
  termsAndConditions?: string | null
  leadId?: string | null
  items: QuotationItemInput[]
}

export async function createQuotation(data: CreateQuotationInput) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const quotation = await prisma.quotation.create({
    data: {
      clientId: data.clientId || null,
      clientName: data.clientName,
      clientAddress: data.clientAddress || null,
      quotationNumber: data.quotationNumber,
      title: data.title,
      introduction: data.introduction || null,
      issueDate: data.issueDate ? new Date(data.issueDate) : new Date(),
      validUntil: data.validUntil ? new Date(data.validUntil) : null,
      currency: data.currency || "AED",
      taxRate: data.taxRate !== undefined ? Number(data.taxRate) : 0,
      taxText: data.taxText || "Not Applicable",
      discount: data.discount !== undefined ? Number(data.discount) : 0,
      marketComparison: data.marketComparison || null,
      maintenancePlanPrice: data.maintenancePlanPrice !== undefined ? Number(data.maintenancePlanPrice) : 79,
      maintenancePlanDetails: data.maintenancePlanDetails || null,
      termsAndConditions: data.termsAndConditions || null,
      leadId: data.leadId || null,
      items: {
        create: data.items.map((item) => ({
          description: item.description,
          quantity: Number(item.quantity),
          price: Number(item.price),
          isIncluded: !!item.isIncluded,
          isOptional: !!item.isOptional,
          isClientExpense: !!item.isClientExpense,
        })),
      },
    },
  })

  // Create audit activity log
  await prisma.activity.create({
    data: {
      userId: session.user.id,
      entityType: "Quotation",
      entityId: quotation.id,
      action: "CREATED",
      metadata: { quotationNumber: quotation.quotationNumber, title: quotation.title },
    },
  })

  revalidatePath("/admin/quotations")
  revalidatePath("/admin/clients")
  if (data.clientId) {
    revalidatePath(`/admin/clients/${data.clientId}`)
  }
  if (data.leadId) {
    revalidatePath("/admin/leads")
    revalidatePath(`/admin/leads/${data.leadId}`)
  }
  return quotation
}

export async function updateQuotation(id: string, data: CreateQuotationInput) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const existing = await prisma.quotation.findUnique({
    where: { id },
    select: { clientId: true }
  })

  const quotation = await prisma.$transaction(async (tx) => {
    // Delete existing items
    await tx.quotationItem.deleteMany({
      where: { quotationId: id },
    })

    // Update quotation fields & recreate items
    return tx.quotation.update({
      where: { id },
      data: {
        clientId: data.clientId || null,
        clientName: data.clientName,
        clientAddress: data.clientAddress || null,
        quotationNumber: data.quotationNumber,
        title: data.title,
        introduction: data.introduction || null,
        issueDate: data.issueDate ? new Date(data.issueDate) : null,
        validUntil: data.validUntil ? new Date(data.validUntil) : null,
        currency: data.currency || "AED",
        taxRate: data.taxRate !== undefined ? Number(data.taxRate) : 0,
        taxText: data.taxText || "Not Applicable",
        discount: data.discount !== undefined ? Number(data.discount) : 0,
        marketComparison: data.marketComparison || null,
        maintenancePlanPrice: data.maintenancePlanPrice !== undefined ? Number(data.maintenancePlanPrice) : 79,
        maintenancePlanDetails: data.maintenancePlanDetails || null,
        termsAndConditions: data.termsAndConditions || null,
        leadId: data.leadId || null,
        items: {
          create: data.items.map((item) => ({
            description: item.description,
            quantity: Number(item.quantity),
            price: Number(item.price),
            isIncluded: !!item.isIncluded,
            isOptional: !!item.isOptional,
            isClientExpense: !!item.isClientExpense,
          })),
        },
      },
    })
  })

  // Create audit activity log
  await prisma.activity.create({
    data: {
      userId: session.user.id,
      entityType: "Quotation",
      entityId: quotation.id,
      action: "UPDATED",
      metadata: { quotationNumber: quotation.quotationNumber, title: quotation.title },
    },
  })

  revalidatePath("/admin/quotations")
  revalidatePath(`/admin/quotations/${id}`)
  revalidatePath("/admin/clients")
  if (data.clientId) {
    revalidatePath(`/admin/clients/${data.clientId}`)
  }
  if (existing?.clientId && existing.clientId !== data.clientId) {
    revalidatePath(`/admin/clients/${existing.clientId}`)
  }
  if (data.leadId) {
    revalidatePath("/admin/leads")
    revalidatePath(`/admin/leads/${data.leadId}`)
  }
  return quotation
}

export async function archiveQuotation(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const quotation = await prisma.quotation.update({
    where: { id },
    data: { isArchived: true },
  })

  // Create audit activity log
  await prisma.activity.create({
    data: {
      userId: session.user.id,
      entityType: "Quotation",
      entityId: quotation.id,
      action: "ARCHIVED",
      metadata: { quotationNumber: quotation.quotationNumber },
    },
  })

  revalidatePath("/admin/quotations")
  revalidatePath("/admin/clients")
  if (quotation.clientId) {
    revalidatePath(`/admin/clients/${quotation.clientId}`)
  }
  return quotation
}
