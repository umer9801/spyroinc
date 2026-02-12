'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'

import { useSettings } from '@/hooks/useSettings'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { settings } = useSettings()

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Basements', href: '/basements' },
    { label: 'Flooring', href: '/flooring' },
    { label: 'Contact', href: '/contact' },
  ]

  const phone = settings?.phoneNumber || '289-231-0597'
  const hours = settings?.businessHours || 'Mon-Sat: 8AM-6PM | Sun: By Appointment'

  return (
    <>
      {/* Top Info Bar */}
      <div className="hidden md:block bg-secondary text-secondary-foreground py-3 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex gap-6">
            <a href={`tel:${phone.replace(/-/g, '')}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone size={16} />
              {phone}
            </a>
            <span>{hours}</span>
          </div>
          <Link href="/admin/login" className="hover:opacity-80 transition-opacity">
            Admin Login
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="fixed top-12 md:top-0 w-full bg-primary z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="text-2xl font-bold text-primary-foreground">
                SPYRO INC
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-primary-foreground hover:opacity-80 transition-opacity font-semibold text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="hidden md:block bg-white text-primary px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-all"
            >
              Get Quote
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-primary-foreground"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden bg-primary border-t border-opacity-20 border-white">
              <div className="px-4 py-4 space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-primary-foreground hover:opacity-80 transition-opacity font-semibold py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  className="block bg-white text-primary px-4 py-2 rounded-lg font-bold text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Get Quote
                </Link>
                <a
                  href="tel:289-231-0597"
                  className="block bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-semibold text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Call Us
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
