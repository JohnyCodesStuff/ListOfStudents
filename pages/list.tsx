
import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { prisma } from '../lib/prisma'

type Student = {
  id: number
  email: string
  name: string | null
  surname: string | null
  dateOfBirth: string | null
  fieldOfStudy: string | null
}

type Props = {
  students: Student[]
}

const StudentsList: NextPage<Props> = ({ students }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Students List</title>
        <meta name="description" content="List of all students" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Students List</h1>
            <div className="space-x-4">
              <Link 
                href="/add-student" 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add Student
              </Link>
              <Link 
                href="/" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>

          {students.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No students found</p>
              <p className="text-gray-400 mt-2">Add some students to see them here</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Surname
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date of Birth
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Field of Study
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.name || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.surname || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.fieldOfStudy || 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Total students: <span className="font-semibold">{students.length}</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
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

    return {
      props: {
        students: JSON.parse(JSON.stringify(students))
      }
    }
  } catch (error) {
    console.error('Error fetching students:', error)
    return {
      props: {
        students: []
      }
    }
  }
}

export default StudentsList
