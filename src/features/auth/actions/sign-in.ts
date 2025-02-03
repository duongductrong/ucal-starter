"use server"

import { safeAction } from "@/lib/safe-action"
import { signIn, signOut } from "auth"
import { returnValidationErrors } from "next-safe-action"
import { z } from "zod"

export const signInWithOAuth = safeAction
  .schema(z.string())
  .action(async ({ parsedInput: provider }) => {
    await signIn(provider)
  })

const signInWithCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const signInWithCredentials = safeAction
  .schema(signInWithCredentialsSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      await signIn("credentials", { email, password })
    } catch {
      return returnValidationErrors(signInWithCredentialsSchema, {
        email: {
          _errors: ["Invalid email or password"],
        },
      })
    }
  })

export const signOutWithAccount = safeAction.action(async () => {
  await signOut()
})
