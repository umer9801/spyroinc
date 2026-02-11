import Image from 'next/image'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Check, ArrowRight } from 'lucide-react'

export default function Basements() {
  const features = [
    'Complete Waterproofing Solutions',
    'Custom Framing & Insulation',
    'Electrical & HVAC Integration',
    'Drywall & Finishing',
    'Flooring Installation',
    'Recreation Room Design',
    'Home Office Setups',
    'Egress Windows for Safety',
  ]

  const projects = [
    {
      title: 'Modern Recreation Room',
      description: 'Fully finished basement with entertainment center',
      image: '/images/basementreno.png',
    },
    {
      title: 'Home Office Basement',
      description: 'Professional workspace with custom cabinetry',
      image: '/images/basement-renovation.jpg',
    },
    {
      title: 'Luxury Wet Bar',
      description: 'Premium bar setup with storage and seating',
      image: '/images/luxurybasement.png',
    },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-40 md:pt-32 pb-20 bg-gradient-to-b from-secondary to-background">
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <Image
              src="/images/basemnt.png"
              alt="Basement renovation"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-scale-in">
                  Basement <span className="text-primary">Renovations</span>
                </h1>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Transform your basement into a valuable living space. From waterproofing
                  to complete finishing, we handle every aspect of basement renovation with
                  professional expertise.
                </p>
                <p className="text-gray-400 text-lg mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  Our comprehensive basement finishing services include structural work,
                  electrical, plumbing, HVAC, and beautiful finishing touches that maximize
                  your home's functionality and value.
                </p>

                <a
                  href="/contact"
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all inline-flex items-center gap-2 animate-pulse-glow hover-lift animate-fade-in-up"
                  style={{ animationDelay: '0.4s' }}
                >
                  Get Your Quote <ArrowRight size={20} />
                </a>
              </div>

              <div className="animate-slide-in-left">
                <Image
                  src="/images/basemnt.png"
                  alt="Finished basement"
                  width={500}
                  height={500}
                  className="rounded-xl shadow-2xl border-4 border-primary hover-scale"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              What We <span className="text-primary">Offer</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 p-6 bg-card rounded-lg border border-primary border-opacity-20 hover:border-primary transition-all animate-fade-in-up hover-lift hover-glow"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <Check className="text-primary flex-shrink-0 mt-1 animate-scale-in" size={24} style={{ animationDelay: `${index * 0.05 + 0.2}s` }} />
                  <h3 className="text-lg font-semibold text-white">{feature}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              Our <span className="text-primary">Process</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  step: 1,
                  title: 'Assessment',
                  description: 'Inspect basement and discuss your vision',
                },
                {
                  step: 2,
                  title: 'Planning',
                  description: 'Create detailed design and project timeline',
                },
                {
                  step: 3,
                  title: 'Execution',
                  description: 'Complete all construction with precision',
                },
                {
                  step: 4,
                  title: 'Completion',
                  description: 'Final inspections and walkthrough',
                },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="relative animate-fade-in-up hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-card border border-primary border-opacity-20 rounded-xl p-8 text-center hover:border-primary hover-glow transition-all h-full">
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 animate-pulse-glow">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>

                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 animate-bounce-subtle">
                      <ArrowRight className="text-primary" size={32} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              Recent <span className="text-primary">Projects</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  className="group overflow-hidden rounded-xl bg-card border border-primary border-opacity-20 hover:border-primary transition-all animate-fade-in-up hover-lift hover-glow"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">
              Why Invest in <span className="text-primary">Basement Renovation</span>?
            </h2>
            <p className="text-center text-gray-300 text-lg mb-16 max-w-2xl mx-auto">
              Finished basements add significant value and functionality to your home
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Increased Home Value', desc: 'Basement renovations add 70-80% ROI' },
                { title: 'Extra Living Space', desc: 'Create recreation, office, or guest space' },
                { title: 'Better Energy Efficiency', desc: 'Proper insulation reduces heating costs' },
                { title: 'Natural Light Options', desc: 'Egress windows for natural lighting' },
                { title: 'Customizable Design', desc: 'Fully personalized to your needs' },
                { title: 'Professional Expertise', desc: 'Expert handling of complex systems' },
              ].map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="bg-card border border-primary border-opacity-20 rounded-xl p-6 hover:border-primary transition-all animate-fade-in-up hover-lift hover-glow"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <h3 className="text-lg font-bold text-primary mb-2">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-secondary to-background border-t-4 border-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6 text-white animate-fade-in-up">
              Ready to Finish Your <span className="text-primary">Basement</span>?
            </h2>
            <p className="text-gray-300 text-lg mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Contact us today for a free consultation and estimate. We'll help you create
              the perfect basement space.
            </p>
            <a
              href="/contact"
              className="bg-primary text-primary-foreground px-10 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all inline-flex items-center gap-2 animate-pulse-glow hover-lift animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              Schedule Consultation <ArrowRight size={20} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
