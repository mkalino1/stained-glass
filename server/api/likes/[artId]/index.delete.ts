import { z } from 'zod'
import { and, eq } from 'drizzle-orm'

const likeDeleteSchema = z.object({
  artId: z.coerce.number().nonnegative()
})

export default defineEventHandler(async (event) => {
  const { artId } = await getValidatedRouterParams(event, body => likeDeleteSchema.parse(body))

  const session = await requireUserSession(event)

  await db.delete(schema.likes).where(and(
    eq(schema.likes.artId, artId),
    eq(schema.likes.userId, session.user.id)
  ))
  
  return 'success'
})
