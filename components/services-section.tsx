'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'

interface IService {
    _id: string;
    title: string;
    description: string;
    image?: string;
    icon?: string;
    order?: number;
}

export function ServicesSection() {
    const [services, setServices] = useState<IService[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('/api/services')
                if (response.data.success) {
                    setServices(response.data.data)
                }
            } catch (error) {
                console.error("Error fetching services:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchServices()
    }, [])

    if (loading) {
        return (
            <div className="py-20 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                <p className="text-gray-400 mt-4">Loading services...</p>
            </div>
        )
    }

    if (services.length === 0) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">No data is available right now.</h2>
                <p className="text-gray-400">Please check back later or contact us for more information.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
                <Link
                    key={service._id}
                    href="/contact"
                    className="group overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 animate-scale-in hover-lift hover-glow"
                    style={{ animationDelay: `${index * 0.15}s` }}
                >
                    <div className="relative h-64 overflow-hidden">
                        <Image
                            src={service.icon || "/placeholder.svg"}
                            alt={service.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-4 left-4 bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg animate-bounce-subtle group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                            {service.icon?.startsWith('data:image') ? (
                                <img src={service.icon} alt="" className="w-full h-full object-cover" />
                            ) : (
                                service.icon || '🛠️'
                            )}
                        </div>
                    </div>

                    <div className="p-6 bg-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300 relative z-10">
                            {service.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed relative z-10">{service.description}</p>
                        <div className="inline-flex items-center gap-2 text-primary font-semibold border-2 border-primary px-5 py-2.5 rounded-lg group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:gap-3 relative z-10">
                            Learn More
                            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
