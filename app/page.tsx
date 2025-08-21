"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { MessageCircle, X, Send, Phone, Mail, MapPin, ShoppingCart, User, ChevronDown, Star, Check } from "lucide-react"

const serviceCategories = [
  {
    name: "مجازی‌سازی سرور",
    icon: "🖥️",
    services: [
      { id: "hypervisor-install", name: "آماده‌سازی زیرساخت نصب هایپروایزر", price: 1500000 },
      { id: "esxi-vmware-install", name: "نصب Esxi, VMware, v-Hyper, Oracle Hypervisor", price: 2000000 },
      { id: "vm-install", name: "نصب VM (شامل تنظیمات و تخصیص منابع)", price: 800000 },
      { id: "center-virtual-install", name: "نصب Center Virtual چند ویندوز و تنظیمات اولیه", price: 1200000 },
      { id: "center-virtual-unix", name: "نصب Center Virtual چند Unix/Linux و تنظیمات اولیه", price: 1200000 },
      { id: "storage-san", name: "نصب Storage SAN مجازی و تنظیمات iSCSI", price: 1800000 },
      { id: "virtual-storage", name: "نصب Virtual Storage Appliance", price: 1400000 },
      { id: "hypervisor-ha", name: "کلاسترینگ Hypervisor برای HA", price: 2500000 },
      { id: "switch-virtual", name: "نصب ویچینگ Switch Virtual", price: 1800000 },
      { id: "pptv-config", name: "تنظیل شبکه‌ای فیزیکی به مجازی و پیکربندی (PPTV)", price: 2200000 },
    ],
  },
  {
    name: "عیب‌یابی و تعمیرات سخت‌افزار",
    icon: "🔧",
    services: [
      { id: "hard-recovery", name: "ریکاوری هارد با مشکلات سخت‌افزاری", price: 800000 },
      { id: "bad-sector-repair", name: "عیب‌یابی در سطح تعمیرات قطعه", price: 650000 },
      { id: "admin-sector-repair", name: "عیب‌یابی در سطح تعمیرات اداری", price: 570000 },
      { id: "chip-repair", name: "تعمیرات با ریتال چیپ", price: 1200000 },
      { id: "android-repair", name: "تعمیش اندروید", price: 500000 },
      { id: "bga-repair", name: "ریگرام نرم‌افزاری باگیوس", price: 650000 },
      { id: "bga-hardware", name: "ریگرام سخت‌افزاری باگیوس", price: 750000 },
      { id: "power-repair", name: "تعمیر پاور", price: 400000 },
      { id: "power-replace", name: "تعمیر پاور", price: 350000 },
    ],
  },
  {
    name: "نصب و عیب‌یابی نرم‌افزارهای موبایلی",
    icon: "📱",
    services: [
      { id: "mobile-os-install", name: "نصب سیستم عامل (اقلیت و نرم افزار جانبی)", price: 400000 },
      { id: "mobile-registry", name: "رفع عیب تخصصی نرم‌افزاری (کوکل اکانت - شماره سریال)", price: 450000 },
      { id: "mobile-registry-config", name: "ریجستری گذشتی", price: 200000 },
      { id: "mobile-specialized", name: "نصب نرم‌افزارهای تخصصی", price: 320000 },
      { id: "mobile-public", name: "نصب نرم‌افزارهای عمومی", price: 170000 },
      { id: "mobile-gaming", name: "نصب نرم‌افزار جانبی", price: 120000 },
      { id: "mobile-firewall", name: "حداقل فیشن و کارآمدسازی", price: 400000 },
      { id: "mobile-apps", name: "اپلیکیشن و وب‌اپ", price: 650000 },
    ],
  },
  {
    name: "نصب ویندوز و نرم‌افزار",
    icon: "🪟",
    services: [
      { id: "windows-install", name: "نصب ویندوز و درایور", price: 200000 },
      { id: "windows-virus", name: "ویندوز یابی و ویروس اردی سیستم", price: 120000 },
      { id: "windows-antivirus", name: "نصب آنتی ویروس", price: 95000 },
      { id: "windows-partition", name: "پارتیشن بندی", price: 73000 },
      { id: "windows-specialized", name: "نصب نرم‌افزارهای عمومی", price: 83000 },
      { id: "windows-public", name: "نصب نرم‌افزارهای تخصصی", price: 72000 },
      { id: "windows-recovery", name: "نصب پرینتر و اسکنر روی یک سیستم", price: 150000 },
      { id: "windows-data-recovery", name: "ریکاوری اطلاعات", price: 478000 },
      { id: "windows-apps", name: "اپلیکیشن و وب‌اپ", price: 173000 },
      { id: "windows-optimization", name: "حداقل فیشن و کارآمدسازی", price: 300000 },
    ],
  },
  {
    name: "تعمیر لپ‌تاپ",
    icon: "💻",
    services: [
      { id: "laptop-download", name: "بازیابی و عیب یابی", price: 200000 },
      { id: "laptop-reset", name: "بازریست دستگاه", price: 175000 },
      { id: "laptop-service", name: "سرویس عمومی", price: 200000 },
      { id: "laptop-lcd", name: "تعمیر یا تعویض LCD", price: 500000 },
      { id: "laptop-keyboard-carbon", name: "تعویض کیبورد یا کربن دستگاه", price: 300000 },
      { id: "laptop-keyboard-mouse", name: "تعویض کیبورد یا به جوش", price: 300000 },
      { id: "laptop-plastic", name: "تعویض کیبورد یا جوش پلاستیک", price: 400000 },
      { id: "laptop-adapter-full", name: "تعویض کامل آداپتور یا شارژر", price: 200000 },
      { id: "laptop-adapter", name: "تعمیر آداپتور", price: 120000 },
      { id: "laptop-charger", name: "تعمیر یا تعویض مدار شارژ", price: 450000 },
      { id: "laptop-charger-socket", name: "تعمیر سوکت شارژر", price: 300000 },
      { id: "laptop-socket", name: "تعمیر سوکت شارژر", price: 400000 },
    ],
  },
  {
    name: "تعمیر کامپیوتر",
    icon: "🖥️",
    services: [
      { id: "computer-service-normal", name: "سرویس کامل سیستم معمولی", price: 310000 },
      { id: "computer-service-gaming", name: "سرویس کامل سیستم گیمینگ و گیمینگ", price: 370000 },
      { id: "computer-troubleshoot-advanced", name: "عیب‌یابی در سطح تعمیرات قطعه", price: 245000 },
      { id: "computer-troubleshoot-admin", name: "عیب‌یابی در سطح تعمیرات اداری", price: 245000 },
      { id: "computer-hard-recovery", name: "تعمیر هاردیسک", price: 80000 },
      { id: "computer-android-recovery", name: "تعمیش اندروید", price: 500000 },
      { id: "computer-memory-test", name: "تعویض رم و سوکت", price: 432000 },
      { id: "computer-power-repair", name: "تعمیر اسلات", price: 391000 },
      { id: "computer-bga-cpu", name: "تعویض سوکت CPU یا دستگاه BGA", price: 870000 },
      { id: "computer-power", name: "تعمیر پاور", price: 850000 },
      { id: "computer-odd", name: "تعمیر ODD", price: 200000 },
    ],
  },
  {
    name: "نصب و راه‌اندازی شبکه",
    icon: "🌐",
    services: [
      { id: "network-config-users", name: "انجام تنظیمات نرم‌افزاری برای کاربران", price: 250000 },
      { id: "network-install-router", name: "نصب روتر در شبکه و انجام تنظیمات", price: 500000 },
      { id: "network-install-switch", name: "نصب سوئیچ در شبکه و انجام تنظیمات", price: 500000 },
      { id: "network-server-config", name: "انجام تنظیمات سرور و تنظیم esxi", price: 1250000 },
      { id: "network-machine-config", name: "نصب ماشین مجازی روی esxi", price: 750000 },
      { id: "network-share-config", name: "نصب و اشتراک گذاری پرینتر در شبکه", price: 250000 },
      { id: "network-firewall-physical", name: "نصب و تنظیم فایروال روی شبکه مجازی", price: 1000000 },
      { id: "network-firewall-virtual", name: "نصب و تنظیم فایروال روی شبکه فیزیکی", price: 500000 },
      { id: "network-mikrotik", name: "راه اندازی سرویس‌های میکروتیک", price: 500000 },
      { id: "network-weekly", name: "راه اندازی ساماتیه یکپارچه خودکار از سیستم‌ها و سرور", price: 1100000 },
      { id: "network-apps", name: "اپلیکیشن و وب‌اپ", price: 217000 },
      { id: "network-optimization", name: "حداقل فیشن و کارآمدسازی", price: 395000 },
    ],
  },
]

const technicians = {
  "مجتبی روشن فکر": {
    name: "مجتبی روشن فکر",
    specialties: ["عیب‌یابی و تعمیرات سخت‌افزار", "تعمیر لپ‌تاپ", "تعمیر کامپیوتر"],
    phone: "۰۹۱۱۱۲۳۴۵۶۷",
    experience: "۱۰ سال",
    rating: 4.8,
  },
  "علیرضا منصوری": {
    name: "علیرضا منصوری",
    specialties: ["نصب ویندوز و نرم‌افزار", "تعمیر کامپیوتر", "نصب و عیب‌یابی نرم‌افزارهای موبایلی"],
    phone: "۰۹۰۱۰۸۱۲۶۸۱",
    experience: "۱۵ سال",
    rating: 4.9,
  },
  "محسن منصوری": {
    name: "محسن منصوری",
    specialties: ["نصب و راه‌اندازی شبکه", "مجازی‌سازی سرور"],
    phone: "۰۹۱۲۱۲۳۴۵۶۷",
    experience: "۱۲ سال",
    rating: 4.7,
  },
  "بردیا مجد": {
    name: "بردیا مجد",
    specialties: ["نصب و عیب‌یابی نرم‌افزارهای موبایلی", "نصب ویندوز و نرم‌افزار"],
    phone: "۰۹۳۳۱۲۳۴۵۶۷",
    experience: "۸ سال",
    rating: 4.6,
  },
}

function assignTechnician(serviceCategory: string): (typeof technicians)[keyof typeof technicians] {
  const assignments = {
    "عیب‌یابی و تعمیرات سخت‌افزار": "مجتبی روشن فکر",
    "تعمیر لپ‌تاپ": "مجتبی روشن فکر",
    "تعمیر کامپیوتر": "علیرضا منصوری",
    "نصب ویندوز و نرم‌افزار": "علیرضا منصوری",
    "نصب و عیب‌یابی نرم‌افزارهای موبایلی": "بردیا مجد",
    "نصب و راه‌اندازی شبکه": "محسن منصوری",
    "مجازی‌سازی سرور": "محسن منصوری",
  }

  const technicianName = assignments[serviceCategory as keyof typeof assignments] || "علیرضا منصوری"
  return technicians[technicianName as keyof typeof technicians]
}

function MegaMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="absolute top-full left-0 right-0 bg-white shadow-xl border-t z-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {serviceCategories.map((category, index) => (
            <div key={index} className="space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-xl">{category.icon}</span>
                {category.name}
              </h3>
              <ul className="space-y-2">
                {category.services.slice(0, 5).map((service) => (
                  <li
                    key={service.id}
                    className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer flex justify-between"
                  >
                    <span>{service.name}</span>
                    <span className="text-green-600 font-medium">{service.price.toLocaleString()} ت</span>
                  </li>
                ))}
                {category.services.length > 5 && (
                  <li className="text-sm text-blue-600 cursor-pointer">+ {category.services.length - 5} خدمت دیگر</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CartSidebar({ isOpen, onClose, cart, setCart }: any) {
  const total = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">سبد خرید</h2>
            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">سبد خرید خالی است</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-green-600 font-medium">{item.price.toLocaleString()} تومان</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const newCart = cart.map((cartItem: any) =>
                          cartItem.id === item.id
                            ? { ...cartItem, quantity: Math.max(1, cartItem.quantity - 1) }
                            : cartItem,
                        )
                        setCart(newCart)
                      }}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => {
                        const newCart = cart.map((cartItem: any) =>
                          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
                        )
                        setCart(newCart)
                      }}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">مجموع:</span>
              <span className="font-bold text-lg text-green-600">{total.toLocaleString()} تومان</span>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700">ادامه خرید</Button>
          </div>
        )}
      </div>
    </div>
  )
}

function LoginModal({ isOpen, onClose, onLogin }: any) {
  const [loginMethod, setLoginMethod] = useState("password")
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg p-6 w-96 max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">ورود</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={loginMethod === "password" ? "default" : "outline"}
              onClick={() => setLoginMethod("password")}
              className="flex-1 text-sm"
            >
              رمز عبور
            </Button>
            <Button
              variant={loginMethod === "otp" ? "default" : "outline"}
              onClick={() => setLoginMethod("otp")}
              className="flex-1 text-sm"
            >
              کد یکبار مصرف
            </Button>
          </div>

          <Input
            placeholder="ایمیل، موبایل یا نام کاربری"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          {loginMethod === "password" && (
            <Input
              type="password"
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          <Button
            onClick={() => {
              onLogin({ name: "کاربر تست", email: identifier })
              onClose()
            }}
            className="w-full"
          >
            {loginMethod === "password" ? "ورود" : "ارسال کد"}
          </Button>

          <div className="text-center text-sm text-gray-500">یا ورود با</div>

          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent">
              <Mail className="w-4 h-4" />
              Gmail
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent">
              📱 تلگرام
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent">
              📷 اینستاگرام
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function RegisterModal({ isOpen, onClose, onRegister }: any) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    telegram: "",
    password: "",
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg p-6 w-96 max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">ثبت نام</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="نام و نام خانوادگی"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            placeholder="شماره موبایل"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <Input
            placeholder="ایمیل"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            placeholder="آیدی تلگرام"
            value={formData.telegram}
            onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
          />
          <Input
            placeholder="رمز عبور"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <Button
            onClick={() => {
              onRegister(formData)
              onClose()
            }}
            className="w-full"
          >
            ثبت نام
          </Button>
        </div>
      </div>
    </div>
  )
}

function UserPanel({ user, onClose }: any) {
  const [activeSection, setActiveSection] = useState("profile")

  const mockOrders = [
    {
      id: "FE1234567890",
      service: "نصب ویندوز و درایور",
      price: 200000,
      status: "تکمیل شده",
      technician: "علیرضا منصوری",
      date: "۱۴۰۴/۰۸/۱۵",
      rating: 5,
    },
    {
      id: "FE1234567891",
      service: "تعمیر لپ‌تاپ",
      price: 500000,
      status: "در حال انجام",
      technician: "مجتبی روشن فکر",
      date: "۱۴۰۴/۰۸/۲۰",
      rating: null,
    },
  ]

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || "ک"}
              </div>
              <div>
                <h3 className="font-semibold">{user?.name || "کاربر"}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              {[
                { id: "profile", name: "پروفایل", icon: User },
                { id: "orders", name: "سفارشات", icon: ShoppingCart },
                { id: "transactions", name: "تراکنش‌ها", icon: Phone },
                { id: "invoices", name: "فاکتورها", icon: Mail },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-right ${
                      activeSection === item.id ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b flex items-center justify-between">
            <h1 className="text-2xl font-bold">پنل کاربری</h1>
            <Button onClick={onClose} variant="outline">
              بازگشت
            </Button>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            {activeSection === "profile" && (
              <div className="max-w-2xl">
                <h2 className="text-xl font-semibold mb-6">اطلاعات پروفایل</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="نام و نام خانوادگی" defaultValue={user?.name} />
                  <Input placeholder="شماره موبایل" defaultValue="۰۹۰۱۰۸۱۲۶۸۱" />
                  <Input placeholder="ایمیل" defaultValue={user?.email} />
                  <Input placeholder="آیدی تلگرام" defaultValue="@user_telegram" />
                  <div className="md:col-span-2">
                    <Input placeholder="آدرس" defaultValue="رشت، خیابان اصلی" />
                  </div>
                </div>
                <Button className="mt-6">ذخیره تغییرات</Button>
              </div>
            )}

            {activeSection === "orders" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">سفارشات من</h2>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">{order.service}</h3>
                          <p className="text-sm text-gray-500">شماره سفارش: {order.id}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            order.status === "تکمیل شده"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">تکنسین:</span>
                          <p className="font-medium">{order.technician}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">تاریخ:</span>
                          <p className="font-medium">{order.date}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">مبلغ:</span>
                          <p className="font-medium text-green-600">{order.price.toLocaleString()} تومان</p>
                        </div>
                        <div>
                          <span className="text-gray-500">امتیاز:</span>
                          <div className="flex items-center">
                            {order.rating ? (
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < order.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            ) : (
                              <span className="text-gray-400">در انتظار امتیاز</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "transactions" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">تراکنش‌های مالی</h2>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">پرداخت سفارش FE1234567890</h3>
                      <p className="text-sm text-gray-500">۱۴۰۴/۰۸/۱۵ - ۱۴:۳۰</p>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-red-600">-۲۰۰,۰۰۰ تومان</p>
                      <p className="text-sm text-green-600">موفق</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "invoices" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">فاکتورها</h2>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">فاکتور FE1234567890</h3>
                      <p className="text-sm text-gray-500">نصب ویندوز و درایور</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-semibold">۲۰۰,۰۰۰ تومان</span>
                      <Button size="sm" variant="outline">
                        دانلود
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function OnlineChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: "سلام! چطور می‌تونم کمکتون کنم؟", sender: "support", time: "الان" },
  ])
  const [newMessage, setNewMessage] = useState("")

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "user",
        time: "الان",
      }
      setMessages([...messages, message])
      setNewMessage("")

      setTimeout(() => {
        const reply = {
          id: messages.length + 2,
          text: "پیام شما دریافت شد. یکی از کارشناسان ما به زودی پاسخ خواهد داد.",
          sender: "support",
          time: "الان",
        }
        setMessages((prev) => [...prev, reply])
      }, 2000)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 left-6 w-80 h-96 bg-white rounded-lg shadow-xl border z-50">
          <div className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-t-lg">
            <h3 className="font-medium">چت آنلاین</h3>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col h-80">
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="پیام خود را بنویسید..."
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function Page() {
  const [currentView, setCurrentView] = useState("home")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showMegaMenu, setShowMegaMenu] = useState(false)
  const [showUserPanel, setShowUserPanel] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeTab, setActiveTab] = useState(0)
  const [selectedService, setSelectedService] = useState("")
  const [orderSubmitted, setOrderSubmitted] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null)
  const [assignedTechnician, setAssignedTechnician] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    telegram: "",
    email: "",
    service: "",
    description: "",
    address: "",
  })

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % serviceCategories.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const addToCart = (service: any) => {
    const existingItem = cart.find((item: any) => item.id === service.id)
    if (existingItem) {
      setCart(cart.map((item: any) => (item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...service, quantity: 1 }])
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const selectedServiceObj = serviceCategories
      .flatMap((cat) => cat.services)
      .find((service) => service.id === selectedService)

    if (!selectedServiceObj) return

    const selectedCategory = serviceCategories.find((cat) =>
      cat.services.some((service) => service.id === selectedService),
    )

    const technician = assignTechnician(selectedCategory?.name || "")

    const order = {
      id: `FE${Date.now()}`,
      serialNumber: `SN${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      trackingNumber: `TR${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      ...formData,
      service: selectedServiceObj.name,
      price: selectedServiceObj.price,
      category: selectedCategory?.name,
      date: new Date().toLocaleDateString("fa-IR"),
      time: new Date().toLocaleTimeString("fa-IR"),
      status: "در انتظار پرداخت",
      technician: technician,
    }

    setOrderDetails(order)
    setAssignedTechnician(technician)
    setOrderSubmitted(true)
  }

  const OrderSummary = () => (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg" dir="rtl">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">سفارش شما با موفقیت ثبت شد!</h2>
        <p className="text-gray-600">جزئیات سفارش و اطلاعات تکنسین مسئول</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">جزئیات سفارش</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">شماره سفارش:</span>
              <span className="font-medium">{orderDetails?.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">شماره پیگیری:</span>
              <span className="font-medium text-blue-600">{orderDetails?.trackingNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">خدمت:</span>
              <span className="font-medium">{orderDetails?.service}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">قیمت:</span>
              <span className="font-medium text-green-600">{orderDetails?.price?.toLocaleString()} تومان</span>
            </div>
          </div>
        </div>

        {assignedTechnician && (
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">تکنسین مسئول</h3>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {assignedTechnician.name.charAt(0)}
              </div>
              <div className="mr-3">
                <h4 className="font-semibold text-gray-800">{assignedTechnician.name}</h4>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600 mr-1">{assignedTechnician.rating}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Button onClick={() => window.print()} className="flex-1 bg-blue-600 hover:bg-blue-700">
          چاپ فاکتور
        </Button>
        <Button
          onClick={() => {
            setOrderSubmitted(false)
            setFormData({
              name: "",
              phone: "",
              telegram: "",
              email: "",
              service: "",
              description: "",
              address: "",
            })
            setSelectedService("")
          }}
          variant="outline"
          className="flex-1"
        >
          سفارش جدید
        </Button>
      </div>
    </div>
  )

  if (showUserPanel) {
    return <UserPanel user={user} onClose={() => setShowUserPanel(false)} />
  }

  if (orderSubmitted) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <OrderSummary />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold">فیکس اکسپرت</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                onMouseEnter={() => setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                خدمات
                <ChevronDown className="w-4 h-4" />
              </button>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                تماس با ما
              </a>
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              {isLoggedIn ? (
                <button
                  onClick={() => setShowUserPanel(true)}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>{user?.name || "کاربر"}</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button onClick={() => setShowLogin(true)} variant="outline" size="sm">
                    ورود
                  </Button>
                  <Button onClick={() => setShowRegister(true)} size="sm">
                    ثبت نام
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <MegaMenu isOpen={showMegaMenu} onClose={() => setShowMegaMenu(false)} />
      </header>

      {/* Services Slider */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">خدمات تخصصی ما</h2>
            <div className="flex justify-center gap-2">
              {serviceCategories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    activeSlide === index ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${activeSlide * -100}%)` }}
            >
              {serviceCategories.map((category, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="text-center">
                    <div className="text-6xl mb-4">{category.icon}</div>
                    <h3 className="text-2xl font-bold mb-4">{category.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                      {category.services.slice(0, 6).map((service) => (
                        <div key={service.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                          <h4 className="font-medium mb-2 text-sm">{service.name}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-yellow-300 font-bold">{service.price.toLocaleString()} ت</span>
                            <Button
                              onClick={() => addToCart(service)}
                              size="sm"
                              variant="secondary"
                              className="text-xs"
                            >
                              افزودن
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">سفارش خدمات</h2>
            <p className="text-gray-600">فرم زیر را تکمیل کنید تا با شما تماس بگیریم</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                placeholder="نام و نام خانوادگی"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                placeholder="شماره تلفن"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <Input
                placeholder="آیدی تلگرام"
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
              />
              <Input
                placeholder="ایمیل"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            {/* Service Selection Tabs */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {serviceCategories.map((category, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveTab(index)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === index ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.icon} {category.name}
                  </button>
                ))}
              </div>

              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">انتخاب خدمت...</option>
                {serviceCategories[activeTab]?.services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - {service.price.toLocaleString()} تومان
                  </option>
                ))}
              </select>
            </div>

            <textarea
              placeholder="توضیحات اضافی"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
            />

            <Input
              placeholder="آدرس محل سرویس"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
              ثبت سفارش
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-xl font-bold">فیکس اکسپرت</span>
              </div>
              <p className="text-gray-300 mb-4">ارائه خدمات تخصصی کامپیوتر و فناوری اطلاعات</p>

              <div className="flex gap-4">
                <a
                  href="https://instagram.com/fixexpert.ir"
                  className="text-gray-300 hover:text-pink-400 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="https://t.me/fixexpert_ir" className="text-gray-300 hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </a>
                <a href="mailto:info@fixexpert.ir" className="text-gray-300 hover:text-red-400 transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">خدمات</h3>
              <ul className="space-y-2 text-gray-300">
                <li>تعمیر کامپیوتر</li>
                <li>تعمیر لپ‌تاپ</li>
                <li>نصب ویندوز</li>
                <li>راه‌اندازی شبکه</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">تماس با ما</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>۰۹۰۱۰۸۱۲۶۸۱</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@fixexpert.ir</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>رشت</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">درباره ما</h3>
              <p className="text-gray-300 text-sm">
                فیکس اکسپرت با بیش از ۱۵ سال تجربه در زمینه خدمات فنی کامپیوتر، آماده ارائه بهترین خدمات به شما عزیزان
                است.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; ۱۴۰۴ فیکس اکسپرت. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CartSidebar isOpen={showCart} onClose={() => setShowCart(false)} cart={cart} setCart={setCart} />
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={(userData: any) => {
          setUser(userData)
          setIsLoggedIn(true)
        }}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onRegister={(userData: any) => {
          setUser(userData)
          setIsLoggedIn(true)
        }}
      />

      <OnlineChat />
    </div>
  )
}
