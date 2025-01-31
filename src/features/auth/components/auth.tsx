import { redirect } from "@/i18n/routing"
import { useSession } from "next-auth/react"
import { PropsWithChildren } from "react"

export const AuthPossible = ({ children }: PropsWithChildren) => {
  const session = useSession()

  if (session.status === "authenticated") {
    return redirect({ href: "/admin", locale: "en" })
  }

  return children
}

export const AuthSignedIn = ({ children }: PropsWithChildren) => {
  const session = useSession()

  if (session.status === "authenticated") {
    return children
  }

  return redirect({ href: "/sign-in", locale: "en" })
}
