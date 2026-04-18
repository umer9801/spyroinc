'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

export interface ISettings {
    siteName: string;
    contactEmail: string;
    phoneNumber?: string;
    address?: string;
    serviceArea?: string;
    businessHours?: string;
    socialLinks?: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
    };
    footerText?: string;
}

export function useSettings() {
    const [settings, setSettings] = useState<ISettings | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get('/api/admin/settings')
                if (response.data.success) {
                    setSettings(response.data.data)
                }
            } catch (error) {
                console.error("Error fetching settings:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchSettings()
    }, [])

    return { settings, loading }
}
