'use client'

import React from "react"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

import axios from 'axios'
import { toast } from 'sonner'

export default function AdminSettings() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    siteName: '',
    contactEmail: '',
    phoneNumber: '',
    address: '',
    footerText: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    }
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/api/admin/settings')
      const data = response.data
      if (data.success && data.data) {
        setSettings({
          ...settings,
          ...data.data,
          socialLinks: { ...settings.socialLinks, ...data.data.socialLinks }
        })
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        router.push('/admin/login')
      } else {
        console.error("Error fetching settings:", error)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.put('/api/admin/settings', settings)
      if (response.status === 200) {
        setSaved(true)
        toast.success("Settings saved successfully")
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (error: any) {
      console.error("Error saving settings:", error)
      toast.error(error.response?.data?.message || "Failed to save settings")
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading Settings...</div>
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
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {saved && (
          <div className="bg-green-500 bg-opacity-20 border border-green-500 text-green-400 rounded-lg p-4 mb-6 animate-fade-in-up">
            Settings saved successfully!
          </div>
        )}

        <div className="bg-card border border-primary border-opacity-20 rounded-xl p-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-white mb-8">Site Configuration</h2>

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full bg-secondary text-white rounded-lg px-4 py-3 border border-primary border-opacity-20 focus:border-primary focus:outline-none transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">Contact Email</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full bg-secondary text-white rounded-lg px-4 py-3 border border-primary border-opacity-20 focus:border-primary focus:outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={settings.phoneNumber}
                  onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
                  className="w-full bg-secondary text-white rounded-lg px-4 py-3 border border-primary border-opacity-20 focus:border-primary focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Address / Service Area</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full bg-secondary text-white rounded-lg px-4 py-3 border border-primary border-opacity-20 focus:border-primary focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Footer Text / About Summary</label>
              <textarea
                value={settings.footerText}
                onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                rows={4}
                className="w-full bg-secondary text-white rounded-lg px-4 py-3 border border-primary border-opacity-20 focus:border-primary focus:outline-none transition-all resize-none"
              />
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-primary mb-4">Social Media Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(settings.socialLinks).map((platform) => (
                  <div key={platform}>
                    <label className="block text-white text-sm font-semibold mb-1 capitalize">{platform}</label>
                    <input
                      type="text"
                      value={(settings.socialLinks as any)[platform]}
                      onChange={(e) => setSettings({
                        ...settings,
                        socialLinks: { ...settings.socialLinks, [platform]: e.target.value }
                      })}
                      className="w-full bg-secondary text-white rounded-lg px-4 py-2 border border-primary border-opacity-20 focus:border-primary focus:outline-none transition-all"
                      placeholder={`https://${platform}.com/...`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Save Configuration
            </button>
          </form>
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-card border border-primary border-opacity-20 rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-xl font-bold text-primary mb-4">Business Hours</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Monday - Saturday: 8:00 AM - 6:00 PM</li>
              <li>Sunday: By Appointment</li>
            </ul>
          </div>

          <div className="bg-card border border-primary border-opacity-20 rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-bold text-primary mb-4">Experience</h3>
            <p className="text-gray-300">25+ Years in Construction & Renovation</p>
          </div>
        </div>
      </main>
    </div>
  )
}
