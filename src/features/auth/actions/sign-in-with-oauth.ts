"use server"

import { signIn } from "auth"
import { BuiltInProviderType } from "next-auth/providers"

export const signInWithOAuth = async (provider: BuiltInProviderType) => {
  await signIn(provider)
}

export const signInWithCredentials = async (
  email: string,
  password: string
) => {
  await signIn("credentials", { email, password })
}
