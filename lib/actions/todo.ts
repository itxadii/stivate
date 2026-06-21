"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function getTodos() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.todo.findMany({
    where: { userId: session.user.id },
    orderBy: [
      { completed: "asc" },
      { createdAt: "desc" }
    ]
  })
}

export async function createTodo(title: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  if (!title || title.trim() === "") throw new Error("Title cannot be empty")

  const todo = await prisma.todo.create({
    data: {
      userId: session.user.id,
      title: title.trim(),
      completed: false
    }
  })

  revalidatePath("/admin/todos")
  revalidatePath("/")
  return todo
}

export async function toggleTodo(id: string, completed: boolean) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const existing = await prisma.todo.findUnique({
    where: { id }
  })

  if (!existing || existing.userId !== session.user.id) {
    throw new Error("Unauthorized or task not found")
  }

  const todo = await prisma.todo.update({
    where: { id },
    data: { completed }
  })

  revalidatePath("/admin/todos")
  revalidatePath("/")
  return todo
}

export async function deleteTodo(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const existing = await prisma.todo.findUnique({
    where: { id }
  })

  if (!existing || existing.userId !== session.user.id) {
    throw new Error("Unauthorized or task not found")
  }

  const todo = await prisma.todo.delete({
    where: { id }
  })

  revalidatePath("/admin/todos")
  revalidatePath("/")
  return todo
}
