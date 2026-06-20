import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { notFound } from "next/navigation"
import EditExpenseForm from "./EditExpenseForm"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditExpensePage({ params }: PageProps) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  const { id } = await params

  const expense = await prisma.expense.findUnique({
    where: { id },
  })

  if (!expense || expense.isArchived) {
    notFound()
  }

  // Serialize properties to make them plain-object safe for client component
  const serializedExpense = {
    id: expense.id,
    title: expense.title,
    amount: expense.amount,
    currency: expense.currency,
    category: expense.category,
    date: expense.date ? expense.date.toISOString().split("T")[0] : "",
    notes: expense.notes,
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <EditExpenseForm expense={serializedExpense} />
    </div>
  )
}
