export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  if (session.user == undefined) {
    return []
  }

  const arts = await useDrizzle()
    .select({ artId: tables.likes.artId })
    .from(tables.likes)
    .where(eq(tables.likes.userId, session.user.id))

  return arts;
});
