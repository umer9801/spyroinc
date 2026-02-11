'use client'

import React from 'react'
import { X, AlertTriangle, Trash2 } from 'lucide-react'

interface DeleteModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    itemName: string
    loading?: boolean
}

export function DeleteModal({ isOpen, onClose, onConfirm, title, itemName, loading }: DeleteModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-[#1A1A1A] border border-white/10 w-full max-w-md rounded-[24px] shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
                {/* Top Danger Bar */}
                <div className="h-1.5 w-full bg-red-500/50" />

                <div className="p-8">
                    <div className="flex flex-col items-center text-center">
                        {/* Warning Icon Container */}
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
                            <AlertTriangle className="text-red-500" size={32} />
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            Are you sure you want to delete <span className="text-white font-semibold">"{itemName}"</span>? This action cannot be undone and the data will be permanently removed.
                        </p>

                        <div className="flex flex-col w-full gap-3">
                            <button
                                disabled={loading}
                                onClick={onConfirm}
                                className="w-full flex items-center justify-center gap-2 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/20"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Trash2 size={20} />
                                )}
                                Confirm Delete
                            </button>

                            <button
                                disabled={loading}
                                onClick={onClose}
                                className="w-full py-4 bg-secondary/50 hover:bg-secondary text-white rounded-xl font-bold transition-all border border-white/5"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-full transition-all"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    )
}
