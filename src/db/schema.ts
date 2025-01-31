import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core"

export const userTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  provider: varchar({ length: 255 }),
  providerId: varchar({ length: 255 }),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
  avatar: varchar({ length: 255 }),
  emailVerified: timestamp(),
})
