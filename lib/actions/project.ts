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
  budget?: number
  deadline?: Date
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const project = await prisma.project.create({
    data: {
      ...data,
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
    budget?: number
    deadline?: Date
  }
) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const project = await prisma.project.update({
    where: { id },
    data,
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
