"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin } from "lucide-react"

// Mock data برای خدمات کامپیوتری و فنی
const services = [
  { id: "1", name: "نصب و تعمیر مودم و فعال‌سازی اینترنت", price: 150000, icon: "🌐" },
  { id: "2", name: "نصب و تعمیر و تعویض نرم افزار و درایو", price: 120000, icon: "💿" },
  { id: "3", name: "تعمیر، تعویض، نصب لوازم جانبی کامپیوتر", price: 200000, icon: "🖱️" },
  { id: "4", name: "تعمیر، نصب، تعویض قطعات سخت افزاری کامپیوتر", price: 300000, icon: "🔧" },
]

function Header() {
  return (
    <header className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">فیکس اکسپرت</h1>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">
              خدمات
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              تماس
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">F</span>
              </div>
              <h3 className="text-xl font-bold">فیکس اکسپرت</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              ارائه دهنده خدمات تخصصی کامپیوتر و فناوری اطلاعات در محل شما
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">خدمات ما</h4>
            <ul className="space-y-2 text-gray-300">
              <li>تعمیر کامپیوتر و لپ تاپ</li>
              <li>نصب نرم افزار و درایو</li>
              <li>راه اندازی شبکه و اینترنت</li>
              <li>پشتیبانی فنی</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">تماس با ما</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span dir="ltr">09010812681</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span dir="ltr">info@fixexpert.ir</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span>رشت، گیلان</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; ۱۴۰۴ فیکس اکسپرت. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  )
}

function ServicesSection() {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">خدمات ما</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.id} className="text-center p-6 rounded-lg border hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-2">{service.name}</h3>
              <p className="text-blue-600 font-bold">{formatPrice(service.price)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
}

export default function ServiceOrderForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    telegram: "",
    service: "",
    description: "",
    address: "",
  })

  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [orderDetails, setOrderDetails] = useState<{
    orderNumber: string
    trackingNumber: string
    serialNumber: string
    orderDate: string
  } | null>(null)

  const handleServiceChange = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId)
    setSelectedService(service || null)
    setFormData((prev) => ({ ...prev, service: serviceId }))
  }

  const generateOrderDetails = () => {
    const now = new Date()
    return {
      orderNumber: `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${Math.floor(
        Math.random() * 1000,
      )
        .toString()
        .padStart(3, "0")}`,
      trackingNumber: `TRK-${Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0")}`,
      serialNumber: `SER-${Math.floor(Math.random() * 100000)
        .toString()
        .padStart(5, "0")}`,
      orderDate: now.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const details = generateOrderDetails()
    setOrderDetails(details)
    console.log("سفارش ثبت شد:", formData, selectedService, details)
    setIsSubmitted(true)
  }

  if (isSubmitted && orderDetails && selectedService) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <ServicesSection />
        <div className="py-8 px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* خلاصه سفارش */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="text-center">
                <CardTitle className="text-green-600 text-3xl flex items-center justify-center gap-3">
                  ✅ سفارش شما با موفقیت ثبت شد
                </CardTitle>
                <CardDescription className="text-lg text-green-700">
                  شماره پیگیری: <span className="font-bold text-xl">{orderDetails.trackingNumber}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-4 text-xl">
                    <span className="text-4xl">{selectedService.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-800">{selectedService.name}</h3>
                      <p className="text-green-600 font-semibold">{formatPrice(selectedService.price)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
                    <div>
                      <span className="text-gray-600">مشتری:</span>
                      <span className="font-semibold mr-2">{formData.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">تلفن:</span>
                      <span className="font-semibold mr-2" dir="ltr">
                        {formData.phone}
                      </span>
                    </div>
                    {formData.telegram && (
                      <div>
                        <span className="text-gray-600">تلگرام:</span>
                        <span className="font-semibold mr-2" dir="ltr">
                          {formData.telegram}
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-600">تاریخ:</span>
                      <span className="font-semibold mr-2">{orderDetails.orderDate}</span>
                    </div>
                  </div>

                  {formData.description && (
                    <div>
                      <span className="text-gray-600">توضیحات:</span>
                      <p className="bg-gray-50 p-3 rounded mt-2">{formData.description}</p>
                    </div>
                  )}

                  <div>
                    <span className="text-gray-600">آدرس:</span>
                    <p className="bg-gray-50 p-3 rounded mt-2">{formData.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* فاکتور */}
            <Card>
              <CardHeader className="text-center border-b">
                <CardTitle className="text-2xl">فاکتور خدمات</CardTitle>
                <CardDescription>شماره فاکتور: {orderDetails.orderNumber}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {/* هدر فاکتور */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold">فیکس اکسپرت</h2>
                    <p className="text-gray-600">ارائه دهنده خدمات تخصصی</p>
                    <p className="text-sm text-gray-500">fixexpert.ir</p>
                  </div>
                  <div className="text-left">
                    <div className="bg-gray-800 text-white p-4 rounded text-center">
                      <div className="text-xs mb-1">BARCODE</div>
                      <div className="font-mono text-sm">||||| |||| ||||| ||||</div>
                      <div className="text-xs mt-1">{orderDetails.serialNumber}</div>
                    </div>
                  </div>
                </div>

                {/* جزئیات فاکتور */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold mb-2">اطلاعات مشتری:</h4>
                    <p>نام: {formData.name}</p>
                    <p dir="ltr" className="text-left">
                      تلفن: {formData.phone}
                    </p>
                    {formData.telegram && (
                      <p dir="ltr" className="text-left">
                        تلگرام: {formData.telegram}
                      </p>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">اطلاعات فاکتور:</h4>
                    <p>شماره فاکتور: {orderDetails.orderNumber}</p>
                    <p>سریال: {orderDetails.serialNumber}</p>
                    <p>تاریخ: {orderDetails.orderDate}</p>
                  </div>
                </div>

                {/* جدول خدمات */}
                <div className="border rounded-lg overflow-hidden mb-6">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-3 text-right">خدمات</th>
                        <th className="p-3 text-center">تعداد</th>
                        <th className="p-3 text-left">مبلغ (تومان)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3 flex items-center gap-2">
                          <span className="text-2xl">{selectedService.icon}</span>
                          {selectedService.name}
                        </td>
                        <td className="p-3 text-center">۱</td>
                        <td className="p-3 text-left font-semibold">{formatPrice(selectedService.price)}</td>
                      </tr>
                    </tbody>
                    <tfoot className="bg-gray-50 border-t-2">
                      <tr>
                        <td className="p-3 font-bold" colSpan={2}>
                          جمع کل:
                        </td>
                        <td className="p-3 text-left font-bold text-lg text-green-600">
                          {formatPrice(selectedService.price)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* شماره پیگیری */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-blue-800 mb-2">شماره پیگیری سفارش</h4>
                  <div className="text-2xl font-bold text-blue-600 font-mono">{orderDetails.trackingNumber}</div>
                  <p className="text-sm text-blue-700 mt-2">این شماره را برای پیگیری وضعیت سفارش نزد خود نگه دارید</p>
                </div>

                {/* دکمه‌ها */}
                <div className="flex gap-4 mt-6">
                  <Button onClick={() => window.print()} variant="outline" className="flex-1">
                    چاپ فاکتور
                  </Button>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false)
                      setOrderDetails(null)
                      setFormData({
                        name: "",
                        phone: "",
                        telegram: "",
                        service: "",
                        description: "",
                        address: "",
                      })
                      setSelectedService(null)
                    }}
                    className="flex-1"
                  >
                    سفارش جدید
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ServicesSection />

      {/* فرم اصلی */}
      <div className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-800">سفارش خدمات</CardTitle>
              <CardDescription className="text-lg">
                اطلاعات خود را وارد کنید تا خدمات مورد نظرتان را در محل ارائه دهیم
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* اطلاعات شخصی */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-700">اطلاعات تماس</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base">
                        نام و نام خانوادگی *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="نام خود را وارد کنید"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        required
                        className="text-right text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base">
                        شماره تلفن *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        required
                        className="text-left text-base"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telegram" className="text-base">
                      آیدی تلگرام (اختیاری)
                    </Label>
                    <Input
                      id="telegram"
                      type="text"
                      placeholder="@username"
                      value={formData.telegram}
                      onChange={(e) => setFormData((prev) => ({ ...prev, telegram: e.target.value }))}
                      className="text-left text-base"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* انتخاب خدمات */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-700">انتخاب خدمات</h3>

                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-base">
                      نوع خدمات *
                    </Label>
                    <Select onValueChange={handleServiceChange} required>
                      <SelectTrigger className="text-base">
                        <SelectValue placeholder="خدمات مورد نظر را انتخاب کنید" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id} className="text-base">
                            <div className="flex justify-between items-center w-full">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{service.icon}</span>
                                <span>{service.name}</span>
                              </div>
                              <span className="text-sm text-gray-500 mr-4">{formatPrice(service.price)}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* نمایش قیمت */}
                  {selectedService && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{selectedService.icon}</span>
                          <span className="font-medium text-green-800 text-lg">{selectedService.name}</span>
                        </div>
                        <span className="text-2xl font-bold text-green-600">{formatPrice(selectedService.price)}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* توضیحات */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base">
                    توضیحات اضافی
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="توضیحات بیشتر در مورد مشکل یا درخواست خود..."
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className="text-right min-h-[100px] text-base"
                  />
                </div>

                {/* آدرس */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-base">
                    آدرس محل خدمات *
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="آدرس کامل محل ارائه خدمات را وارد کنید..."
                    value={formData.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                    required
                    className="text-right min-h-[80px] text-base"
                  />
                </div>

                {/* دکمه ثبت */}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-xl font-semibold"
                  disabled={!formData.name || !formData.phone || !formData.service || !formData.address}
                >
                  ثبت سفارش
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
