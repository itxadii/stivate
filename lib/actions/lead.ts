"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

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
  leadId?: string | null
  clientId?: string | null
  discussed: string
  date?: Date | string | null
  notes?: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  if (!data.leadId && !data.clientId) {
    throw new Error("Either leadId or clientId must be provided")
  }

  const followUp = await prisma.followUp.create({
    data: {
      leadId: data.leadId || null,
      clientId: data.clientId || null,
      discussed: data.discussed,
      date: data.date ? new Date(data.date) : new Date(),
      notes: data.notes || null,
    },
  })

  if (data.leadId) {
    // Touch the parent lead's updatedAt timestamp to bring it to the top
    await prisma.lead.update({
      where: { id: data.leadId },
      data: {
        updatedAt: new Date(),
      },
    })
  }

  if (data.clientId) {
    // Touch the client's updatedAt timestamp
    await prisma.client.update({
      where: { id: data.clientId },
      data: {
        updatedAt: new Date(),
      },
    })
  }

  await prisma.activity.create({
    data: {
      entityType: "FollowUp",
      entityId: followUp.id,
      action: "CREATED",
      userId: session.user.id,
      metadata: { leadId: data.leadId || null, clientId: data.clientId || null }
    }
  })

  if (data.leadId) {
    revalidatePath("/admin/leads")
    revalidatePath(`/admin/leads/${data.leadId}`)
  }
  if (data.clientId) {
    revalidatePath("/admin/clients")
    revalidatePath(`/admin/clients/${data.clientId}`)
  }
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

export async function convertLeadToClient(leadId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
  })
  if (!lead) throw new Error("Lead not found")

  let clientId = lead.clientId

  // 1. If lead is not linked to any Client, create a new Client record
  if (!clientId) {
    const client = await prisma.client.create({
      data: {
        name: lead.clientName,
        phone: lead.phone || null,
        notes: lead.notes ? `Converted from Lead Pitch: ${lead.notes}` : "Converted from Lead Pitch",
        status: "ACTIVE",
      },
    })
    clientId = client.id

    await prisma.activity.create({
      data: {
        userId: session.user.id,
        entityType: "Client",
        entityId: client.id,
        action: "CREATED",
        metadata: { newName: client.name, source: "Lead Conversion" },
      },
    })
  } else {
    // Ensure existing client is ACTIVE
    await prisma.client.update({
      where: { id: clientId },
      data: {
        status: "ACTIVE",
      },
    })
  }

  // 2. Create a new project under the Client
  const project = await prisma.project.create({
    data: {
      clientId: clientId,
      name: lead.name,
      status: "ACTIVE",
    },
  })

  // 3. Mark the Lead as archived (so it's "moved" from leads table) and link to client
  await prisma.lead.update({
    where: { id: leadId },
    data: {
      clientId: clientId,
      isArchived: true,
    },
  })

  // Migrate all follow-up records belonging to this lead to point to the client as well
  await prisma.followUp.updateMany({
    where: { leadId: leadId },
    data: {
      clientId: clientId,
    },
  })

  // 4. Log conversion activity
  await prisma.activity.create({
    data: {
      userId: session.user.id,
      entityType: "Lead",
      entityId: leadId,
      action: "CONVERTED",
      metadata: { clientId, projectId: project.id },
    },
  })

  // Revalidate cache
  revalidatePath("/admin/leads")
  revalidatePath("/admin/clients")
  revalidatePath("/admin/projects")
  revalidatePath("/")

  // Redirect to client editing page so user can update client details
  redirect(`/admin/clients/${clientId}/edit`)
}
