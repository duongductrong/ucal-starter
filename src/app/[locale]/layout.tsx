/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeProvider } from "@/components/ui/theme-provider"
import { routing } from "@/i18n/routing"
import { cn } from "@/utils/tw"
import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { Geist, Inter } from "next/font/google"
import { notFound } from "next/navigation"

import SessionProvider from "@/components/uses/auth/session-provider"
import { auth } from "auth"
import "../globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Next Starter",
  description: "Next Starter",
}

export interface LayoutProps {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const locale = (await params).locale || "en"

  if (!routing.locales.includes(locale as any)) {
    return notFound()
  }

  const [messages, session] = await Promise.all([
    getMessages({ locale: locale }),
    auth(),
  ])

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(inter.variable, geist.variable, "font-sans antialiased")}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider attribute="class" forcedTheme="light">
            <SessionProvider session={session}>{children}</SessionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
