'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'How long does a typical basement renovation take?',
      answer:
        'A typical basement renovation takes 4-8 weeks depending on the scope of work. We provide detailed timelines during the consultation phase.',
    },
    {
      question: 'Do you offer warranties on your work?',
      answer:
        'Yes, we offer comprehensive warranties on all our projects. Our work is backed by WSIB and home warranty protection.',
    },
    {
      question: 'What areas do you serve?',
      answer:
        'We proudly serve the Greater Toronto Area including Toronto, Mississauga, Brampton, Oakville, and surrounding communities.',
    },
    {
      question: 'How much does a basement renovation cost?',
      answer:
        'Costs vary based on scope. Basic finishes start at $15,000, premium from $30,000, and luxury from $50,000+. We provide free estimates.',
    },
    {
      question: 'Do you require a deposit?',
      answer:
        'As Discussed Deposit required. Further Payment As Job Progresses',
    },
    {
      question: 'Can I stay in my home during renovation?',
      answer:
        'Yes, most renovations can proceed while you live in the home. We maintain safety protocols and minimize disruption.',
    },
  ]

  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          Frequently Asked <span className="text-primary">Questions</span>
        </h2>
        <p className="text-center text-gray-300 text-lg mb-16">
          Find answers to common questions about our services
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card border border-primary border-opacity-20 rounded-xl overflow-hidden hover:border-primary transition-all animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white text-left">{faq.question}</h3>
                <ChevronDown
                  size={20}
                  className={`text-primary transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 border-t border-primary border-opacity-20 bg-gray-900 animate-fade-in-up">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
