"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function getLeads() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.lead.findMany({
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

export async function getLeadWithFollowUps(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.lead.findUnique({
    where: { id },
    include: {
      client: true,
      followUps: {
        orderBy: {
          date: "desc",
        },
      },
    },
  })
}

export async function createFollowUp(data: {
  leadId: string
  discussed: string
  date?: Date | string | null
  notes?: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const followUp = await prisma.followUp.create({
    data: {
      leadId: data.leadId,
      discussed: data.discussed,
      date: data.date ? new Date(data.date) : new Date(),
      notes: data.notes || null,
    },
  })

  // Touch the parent lead's updatedAt timestamp to bring it to the top
  await prisma.lead.update({
    where: { id: data.leadId },
    data: {
      updatedAt: new Date(),
    },
  })

  await prisma.activity.create({
    data: {
      entityType: "FollowUp",
      entityId: followUp.id,
      action: "CREATED",
      userId: session.user.id,
      metadata: { leadId: data.leadId }
    }
  })

  revalidatePath("/admin/leads")
  revalidatePath(`/admin/leads/${data.leadId}`)
  return followUp
}

export async function createLead(data: {
  name: string
  clientName: string
  clientId?: string | null
  phone?: string
  status?: "HOTTEST" | "WARM" | "COLD"
  initializedAt?: Date | string | null
  notes?: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const lead = await prisma.lead.create({
    data: {
      name: data.name,
      clientName: data.clientName,
      clientId: data.clientId || null,
      phone: data.phone || null,
      status: data.status || "WARM",
      initializedAt: data.initializedAt ? new Date(data.initializedAt) : new Date(),
      notes: data.notes || null,
    },
  })

  await prisma.activity.create({
    data: {
      entityType: "Lead",
      entityId: lead.id,
      action: "CREATED",
      userId: session.user.id,
      metadata: { name: lead.name, clientName: lead.clientName }
    }
  })

  revalidatePath("/admin/leads")
  revalidatePath("/")
  return lead
}

export async function archiveLead(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const lead = await prisma.lead.update({
    where: { id },
    data: {
      isArchived: true,
    },
  })

  await prisma.activity.create({
    data: {
      entityType: "Lead",
      entityId: lead.id,
      action: "ARCHIVED",
      userId: session.user.id,
    }
  })

  revalidatePath("/admin/leads")
  revalidatePath("/")
  return lead
}
