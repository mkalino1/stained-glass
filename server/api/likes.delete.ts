export default defineEventHandler(async (event) => {
  const { artId } = await readBody(event)

  const session = await requireUserSession(event)

  await useDrizzle().delete(tables.likes).where(and(
    eq(tables.likes.artId, artId),
    eq(tables.likes.userId, session.user.id)
  ))
  
  return 'success'
})
