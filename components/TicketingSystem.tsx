"use client"

import type React from "react"

import { useState } from "react"
import { X, Send, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TicketingSystemProps {
  isOpen: boolean
  onClose: () => void
  user: any
}

export default function TicketingSystem({ isOpen, onClose, user }: TicketingSystemProps) {
  const [tickets, setTickets] = useState<any[]>([])
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [newTicket, setNewTicket] = useState({
    subject: "",
    message: "",
    priority: "متوسط",
  })

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault()
    const ticket = {
      id: `T${Date.now()}`,
      ...newTicket,
      status: "باز",
      date: new Date().toLocaleDateString("fa-IR"),
      time: new Date().toLocaleTimeString("fa-IR"),
    }
    setTickets([ticket, ...tickets])
    setNewTicket({ subject: "", message: "", priority: "متوسط" })
    setShowNewTicket(false)
  }

  if (!isOpen) return null

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-2xl font-bold">سیستم تیکتینگ</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            {!showNewTicket ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">تیکت‌های من</h3>
                  <Button onClick={() => setShowNewTicket(true)} className="bg-blue-600 hover:bg-blue-700">
                    تیکت جدید
                  </Button>
                </div>

                {tickets.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>شما هنوز تیکتی ثبت نکرده‌اید</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tickets.map((ticket) => (
                      <div key={ticket.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{ticket.subject}</h4>
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${
                              ticket.status === "باز"
                                ? "bg-green-100 text-green-700"
                                : ticket.status === "در حال بررسی"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {ticket.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{ticket.message}</p>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>شماره تیکت: {ticket.id}</span>
                          <span>
                            {ticket.date} - {ticket.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setShowNewTicket(false)}
                  className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2"
                >
                  ← بازگشت
                </button>
                <form onSubmit={handleSubmitTicket} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">موضوع تیکت</label>
                    <Input
                      value={newTicket.subject}
                      onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                      placeholder="موضوع تیکت را وارد کنید"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">اولویت</label>
                    <select
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="کم">کم</option>
                      <option value="متوسط">متوسط</option>
                      <option value="زیاد">زیاد</option>
                      <option value="فوری">فوری</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">پیام</label>
                    <textarea
                      value={newTicket.message}
                      onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                      placeholder="توضیحات خود را وارد کنید"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows={6}
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                      <Send className="w-4 h-4 ml-2" />
                      ارسال تیکت
                    </Button>
                    <Button type="button" variant="outline" className="flex-1 bg-transparent">
                      <Paperclip className="w-4 h-4 ml-2" />
                      پیوست فایل
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
