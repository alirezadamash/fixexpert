import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "سفارش خدمات",
  description: "سایت سفارش خدمات در محل",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
          rel="stylesheet"
        />
        <style>{`
          * {
            font-family: 'Vazirmatn', sans-serif !important;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
