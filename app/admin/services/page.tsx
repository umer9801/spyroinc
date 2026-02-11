'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Service {
  id: number
  title: string
  description: string
  price: string
}

export default function AdminServices() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      title: 'Basement Renovation',
      description: 'Complete basement finishing with waterproofing',
      price: 'From $15,000',
    },
    {
      id: 2,
      title: 'Flooring Installation',
      description: 'Premium hardwood, vinyl, and tile flooring',
      price: 'From $5,000',
    },
    {
      id: 3,
      title: 'General Renovation',
      description: 'Kitchen, bathroom, and whole-home renovations',
      price: 'Custom Quote',
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
    setServices(services.filter((s) => s.id !== id))
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
            <h1 className="text-3xl font-bold">Manage Services</h1>
          </div>
          <button className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all font-semibold">
            <Plus size={20} />
            Add Service
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-card border border-primary border-opacity-20 rounded-xl p-6 hover:border-primary transition-all animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-2xl font-bold text-primary mb-3">{service.title}</h3>
              <p className="text-gray-300 mb-4">{service.description}</p>
              <p className="text-white font-bold mb-6">{service.price}</p>

              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 bg-opacity-20 text-blue-400 rounded-lg hover:bg-opacity-30 transition-all font-semibold text-sm">
                  <Edit2 size={18} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 bg-opacity-20 text-red-400 rounded-lg hover:bg-opacity-30 transition-all font-semibold text-sm"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Service Form */}
        <div className="mt-12 bg-card border border-primary border-opacity-20 rounded-xl p-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-3xl font-bold text-white mb-8">Add New Service</h2>

          <form className="space-y-6 max-w-2xl">
            <div>
              <label htmlFor="serviceTitle" className="block text-white font-semibold mb-2">
                Service Title
              </label>
              <input
                type="text"
                id="serviceTitle"
                className="w-full bg-secondary text-white rounded-lg px-4 py-3 border border-primary border-opacity-20 focus:border-primary focus:outline-none transition-all"
                placeholder="e.g., Basement Renovation"
              />
            </div>

            <div>
              <label htmlFor="serviceDesc" className="block text-white font-semibold mb-2">
                Description
              </label>
              <textarea
                id="serviceDesc"
                rows={4}
                className="w-full bg-secondary text-white rounded-lg px-4 py-3 border border-primary border-opacity-20 focus:border-primary focus:outline-none transition-all resize-none"
                placeholder="Describe this service..."
              />
            </div>

            <div>
              <label htmlFor="servicePrice" className="block text-white font-semibold mb-2">
                Price / Quote
              </label>
              <input
                type="text"
                id="servicePrice"
                className="w-full bg-secondary text-white rounded-lg px-4 py-3 border border-primary border-opacity-20 focus:border-primary focus:outline-none transition-all"
                placeholder="e.g., From $15,000 or Custom Quote"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all"
            >
              Add Service
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
