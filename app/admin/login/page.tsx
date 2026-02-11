'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Mail } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Demo credentials
    if (email === 'admin@spyroinc.com' && password === 'admin123') {
      localStorage.setItem('adminToken', 'authenticated')
      router.push('/admin')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-primary border-opacity-20 rounded-xl p-8 animate-fade-in-up">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">SPYRO INC</h1>
            <p className="text-gray-300">Admin Dashboard Login</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-400 rounded-lg p-4 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-white font-semibold mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-primary" size={20} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-secondary text-white rounded-lg pl-10 pr-4 py-3 border border-primary border-opacity-20 focus:border-primary focus:outline-none transition-all"
                  placeholder="admin@spyroinc.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-white font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-primary" size={20} />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-secondary text-white rounded-lg pl-10 pr-4 py-3 border border-primary border-opacity-20 focus:border-primary focus:outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all"
            >
              Login
            </button>
          </form>

          <div className="mt-6 p-4 bg-secondary rounded-lg text-sm text-gray-400">
            <p className="font-semibold text-white mb-2">Demo Credentials:</p>
            <p>Email: admin@spyroinc.com</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
