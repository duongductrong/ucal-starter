"use client"

import { Session } from "next-auth"
import { SessionProvider as SessionProviderPrimitive } from "next-auth/react"

const SessionProvider = ({
  children,
  session,
}: {
  session: Session | null
  children: React.ReactNode
}) => {
  return (
    <SessionProviderPrimitive session={session}>
      {children}
    </SessionProviderPrimitive>
  )
}

export default SessionProvider
