'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'

interface IProject {
  _id: string;
  title: string;
  category: string;
  image?: string;
  order?: number;
}

export function PortfolioGallery() {
  const [projects, setProjects] = useState<IProject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects')
        if (response.data.success) {
          setProjects(response.data.data)
        }
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="text-gray-400 mt-4">Loading portfolio...</p>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <section className="py-20 bg-background text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-4">No portfolio data available right now.</h2>
          <p className="text-gray-400">Our recent projects will be showcased here soon.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          <span className="text-primary">Featured</span> Portfolio
        </h2>
        <p className="text-center text-gray-300 text-lg mb-16 max-w-2xl mx-auto">
          Explore our recent projects and see the quality of work we deliver
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((item, index) => (
            <div
              key={item._id}
              className="group relative overflow-hidden rounded-xl border border-primary border-opacity-20 hover:border-primary transition-all hover:shadow-2xl animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-primary font-semibold text-sm mb-2">{item.category}</p>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
