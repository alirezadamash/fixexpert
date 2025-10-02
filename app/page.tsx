"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import {
  X,
  Phone,
  ShoppingCart,
  User,
  ChevronDown,
  Star,
  Check,
  Ticket,
  Menu,
  Home,
  ChevronLeft,
  ChevronRight,
  Zap,
  Shield,
  Clock,
  Award,
  Monitor,
} from "lucide-react"
import TicketingSystem from "@/components/TicketingSystem"
import CheckoutPage from "@/components/CheckoutPage"
import UserPanel from "@/components/UserPanel"
import OnlineChat from "@/components/OnlineChat"
import CartSidebar from "@/components/CartSidebar"
import LoginModal from "@/components/LoginModal"
import RegisterModal from "@/components/RegisterModal"

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

function MobileMenu({
  isOpen,
  onClose,
  onShowTicketing,
  isLoggedIn,
  onShowLogin,
  onShowRegister,
  onShowUserPanel,
}: any) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl animate-in slide-in-from-right">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">منو</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => {
                  onClose()
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                className="w-full flex items-center gap-3 p-3 rounded-lg text-right text-gray-700 hover:bg-gray-100"
              >
                <Home className="w-5 h-5" />
                صفحه اصلی
              </button>
            </li>

            {serviceCategories.map((category, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    onClose()
                    const element = document.getElementById("services-section")
                    element?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-right text-gray-700 hover:bg-gray-100"
                >
                  <span className="text-xl">{category.icon}</span>
                  {category.name}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={() => {
                  onClose()
                  onShowTicketing()
                }}
                className="w-full flex items-center gap-3 p-3 rounded-lg text-right text-orange-600 hover:bg-orange-50"
              >
                <Ticket className="w-5 h-5" />
                تیکت پشتیبانی
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  onClose()
                  const element = document.getElementById("contact-section")
                  element?.scrollIntoView({ behavior: "smooth" })
                }}
                className="w-full flex items-center gap-3 p-3 rounded-lg text-right text-gray-700 hover:bg-gray-100"
              >
                <Phone className="w-5 h-5" />
                تماس با ما
              </button>
            </li>
          </ul>

          <div className="mt-6 pt-6 border-t">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  onClose()
                  onShowUserPanel()
                }}
                className="w-full flex items-center gap-3 p-3 rounded-lg text-right bg-blue-50 text-blue-600"
              >
                <User className="w-5 h-5" />
                پنل کاربری
              </button>
            ) : (
              <div className="space-y-2">
                <Button
                  onClick={() => {
                    onClose()
                    onShowLogin()
                  }}
                  variant="outline"
                  className="w-full"
                >
                  ورود
                </Button>
                <Button
                  onClick={() => {
                    onClose()
                    onShowRegister()
                  }}
                  className="w-full"
                >
                  ثبت نام
                </Button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
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
                    className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer flex justify-between transition-colors"
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
  const [showTicketing, setShowTicketing] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
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
  const [isScrolled, setIsScrolled] = useState(false) // Added scroll state

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % serviceCategories.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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

  const handleCheckoutSubmit = (checkoutFormData: any) => {
    console.log("Checkout submitted:", checkoutFormData)
    setShowCheckout(false)
    setOrderSubmitted(true)
    setOrderDetails({ ...orderDetails, ...checkoutFormData, status: "پرداخت شده" })
  }

  const OrderSummary = () => (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg" dir="rtl">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-500">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">سفارش شما با موفقیت ثبت شد!</h2>
        <p className="text-sm md:text-base text-gray-600">جزئیات سفارش و اطلاعات تکنسین مسئول</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
          <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-800">جزئیات سفارش</h3>
          <div className="space-y-3 text-sm md:text-base">
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
            {orderDetails?.name && (
              <div className="flex justify-between">
                <span className="text-gray-600">نام مشتری:</span>
                <span className="font-medium">{orderDetails.name}</span>
              </div>
            )}
            {orderDetails?.phone && (
              <div className="flex justify-between">
                <span className="text-gray-600">شماره تماس:</span>
                <span className="font-medium">{orderDetails.phone}</span>
              </div>
            )}
            {orderDetails?.address && (
              <div className="flex justify-between">
                <span className="text-gray-600">آدرس:</span>
                <span className="font-medium">{orderDetails.address}</span>
              </div>
            )}
          </div>
        </div>

        {assignedTechnician && (
          <div className="bg-blue-50 p-4 md:p-6 rounded-lg">
            <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-800">تکنسین مسئول</h3>
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
            <div className="text-sm text-gray-600">
              <p>شماره تماس: {assignedTechnician.phone}</p>
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
            setOrderDetails(null)
            setAssignedTechnician(null)
            setCart([])
          }}
          variant="outline"
          className="flex-1"
        >
          سفارش جدید
        </Button>
      </div>
    </div>
  )

  const handleCheckout = () => {
    setShowCart(false)
    setShowCheckout(true)
  }

  if (showTicketing) {
    return <TicketingSystem isOpen={true} onClose={() => setShowTicketing(false)} user={user} />
  }

  if (showCheckout) {
    return (
      <CheckoutPage
        cart={cart}
        onBack={() => {
          setShowCheckout(false)
          setShowCart(true)
        }}
        onSubmit={handleCheckoutSubmit}
      />
    )
  }

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
      <header
        className={`bg-white shadow-sm border-b relative sticky top-0 z-40 transition-all duration-300 ${
          isScrolled ? "py-2" : "py-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-14" : "h-16"}`}
          >
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span
                className={`font-bold transition-all duration-300 ${isScrolled ? "text-base" : "text-lg md:text-xl"}`}
              >
                فیکس اکسپرت
              </span>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-6">
              <button
                onMouseEnter={() => setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                خدمات
                <ChevronDown className="w-4 h-4" />
              </button>
              <a href="#contact-section" className="text-gray-700 hover:text-blue-600 transition-colors">
                تماس با ما
              </a>
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={() => setShowMobileMenu(true)}
                className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>

              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cart.length}
                  </span>
                )}
              </button>

              {isLoggedIn ? (
                <button
                  onClick={() => setShowUserPanel(true)}
                  className="hidden md:flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden lg:inline">{user?.name || "کاربر"}</span>
                </button>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Button
                    onClick={() => setShowTicketing(true)}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Ticket className="w-4 h-4 ml-1" />
                    تیکت
                  </Button>
                  <Button onClick={() => setShowLogin(true)} variant="outline" size="sm">
                    ورود
                  </Button>
                  <Button
                    onClick={() => setShowRegister(true)}
                    size="sm"
                    className="hidden lg:flex bg-blue-600 hover:bg-blue-700"
                  >
                    ثبت نام
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div onMouseEnter={() => setShowMegaMenu(true)} onMouseLeave={() => setShowMegaMenu(false)}>
          <MegaMenu isOpen={showMegaMenu} onClose={() => setShowMegaMenu(false)} />
        </div>
      </header>

      {/* Added Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-green-600 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              خدمات تخصصی کامپیوتر و فناوری اطلاعات
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              با بیش از ۱۵ سال تجربه، تیم متخصص ما آماده ارائه بهترین خدمات به شما عزیزان است
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  const element = document.getElementById("order-form")
                  element?.scrollIntoView({ behavior: "smooth" })
                }}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8"
              >
                سفارش خدمات
              </Button>
              <Button
                onClick={() => setShowTicketing(true)}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8"
              >
                تیکت پشتیبانی
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
            {[
              { icon: Zap, title: "سرویس سریع", desc: "انجام کار در کمترین زمان" },
              { icon: Shield, title: "تضمین کیفیت", desc: "گارانتی معتبر خدمات" },
              { icon: Clock, title: "پشتیبانی ۲۴/۷", desc: "همیشه در کنار شما" },
              { icon: Award, title: "تیم متخصص", desc: "کارشناسان مجرب" },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-300 animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-blue-100 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold">پیشنهاد ویژه!</h3>
                <p className="text-sm md:text-base">تا ۳۰٪ تخفیف برای سفارشات بالای ۱ میلیون تومان</p>
              </div>
            </div>
            <Button
              onClick={() => {
                const element = document.getElementById("order-form")
                element?.scrollIntoView({ behavior: "smooth" })
              }}
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 font-bold"
            >
              استفاده از تخفیف
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Services Slider with better animations */}
      <section id="services-section" className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">خدمات تخصصی ما</h2>
            <p className="text-gray-600 text-sm md:text-base">انتخاب کنید و به سبد خرید اضافه کنید</p>
            <div className="flex justify-center gap-2 mt-6">
              {serviceCategories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide === index ? "bg-blue-600 w-8" : "bg-gray-300 w-2"
                  }`}
                  aria-label={`اسلاید ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={() => setActiveSlide((prev) => (prev - 1 + serviceCategories.length) % serviceCategories.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 md:p-3 hover:bg-gray-100 transition-colors hidden md:block"
              aria-label="اسلاید قبلی"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={() => setActiveSlide((prev) => (prev + 1) % serviceCategories.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 md:p-3 hover:bg-gray-100 transition-colors hidden md:block"
              aria-label="اسلاید بعدی"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(${activeSlide * -100}%)` }}
              >
                {serviceCategories.map((category, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2 md:px-4">
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 md:p-8">
                      <div className="text-center mb-6">
                        <div className="text-5xl md:text-6xl mb-4 animate-bounce">{category.icon}</div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.services.length} خدمت موجود</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                        {category.services.slice(0, 6).map((service, idx) => (
                          <div
                            key={service.id}
                            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4"
                            style={{ animationDelay: `${idx * 50}ms` }}
                          >
                            <h4 className="font-medium mb-2 text-sm md:text-base text-gray-800 line-clamp-2">
                              {service.name}
                            </h4>
                            <div className="flex items-center justify-between">
                              <span className="text-green-600 font-bold text-sm md:text-base">
                                {service.price.toLocaleString()} ت
                              </span>
                              <Button
                                onClick={() => {
                                  addToCart(service)
                                }}
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-xs md:text-sm"
                              >
                                افزودن
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      {category.services.length > 6 && (
                        <div className="text-center mt-6">
                          <Button
                            variant="outline"
                            onClick={() => {
                              const element = document.getElementById("order-form")
                              element?.scrollIntoView({ behavior: "smooth" })
                            }}
                          >
                            مشاهده {category.services.length - 6} خدمت دیگر
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">محبوب‌ترین خدمات</h2>
            <p className="text-gray-600 text-sm md:text-base">پرفروش‌ترین خدمات ما با بهترین قیمت</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "نصب ویندوز و درایور",
                price: 200000,
                discount: 20,
                icon: Monitor, // Changed from string "🪟" to Monitor icon component
                badge: "پرفروش",
              },
              {
                name: "تعمیر لپ‌تاپ",
                price: 500000,
                discount: 15,
                icon: "💻",
                badge: "محبوب",
              },
              {
                name: "راه‌اندازی شبکه",
                price: 500000,
                discount: 25,
                icon: "🌐",
                badge: "ویژه",
              },
              {
                name: "مجازی‌سازی سرور",
                price: 1500000,
                discount: 30,
                icon: "🖥️",
                badge: "تخفیف ویژه",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                  {service.badge}
                </div>
                <div className="text-5xl mb-4 text-center">
                  {typeof service.icon === "string" ? (
                    service.icon
                  ) : (
                    <service.icon className="w-12 h-12 mx-auto text-blue-600" />
                  )}
                </div>
                <h3 className="font-bold text-center mb-3">{service.name}</h3>
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-bold text-green-600">
                      {(service.price * (1 - service.discount / 100)).toLocaleString()}
                    </span>
                    <span className="text-sm">تومان</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="text-sm text-gray-400 line-through">{service.price.toLocaleString()}</span>
                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-bold">
                      {service.discount}٪ تخفیف
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    const element = document.getElementById("order-form")
                    element?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  سفارش با تخفیف
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section id="order-form" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">سفارش خدمات</h2>
            <p className="text-gray-600 text-sm md:text-base">فرم زیر را تکمیل کنید تا با شما تماس بگیریم</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Input
                placeholder="نام و نام خانوادگی"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="text-sm md:text-base"
              />
              <Input
                placeholder="شماره تلفن"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="text-sm md:text-base"
              />
              <Input
                placeholder="آیدی تلگرام"
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                className="text-sm md:text-base"
              />
              <Input
                placeholder="ایمیل"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="text-sm md:text-base"
              />
            </div>

            {/* Service Selection Tabs */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {serviceCategories.map((category, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setActiveTab(index)
                      setSelectedService("")
                    }}
                    className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${
                      activeTab === index
                        ? "bg-blue-600 text-white shadow-md scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span className="md:hidden">{category.icon}</span>
                    <span className="hidden md:inline">
                      {category.icon} {category.name}
                    </span>
                  </button>
                ))}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-600">
                <h3 className="font-semibold text-blue-900 mb-2 text-sm md:text-base">
                  دسته‌بندی انتخابی: {serviceCategories[activeTab]?.name}
                </h3>
                <p className="text-xs md:text-sm text-blue-700">لطفاً یکی از خدمات زیر را انتخاب کنید</p>
              </div>

              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                required
              >
                <option value="">انتخاب خدمت از {serviceCategories[activeTab]?.name}...</option>
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              rows={4}
            />

            <Input
              placeholder="آدرس محل سرویس"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
              className="text-sm md:text-base"
            />

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-base md:text-lg py-5 md:py-6">
              ثبت سفارش
            </Button>
          </form>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">نظرات مشتریان</h2>
            <p className="text-gray-600 text-sm md:text-base">رضایت شما، افتخار ماست</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "محمد رضایی",
                service: "نصب ویندوز",
                rating: 5,
                comment: "خدمات عالی و سریع. کاملاً حرفه‌ای و با کیفیت بالا. پیشنهاد می‌کنم!",
              },
              {
                name: "سارا احمدی",
                service: "تعمیر لپ‌تاپ",
                rating: 5,
                comment: "تکنسین بسیار ماهر و با تجربه. لپ‌تاپم مثل روز اول شد. ممنونم!",
              },
              {
                name: "علی کریمی",
                service: "راه‌اندازی شبکه",
                rating: 5,
                comment: "قیمت مناسب و کار تمیز. شبکه شرکتمون رو عالی راه‌اندازی کردن.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.service}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-green-600 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm">{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: "👥", number: "۱۰۰۰+", label: "مشتری راضی" },
              { icon: "⭐", number: "۴.۹", label: "امتیاز رضایت" },
              { icon: "🏆", number: "۱۵+", label: "سال تجربه" },
              { icon: "✅", number: "۱۰۰٪", label: "تضمین کیفیت" },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-blue-600 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact-section" className="bg-gray-800 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-lg md:text-xl font-bold">فیکس اکسپرت</span>
              </div>
              <p className="text-gray-300 mb-4 text-sm md:text-base">ارائه خدمات تخصصی کامپیوتر و فناوری اطلاعات</p>

              <div className="flex gap-4">
                <a
                  href="https://instagram.com/fixexpert.ir"
                  className="text-gray-300 hover:text-pink-500 transition-colors"
                  aria-label="اینستاگرام"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://t.me/fixexpert_ir"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                  aria-label="تلگرام"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </a>
                <a
                  href="mailto:info@fixexpert.ir"
                  className="text-gray-300 hover:text-red-400 transition-colors"
                  aria-label="ایمیل"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-base md:text-lg">دسترسی سریع</h3>
              <ul className="space-y-2 text-sm md:text-base">
                <li>
                  <a href="#services-section" className="text-gray-300 hover:text-white transition-colors">
                    خدمات
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setShowTicketing(true)}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    تیکت پشتیبانی
                  </button>
                </li>
                <li>
                  <a href="#contact-section" className="text-gray-300 hover:text-white transition-colors">
                    تماس با ما
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-base md:text-lg">خدمات محبوب</h3>
              <ul className="space-y-2 text-sm md:text-base">
                <li className="text-gray-300">نصب ویندوز</li>
                <li className="text-gray-300">تعمیر لپ‌تاپ</li>
                <li className="text-gray-300">راه‌اندازی شبکه</li>
                <li className="text-gray-300">مجازی‌سازی سرور</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-base md:text-lg">تماس با ما</h3>
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-gray-300">۰۹۰۱۰۸۱۲۶۸۱</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <span className="text-gray-300">info@fixexpert.ir</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm md:text-base">
            <p className="text-gray-300">© ۱۴۰۳ فیکس اکسپرت. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
        onShowTicketing={() => {
          setShowMobileMenu(false)
          setShowTicketing(true)
        }}
        isLoggedIn={isLoggedIn}
        onShowLogin={() => {
          setShowMobileMenu(false)
          setShowLogin(true)
        }}
        onShowRegister={() => {
          setShowMobileMenu(false)
          setShowRegister(true)
        }}
        onShowUserPanel={() => {
          setShowMobileMenu(false)
          setShowUserPanel(true)
        }}
      />

      {/* Online Chat */}
      <OnlineChat />

      {/* Modals */}
      <CartSidebar cart={cart} isOpen={showCart} onClose={() => setShowCart(false)} onCheckout={handleCheckout} />
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={(userData) => {
          setIsLoggedIn(true)
          setUser(userData)
          setShowLogin(false)
        }}
        onSwitchToRegister={() => {
          setShowLogin(false)
          setShowRegister(true)
        }}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onRegister={(userData) => {
          setIsLoggedIn(true)
          setUser(userData)
          setShowRegister(false)
        }}
        onSwitchToLogin={() => {
          setShowRegister(false)
          setShowLogin(true)
        }}
      />
    </div>
  )
}
