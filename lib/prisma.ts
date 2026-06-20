import { PrismaClient } from "@prisma/client"
import { Pool, neonConfig } from "@neondatabase/serverless"
import { PrismaNeon } from "@prisma/adapter-neon"
import ws from "ws"

neonConfig.webSocketConstructor = ws

const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_JmN1q8swQEAI@ep-autumn-waterfall-ah2kn3ip-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&pgbouncer=true&channel_binding=require"


const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const createPrismaClient = () => {
  const pool = new Pool({ connectionString })
  const adapter = new PrismaNeon(pool as any)
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
