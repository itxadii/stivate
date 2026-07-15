const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

async function run() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  // Connect using neon http/websocket client
  const sql = neon(databaseUrl);

  console.log("Connecting to database and applying schema changes...");

  try {
    // 1. Create EnquiryStatus Enum if not exists
    // PostgreSQL doesn't support IF NOT EXISTS for CREATE TYPE natively, so check if it exists first
    const enumCheck = await sql`
      SELECT 1 FROM pg_type WHERE typname = 'EnquiryStatus';
    `;

    if (enumCheck.length === 0) {
      console.log("Creating enum EnquiryStatus...");
      await sql`
        CREATE TYPE "EnquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'CONVERTED', 'ARCHIVED');
      `;
      console.log("Enum EnquiryStatus created.");
    } else {
      console.log("Enum EnquiryStatus already exists.");
    }

    // 2. Create Enquiry Table
    console.log("Creating table Enquiry...");
    await sql`
      CREATE TABLE IF NOT EXISTS "Enquiry" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "whatsapp" TEXT NOT NULL,
        "businessType" TEXT NOT NULL,
        "erpSystem" TEXT NOT NULL,
        "challenge" TEXT NOT NULL,
        "status" "EnquiryStatus" NOT NULL DEFAULT 'NEW',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "Enquiry_pkey" PRIMARY KEY ("id")
      );
    `;
    console.log("Table Enquiry created or verified.");

    console.log("Schema changes applied successfully!");
  } catch (error) {
    console.error("Failed to apply schema changes:", error);
    process.exit(1);
  }
}

run();
