export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)

  const personal = await useDrizzle()
    .select({ artId: tables.likes.artId })
    .from(tables.likes)
    .where(eq(tables.likes.userId, session.user.id))

  return personal
});
