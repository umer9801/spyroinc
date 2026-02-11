import Image from 'next/image'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Award, Users, Zap } from 'lucide-react'

export default function About() {
  const achievements = [
    {
      icon: Award,
      title: '25+ Years',
      description: 'Of proven excellence in construction',
    },
    {
      icon: Users,
      title: '1000+ Projects',
      description: 'Completed with satisfied customers',
    },
    {
      icon: Zap,
      title: '100% Satisfaction',
      description: 'Guaranteed on every project',
    },
  ]

  const values = [
    {
      title: 'Quality First',
      description:
        'We never compromise on quality. Every detail matters, from materials to craftsmanship.',
    },
    {
      title: 'Customer Focused',
      description:
        'Your vision is our mission. We listen, plan, and execute to exceed your expectations.',
    },
    {
      title: 'Reliability',
      description:
        'On-time delivery and transparent communication is our commitment to you.',
    },
    {
      title: 'Innovation',
      description:
        'We stay updated with latest techniques and materials for best results.',
    },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-40 md:pt-32 pb-20 bg-gradient-to-b from-secondary to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                  About <span className="text-primary">Spyro Inc</span>
                </h1>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  For over 25 years, Spyro Inc has been the trusted name in construction
                  and renovation across the Greater Toronto Area. We've built our
                  reputation on quality, reliability, and customer satisfaction.
                </p>
                <p className="text-gray-400 text-lg mb-8">
                  Our team of skilled professionals takes pride in transforming houses
                  into dream homes. Whether it's a complete basement renovation, premium
                  flooring installation, or a comprehensive home makeover, we approach
                  every project with the same dedication to excellence.
                </p>
              </div>

              <div className="animate-slide-in-right">
                <Image
                  src="/images/renovation-showcase.jpg"
                  alt="Spyro Inc Team"
                  width={500}
                  height={500}
                  className="rounded-xl shadow-2xl border-4 border-primary"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              Our <span className="text-primary">Track Record</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <div
                    key={achievement.title}
                    className="bg-card border border-primary border-opacity-20 rounded-xl p-8 text-center hover:border-primary transition-all animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Icon className="text-primary mx-auto mb-4" size={48} />
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-300">{achievement.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              Our <span className="text-primary">Core Values</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="bg-card border border-primary border-opacity-20 rounded-xl p-8 hover:border-primary transition-all animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-2xl font-bold text-primary mb-4">{value.title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              Meet Our <span className="text-primary">Leadership Team</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'John Spyro', role: 'Founder & CEO', bio: '25+ years in construction industry' },
                { name: 'Maria Rodriguez', role: 'Operations Manager', bio: 'Oversees project execution & quality' },
                { name: 'David Thompson', role: 'Senior Project Manager', bio: 'Manages major renovations & budgets' },
              ].map((member, index) => (
                <div
                  key={member.name}
                  className="bg-card border border-primary border-opacity-20 rounded-xl overflow-hidden hover:border-primary transition-all animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-64 bg-gradient-to-b from-primary to-red-700"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-primary font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-300">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-20 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">
              <span className="text-primary">Certifications</span> & Awards
            </h2>
            <p className="text-center text-gray-300 text-lg mb-16 max-w-2xl mx-auto">
              We maintain the highest industry standards and certifications
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                '✓ Licensed Contractor',
                '✓ WSIB Certified',
                '✓ Home Warranty Protected',
                '✓ Bonded & Insured',
                '✓ Professional Association Member',
                '✓ Excellence Awards 2023',
                '✓ Customer Choice Award',
                '✓ Green Building Certified',
              ].map((cert, index) => (
                <div
                  key={cert}
                  className="bg-card border border-primary border-opacity-20 rounded-lg p-6 text-center hover:border-primary transition-all animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <p className="text-white font-semibold text-lg">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team CTA */}
        <section className="py-20 bg-background border-t-4 border-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready to Work With <span className="text-primary">Our Team</span>?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Let's discuss your project and see how we can help bring your vision to
              life.
            </p>
            <a
              href="/contact"
              className="bg-primary text-primary-foreground px-10 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all inline-block animate-pulse-glow"
            >
              Get in Touch
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
