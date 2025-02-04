"use client"

import { AuthTrusted } from "@/features/auth/components/auth"
import { ReactNode } from "react"

export interface AdminLayoutProps {
  children: ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return <AuthTrusted>{children}</AuthTrusted>
}

export default AdminLayout
