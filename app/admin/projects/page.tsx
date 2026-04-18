'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Edit2, Trash2, FileText, ExternalLink, X, ImageIcon } from 'lucide-react'
import Link from 'next/link'

interface Project {
  _id: string
  title: string
  description: string
  image?: string
  link?: string
  category?: string
  clientName?: string
  date?: string
  status?: 'pending' | 'under process' | 'completed'
  order: number
  createdAt?: string
}

import { toast } from "sonner"
import axios from 'axios'
import { DeleteModal } from '@/components/admin/delete-modal'

export default function AdminProjects() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [showForm, setShowForm] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteItemName, setDeleteItemName] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    clientName: '',
    date: '',
    status: 'pending' as 'pending' | 'under process' | 'completed',
    image: '',
    link: '',
    order: 0
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/admin/projects')
      if (response.data.success) {
        setProjects(response.data.data)
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        router.push('/admin/login')
      } else {
        console.error("Error fetching projects:", error)
        toast.error("Failed to fetch projects")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (project: Project) => {
    setDeletingId(project._id)
    setDeleteItemName(project.title)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!deletingId) return
    setIsDeleting(true)
    try {
      const response = await axios.delete(`/api/admin/projects/${deletingId}`)
      if (response.status === 200) {
        toast.success("Project deleted successfully")
        setShowDeleteModal(false)
        fetchProjects()
      }
    } catch (error: any) {
      console.error("Error deleting project:", error)
      toast.error(error.response?.data?.message || "An error occurred during deletion")
    } finally {
      setIsDeleting(false)
      setDeletingId(null)
    }
  }

  const startEditing = (project: Project) => {
    setEditingId(project._id)
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category || '',
      clientName: project.clientName || '',
      date: project.date ? new Date(project.date).toISOString().split('T')[0] : '',
      status: project.status || 'pending',
      image: project.image || '',
      link: project.link || '',
      order: project.order
    })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return
    try {
      const response = await axios.put(`/api/admin/projects/${editingId}`, formData)
      if (response.data.success) {
        toast.success("Project updated successfully")
        setFormData({ title: '', description: '', category: '', clientName: '', date: '', status: 'pending', image: '', link: '', order: 0 })
        setEditingId(null)
        setShowForm(false)
        fetchProjects()
      }
    } catch (error: any) {
      console.error("Error updating project:", error)
      toast.error(error.response?.data?.message || "An error occurred while updating project")
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/admin/projects', formData)
      if (response.data.success) {
        toast.success("Project added successfully")
        setFormData({ title: '', description: '', category: '', clientName: '', date: '', status: 'pending', image: '', link: '', order: 0 })
        setShowForm(false)
        fetchProjects()
      }
    } catch (error: any) {
      console.error("Error adding project:", error)
      toast.error(error.response?.data?.message || "An error occurred while adding project")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    if (editingId) {
      handleUpdate(e)
    } else {
      handleAdd(e)
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white font-medium">Loading Projects...</p>
      </div>
    </div>
  }

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Header */}
      <header className="bg-card border-b border-primary border-opacity-20 sticky top-0 z-40 backdrop-blur-md bg-opacity-80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 hover:bg-secondary rounded-full transition-all text-primary">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Manage Projects</h1>
              <p className="text-xs text-gray-400">View and organize your portfolio</p>
            </div>
          </div>
          <button
            onClick={() => {
              if (showForm) {
                setEditingId(null)
                setFormData({ title: '', description: '', category: '', clientName: '', date: '', status: 'pending', image: '', link: '', order: 0 })
              }
              setShowForm(!showForm)
            }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all transform hover:scale-105 ${showForm ? 'bg-red-500 bg-opacity-20 text-red-500' : 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'}`}
          >
            {showForm ? <><Trash2 size={20} className="rotate-45" /> Cancel</> : <><Plus size={20} /> Add Project</>}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Add Project Form (Toggleable) */}
        {showForm && (
          <div className="bg-card border border-primary border-opacity-20 rounded-2xl p-8 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-8 bg-primary rounded-full"></div>
              {editingId ? 'Update Project' : 'Create New Project'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-1.5 ml-1">Project Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-secondary border border-primary border-opacity-10 rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Enter project name..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-1.5 ml-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-secondary border border-primary border-opacity-10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all"
                    placeholder="e.g. Basement, Renovation"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-1.5 ml-1">Project Image</label>
                  <div className="space-y-4">
                    {formData.image && (
                      <div className="relative w-full h-40 rounded-xl overflow-hidden border border-primary/20">
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: '' })}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-lg"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onloadend = () => {
                              setFormData({ ...formData, image: reader.result as string })
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                        className="hidden"
                        id="project-image"
                      />
                      <label
                        htmlFor="project-image"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary/20 rounded-xl cursor-pointer hover:bg-primary/5 hover:border-primary/40 transition-all gap-2"
                      >
                        <ImageIcon className="text-primary/40" size={24} />
                        <span className="text-xs font-semibold text-gray-400 text-center px-4">Click to upload project photo</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-1.5 ml-1">Project Link (Optional)</label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full bg-secondary border border-primary border-opacity-10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all"
                    placeholder="https://client-site.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-1.5 ml-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-secondary border border-primary border-opacity-10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-1.5 ml-1">Client Name</label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full bg-secondary border border-primary border-opacity-10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all"
                    placeholder="Client or company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-1.5 ml-1">Project Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-secondary border border-primary border-opacity-10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-1.5 ml-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'pending' | 'under process' | 'completed' })}
                    className="w-full bg-secondary border border-primary border-opacity-10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all"
                  >
                    <option value="pending">Pending</option>
                    <option value="under process">Under Process</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-400 mb-1.5 ml-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={1}
                    className="w-full bg-secondary border border-primary border-opacity-10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none"
                    placeholder="Detailed project explanation..."
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2 flex justify-end gap-4 pt-4 border-t border-primary border-opacity-10">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 rounded-xl font-bold bg-secondary text-white hover:bg-opacity-80 transition-all"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-opacity-90 shadow-lg shadow-primary/20 transition-all font-sans"
                >
                  {editingId ? 'Save Changes' : 'Publish Project'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects Table */}
        <div className="bg-card border border-primary border-opacity-20 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-6 border-b border-primary border-opacity-10 flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
              All Projects
              <span className="ml-2 px-2.5 py-0.5 bg-secondary text-gray-400 rounded-lg text-xs font-medium">{projects.length}</span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary bg-opacity-30">
                  <th className="text-left py-4 px-8 text-gray-400 text-xs font-bold uppercase tracking-wider">Project Info</th>
                  <th className="text-left py-4 px-4 text-gray-400 text-xs font-bold uppercase tracking-wider">Client</th>
                  <th className="text-left py-4 px-4 text-gray-400 text-xs font-bold uppercase tracking-wider">Date</th>
                  <th className="text-left py-4 px-4 text-gray-400 text-xs font-bold uppercase tracking-wider">Category</th>
                  <th className="text-left py-4 px-4 text-gray-400 text-xs font-bold uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-4 text-gray-400 text-xs font-bold uppercase tracking-wider text-center">Order</th>
                  <th className="text-left py-4 px-8 text-gray-400 text-xs font-bold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary divide-opacity-10">
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-20 text-center text-gray-500 italic">No projects found. Start by adding one above.</td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr key={project._id} className="group hover:bg-secondary transition-all">
                      <td className="py-5 px-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center overflow-hidden border border-primary border-opacity-10">
                            {project.image ? (
                              <img src={project.image} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <FileText className="text-gray-500" />
                            )}
                          </div>
                          <div>
                            <div className="text-white font-bold group-hover:text-primary transition-colors">{project.title}</div>
                            <div className="text-xs text-gray-500 truncate max-w-[200px]">{project.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-4">
                        <div className="text-gray-300 text-sm">{project.clientName || 'N/A'}</div>
                      </td>
                      <td className="py-5 px-4">
                        <div className="text-gray-300 text-sm">
                          {project.date ? new Date(project.date).toLocaleDateString() : 'N/A'}
                        </div>
                      </td>
                      <td className="py-5 px-4">
                        <span className="px-3 py-1 bg-secondary text-gray-300 rounded-full text-[10px] font-bold uppercase tracking-widest border border-primary border-opacity-10">
                          {project.category || 'N/A'}
                        </span>
                      </td>
                      <td className="py-5 px-4">
                        {project.status === 'completed' && (
                          <span className="px-3 py-1 bg-green-500 bg-opacity-20 text-green-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-500 border-opacity-30">
                            Completed
                          </span>
                        )}
                        {project.status === 'under process' && (
                          <span className="px-3 py-1 bg-blue-500 bg-opacity-20 text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-500 border-opacity-30">
                            Under Process
                          </span>
                        )}
                        {(!project.status || project.status === 'pending') && (
                          <span className="px-3 py-1 bg-yellow-500 bg-opacity-20 text-yellow-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-yellow-500 border-opacity-30">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-5 px-4 text-center">
                        <span className="text-gray-300 font-mono">{project.order}</span>
                      </td>
                      <td className="py-5 px-8">
                        <div className="flex items-center justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                          {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" title="View Link" className="p-2 bg-secondary text-gray-400 rounded-lg hover:text-white transition-all">
                              <ExternalLink size={18} />
                            </a>
                          )}
                          <button className="p-2 bg-blue-500 bg-opacity-10 text-blue-400 rounded-lg hover:bg-opacity-20 transition-all" title="Edit"
                            onClick={() => startEditing(project)}>
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(project)}
                            className="p-2 bg-red-500 bg-opacity-10 text-red-400 rounded-lg hover:bg-opacity-20 transition-all font-sans"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Project"
        itemName={deleteItemName}
        loading={isDeleting}
      />
    </div>
  )
}


