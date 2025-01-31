import { relations } from "drizzle-orm"
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core"
import { Provider, providers } from "./providers"

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
  avatar: varchar({ length: 255 }),
  emailVerified: timestamp(),
  password: varchar({ length: 255 }),
})

export const usersRelations = relations(users, ({ many }) => ({
  providers: many(providers),
}))

export type User = typeof users.$inferSelect
export type UserInsert = typeof users.$inferInsert
export type UserInsertWithProvider = UserInsert &
  Pick<Provider, "provider" | "providerId">
