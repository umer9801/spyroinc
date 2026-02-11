'use client'

import { Zap, Shield, Lightbulb, Truck } from 'lucide-react'

export function PremiumFeatures() {
  const features = [
    {
      icon: Shield,
      title: 'Fully Licensed & Insured',
      description: 'Complete protection and peace of mind for all your projects',
    },
    {
      icon: Lightbulb,
      title: 'Innovative Solutions',
      description: 'Latest techniques and materials for superior results',
    },
    {
      icon: Truck,
      title: 'On-Time Delivery',
      description: 'We respect your schedule and complete projects on time',
    },
    {
      icon: Zap,
      title: '25+ Years Experience',
      description: 'Proven track record with hundreds of satisfied clients',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="bg-card border border-primary border-opacity-20 rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon className="text-primary mb-4" size={32} />
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
