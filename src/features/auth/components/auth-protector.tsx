import { redirect } from "@/i18n/routing"
import { useSession } from "next-auth/react"
import { ReactNode } from "react"

export interface AuthProtectorProps {
  children: ReactNode
}

export const AuthProtector = ({ children }: AuthProtectorProps) => {
  const session = useSession()

  if (session.status === "authenticated") {
    return redirect({ href: "/admin", locale: "en" })
  }

  return children
}

export const AuthRequired = ({ children }: AuthProtectorProps) => {
  const session = useSession()

  if (session.status === "authenticated") {
    return children
  }

  return redirect({ href: "/sign-in", locale: "en" })
}
