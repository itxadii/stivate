"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function getExpenses() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.expense.findMany({
    where: { isArchived: false },
    orderBy: { date: "desc" }
  })
}

export async function createExpense(data: {
  title: string
  amount: number
  currency?: string
  category: string
  date?: Date | string | null
  notes?: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const expense = await prisma.expense.create({
    data: {
      title: data.title,
      amount: data.amount,
      currency: data.currency || "USD",
      category: data.category,
      date: data.date ? new Date(data.date) : new Date(),
      notes: data.notes || null,
    }
  })

  await prisma.activity.create({
    data: {
      userId: session.user.id,
      entityType: "Expense",
      entityId: expense.id,
      action: "CREATED",
      metadata: { title: expense.title, amount: expense.amount, currency: expense.currency }
    }
  })

  revalidatePath("/admin/expenses")
  revalidatePath("/")
  return expense
}

export async function updateExpense(
  id: string,
  data: {
    title?: string
    amount?: number
    currency?: string
    category?: string
    date?: Date | string | null
    notes?: string
  }
) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const expense = await prisma.expense.update({
    where: { id },
    data: {
      title: data.title,
      amount: data.amount,
      currency: data.currency,
      category: data.category,
      date: data.date ? new Date(data.date) : undefined,
      notes: data.notes,
    }
  })

  await prisma.activity.create({
    data: {
      userId: session.user.id,
      entityType: "Expense",
      entityId: expense.id,
      action: "UPDATED"
    }
  })

  revalidatePath("/admin/expenses")
  revalidatePath("/")
  return expense
}

export async function archiveExpense(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const expense = await prisma.expense.update({
    where: { id },
    data: { isArchived: true }
  })

  await prisma.activity.create({
    data: {
      userId: session.user.id,
      entityType: "Expense",
      entityId: expense.id,
      action: "ARCHIVED"
    }
  })

  revalidatePath("/admin/expenses")
  revalidatePath("/")
  return expense
}
