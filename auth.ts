import { NextAuthOptions } from "next-auth"
import "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
  CredentialsProvider({
    type: "credentials",
    name: "credentials",
    credentials: {},
    authorize: async () => {
      return { id: "1", name: "John Doe", email: "john@doe.com" }
    },
  }),
]

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: providers,

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        // const myUser = user as unknown

        return {
          ...token,
          // firstName: myUser.firstName,
          // lastName: myUser.lastName,
          // id: myUser.id,
          // randomKey: myUser.id,
          // role: myUser.role,
        }
      }
      return token
    },
    async session({ session }) {
      // const _token = token as unknown as JWT

      // const currentUser = await userService.detail(_token.id, { include: { role: true } })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const currentUser = {} as any

      if (!currentUser) throw new Error("Unauthorized")

      return {
        ...session,
        user: {
          ...session.user,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
          id: currentUser.id,
          role: currentUser.role,
        },
        expires: session.expires,
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === "development",
}
