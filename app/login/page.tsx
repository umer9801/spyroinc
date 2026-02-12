'use client'

import axios from "axios"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Mail, Loader2, ArrowLeft } from 'lucide-react'
import { toast } from "sonner"
import Link from 'next/link'

export default function AdminLogin() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await axios.post('/api/login', { email, password });

      if (response.data.success) {
        toast.success("Login successful! Redirecting to dashboard...")
        // Using window.location.href instead of router.push ensures the 
        // middleware picks up the new cookie immediately via a full page reload.
        // window.location.href = '/admin';
        router.push('/admin')
      } else {
        const errorMsg = response.data.message || 'Login failed';
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || err.message || 'An error occurred during login';
        setError(message);
        toast.error(message);
        console.error("Login Error:", message);
      } else {
        const errorMsg = 'An unexpected error occurred';
        setError(errorMsg);
        toast.error(errorMsg);
        console.error("Unexpected Error:", err);
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative">
      <div className="absolute top-8 left-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors font-semibold"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-8 shadow-2xl animate-fade-in-up">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 uppercase tracking-tighter">SPYRO <span className="text-primary">INC</span></h1>
            <p className="text-gray-400">Admin Dashboard Login</p>
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
                <Mail className="absolute left-3 top-3 text-secondary-foreground/40" size={20} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-secondary/50 text-white rounded-lg pl-10 pr-4 py-3 border border-white/10 focus:border-primary focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-white font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-secondary-foreground/40" size={20} />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-secondary/50 text-white rounded-lg pl-10 pr-4 py-3 border border-white/10 focus:border-primary focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={20} />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}
