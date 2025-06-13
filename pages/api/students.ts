
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

type Student = {
  id: number
  email: string
  name: string | null
  surname: string | null
  dateOfBirth: string | null
  fieldOfStudy: string | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Student[] | Student | { error: string }>
) {
  if (req.method === 'GET') {
    try {
      const students = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          surname: true,
          dateOfBirth: true,
          fieldOfStudy: true
        },
        orderBy: {
          name: 'asc'
        }
      })
      res.status(200).json(students)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch students' })
    }
  } else if (req.method === 'POST') {
    try {
      const { name, surname, email, dateOfBirth, fieldOfStudy } = req.body

      if (!name || !surname || !email) {
        return res.status(400).json({ error: 'Name, surname, and email are required' })
      }

      const studentData = {
        name,
        surname,
        email,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        fieldOfStudy: fieldOfStudy || null
      }

      const student = await prisma.user.create({
        data: studentData,
        select: {
          id: true,
          email: true,
          name: true,
          surname: true,
          dateOfBirth: true,
          fieldOfStudy: true
        }
      })

      res.status(201).json(student)
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(409).json({ error: 'A student with this email already exists' })
      } else {
        res.status(500).json({ error: 'Failed to create student' })
      }
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).json({ error: 'Method not allowed' })
  }
}
