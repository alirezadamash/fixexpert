"use client"

import { useState } from "react"
import { X, User, Package, Ticket, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UserPanelProps {
  user: any
  onClose: () => void
}

export default function UserPanel({ user, onClose }: UserPanelProps) {
  const [activeTab, setActiveTab] = useState("orders")

  const orders = [
    {
      id: "FE1234567",
      service: "نصب ویندوز و درایور",
      status: "تکمیل شده",
      date: "۱۴۰۳/۰۹/۱۵",
      price: 200000,
    },
    {
      id: "FE1234568",
      service: "تعمیر لپ‌تاپ",
      status: "در حال انجام",
      date: "۱۴۰۳/۰۹/۲۰",
      price: 500000,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-2xl font-bold">پنل کاربری</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                  {user?.name?.charAt(0) || "ک"}
                </div>
                <h3 className="text-center font-semibold">{user?.name || "کاربر"}</h3>
                <p className="text-center text-sm text-gray-600">{user?.email || "user@example.com"}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-right transition-colors ${
                    activeTab === "orders" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                  }`}
                >
                  <Package className="w-5 h-5" />
                  سفارشات من
                </button>
                <button
                  onClick={() => setActiveTab("tickets")}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-right transition-colors ${
                    activeTab === "tickets" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                  }`}
                >
                  <Ticket className="w-5 h-5" />
                  تیکت‌های من
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-right transition-colors ${
                    activeTab === "profile" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                  }`}
                >
                  <User className="w-5 h-5" />
                  پروفایل
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-right transition-colors ${
                    activeTab === "settings" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  تنظیمات
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg text-right text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="w-5 h-5" />
                  خروج
                </button>
              </nav>
            </div>

            <div className="md:col-span-3">
              {activeTab === "orders" && (
                <div>
                  <h3 className="text-xl font-bold mb-4">سفارشات من</h3>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{order.service}</h4>
                            <p className="text-sm text-gray-600">شماره سفارش: {order.id}</p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${
                              order.status === "تکمیل شده"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{order.date}</span>
                          <span className="font-bold text-green-600">{order.price.toLocaleString()} تومان</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "tickets" && (
                <div>
                  <h3 className="text-xl font-bold mb-4">تیکت‌های من</h3>
                  <div className="text-center py-12 text-gray-500">
                    <p>شما هنوز تیکتی ثبت نکرده‌اید</p>
                    <Button className="mt-4">ایجاد تیکت جدید</Button>
                  </div>
                </div>
              )}

              {activeTab === "profile" && (
                <div>
                  <h3 className="text-xl font-bold mb-4">اطلاعات پروفایل</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">نام و نام خانوادگی</label>
                      <input
                        type="text"
                        defaultValue={user?.name}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">ایمیل</label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">شماره تماس</label>
                      <input
                        type="tel"
                        defaultValue={user?.phone}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">ذخیره تغییرات</Button>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h3 className="text-xl font-bold mb-4">تنظیمات</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">اعلان‌ها</h4>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span>دریافت اعلان ایمیل</span>
                      </label>
                      <label className="flex items-center gap-2 mt-2">
                        <input type="checkbox" defaultChecked />
                        <span>دریافت اعلان پیامکی</span>
                      </label>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">تغییر رمز عبور</h4>
                      <Button variant="outline">تغییر رمز عبور</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
