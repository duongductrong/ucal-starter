import { redirect } from "@/i18n/routing"
import { useSession } from "next-auth/react"
import { ReactNode } from "react"

export interface AuthProtectorProps {
  children: ReactNode
}

const AuthProtector = ({ children }: AuthProtectorProps) => {
  const session = useSession()

  if (session.status === "authenticated") {
    return redirect({ href: "/admin", locale: "en" })
  }

  return children
}

export default AuthProtector
