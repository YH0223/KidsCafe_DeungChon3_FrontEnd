import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR, Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const notoSansKR = Noto_Sans_KR({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-kr"
});

export const metadata: Metadata = {
  title: '서울형 키즈카페 등촌3동점',
  description: '엄빠서울 서울형 키즈카페 등촌 3동점 웹 사이트',
  generator: 'v0.app',
  keywords: ['키즈카페', '어린이놀이터', '실내놀이터', '서울키즈카페', '가족나들이'],
}

export const viewport: Viewport = {
  themeColor: '#E85A2C',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={cn("bg-background", "font-sans", geist.variable)}>
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
