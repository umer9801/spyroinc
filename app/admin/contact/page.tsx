'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Clock, MapPin, Mail, Globe, Phone, ExternalLink, Calendar, MessageSquare, Loader2 } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'sonner'

interface SiteSettings {
    siteName: string;
    contactEmail: string;
    phoneNumber: string;
    address: string;
    serviceArea: string;
    businessHours: string;
    socialLinks: {
        facebook: string;
        twitter: string;
        instagram: string;
        linkedin: string;
    }
}

export default function AdminContactPage() {
    const router = useRouter()
    const [settings, setSettings] = useState<SiteSettings | null>(null)
    const [loading, setLoading] = useState(true)
    const [messageCount, setMessageCount] = useState(0)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [settingsRes, contactsRes] = await Promise.all([
                axios.get('/api/admin/settings'),
                axios.get('/api/admin/contacts')
            ])

            if (settingsRes.data.success) {
                setSettings(settingsRes.data.data)
            }
            if (contactsRes.data.success) {
                setMessageCount(contactsRes.data.data.filter((m: any) => m.status === 'new').length)
            }
        } catch (error: any) {
            if (error.response?.status === 401) {
                router.push('/admin/login')
            } else {
                console.error("Error fetching contact data:", error)
                toast.error("Failed to load contact information")
            }
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    <p className="text-white font-medium">Loading Contact Details...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-white pb-20">
            {/* Header */}
            <header className="bg-card/80 border-b border-primary/10 shadow-2xl sticky top-0 z-40 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="p-2 hover:bg-secondary rounded-full transition-all text-primary">
                            <ArrowLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">Contact Overview</h1>
                            <p className="text-xs text-gray-400">Public business information & inquiries</p>
                        </div>
                    </div>
                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20"
                    >
                        Edit Info
                    </Link>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Info Cards */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Email */}
                            <div className="bg-card border border-primary/10 rounded-3xl p-8 hover:border-primary/30 transition-all group">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                                    <Mail size={24} />
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Primary Email</h3>
                                <p className="text-xl font-bold text-white break-all">{settings?.contactEmail || 'Not set'}</p>
                            </div>

                            {/* Phone */}
                            <div className="bg-card border border-primary/10 rounded-3xl p-8 hover:border-primary/30 transition-all group">
                                <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition-transform">
                                    <Phone size={24} />
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Phone Number</h3>
                                <p className="text-xl font-bold text-white">{settings?.phoneNumber || 'Not set'}</p>
                            </div>

                            {/* Timing */}
                            <div className="bg-card border border-primary/10 rounded-3xl p-8 hover:border-primary/30 transition-all group">
                                <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                                    <Clock size={24} />
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Business Hours</h3>
                                <p className="text-xl font-bold text-white">{settings?.businessHours || 'Not set'}</p>
                            </div>

                            {/* Service Area */}
                            <div className="bg-card border border-primary/10 rounded-3xl p-8 hover:border-primary/30 transition-all group">
                                <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                                    <Globe size={24} />
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Service Area</h3>
                                <p className="text-xl font-bold text-white">{settings?.serviceArea || 'Not set'}</p>
                            </div>
                        </div>

                        {/* Address Card */}
                        <div className="bg-card border border-primary/10 rounded-[32px] p-8 hover:border-primary/30 transition-all group relative overflow-hidden">
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                                <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 shrink-0 group-hover:rotate-3 transition-transform">
                                    <MapPin size={32} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Business Headquarters</h3>
                                    <p className="text-2xl font-bold text-white leading-tight">{settings?.address || 'Address not listed in database'}</p>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <MapPin size={120} />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Messages Shortcut */}
                    <div className="space-y-6">
                        <Link href="/admin/messages" className="block group">
                            <div className="bg-primary/10 border border-primary/20 rounded-[32px] p-8 hover:bg-primary/20 transition-all relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                                            <MessageSquare size={24} />
                                        </div>
                                        {messageCount > 0 && (
                                            <span className="bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full animate-pulse capitalize">
                                                {messageCount} New
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Recent Inquiries</h3>
                                    <p className="text-gray-400 text-sm mb-6">Manage client messages and project requests from the website.</p>
                                    <div className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-4 transition-all">
                                        View Messages <ExternalLink size={16} />
                                    </div>
                                </div>
                                <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:scale-110 transition-transform">
                                    <MessageSquare size={160} />
                                </div>
                            </div>
                        </Link>

                        <div className="bg-secondary/30 border border-white/5 rounded-[32px] p-8">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Calendar size={20} className="text-primary" />
                                Quick Links
                            </h3>
                            <ul className="space-y-4">
                                <li>
                                    <Link href="/admin/projects" className="flex items-center justify-between p-4 bg-card rounded-2xl border border-white/5 hover:border-primary/30 transition-all group">
                                        <span className="text-sm font-medium text-gray-400 group-hover:text-white">Project Portfolio</span>
                                        <ArrowLeft size={16} className="rotate-180 text-gray-600 group-hover:text-primary transition-colors" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/admin/services" className="flex items-center justify-between p-4 bg-card rounded-2xl border border-white/5 hover:border-primary/30 transition-all group">
                                        <span className="text-sm font-medium text-gray-400 group-hover:text-white">Service Management</span>
                                        <ArrowLeft size={16} className="rotate-180 text-gray-600 group-hover:text-primary transition-colors" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}
