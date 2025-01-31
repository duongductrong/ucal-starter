"use client"

import { AuthSignedIn } from "@/features/auth/components/auth"
import { ReactNode } from "react"

export interface AdminLayoutProps {
  children: ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return <AuthSignedIn>{children}</AuthSignedIn>
}

export default AdminLayout
