'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="animate-fade-in-up">
            <h3 className="text-2xl font-bold text-primary mb-4">SPYRO INC</h3>
            <p className="text-gray-300 mb-4">
              25+ years of expert construction and renovation services
            </p>
            <p className="text-sm text-gray-400">
              Your trusted partner for quality construction and renovations
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h4 className="text-lg font-bold text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Basements', href: '/basements' },
                { label: 'Flooring', href: '/flooring' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h4 className="text-lg font-bold text-primary mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="tel:2892310597"
                className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
              >
                <Phone size={18} />
                <span>289-231-0597</span>
              </a>
              <a
                href="mailto:spyro.reno@gmail.com"
                className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
              >
                <Mail size={18} />
                <span>spyro.reno@gmail.com</span>
              </a>
              <div className="flex items-start gap-2 text-gray-300">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Serving Greater Toronto Area</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h4 className="text-lg font-bold text-primary mb-4">Business Hours</h4>
            <div className="space-y-2 text-gray-300 text-sm">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-primary" />
                <span>Monday - Saturday</span>
              </div>
              <p className="ml-6">8:00 AM - 6:00 PM</p>
              <p className="mt-3">Sunday: By Appointment</p>
            </div>
          </div>

          {/* Certifications */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h4 className="text-lg font-bold text-primary mb-4">Certifications</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✓ Licensed Contractor</li>
              <li>✓ WSIB Certified</li>
              <li>✓ Bonded & Insured</li>
              <li>✓ Home Warranty Protected</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-primary font-bold text-lg">500+</p>
              <p className="text-gray-400 text-sm">Projects Completed</p>
            </div>
            <div className="text-center">
              <p className="text-primary font-bold text-lg">25+</p>
              <p className="text-gray-400 text-sm">Years Experience</p>
            </div>
            <div className="text-center">
              <p className="text-primary font-bold text-lg">98%</p>
              <p className="text-gray-400 text-sm">Client Satisfaction</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Spyro Inc Construction. All rights reserved. | Built with excellence
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Terms of Service
              </a>
              <a href="/admin/login" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
