import { count, desc, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { sortByLikes, offset } = getQuery(event)

  const arts = await db
    .select({
      id: schema.arts.id,
      resolution: schema.arts.resolution,
      shapes: schema.arts.shapes,
      createdAt: schema.arts.createdAt,
      location: schema.arts.location,
      author: schema.arts.author,
      authorUrl: schema.arts.authorUrl,
      likesCount: count(schema.likes.userId)
    })
    .from(schema.arts)
    .leftJoin(schema.likes, eq(schema.arts.id, schema.likes.artId))
    .groupBy(schema.arts.id)
    .orderBy(...(sortByLikes == 'true' ? [desc(count(schema.likes.userId)), desc(schema.arts.createdAt)] : [desc(schema.arts.createdAt)]))
    .limit(16)
    .offset(Number(offset) || 0)
  
  return arts
})