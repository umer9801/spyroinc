'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Users, FileText, MessageSquare, BarChart3, Phone } from 'lucide-react'
import Link from 'next/link'

interface ContactMessage {
  _id: number
  name: string
  email: string
  service: string
  createdAt: string
  status: 'new' | 'read' | 'replied'
}

import axios from 'axios'
import { toast } from 'sonner'

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [stats, setStats] = useState([
    { icon: FileText, label: 'Total Projects', value: '...', color: 'text-blue-500', href: '/admin/projects' },
    { icon: Users, label: 'Satisfied Clients', value: '200+', color: 'text-green-500', href: '#' },
    { icon: MessageSquare, label: 'New Messages', value: '...', color: 'text-primary', href: '/admin/messages' },
    { icon: BarChart3, label: 'Revenue', value: '$450K+', color: 'text-yellow-500', href: '#' },
  ])

  useEffect(() => {
    async function fetchData() {
      try {
        const [contactsRes, projectsRes, servicesRes] = await Promise.all([
          axios.get('/api/admin/contacts'),
          axios.get('/api/admin/projects'),
          axios.get('/api/admin/services')
        ]);

        const contactsData = contactsRes.data;
        const projectsData = projectsRes.data;
        const servicesData = servicesRes.data;

        if (contactsData.success) {
          setMessages(contactsData.data.slice(0, 5)); // Show only latest 5

          setStats(prev => [
            { ...prev[0], value: projectsData.data?.length.toString() || '0' },
            prev[1],
            { ...prev[2], value: contactsData.data?.length.toString() || '0' },
            prev[3]
          ]);
        }
      } catch (error: any) {
        if (error.response?.status === 401) {
          router.push('/admin/login');
        } else {
          console.error("Error fetching dashboard data:", error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router])

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout')
      toast.success("Logged out successfully")
      router.push('/admin/login')
    } catch (error) {
      console.error("Logout failed:", error)
      toast.error("Logout failed")
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading Dashboard...</div>
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">SPYRO INC - Admin</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all font-semibold"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="bg-card border border-primary border-opacity-20 rounded-xl p-6 hover:border-primary transition-all animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`${stat.color}`} size={32} />
                </div>
                <p className="text-gray-400 text-sm font-semibold">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/admin/projects"
            className="bg-card border border-primary border-opacity-20 rounded-xl p-6 hover:border-primary transition-all animate-fade-in-up group"
          >
            <FileText className="text-primary mb-3 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-lg font-bold text-white mb-2">Manage Projects</h3>
            <p className="text-gray-400">View and manage all projects</p>
          </Link>

          <Link
            href="/admin/services"
            className="bg-card border border-primary border-opacity-20 rounded-xl p-6 hover:border-primary transition-all animate-fade-in-up group"
            style={{ animationDelay: '0.1s' }}
          >
            <BarChart3 className="text-primary mb-3 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-lg font-bold text-white mb-2">Services</h3>
            <p className="text-gray-400">Edit service offerings</p>
          </Link>

          <Link
            href="/admin/contact"
            className="bg-card border border-primary border-opacity-20 rounded-xl p-6 hover:border-primary transition-all animate-fade-in-up group"
            style={{ animationDelay: '0.2s' }}
          >
            <Phone className="text-primary mb-3 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-lg font-bold text-white mb-2">Contact Info</h3>
            <p className="text-gray-400">View timing, location & areas</p>
          </Link>

          <Link
            href="/admin/settings"
            className="bg-card border border-primary border-opacity-20 rounded-xl p-6 hover:border-primary transition-all animate-fade-in-up group"
            style={{ animationDelay: '0.3s' }}
          >
            <Users className="text-primary mb-3 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-lg font-bold text-white mb-2">Settings</h3>
            <p className="text-gray-400">Update company information</p>
          </Link>
        </div>

        {/* Contact Messages */}
        <div className="bg-card border border-primary border-opacity-20 rounded-xl p-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-white mb-6">Recent Contact Messages</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary border-opacity-20">
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold">Name</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold">Email</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold">Service</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold">Date</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message._id}
                    className="border-b border-primary border-opacity-10 hover:bg-secondary transition-colors"
                  >
                    <td className="py-4 px-4 text-white font-semibold">{message.name}</td>
                    <td className="py-4 px-4 text-gray-300">{message.email}</td>
                    <td className="py-4 px-4 text-gray-300">{message.service}</td>
                    <td className="py-4 px-4 text-gray-400">{message.createdAt}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 text-white rounded-full text-xs font-semibold capitalize ${getStatusColor(
                          message.status
                        )}`}
                      >
                        {message.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/admin/messages"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all inline-block"
            >
              View All Messages
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
