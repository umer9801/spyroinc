'use client'

import Image from 'next/image'

export function PortfolioGallery() {
  const portfolioItems = [
    {
      title: 'Modern Kitchen Renovation',
      category: 'Kitchen',
      image: '/images/renovation-showcase.jpg',
    },
    {
      title: 'Luxury Basement Finish',
      category: 'Basement',
      image: '/images/basement-renovation.jpg',
    },
    {
      title: 'Premium Flooring Installation',
      category: 'Flooring',
      image: '/images/flooring-service.jpg',
    },
    {
      title: 'Complete Home Transformation',
      category: 'Full Renovation',
      image: '/images/hero-construction.jpg',
    },
  ]

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
          {portfolioItems.map((item, index) => (
            <div
              key={item.title}
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
