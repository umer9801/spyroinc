'use client'

import React from "react"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function AdminSettings() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [saved, setSaved] = useState(false)
  const [companyInfo, setCompanyInfo] = useState({
    companyName: 'Spyro Inc',
    phone: '289-231-0597',
    email: 'spyro.reno@gmail.com',
    address: 'Serving Greater Toronto Area',
    aboutText: '25+ years of expert construction and renovation services',
    tagline: 'Excellence in Every Project',
  })

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCompanyInfo({
      ...companyInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to a server
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
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
          <h2 className="text-3xl font-bold text-white mb-8">Company Information</h2>

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label htmlFor="companyName" className="block text-white font-semibold mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={companyInfo.companyName}
                onChange={handleChange}
                className="w-full bg-secondary text-white rounded-lg px-4 py-3 border border-primary border-opacity-20 focus:border-primary focus:outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-white font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={companyInfo.phone}
                  onChange={handleChange}
                  className="w-full bg-secondary text-white rounded-lg px-4 py-3 border border-primary border-opacity-20 focus:border-primary focus:outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={companyInfo.email}
                  onChange={handleChange}
                  className="w-full bg-secondary text-white rounded-lg px-4 py-3 border border-primary border-opacity-20 focus:border-primary focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-white font-semibold mb-2">
                Service Area / Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={companyInfo.address}
                onChange={handleChange}
                className="w-full bg-secondary text-white rounded-lg px-4 py-3 border border-primary border-opacity-20 focus:border-primary focus:outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="tagline" className="block text-white font-semibold mb-2">
                Company Tagline
              </label>
              <input
                type="text"
                id="tagline"
                name="tagline"
                value={companyInfo.tagline}
                onChange={handleChange}
                className="w-full bg-secondary text-white rounded-lg px-4 py-3 border border-primary border-opacity-20 focus:border-primary focus:outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="aboutText" className="block text-white font-semibold mb-2">
                About Text
              </label>
              <textarea
                id="aboutText"
                name="aboutText"
                value={companyInfo.aboutText}
                onChange={handleChange}
                rows={5}
                className="w-full bg-secondary text-white rounded-lg px-4 py-3 border border-primary border-opacity-20 focus:border-primary focus:outline-none transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 animate-pulse-glow"
            >
              <Save size={20} />
              Save Settings
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
