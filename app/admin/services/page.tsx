'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Service {
  _id: string
  title: string
  description: string
  icon?: string
  createdAt?: string
}

import { toast } from "sonner"
import { X, Search, LayoutGrid, List, ImageIcon } from "lucide-react"
import axios from 'axios'
import { DeleteModal } from '@/components/admin/delete-modal'

export default function AdminServices() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [services, setServices] = useState<Service[]>([])
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteItemName, setDeleteItemName] = useState('')
  const [formData, setFormData] = useState({ title: '', description: '', icon: '' })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/admin/services')
      if (response.data.success) {
        setServices(response.data.data)
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        router.push('/admin/login')
      } else {
        console.error("Error fetching services:", error)
        toast.error("Failed to fetch services")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (service: Service) => {
    setDeletingId(service._id)
    setDeleteItemName(service.title)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!deletingId) return
    setIsDeleting(true)
    try {
      const response = await axios.delete(`/api/admin/services/${deletingId}`)
      if (response.status === 200) {
        toast.success("Service deleted successfully")
        setShowDeleteModal(false)
        fetchServices()
      }
    } catch (error: any) {
      console.error("Error deleting service:", error)
      toast.error(error.response?.data?.message || "An error occurred while deleting")
    } finally {
      setIsDeleting(false)
      setDeletingId(null)
    }
  }

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingId(service._id)
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon || ''
      })
    } else {
      setEditingId(null)
      setFormData({ title: '', description: '', icon: '' })
    }
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = editingId ? `/api/admin/services/${editingId}` : '/api/admin/services'
    const method = editingId ? 'PUT' : 'POST'

    try {
      const response = await (axios as any)[method.toLowerCase()](url, formData)
      if (response.data.success) {
        toast.success(editingId ? "Service updated" : "Service added")
        setShowModal(false)
        fetchServices()
      }
    } catch (error: any) {
      console.error("Error saving service:", error)
      toast.error(error.response?.data?.message || "An error occurred")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white font-medium">Loading Services...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-white pb-20">
      {/* Header */}
      <header className="bg-card border-b border-primary border-opacity-10 shadow-2xl sticky top-0 z-40 backdrop-blur-lg bg-opacity-80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 hover:bg-secondary rounded-full transition-all text-primary">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">Service Management</h1>
              <p className="text-xs text-gray-400">Manage your business offerings</p>
            </div>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl hover:bg-opacity-90 transition-all font-bold shadow-lg shadow-primary/20 transform hover:scale-105 active:scale-95"
          >
            <Plus size={20} />
            New Service
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {services.length === 0 ? (
          <div className="text-center py-40 bg-card border border-primary border-opacity-10 rounded-3xl">
            <LayoutGrid className="mx-auto text-gray-600 mb-4" size={60} />
            <p className="text-gray-400 text-xl font-medium">No services found. Start by creating one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service._id}
                className="group relative bg-card border border-primary border-opacity-10 rounded-3xl overflow-hidden hover:border-primary transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 animate-fade-in-up flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Service Image Preview (Using the 'icon' field) */}
                <div className="h-48 w-full bg-secondary relative overflow-hidden">
                  {service.icon ? (
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 font-sans text-xs text-gray-500 flex items-center justify-center bg-secondary"
                      onError={(e) => {
                        (e.target as any).src = "https://placehold.co/600x400/141414/ef4444?text=Invalid+Image+URL";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700">
                      <ImageIcon size={48} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60"></div>
                  <div className="absolute top-4 right-4 group-hover:translate-x-0 translate-x-12 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">Active</span>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-lg uppercase border border-primary/20">
                      {service.title.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-1">{service.title}</h3>
                  </div>

                  <p className="text-gray-400 leading-relaxed mb-8 line-clamp-3 group-hover:text-gray-300 transition-colors flex-1">
                    {service.description}
                  </p>

                  <div className="flex gap-4 pt-6 border-t border-primary/5">
                    <button
                      onClick={() => handleOpenModal(service)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-secondary text-white rounded-xl hover:bg-primary transition-all duration-300 font-bold text-sm shadow-inner"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 font-bold text-sm"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modern Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in" onClick={() => setShowModal(false)}></div>

          <div className="relative bg-card border border-primary/20 w-full max-w-xl rounded-[32px] p-10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white hover:bg-secondary rounded-full transition-all z-10"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-2 h-10 bg-primary rounded-full"></div>
              <h2 className="text-3xl font-extrabold text-white">
                {editingId ? 'Update Service' : 'New Offering'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Service Headline</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-secondary border border-primary/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-600 font-semibold"
                  placeholder="e.g. Premium Basement Finishing"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Image URL (Icon Field)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full bg-secondary border border-primary/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-600 font-semibold"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Service Details</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-secondary border border-primary/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none transition-all resize-none placeholder:text-gray-600 font-medium"
                  placeholder="Describe your premium service..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full py-4 rounded-2xl font-bold bg-secondary text-white hover:bg-opacity-80 transition-all border border-primary/5"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl font-bold bg-primary text-primary-foreground hover:bg-opacity-90 shadow-xl shadow-primary/20 transition-all transform hover:scale-105 active:scale-95"
                >
                  {editingId ? 'Save Changes' : 'Launch Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Service"
        itemName={deleteItemName}
        loading={isDeleting}
      />
    </div>
  )
}


