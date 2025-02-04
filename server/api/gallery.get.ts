export default defineEventHandler(async () => {
  const arts = await useDrizzle().select().from(tables.arts).orderBy(desc(tables.arts.createdAt)).all()
  return arts
})