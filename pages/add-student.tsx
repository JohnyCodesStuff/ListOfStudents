
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

const AddStudent: NextPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    dateOfBirth: '',
    fieldOfStudy: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/list')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to add student')
      }
    } catch (error) {
      setError('An error occurred while adding the student')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Add Student</title>
        <meta name="description" content="Add a new student" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Add New Student</h1>
            <Link 
              href="/list" 
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Back to List
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-2">
                  Surname *
                </label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700 mb-2">
                  Field of Study
                </label>
                <select
                  id="fieldOfStudy"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a field</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Business">Business</option>
                  <option value="Psychology">Psychology</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {isSubmitting ? 'Adding Student...' : 'Add Student'}
                </button>
                <Link
                  href="/list"
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AddStudent
