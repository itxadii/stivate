import { prisma } from "@/lib/prisma"
import NewProjectForm from "./NewProjectForm"

export default async function NewProjectPage() {
  const clients = await prisma.client.findMany({
    where: {
      isArchived: false,
    },
    orderBy: {
      name: "asc",
    },
  })

  return <NewProjectForm clients={clients} />
}
