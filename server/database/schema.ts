import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const arts = sqliteTable('arts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  resolution: integer('resolution').notNull(),
  shapes: text('shapes').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})