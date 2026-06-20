"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function getClients() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  return prisma.client.findMany({
    where: { isArchived: false },
    include: {
      _count: {
        select: { projects: true }
      }
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function createClient(data: {
  name: string
  company?: string
  email?: string
  phone?: string
  address?: string
  notes?: string
}) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  const client = await prisma.client.create({
    data: {
      ...data,
      status: "LEAD",
    },
  })

  await prisma.activity.create({
    data: {
      userId: session.user.id,
      entityType: "Client",
      entityId: client.id,
      action: "CREATED",
      metadata: { newName: client.name },
    },
  })

  revalidatePath("/admin/clients")
  return client
}

export async function updateClient(
  id: string,
  data: {
    name?: string
    company?: string
    email?: string
    phone?: string
    address?: string
    notes?: string
    status?: any
  }
) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  const client = await prisma.client.update({
    where: { id },
    data,
  })

  await prisma.activity.create({
    data: {
      userId: session.user.id,
      entityType: "Client",
      entityId: client.id,
      action: "UPDATED",
    },
  })

  revalidatePath("/admin/clients")
  revalidatePath(`/admin/clients/${id}`)
  return client
}

export async function archiveClient(clientId: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  const client = await prisma.client.update({
    where: { id: clientId },
    data: { isArchived: true, status: "ARCHIVED" },
  })

  await prisma.activity.create({
    data: {
      userId: session.user.id,
      entityType: "Client",
      entityId: client.id,
      action: "ARCHIVED",
    },
  })

  revalidatePath("/admin/clients")
  return client
}

export async function getClientWithProjects(id: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  return prisma.client.findUnique({
    where: { id },
    include: {
      projects: {
        where: { isArchived: false },
        orderBy: { createdAt: "desc" }
      },
      followUps: {
        orderBy: { date: "desc" }
      }
    }
  })
}
