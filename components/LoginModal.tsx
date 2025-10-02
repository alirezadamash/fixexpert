"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (userData: any) => void
  onSwitchToRegister: () => void
}

export default function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }: LoginModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin({ name: "کاربر", email: formData.email })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4" dir="rtl">
        <button onClick={onClose} className="absolute left-4 top-4 p-2 hover:bg-gray-100 rounded-full">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6">ورود به حساب کاربری</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">ایمیل</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">رمز عبور</label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="رمز عبور خود را وارد کنید"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            ورود
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            حساب کاربری ندارید؟{" "}
            <button onClick={onSwitchToRegister} className="text-blue-600 hover:text-blue-700 font-medium">
              ثبت نام کنید
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
