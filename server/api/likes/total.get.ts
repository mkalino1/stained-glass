export default defineEventHandler(async (event) => {
  const totalLikes = await useDrizzle()
    .select({
      artId: tables.likes.artId, 
      total: count()
    })
    .from(tables.likes)
    .groupBy(tables.likes.artId)

  return totalLikes
});
