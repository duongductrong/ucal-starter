"use server"

import { signIn, signOut } from "auth"
import { BuiltInProviderType } from "next-auth/providers"

export const signInWithOAuth = async (provider: BuiltInProviderType) => {
  await signIn(provider)
}

export const signInWithCredentials = async (email: string) => {
  await signIn("credentials", { email })
}

export const signOutWithAccount = async () => {
  await signOut()
}
