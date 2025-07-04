import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core'

export const arts = sqliteTable('arts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  resolution: integer('resolution').notNull(),
  shapes: text('shapes').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  location: text('location'),
  author: integer('author')
})

export const likes = sqliteTable('likes', {
  artId: integer('art_id').notNull().references(() => arts.id, {onDelete: 'cascade'}),
  userId: integer('user_id').notNull()
}, (table) => [
  primaryKey({ columns: [table.artId, table.userId] })
])