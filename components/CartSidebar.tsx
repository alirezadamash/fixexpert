"use client"

import { X, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartSidebarProps {
  cart: CartItem[]
  isOpen: boolean
  onClose: () => void
  onCheckout: () => void
}

export default function CartSidebar({ cart, isOpen, onClose, onCheckout }: CartSidebarProps) {
  if (!isOpen) return null

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div
        className="absolute left-0 top-0 h-full w-full md:w-96 bg-white shadow-xl animate-in slide-in-from-left"
        dir="rtl"
      >
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">سبد خرید</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto h-[calc(100%-200px)]">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <p>سبد خرید شما خالی است</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-sm mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-bold">{item.price.toLocaleString()} ت</span>
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Plus className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-red-100 text-red-600 rounded mr-2">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-white">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">جمع کل:</span>
            <span className="font-bold text-green-600 text-lg">{total.toLocaleString()} تومان</span>
          </div>
          <Button onClick={onCheckout} className="w-full bg-green-600 hover:bg-green-700" disabled={cart.length === 0}>
            ادامه خرید
          </Button>
        </div>
      </div>
    </div>
  )
}
