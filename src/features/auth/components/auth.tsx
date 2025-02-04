import { redirect } from "@/i18n/routing"
import { getRedirectAuthPath } from "@/utils/auth"
import { useSession } from "next-auth/react"
import { PropsWithChildren } from "react"

export const AuthPossible = ({ children }: PropsWithChildren) => {
  const session = useSession()

  if (session.status === "authenticated") {
    return redirect({
      href: getRedirectAuthPath(session.data.user),
      locale: "en",
    })
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
