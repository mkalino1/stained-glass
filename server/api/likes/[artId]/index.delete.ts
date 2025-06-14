import { z } from 'zod'

const likeDeleteSchema = z.object({
  artId: z.coerce.number().nonnegative()
})

export default defineEventHandler(async (event) => {
  const { artId } = await getValidatedRouterParams(event, body => likeDeleteSchema.parse(body))

  const session = await requireUserSession(event)

  await useDrizzle().delete(tables.likes).where(and(
    eq(tables.likes.artId, artId),
    eq(tables.likes.userId, session.user.id)
  ))
  
  return 'success'
})
