export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  if (session.user == undefined) {
    return []
  }

  const personal = await useDrizzle()
    .select({ artId: tables.likes.artId })
    .from(tables.likes)
    .where(eq(tables.likes.userId, session.user.id))

  const total = await useDrizzle()
    .select({
      artId: tables.likes.artId, 
      total: count()
    })
    .from(tables.likes)
    .groupBy(tables.likes.artId)

  return { personal, total }
});
