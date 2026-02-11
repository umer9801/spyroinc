'use client'

import React from "react"

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'


interface formData {
  name: string,
  email: string,
  phone: string,
  service: string,
  message: string
}
export default function Contact() {
  const [formData, setFormData] = useState<formData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      toast.success('Message sent! We will get back to you shortly.')
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)

    } catch (error: any) {
      console.error('Submission error:', error)
      toast.error(error.message || "Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      content: '289-231-0597',
      link: 'tel:2892310597',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'spyro.reno@gmail.com',
      link: 'mailto:spyro.reno@gmail.com',
    },
    {
      icon: MapPin,
      title: 'Service Area',
      content: 'Greater Toronto Area',
      link: '#',
    },
    {
      icon: Clock,
      title: 'Hours',
      content: 'Mon-Sat 8AM-6PM, Sun By Appointment',
      link: '#',
    },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-40 md:pt-32 pb-20 bg-gradient-to-b from-secondary to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Get in <span className="text-primary">Touch</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Ready to start your project? Contact us today for a free consultation and
                estimate. We're here to help transform your vision into reality.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <a
                    key={info.title}
                    href={info.link}
                    className="bg-card border border-primary border-opacity-20 rounded-xl p-8 text-center hover:border-primary transition-all animate-fade-in-up hover:shadow-2xl"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Icon className="text-primary mx-auto mb-4" size={40} />
                    <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
                    <p className="text-gray-300">{info.content}</p>
                  </a>
                )
              })}
            </div>

            {/* Contact Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div className="bg-card border border-primary border-opacity-20 rounded-xl p-8 animate-fade-in-up">
                <h2 className="text-3xl font-bold text-white mb-8">Send us a Message</h2>

                {submitted ? (
                  <div className="bg-primary bg-opacity-20 border border-primary rounded-lg p-6 text-center animate-fade-in-up">
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-300">
                      We've received your message and will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-white font-semibold mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-secondary text-white rounded-lg px-4 py-3 border border-primary border-opacity-20 focus:border-primary focus:outline-none transition-all"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-white font-semibold mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-secondary text-white rounded-lg px-4 py-3 border border-primary border-opacity-20 focus:border-primary focus:outline-none transition-all"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-white font-semibold mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-secondary text-white rounded-lg px-4 py-3 border border-primary border-opacity-20 focus:border-primary focus:outline-none transition-all"
                        placeholder="(123) 456-7890"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-white font-semibold mb-2">
                        Service Interested In *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full bg-secondary text-white rounded-lg px-4 py-3 border border-primary border-opacity-20 focus:border-primary focus:outline-none transition-all"
                      >
                        <option value="">Select a service</option>
                        <option value="Basement Renovation">Basement Renovation</option>
                        <option value="Flooring Installation">Flooring Installation</option>
                        <option value="General Renovation">General Renovation</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-white font-semibold mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full bg-secondary text-white rounded-lg px-4 py-3 border border-primary border-opacity-20 focus:border-primary focus:outline-none transition-all resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 animate-pulse-glow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'} {!isSubmitting && <Send size={20} />}
                    </button>
                  </form>
                )}
              </div>

              {/* Info Section */}
              <div className="animate-slide-in-right">
                <h2 className="text-3xl font-bold text-white mb-8">
                  Quick <span className="text-primary">Response</span>
                </h2>

                <div className="space-y-6">
                  <div className="bg-card border border-primary border-opacity-20 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-primary mb-3">
                      Call Us Directly
                    </h3>
                    <p className="text-gray-300 mb-4">
                      For immediate assistance, give us a call during business hours.
                    </p>
                    <a
                      href="tel:2892310597"
                      className="text-primary font-bold text-lg hover:opacity-80 transition-opacity"
                    >
                      289-231-0597
                    </a>
                  </div>

                  <div className="bg-card border border-primary border-opacity-20 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-primary mb-3">
                      Email Us Anytime
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Send us an email with details about your project.
                    </p>
                    <a
                      href="mailto:spyro.reno@gmail.com"
                      className="text-primary font-bold text-lg hover:opacity-80 transition-opacity"
                    >
                      spyro.reno@gmail.com
                    </a>
                  </div>

                  <div className="bg-card border border-primary border-opacity-20 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-primary mb-3">
                      Business Hours
                    </h3>
                    <p className="text-gray-300">
                      Monday - Saturday: 8:00 AM - 6:00 PM
                    </p>
                    <p className="text-gray-300">
                      Sunday: By Appointment
                    </p>
                  </div>

                  <div className="bg-card border border-primary border-opacity-20 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-primary mb-3">
                      Service Area
                    </h3>
                    <p className="text-gray-300">
                      We proudly serve the Greater Toronto Area and surrounding regions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
