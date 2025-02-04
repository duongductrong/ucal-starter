"use server"

import { urls } from "@/config/urls"
import { redirect } from "@/i18n/routing"
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
    const result = await signIn("credentials", { email, password }).catch(
      (error) => {
        if (error instanceof Error && error.message === "NEXT_REDIRECT") {
          return "ok"
        }

        returnValidationErrors(signInWithCredentialsSchema, {
          email: {
            _errors: [
              "Invalid email or password or the email is already connected to another account.",
            ],
          },
        })
      }
    )

    return result === "ok" ? redirect({ href: urls.home, locale: "en" }) : null
  })

export const signOutWithAccount = safeAction.action(async () => {
  await signOut()
})
