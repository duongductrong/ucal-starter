import { relations } from "drizzle-orm"
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core"
import { User, users } from "./users"

export const providers = pgTable("providers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().references(() => users.id),
  provider: varchar({ length: 255 }),
  providerId: varchar({ length: 255 }),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const providersRelations = relations(providers, ({ one }) => ({
  user: one(users, {
    fields: [providers.userId],
    references: [users.id],
  }),
}))

export type Provider = typeof providers.$inferSelect
export type ProviderInsert = typeof providers.$inferInsert
export type ProviderInsertWithUser = ProviderInsert & {
  userId: User["id"]
}
