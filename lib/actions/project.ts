"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function getProjects() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.project.findMany({
    where: {
      isArchived: false,
    },
    include: {
      client: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })
}

export async function createProject(data: {
  clientId: string
  name: string
  description?: string
  status?: any
  value?: number
  currency?: string
  startDate?: Date | string | null
  dueDate?: Date | string | null
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const project = await prisma.project.create({
    data: {
      clientId: data.clientId,
      name: data.name,
      description: data.description,
      status: data.status || "LEAD",
      value: data.value,
      currency: data.currency || "USD",
      startDate: data.startDate ? new Date(data.startDate) : null,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
    },
  })

  await prisma.activity.create({
    data: {
      entityType: "Project",
      entityId: project.id,
      action: "CREATED",
      userId: session.user.id,
      metadata: { name: project.name }
    }
  })

  revalidatePath("/admin/projects")
  revalidatePath(`/admin/clients/${data.clientId}`)
  return project
}

export async function updateProject(
  id: string,
  data: {
    clientId?: string
    name?: string
    description?: string
    status?: any
    value?: number
    currency?: string
    startDate?: Date | string | null
    dueDate?: Date | string | null
  }
) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const updateData: any = { ...data }
  if (data.startDate !== undefined) updateData.startDate = data.startDate ? new Date(data.startDate) : null
  if (data.dueDate !== undefined) updateData.dueDate = data.dueDate ? new Date(data.dueDate) : null

  const project = await prisma.project.update({
    where: { id },
    data: updateData,
  })

  await prisma.activity.create({
    data: {
      entityType: "Project",
      entityId: project.id,
      action: "UPDATED",
      userId: session.user.id,
    }
  })

  revalidatePath("/admin/projects")
  if (data.clientId || project.clientId) {
    revalidatePath(`/admin/clients/${data.clientId || project.clientId}`)
  }
  return project
}

export async function archiveProject(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const project = await prisma.project.update({
    where: { id },
    data: {
      isArchived: true,
    },
  })

  await prisma.activity.create({
    data: {
      entityType: "Project",
      entityId: project.id,
      action: "ARCHIVED",
      userId: session.user.id,
    }
  })

  revalidatePath("/admin/projects")
  revalidatePath(`/admin/clients/${project.clientId}`)
  return project
}

export async function getProject(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.project.findUnique({
    where: { id },
    include: {
      client: true
    }
  })
}
