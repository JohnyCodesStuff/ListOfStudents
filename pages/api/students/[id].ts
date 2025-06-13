
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

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
  res: NextApiResponse<Student | { error: string } | { message: string }>
) {
  const { id } = req.query
  const studentId = parseInt(id as string)

  if (isNaN(studentId)) {
    return res.status(400).json({ error: 'Invalid student ID' })
  }

  if (req.method === 'GET') {
    try {
      const student = await prisma.user.findUnique({
        where: { id: studentId },
        select: {
          id: true,
          email: true,
          name: true,
          surname: true,
          dateOfBirth: true,
          fieldOfStudy: true
        }
      })

      if (!student) {
        return res.status(404).json({ error: 'Student not found' })
      }

      res.status(200).json(student)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch student' })
    }
  } else if (req.method === 'PUT') {
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

      const student = await prisma.user.update({
        where: { id: studentId },
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

      res.status(200).json(student)
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(409).json({ error: 'A student with this email already exists' })
      } else if (error.code === 'P2025') {
        res.status(404).json({ error: 'Student not found' })
      } else {
        res.status(500).json({ error: 'Failed to update student' })
      }
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.user.delete({
        where: { id: studentId }
      })

      res.status(200).json({ message: 'Student deleted successfully' })
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Student not found' })
      } else {
        res.status(500).json({ error: 'Failed to delete student' })
      }
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    res.status(405).json({ error: 'Method not allowed' })
  }
}
