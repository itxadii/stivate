"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function getInvoices() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.invoice.findMany({
    where: { isArchived: false },
    include: {
      project: {
        include: {
          client: true,
        },
      },
      items: true,
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function getInvoiceWithDetails(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.invoice.findUnique({
    where: { id },
    include: {
      project: {
        include: {
          client: true,
        },
      },
      items: true,
    },
  })
}

export async function createInvoice(data: {
  projectId: string
  invoiceNumber: string
  paidAmount?: number
  taxRate?: number
  discountRate?: number
  currency?: string
  issueDate?: Date | string | null
  dueDate?: Date | string | null
  termsAndConditions?: string | null
  items: { description: string; quantity: number; price: number }[]
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  // Server-side calculation of the invoice total amount
  const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
  const discountRate = data.discountRate !== undefined ? Number(data.discountRate) : 0
  const taxRate = data.taxRate !== undefined ? Number(data.taxRate) : 0
  
  const discountAmount = subtotal * (discountRate / 100)
  const taxableAmount = subtotal - discountAmount
  const taxAmount = taxableAmount * (taxRate / 100)
  const totalAmount = taxableAmount + taxAmount

  const invoice = await prisma.invoice.create({
    data: {
      projectId: data.projectId,
      invoiceNumber: data.invoiceNumber,
      amount: totalAmount,
      paidAmount: data.paidAmount !== undefined ? Number(data.paidAmount) : 0,
      taxRate,
      discountRate,
      currency: data.currency || "USD",
      status: "DRAFT",
      issueDate: data.issueDate ? new Date(data.issueDate) : new Date(),
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      termsAndConditions: data.termsAndConditions,
      items: {
        create: data.items.map((item) => ({
          description: item.description,
          quantity: Number(item.quantity),
          price: Number(item.price),
        })),
      },
    },
    include: {
      project: true,
    },
  })

  await prisma.activity.create({
    data: {
      userId: session.user.id,
      entityType: "Invoice",
      entityId: invoice.id,
      action: "CREATED",
      metadata: { invoiceNumber: invoice.invoiceNumber, amount: totalAmount },
    },
  })

  revalidatePath("/admin/invoices")
  revalidatePath(`/admin/projects/${data.projectId}`)
  return invoice
}

export async function updateInvoiceStatus(id: string, status: any) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const invoice = await prisma.invoice.update({
    where: { id },
    data: { status },
    include: {
      project: true,
    },
  })

  await prisma.activity.create({
    data: {
      userId: session.user.id,
      entityType: "Invoice",
      entityId: invoice.id,
      action: "UPDATED",
      metadata: { invoiceNumber: invoice.invoiceNumber, status },
    },
  })

  revalidatePath("/admin/invoices")
  revalidatePath(`/admin/invoices/${id}`)
  return invoice
}

export async function updateInvoice(
  id: string,
  data: {
    projectId: string
    invoiceNumber: string
    paidAmount?: number
    taxRate?: number
    discountRate?: number
    currency: string
    issueDate?: Date | string | null
    dueDate?: Date | string | null
    termsAndConditions?: string | null
    items: { description: string; quantity: number; price: number }[]
  }
) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
  const discountRate = data.discountRate !== undefined ? Number(data.discountRate) : 0
  const taxRate = data.taxRate !== undefined ? Number(data.taxRate) : 0
  
  const discountAmount = subtotal * (discountRate / 100)
  const taxableAmount = subtotal - discountAmount
  const taxAmount = taxableAmount * (taxRate / 100)
  const totalAmount = taxableAmount + taxAmount

  const invoice = await prisma.$transaction(async (tx) => {
    // Delete existing items
    await tx.invoiceItem.deleteMany({
      where: { invoiceId: id }
    })

    // Update invoice and create new items
    return tx.invoice.update({
      where: { id },
      data: {
        projectId: data.projectId,
        invoiceNumber: data.invoiceNumber,
        amount: totalAmount,
        paidAmount: data.paidAmount !== undefined ? Number(data.paidAmount) : 0,
        taxRate,
        discountRate,
        currency: data.currency,
        issueDate: data.issueDate ? new Date(data.issueDate) : null,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        termsAndConditions: data.termsAndConditions,
        items: {
          create: data.items.map((item) => ({
            description: item.description,
            quantity: Number(item.quantity),
            price: Number(item.price),
          })),
        },
      },
      include: {
        project: true
      }
    })
  })

  await prisma.activity.create({
    data: {
      userId: session.user.id,
      entityType: "Invoice",
      entityId: invoice.id,
      action: "UPDATED",
      metadata: { invoiceNumber: invoice.invoiceNumber, amount: totalAmount }
    }
  })

  revalidatePath("/admin/invoices")
  revalidatePath(`/admin/invoices/${id}`)
  return invoice
}

export async function archiveInvoice(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const invoice = await prisma.invoice.update({
    where: { id },
    data: { isArchived: true },
    include: {
      project: true
    }
  })

  await prisma.activity.create({
    data: {
      userId: session.user.id,
      entityType: "Invoice",
      entityId: invoice.id,
      action: "ARCHIVED",
      metadata: { invoiceNumber: invoice.invoiceNumber }
    }
  })

  revalidatePath("/admin/invoices")
  return invoice
}
