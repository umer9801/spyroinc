import Image from 'next/image'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Check, ArrowRight } from 'lucide-react'

export default function Flooring() {
  const flooringTypes = [
    {
      title: 'Hardwood Flooring',
      description: 'Premium hardwood installation with expert finishing',
      features: ['Durability', 'Elegance', 'Long-lasting', 'Refinishable'],
    },
    {
      title: 'Luxury Vinyl Flooring',
      description: 'Waterproof and durable vinyl plank installation',
      features: ['Waterproof', 'Easy Clean', 'Affordable', 'Variety'],
    },
    {
      title: 'Tile Flooring',
      description: 'Professional ceramic and porcelain tile installation',
      features: ['Durable', 'Stylish', 'Easy Maintenance', 'Heat Resistant'],
    },
    {
      title: 'Laminate Flooring',
      description: 'Quality laminate with modern designs',
      features: ['Budget-Friendly', 'Wood Look', 'Easy Install', 'Durable'],
    },
  ]

  const services = [
    'Floor Assessment & Preparation',
    'Subfloor Inspection & Repair',
    'Moisture Barrier Installation',
    'Professional Installation',
    'Finishing & Sealing',
    'Removal of Old Flooring',
    'Underlayment Installation',
    'Pattern & Design Consultation',
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-40 md:pt-32 pb-20 bg-gradient-to-b from-secondary to-background">
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <Image
              src="/images/flooring-service.jpg"
              alt="Flooring installation"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-scale-in">
                  Premium <span className="text-primary">Flooring</span> Solutions
                </h1>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  From hardwood to luxury vinyl, we install beautiful flooring that
                  transforms your space. Our expert installation ensures long-lasting
                  results and stunning aesthetics.
                </p>
                <p className="text-gray-400 text-lg mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  We offer a wide selection of flooring materials with professional
                  installation services. Whether you want classic hardwood, modern vinyl,
                  or elegant tile, we have the expertise to bring your vision to life.
                </p>

                <a
                  href="/contact"
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all inline-flex items-center gap-2 animate-pulse-glow hover-lift animate-fade-in-up"
                  style={{ animationDelay: '0.4s' }}
                >
                  Get Free Estimate <ArrowRight size={20} />
                </a>
              </div>

              <div className="animate-slide-in-left">
                <Image
                  src="/images/flooring-service.jpg"
                  alt="Beautiful flooring installation"
                  width={500}
                  height={500}
                  className="rounded-xl shadow-2xl border-4 border-primary hover-scale"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Flooring Types */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              Flooring <span className="text-primary">Materials</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {flooringTypes.map((type, index) => (
                <div
                  key={type.title}
                  className="bg-card border border-primary border-opacity-20 rounded-xl p-8 hover:border-primary transition-all animate-scale-in hover-lift hover-glow"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-2xl font-bold text-primary mb-3 animate-fade-in-up" style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>{type.title}</h3>
                  <p className="text-gray-300 mb-6">{type.description}</p>

                  <div className="grid grid-cols-2 gap-3">
                    {type.features.map((feature, fIndex) => (
                      <div key={feature} className="flex items-center gap-2 animate-fade-in-up" style={{ animationDelay: `${index * 0.1 + fIndex * 0.05 + 0.3}s` }}>
                        <Check className="text-primary flex-shrink-0" size={20} />
                        <span className="text-gray-200">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              Our <span className="text-primary">Services</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div
                  key={service}
                  className="flex items-start gap-3 p-6 bg-card rounded-lg border border-primary border-opacity-20 hover:border-primary transition-all animate-fade-in-up hover-lift hover-glow"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <Check className="text-primary flex-shrink-0 mt-1 animate-scale-in" size={24} style={{ animationDelay: `${index * 0.05 + 0.2}s` }} />
                  <h3 className="text-lg font-semibold text-white">{service}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              Why Choose Our <span className="text-primary">Flooring Services</span>?
            </h2>

            <div className="space-y-6">
              {[
                {
                  title: 'Expert Installation',
                  description:
                    'Our technicians have years of experience installing all types of flooring materials.',
                },
                {
                  title: 'Quality Materials',
                  description:
                    'We source premium flooring products that are durable and beautiful.',
                },
                {
                  title: 'Competitive Pricing',
                  description:
                    'Get premium flooring at fair prices with transparent quotes.',
                },
                {
                  title: 'Warranty & Support',
                  description:
                    'We stand behind our work with comprehensive warranties and ongoing support.',
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="flex gap-4 p-8 bg-card rounded-xl border border-primary border-opacity-20 hover:border-primary transition-all animate-fade-in-up hover-lift hover-glow"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold flex-shrink-0 animate-bounce-subtle">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Flooring Comparison Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              Flooring <span className="text-primary">Material Comparison</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="bg-primary">
                    <th className="px-6 py-4 text-left">Material</th>
                    <th className="px-6 py-4 text-left">Durability</th>
                    <th className="px-6 py-4 text-left">Cost</th>
                    <th className="px-6 py-4 text-left">Maintenance</th>
                    <th className="px-6 py-4 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      material: 'Hardwood',
                      durability: 'Excellent',
                      cost: '$8-15/sq ft',
                      maintenance: 'Moderate',
                      best: 'Living areas',
                    },
                    {
                      material: 'Luxury Vinyl',
                      durability: 'Very Good',
                      cost: '$3-10/sq ft',
                      maintenance: 'Low',
                      best: 'Kitchens, bathrooms',
                    },
                    {
                      material: 'Laminate',
                      durability: 'Good',
                      cost: '$2-8/sq ft',
                      maintenance: 'Low',
                      best: 'Basements, offices',
                    },
                    {
                      material: 'Tile',
                      durability: 'Excellent',
                      cost: '$5-20/sq ft',
                      maintenance: 'Low',
                      best: 'Wet areas',
                    },
                  ].map((row, index) => (
                    <tr
                      key={row.material}
                      className={`border-b border-gray-700 ${
                        index % 2 === 0 ? 'bg-secondary' : 'bg-card'
                      } hover:bg-gray-800 transition-colors`}
                    >
                      <td className="px-6 py-4 font-semibold">{row.material}</td>
                      <td className="px-6 py-4">{row.durability}</td>
                      <td className="px-6 py-4">{row.cost}</td>
                      <td className="px-6 py-4">{row.maintenance}</td>
                      <td className="px-6 py-4">{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Premium Features Section */}
        <section className="py-20 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">
              Premium <span className="text-primary">Features & Services</span>
            </h2>
            <p className="text-center text-gray-300 text-lg mb-16 max-w-2xl mx-auto">
              Beyond installation, we offer premium services to enhance your flooring
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Subfloor Preparation', desc: 'Professional leveling and moisture barriers' },
                { title: 'Radiant Heat Installation', desc: 'Warm floors under your beautiful surfaces' },
                { title: 'Custom Borders & Patterns', desc: 'Unique designs that stand out' },
                { title: 'Eco-Friendly Options', desc: 'Sustainable and green materials' },
                { title: 'Extended Warranties', desc: 'Protect your investment for years' },
                { title: 'Free Maintenance Kits', desc: 'Everything you need to keep floors pristine' },
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="bg-card border border-primary border-opacity-20 rounded-xl p-6 hover:border-primary transition-all animate-fade-in-up hover-lift hover-glow"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <h3 className="text-lg font-bold text-primary mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-secondary to-background border-t-4 border-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6 text-white animate-fade-in-up">
              Transform Your Space With <span className="text-primary">Beautiful Flooring</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Contact us today for a free consultation and explore our flooring options.
            </p>
            <a
              href="/contact"
              className="bg-primary text-primary-foreground px-10 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all inline-flex items-center gap-2 animate-pulse-glow hover-lift animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              Get Your Free Estimate <ArrowRight size={20} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
