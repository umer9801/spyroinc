'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Project {
  id: number
  name: string
  service: string
  client: string
  status: 'completed' | 'in-progress' | 'scheduled'
  date: string
}

export default function AdminProjects() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: 'Downtown Basement Renovation',
      service: 'Basement',
      client: 'John Smith',
      status: 'completed',
      date: '2024-01-15',
    },
    {
      id: 2,
      name: 'Premium Flooring Installation',
      service: 'Flooring',
      client: 'Sarah Johnson',
      status: 'in-progress',
      date: '2024-02-01',
    },
    {
      id: 3,
      name: 'Full Home Renovation',
      service: 'General',
      client: 'Michael Brown',
      status: 'scheduled',
      date: '2024-03-01',
    },
  ])

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleDelete = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 bg-opacity-20 text-green-400'
      case 'in-progress':
        return 'bg-primary bg-opacity-20 text-primary'
      case 'scheduled':
        return 'bg-blue-500 bg-opacity-20 text-blue-400'
      default:
        return 'bg-gray-500 bg-opacity-20 text-gray-400'
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:opacity-80 transition-opacity">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold">Manage Projects</h1>
          </div>
          <button className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all font-semibold">
            <Plus size={20} />
            Add Project
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-card border border-primary border-opacity-20 rounded-xl p-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary border-opacity-20">
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold">Project Name</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold">Service</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold">Client</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold">Status</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold">Date</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-primary border-opacity-10 hover:bg-secondary transition-colors"
                  >
                    <td className="py-4 px-4 text-white font-semibold">{project.name}</td>
                    <td className="py-4 px-4 text-gray-300">{project.service}</td>
                    <td className="py-4 px-4 text-gray-300">{project.client}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-400">{project.date}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 bg-blue-500 bg-opacity-20 text-blue-400 rounded-lg hover:bg-opacity-30 transition-all">
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-2 bg-red-500 bg-opacity-20 text-red-400 rounded-lg hover:bg-opacity-30 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
