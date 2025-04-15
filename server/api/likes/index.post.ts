export default defineEventHandler(async (event) => {
  const { artId } = await readBody(event)

  const session = await requireUserSession(event)

  await useDrizzle().insert(tables.likes).values({
    artId,
    userId: session.user.id
  })

  return 'success'
})
