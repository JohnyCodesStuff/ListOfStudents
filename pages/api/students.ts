
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

type Student = {
  id: number
  email: string
  name: string | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Student[] | { error: string }>
) {
  if (req.method === 'GET') {
    try {
      const students = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true
        },
        orderBy: {
          name: 'asc'
        }
      })
      res.status(200).json(students)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch students' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ error: 'Method not allowed' })
  }
}
