import { prisma } from "@/lib/prisma"
import NewLeadForm from "./NewLeadForm"

export default async function NewLeadPage() {
  const clients = await prisma.client.findMany({
    where: {
      isArchived: false,
    },
    orderBy: {
      name: "asc",
    },
  })

  return <NewLeadForm clients={clients} />
}
