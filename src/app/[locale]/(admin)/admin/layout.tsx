"use client"

import {
  AuthRequired
} from "@/features/auth/components/auth-protector"
import { ReactNode } from "react"

export interface AdminLayoutProps {
  children: ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return <AuthRequired>{children}</AuthRequired>
}

export default AdminLayout
