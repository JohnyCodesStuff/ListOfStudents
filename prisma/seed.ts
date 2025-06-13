
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample students
  const students = [
    { email: 'john.doe@example.com', name: 'John Doe' },
    { email: 'jane.smith@example.com', name: 'Jane Smith' },
    { email: 'mike.johnson@example.com', name: 'Mike Johnson' },
    { email: 'sarah.wilson@example.com', name: 'Sarah Wilson' },
    { email: 'alex.brown@example.com', name: 'Alex Brown' }
  ]

  for (const student of students) {
    await prisma.user.upsert({
      where: { email: student.email },
      update: {},
      create: student
    })
  }

  console.log('Database seeded with sample students!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
