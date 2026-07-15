"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { EnquiryStatus } from "@prisma/client"
import { sendEnquiryEmail } from "@/lib/mail"

export async function createEnquiry(data: {
  name: string
  email: string
  whatsapp: string
  businessType: string
  erpSystem: string
  challenge: string
}) {
  if (!data.name || !data.email || !data.whatsapp || !data.businessType || !data.erpSystem || !data.challenge) {
    throw new Error("Missing required form fields")
  }

  const enquiry = await prisma.enquiry.create({
    data: {
      name: data.name.trim(),
      email: data.email.trim(),
      whatsapp: data.whatsapp.trim(),
      businessType: data.businessType.trim(),
      erpSystem: data.erpSystem.trim(),
      challenge: data.challenge.trim(),
    },
  })

  // Trigger email notification
  await sendEnquiryEmail(enquiry)

  revalidatePath("/admin/enquiries")
  revalidatePath("/admin")
  return enquiry
}

export async function getEnquiries() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.enquiry.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
}

export async function getEnquiryById(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.enquiry.findUnique({
    where: { id },
  })
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const enquiry = await prisma.enquiry.update({
    where: { id },
    data: { status },
  })

  // Create audit activity
  await prisma.activity.create({
    data: {
      entityType: "Enquiry",
      entityId: enquiry.id,
      action: "UPDATED",
      userId: session.user.id,
      metadata: { status },
    },
  })

  revalidatePath("/admin/enquiries")
  revalidatePath(`/admin/enquiries/${id}`)
  revalidatePath("/admin")
  return enquiry
}

export async function convertEnquiryToLead(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const enquiry = await prisma.enquiry.findUnique({
    where: { id },
  })

  if (!enquiry) {
    throw new Error("Enquiry not found")
  }

  // Create a Lead based on the Enquiry details
  const leadName = `${enquiry.businessType} Audit`
  const leadNotes = `Corporate Email: ${enquiry.email}\nERP System: ${enquiry.erpSystem}\nOperational Challenge: ${enquiry.challenge}`

  const lead = await prisma.lead.create({
    data: {
      name: leadName,
      clientName: enquiry.name,
      phone: enquiry.whatsapp,
      status: "HOTTEST", // Set to Hottest as they reached out
      notes: leadNotes,
    },
  })

  // Update Enquiry status to CONVERTED
  await prisma.enquiry.update({
    where: { id },
    data: { status: "CONVERTED" },
  })

  // Create activity for the Enquiry transition
  await prisma.activity.create({
    data: {
      entityType: "Enquiry",
      entityId: id,
      action: "CONVERTED",
      userId: session.user.id,
      metadata: { leadId: lead.id, leadName },
    },
  })

  // Create activity for Lead creation
  await prisma.activity.create({
    data: {
      entityType: "Lead",
      entityId: lead.id,
      action: "CREATED",
      userId: session.user.id,
      metadata: { name: lead.name, clientName: lead.clientName, source: "Enquiry" },
    },
  })

  revalidatePath("/admin/enquiries")
  revalidatePath(`/admin/enquiries/${id}`)
  revalidatePath("/admin/leads")
  revalidatePath("/admin")
  return { enquiry, lead }
}

export async function deleteEnquiry(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const enquiry = await prisma.enquiry.delete({
    where: { id },
  })

  // Create audit activity
  await prisma.activity.create({
    data: {
      entityType: "Enquiry",
      entityId: id,
      action: "DELETED",
      userId: session.user.id,
      metadata: { name: enquiry.name },
    },
  })

  revalidatePath("/admin/enquiries")
  revalidatePath("/admin")
  return enquiry
}
