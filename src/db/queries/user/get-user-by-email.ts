import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import invariant from "tiny-invariant"

export interface GetUserByEmailVariables {
  email: string
}

export const getUserByEmail = ({ email }: GetUserByEmailVariables) => {
  console.log({ email })

  invariant(email, "Email must be provided")

  return db.query.users.findFirst({
    where: eq(users.email, email),
  })
}
