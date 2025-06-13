
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample students
  const students = [
    { 
      email: 'john.doe@example.com', 
      name: 'John', 
      surname: 'Doe',
      dateOfBirth: new Date('1998-05-15'),
      fieldOfStudy: 'Computer Science'
    },
    { 
      email: 'jane.smith@example.com', 
      name: 'Jane', 
      surname: 'Smith',
      dateOfBirth: new Date('1999-08-22'),
      fieldOfStudy: 'Mathematics'
    },
    { 
      email: 'mike.johnson@example.com', 
      name: 'Mike', 
      surname: 'Johnson',
      dateOfBirth: new Date('1997-12-03'),
      fieldOfStudy: 'Physics'
    },
    { 
      email: 'sarah.wilson@example.com', 
      name: 'Sarah', 
      surname: 'Wilson',
      dateOfBirth: new Date('2000-01-18'),
      fieldOfStudy: 'Biology'
    },
    { 
      email: 'alex.brown@example.com', 
      name: 'Alex', 
      surname: 'Brown',
      dateOfBirth: new Date('1998-09-10'),
      fieldOfStudy: 'Chemistry'
    }
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
