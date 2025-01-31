"use client"

import { AuthPossible } from "@/features/auth/components/auth"
import { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <AuthPossible>{children}</AuthPossible>
}
