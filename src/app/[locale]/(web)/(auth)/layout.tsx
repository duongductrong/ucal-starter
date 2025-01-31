"use client"

import AuthProtector from "@/features/auth/components/auth-protector"
import { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <AuthProtector>{children}</AuthProtector>
}
