
import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { prisma } from '../lib/prisma'
import styles from '../styles/Home.module.css'

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
    <div className={styles.container}>
      <Head>
        <title>Students List</title>
        <meta name="description" content="List of all students" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Students List</h1>
        
        <p className={styles.description}>
          Manage and view all registered students in the system.
        </p>

        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/add-student" className={styles.card} style={{ maxWidth: '200px', textAlign: 'center' }}>
            <h2>Add Student &rarr;</h2>
            <p>Register a new student in the system.</p>
          </Link>
          
          <Link href="/" className={styles.card} style={{ maxWidth: '200px', textAlign: 'center' }}>
            <h2>Back to Home &rarr;</h2>
            <p>Return to the main page.</p>
          </Link>
        </div>

        {students.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <p className={styles.description} style={{ fontSize: '1.2rem', color: '#666' }}>
              No students found
            </p>
            <p style={{ color: '#999', marginTop: '0.5rem' }}>
              Add some students to see them here
            </p>
          </div>
        ) : (
          <div style={{ 
            width: '100%', 
            maxWidth: '1200px', 
            backgroundColor: 'white', 
            borderRadius: '10px', 
            border: '1px solid #eaeaea',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#f5f5f5' }}>
                  <tr>
                    <th style={{ 
                      padding: '1rem', 
                      textAlign: 'left', 
                      fontSize: '0.875rem', 
                      fontWeight: '600', 
                      color: '#374151',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: '1px solid #eaeaea'
                    }}>
                      ID
                    </th>
                    <th style={{ 
                      padding: '1rem', 
                      textAlign: 'left', 
                      fontSize: '0.875rem', 
                      fontWeight: '600', 
                      color: '#374151',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: '1px solid #eaeaea'
                    }}>
                      Name
                    </th>
                    <th style={{ 
                      padding: '1rem', 
                      textAlign: 'left', 
                      fontSize: '0.875rem', 
                      fontWeight: '600', 
                      color: '#374151',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: '1px solid #eaeaea'
                    }}>
                      Surname
                    </th>
                    <th style={{ 
                      padding: '1rem', 
                      textAlign: 'left', 
                      fontSize: '0.875rem', 
                      fontWeight: '600', 
                      color: '#374151',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: '1px solid #eaeaea'
                    }}>
                      Email
                    </th>
                    <th style={{ 
                      padding: '1rem', 
                      textAlign: 'left', 
                      fontSize: '0.875rem', 
                      fontWeight: '600', 
                      color: '#374151',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: '1px solid #eaeaea'
                    }}>
                      Date of Birth
                    </th>
                    <th style={{ 
                      padding: '1rem', 
                      textAlign: 'left', 
                      fontSize: '0.875rem', 
                      fontWeight: '600', 
                      color: '#374151',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: '1px solid #eaeaea'
                    }}>
                      Field of Study
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.id} style={{ 
                      borderBottom: index < students.length - 1 ? '1px solid #f3f4f6' : 'none',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ 
                        padding: '1rem', 
                        fontSize: '0.875rem', 
                        fontWeight: '500', 
                        color: '#111827' 
                      }}>
                        {student.id}
                      </td>
                      <td style={{ 
                        padding: '1rem', 
                        fontSize: '0.875rem', 
                        color: '#111827' 
                      }}>
                        {student.name || 'N/A'}
                      </td>
                      <td style={{ 
                        padding: '1rem', 
                        fontSize: '0.875rem', 
                        color: '#111827' 
                      }}>
                        {student.surname || 'N/A'}
                      </td>
                      <td style={{ 
                        padding: '1rem', 
                        fontSize: '0.875rem', 
                        color: '#6b7280' 
                      }}>
                        {student.email}
                      </td>
                      <td style={{ 
                        padding: '1rem', 
                        fontSize: '0.875rem', 
                        color: '#6b7280' 
                      }}>
                        {student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : 'N/A'}
                      </td>
                      <td style={{ 
                        padding: '1rem', 
                        fontSize: '0.875rem', 
                        color: '#6b7280' 
                      }}>
                        {student.fieldOfStudy || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Total students: <span style={{ fontWeight: '600' }}>{students.length}</span>
          </p>
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
