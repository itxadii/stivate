import { getEnquiryById } from "@/lib/actions/enquiry"
import { notFound, redirect } from "next/navigation"
import EnquiryDetailView from "./EnquiryDetailView"
import { auth } from "@/auth"

export const metadata = {
  title: "Enquiry Profile | Stivate Team",
}

export const dynamic = "force-dynamic"

export default async function EnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }

  const { id } = await params
  const enquiry = await getEnquiryById(id)

  if (!enquiry) {
    notFound()
  }

  // Map database dates to Javascript Date objects
  const serializedEnquiry = {
    id: enquiry.id,
    name: enquiry.name,
    email: enquiry.email,
    whatsapp: enquiry.whatsapp,
    businessType: enquiry.businessType,
    erpSystem: enquiry.erpSystem,
    challenge: enquiry.challenge,
    status: enquiry.status,
    createdAt: enquiry.createdAt,
    updatedAt: enquiry.updatedAt,
  }

  return <EnquiryDetailView enquiry={serializedEnquiry} />
}
