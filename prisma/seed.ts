import { config } from 'dotenv'
config()
import { prisma } from '../lib/prisma'

async function main() {
  const superadmin = await prisma.user.upsert({
    where: { email: 'kolpeprathamesh@gmail.com' },
    update: { role: 'SUPERADMIN' },
    create: {
      email: 'kolpeprathamesh@gmail.com',
      name: 'Prathamesh Kolpe',
      role: 'SUPERADMIN',
    },
  })

  const admin = await prisma.user.upsert({
    where: { email: 'adityawaghmarex@gmail.com' },
    update: { role: 'ADMIN' },
    create: {
      email: 'adityawaghmarex@gmail.com',
      name: 'Aditya Waghmare',
      role: 'ADMIN',
    },
  })

  console.log('Seeded users:', { superadmin, admin })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
