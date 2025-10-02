"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onRegister: (userData: any) => void
  onSwitchToLogin: () => void
}

export default function RegisterModal({ isOpen, onClose, onRegister, onSwitchToLogin }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("رمز عبور و تکرار آن یکسان نیستند")
      return
    }
    onRegister({ name: formData.name, email: formData.email, phone: formData.phone })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4" dir="rtl">
        <button onClick={onClose} className="absolute left-4 top-4 p-2 hover:bg-gray-100 rounded-full">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6">ثبت نام</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">نام و نام خانوادگی</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="نام خود را وارد کنید"
              required
            />
          </div>

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
            <label className="block text-sm font-medium mb-2">شماره تماس</label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
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

          <div>
            <label className="block text-sm font-medium mb-2">تکرار رمز عبور</label>
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="رمز عبور را دوباره وارد کنید"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            ثبت نام
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            قبلاً ثبت نام کرده‌اید؟{" "}
            <button onClick={onSwitchToLogin} className="text-blue-600 hover:text-blue-700 font-medium">
              وارد شوید
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
