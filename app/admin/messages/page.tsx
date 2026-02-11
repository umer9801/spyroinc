'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Trash2, Mail } from 'lucide-react'
import Link from 'next/link'

interface Message {
  id: number
  name: string
  email: string
  phone: string
  service: string
  message: string
  date: string
  status: 'new' | 'read' | 'replied'
}

export default function AdminMessages() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      service: 'Basement Renovation',
      message: 'I am interested in finishing my basement. Can you provide a quote?',
      date: '2024-02-10',
      status: 'new',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '(555) 234-5678',
      service: 'Flooring Installation',
      message: 'We need to replace the flooring in our kitchen and living room.',
      date: '2024-02-09',
      status: 'read',
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael@example.com',
      phone: '(555) 345-6789',
      service: 'General Renovation',
      message: 'Looking for a contractor for a complete home renovation project.',
      date: '2024-02-08',
      status: 'replied',
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
    setMessages(messages.filter((m) => m.id !== id))
  }

  const handleMarkAsRead = (id: number) => {
    setMessages(
      messages.map((m) =>
        m.id === id ? { ...m, status: m.status === 'new' ? 'read' : m.status } : m
      )
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-primary bg-opacity-20 text-primary'
      case 'read':
        return 'bg-blue-500 bg-opacity-20 text-blue-400'
      case 'replied':
        return 'bg-green-500 bg-opacity-20 text-green-400'
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
            <h1 className="text-3xl font-bold">Contact Messages</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-card border border-primary border-opacity-20 rounded-xl p-6 hover:border-primary transition-all animate-fade-in-up"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{msg.name}</h3>
                  <p className="text-gray-400 text-sm">{msg.date}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-xs font-semibold capitalize ${getStatusColor(
                    msg.status
                  )}`}
                >
                  {msg.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-xs font-semibold mb-1">Email</p>
                  <a href={`mailto:${msg.email}`} className="text-primary hover:underline">
                    {msg.email}
                  </a>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-semibold mb-1">Phone</p>
                  <a href={`tel:${msg.phone}`} className="text-primary hover:underline">
                    {msg.phone}
                  </a>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-semibold mb-1">Service</p>
                  <p className="text-gray-300">{msg.service}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-400 text-xs font-semibold mb-2">Message</p>
                <p className="text-gray-300 leading-relaxed">{msg.message}</p>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => handleMarkAsRead(msg.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 bg-opacity-20 text-blue-400 rounded-lg hover:bg-opacity-30 transition-all font-semibold text-sm"
                >
                  <Mail size={16} />
                  Mark as Read
                </button>
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="px-4 py-2 bg-red-500 bg-opacity-20 text-red-400 rounded-lg hover:bg-opacity-30 transition-all font-semibold text-sm"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
