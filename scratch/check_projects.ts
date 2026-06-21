import "dotenv/config"
import { prisma } from "../lib/prisma"

async function main() {
  const projects = await prisma.project.findMany({
    include: { client: true }
  })
  console.log("PROJECTS:")
  console.dir(projects, { depth: null })

  const invoices = await prisma.invoice.findMany()
  console.log("INVOICES:")
  console.dir(invoices, { depth: null })

  const expenses = await prisma.expense.findMany()
  console.log("EXPENSES:")
  console.dir(expenses, { depth: null })
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
