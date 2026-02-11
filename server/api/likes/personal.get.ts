import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)

  const personal = await db
    .select({ artId: schema.likes.artId })
    .from(schema.likes)
    .where(eq(schema.likes.userId, session.user.id))

  return personal
});
