'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Trash2, Mail, Phone, Calendar, CheckCircle2, MessageSquare, Loader2 } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'sonner'
import { DeleteModal } from '@/components/admin/delete-modal'

interface Message {
  _id: string
  name: string
  email: string
  phone: string
  service: string
  message: string
  createdAt: string
  status: 'new' | 'read' | 'replied'
}

export default function AdminMessages() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [isActionLoading, setIsActionLoading] = useState(false)

  // Delete Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteItemName, setDeleteItemName] = useState('')

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/api/admin/contacts')
      if (response.data.success) {
        setMessages(response.data.data)
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        router.push('/admin/login')
      } else {
        console.error("Error fetching messages:", error)
        toast.error("Failed to load messages")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTrigger = (message: Message) => {
    setDeletingId(message._id)
    setDeleteItemName(message.name)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!deletingId) return
    setIsActionLoading(true)
    try {
      const response = await axios.delete(`/api/admin/contacts/${deletingId}`)
      if (response.data.success) {
        toast.success("Message deleted successfully")
        setShowDeleteModal(false)
        fetchMessages()
      }
    } catch (error: any) {
      console.error("Error deleting message:", error)
      const message = error.response?.data?.message || "Failed to delete message"
      toast.error(message)
    } finally {
      setIsActionLoading(false)
      setDeletingId(null)
    }
  }

  const updateStatus = async (id: string, newStatus: 'read' | 'replied') => {
    setIsActionLoading(true)
    try {
      const response = await axios.patch(`/api/admin/contacts/${id}`, { status: newStatus })
      if (response.data.success) {
        toast.success(`Marked as ${newStatus}`)
        fetchMessages()
      }
    } catch (error: any) {
      console.error("Error updating status:", error)
      const message = error.response?.data?.message || "Failed to update status"
      toast.error(message)
    } finally {
      setIsActionLoading(false)
    }
  }

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-primary/20 text-primary border-primary/20 shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]'
      case 'read':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/20'
      case 'replied':
        return 'bg-green-500/20 text-green-400 border-green-500/20'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/20'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-white font-medium">Loading Messages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-white pb-20">
      {/* Header */}
      <header className="bg-card/80 border-b border-primary/10 shadow-2xl sticky top-0 z-40 backdrop-blur-xl bg-opacity-80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 hover:bg-secondary rounded-full transition-all text-primary">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">Inquiries</h1>
              <p className="text-xs text-gray-400">Manage client contact submissions</p>
            </div>
          </div>
          <div className="px-4 py-2 bg-secondary/50 rounded-xl border border-white/5 text-sm font-medium">
            {messages.filter(m => m.status === 'new').length} New Messages
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {messages.length === 0 ? (
          <div className="text-center py-40 bg-card border border-primary/10 rounded-[32px] shadow-2xl">
            <MessageSquare className="mx-auto text-gray-600 mb-6 opacity-20" size={80} />
            <p className="text-gray-400 text-xl font-medium">No messages found in the system.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {messages.map((msg, index) => (
              <div
                key={msg._id}
                className="group relative bg-card border border-primary/10 rounded-[24px] p-8 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 animate-fade-in-up flex flex-col md:flex-row gap-8"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Left Side: Sender Info */}
                <div className="md:w-1/4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-bold text-xl border border-primary/20">
                      {msg.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{msg.name}</h3>
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <Calendar size={12} />
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <a href={`mailto:${msg.email}`} className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                      <div className="p-2 bg-secondary rounded-lg"><Mail size={14} /></div>
                      <span className="truncate">{msg.email}</span>
                    </a>
                    <a href={`tel:${msg.phone}`} className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                      <div className="p-2 bg-secondary rounded-lg"><Phone size={14} /></div>
                      <span>{msg.phone}</span>
                    </a>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2 block ml-1">Service Type</span>
                    <span className="px-3 py-1.5 bg-secondary text-gray-300 rounded-lg text-xs font-bold border border-white/5">
                      {msg.service}
                    </span>
                  </div>
                </div>

                {/* Right Side: Message Content */}
                <div className="flex-1 flex flex-col bg-secondary/30 rounded-[20px] p-6 border border-white/5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Initial Inquiry</span>
                    <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${getStatusStyles(msg.status)}`}>
                      {msg.status}
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm flex-1 italic">
                    "{msg.message}"
                  </p>

                  <div className="flex flex-wrap items-center justify-end gap-3 mt-8 pt-6 border-t border-white/5">
                    {msg.status === 'new' && (
                      <button
                        onClick={() => updateStatus(msg._id, 'read')}
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 font-bold text-xs"
                      >
                        <CheckCircle2 size={16} />
                        Mark Read
                      </button>
                    )}
                    {msg.status !== 'replied' && (
                      <button
                        onClick={() => updateStatus(msg._id, 'replied')}
                        className="flex items-center gap-2 px-5 py-2.5 bg-green-500/10 text-green-400 rounded-xl hover:bg-green-500 hover:text-white transition-all duration-300 font-bold text-xs"
                      >
                        <Mail size={16} />
                        Mark Replied
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteTrigger(msg)}
                      className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
                      title="Delete Permanently"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Message"
        itemName={deleteItemName}
        loading={isActionLoading}
      />
    </div>
  )
}
