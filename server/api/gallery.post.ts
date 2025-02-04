export default defineEventHandler(async (event) => {
  const artBody = await readBody(event)

  await useDrizzle().insert(tables.arts).values({
    resolution: artBody.resolution,
    shapes: JSON.stringify(artBody.shapes),
    createdAt: new Date(),
    location: [event.context.cf?.city, event.context.cf?.country].filter(Boolean).join(', ') || null
  }).returning().get()

  return 'success'
})
