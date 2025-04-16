export default defineEventHandler(async (event) => {
  const { sortByLikes } = getQuery(event)

  const arts = await useDrizzle()
    .select({
      id: tables.arts.id,
      resolution: tables.arts.resolution,
      shapes: tables.arts.shapes,
      createdAt: tables.arts.createdAt,
      location: tables.arts.location,
      likesCount: count(tables.likes.userId)
    })
    .from(tables.arts)
    .leftJoin(tables.likes, eq(tables.arts.id, tables.likes.artId))
    .groupBy(tables.arts.id)
    .orderBy(...(sortByLikes == 'true' ? [desc(count(tables.likes.userId)), desc(tables.arts.createdAt)] : [desc(tables.arts.createdAt)]))
    .all()
  
  return arts
})