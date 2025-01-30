"use client"

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

const AuthSessionProvider = ({
  children,
  session,
}: {
  session: Session | null
  children: React.ReactNode
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default AuthSessionProvider
