import { z } from 'zod'

const likePostSchema = z.object({
  artId: z.coerce.number().nonnegative()
})

export default defineEventHandler(async (event) => {
  const { artId } = await getValidatedRouterParams(event, body => likePostSchema.parse(body))

  const session = await requireUserSession(event)

  await db.insert(schema.likes).values({
    artId,
    userId: session.user.id
  })

  return 'success'
})
