import { createUser } from "@/db/queries/user/create-user"
import { isUserAlreadyExists } from "@/db/queries/user/error"
import { getUserByEmail } from "@/db/queries/user/get-user-by-email"
import { comparePasswords } from "@/lib/password"
import { UnstorageAdapter } from "@auth/unstorage-adapter"
import { isNil } from "lodash"
import NextAuth from "next-auth"
import "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { createStorage } from "unstorage"
import memoryDriver from "unstorage/drivers/memory"

export interface AuthCredentials {
  email: string
  password: string
}

const storage = createStorage({
  driver: memoryDriver(),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  basePath: "/api/auth",
  adapter: UnstorageAdapter(storage),
  debug: !!process.env.AUTH_DEBUG,
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  providers: [
    Google,
    Github,
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (_credentials: unknown) => {
        const credentials = _credentials as AuthCredentials

        return {
          email: credentials.email,
          password: credentials.password,
          image: null,
          provider: "credentials",
          providerId: null,
        }
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, credentials }) => {
      const hasCredentials = !isNil(credentials)

      if (!hasCredentials) {
        try {
          await createUser({
            email: user?.email as string,
            password: null,
            name: user.name,
            provider: account?.provider as string,
            providerId: account?.providerAccountId as string,
            avatar: user?.image as string,
            emailVerified: new Date(),
          })

          return true
        } catch (error) {
          if (isUserAlreadyExists(error)) return true

          return false
        }
      }

      const existingUser = await getUserByEmail({
        email: credentials?.email as string,
      })

      if (!existingUser) return false

      const isMatchedPasswords = await comparePasswords(
        credentials.password as string,
        existingUser?.password as string
      )

      return isMatchedPasswords
    },

    authorized() {
      return true
    },

    async jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name

      const result = token

      if (account?.provider === "keycloak") {
        result.accessToken = account.access_token
      }

      return result
    },

    async session({ session, token }) {
      if (token?.accessToken) session.accessToken = token.accessToken

      return session
    },
  },
  experimental: { enableWebAuthn: true },
})

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}
