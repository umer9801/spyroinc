import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { PremiumFeatures } from '@/components/premium-features'
import { PortfolioGallery } from '@/components/portfolio-gallery'
import { FAQSection } from '@/components/faq-section'
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react'

export default function Home() {
  const services = [
    {
      title: 'Basement Renovations',
      description: 'Complete basement finishing, waterproofing, and custom layouts',
      image: '/images/basement-renovation.jpg',
      href: '/basements',
    },
    {
      title: 'Flooring Installation',
      description: 'Premium hardwood, vinyl, and tile flooring solutions',
      image: '/images/flooring-service.jpg',
      href: '/flooring',
    },
    {
      title: 'Home Renovations',
      description: 'Kitchen, bathroom, and whole-home renovation experts',
      image: '/images/renovation-showcase.jpg',
      href: '/about',
    },
  ]

  const features = [
    'Licensed & Insured Professionals',
    '25+ Years of Experience',
    'Free Estimates & Consultations',
    'Quality Guaranteed Work',
    'On-Time Project Completion',
    'Excellent Customer Service',
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-screen pt-32 md:pt-16 bg-gradient-to-b from-background to-secondary">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/hero-construction.jpg"
              alt="Professional construction team"
              fill
              sizes="100vw"
              className="object-cover opacity-40"
              priority
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
              {/* Left Content */}
              <div className="animate-fade-in-up">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance animate-scale-in">
                  <span className="text-primary">Excellence</span> in Every
                  Project
                </h1>
                <p className="text-xl text-gray-200 mb-2 font-semibold animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  25+ Years of Expert Construction & Renovation
                </p>
                <p className="text-gray-300 text-lg mb-8 max-w-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  Transform your home with professional renovation services. From
                  basements to flooring, we deliver quality craftsmanship that
                  exceeds expectations.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <Link
                    href="/contact"
                    className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all inline-flex items-center gap-2 justify-center animate-pulse-glow hover-lift"
                  >
                    Get Your Free Quote <ArrowRight size={20} />
                  </Link>
                  <Link
                    href="/about"
                    className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary hover:text-primary-foreground transition-all inline-flex items-center gap-2 justify-center hover-lift"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Right Image */}
              <div className="hidden lg:block animate-slide-in-left">
                <Image
                  src="/images/hero-construction.jpg"
                  alt="Construction team at work"
                  width={500}
                  height={500}
                  className="rounded-xl shadow-2xl border-4 border-primary hover-scale"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-background py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              Why Choose <span className="text-primary">Spyro Inc</span>?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-start gap-4 p-6 bg-card rounded-lg border border-primary border-opacity-20 hover:border-primary transition-all animate-fade-in-up hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle2 className="text-primary flex-shrink-0 mt-1 animate-scale-in" size={24} style={{ animationDelay: `${index * 0.1 + 0.2}s` }} />
                  <h3 className="text-lg font-semibold text-white">{feature}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-background py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary animate-fade-in-up">
                Our Main Services
              </h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Comprehensive renovation and construction solutions for every corner of your home.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Basement & Secondary Units',
                  description: 'Transform your basement into a functional living space or legal rental unit. We handle permits, inspections, and finishing - delivering safe, stylish, and fully compliant secondary suites.',
                  image: '/images/basement-renovation.jpg',
                  href: '/basements',
                  icon: '🏠',
                },
                {
                  title: 'Flooring Installation',
                  description: 'Professional installation of vinyl, laminate, hardwood, and tile flooring. Our precision workmanship ensures smooth transitions and long-lasting finishes.',
                  image: '/images/flooring-service.jpg',
                  href: '/flooring',
                  icon: '📐',
                },
                {
                  title: 'Drywall & Painting',
                  description: 'Full-service wall finishing and painting with clean lines and superior results. Enhance your interiors with a professional touch.',
                  image: '/images/renovation-showcase.jpg',
                  href: '/about',
                  icon: '🎨',
                },
                {
                  title: 'Handyman Repairs',
                  description: 'From small fixes to general maintenance, no task is too minor for our skilled team. Reliable, affordable, and done right the first time.',
                  image: '/images/hero-construction.jpg',
                  href: '/contact',
                  icon: '🔧',
                },
              ].map((service, index) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 animate-scale-in hover-lift hover-glow"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-4 left-4 bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg animate-bounce-subtle group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
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
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-gradient-to-r from-primary to-red-700 py-20 animate-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center animate-fade-in-up hover-scale">
                <h3 className="text-5xl font-bold text-white mb-2 animate-bounce-subtle">25+</h3>
                <p className="text-red-100 text-lg">Years of Experience</p>
              </div>
              <div className="text-center animate-fade-in-up hover-scale" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-5xl font-bold text-white mb-2 animate-bounce-subtle" style={{ animationDelay: '0.2s' }}>500+</h3>
                <p className="text-red-100 text-lg">Projects Completed</p>
              </div>
              <div className="text-center animate-fade-in-up hover-scale" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-5xl font-bold text-white mb-2 animate-bounce-subtle" style={{ animationDelay: '0.4s' }}>98%</h3>
                <p className="text-red-100 text-lg">Client Satisfaction</p>
              </div>
              <div className="text-center animate-fade-in-up hover-scale" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-5xl font-bold text-white mb-2 animate-bounce-subtle" style={{ animationDelay: '0.6s' }}>100%</h3>
                <p className="text-red-100 text-lg">Licensed & Insured</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Process Section */}
        <section className="bg-background py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">
              Our <span className="text-primary">Process</span>
            </h2>
            <p className="text-center text-gray-300 text-lg mb-16 max-w-2xl mx-auto">
              We follow a proven 5-step process to ensure your project exceeds expectations
            </p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                { step: '1', title: 'Consultation', desc: 'Free in-depth project discussion' },
                { step: '2', title: 'Design', desc: 'Professional design planning' },
                { step: '3', title: 'Estimate', desc: 'Transparent pricing & timeline' },
                { step: '4', title: 'Execution', desc: 'Expert craftsmanship & quality' },
                { step: '5', title: 'Completion', desc: 'Final walkthrough & satisfaction' },
              ].map((item, index) => (
                <div key={item.step} className="relative animate-fade-in-up hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="bg-card border-2 border-primary rounded-xl p-6 hover:shadow-xl hover-glow transition-all h-full">
                    <div className="absolute -top-4 -left-4 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg animate-pulse-glow">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-primary mt-4 mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Gallery Section */}
        <PortfolioGallery />



        {/* Premium Features Section */}
        <PremiumFeatures />

        {/* FAQ Section */}
        <FAQSection />

        {/* Service Areas Section */}
        <section className="bg-secondary py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-4 text-white animate-fade-in-up">
              Service <span className="text-primary">Areas</span>
            </h2>
            <p className="text-center text-gray-300 text-lg mb-16 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Proudly serving the Greater Toronto Area and surrounding communities
            </p>

            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mb-8">
                {[
                  'Toronto',
                  'Mississauga',
                  'Brampton',
                  'Vaughan',
                  'Markham',
                  'Richmond Hill',
                  'Oakville',
                  'Burlington',
                  'Milton',
                  'Ajax',
                  'Pickering',
                  'Whitby',
                ].map((city, index) => (
                  <div
                    key={city}
                    className="flex items-center gap-3 text-gray-800 hover:text-primary transition-colors animate-fade-in-up hover-scale"
                    style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                  >
                    <MapPin className="text-primary flex-shrink-0" size={20} />
                    <span className="text-lg font-medium">{city}</span>
                  </div>
                ))}
              </div>

              <div className="text-center pt-6 border-t border-gray-200 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                <p className="text-gray-600 text-lg mb-6">
                  Don't see your area listed? Contact us to confirm service availability.
                </p>
                <Link
                  href="/contact"
                  className="bg-primary text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all inline-flex items-center gap-2 hover-lift"
                >
                  Call Now: 289-231-0597
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-background py-20 border-t-4 border-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6 text-white animate-fade-in-up">
              Ready to Start Your <span className="text-primary">Dream Project</span>?
            </h2>
            <p className="text-gray-300 text-lg mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Contact us today for a free consultation and estimate. We're ready to
              transform your space.
            </p>
            <Link
              href="/contact"
              className="bg-primary text-primary-foreground px-10 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all inline-flex items-center gap-2 animate-pulse-glow hover-lift animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              Contact Us Now <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
