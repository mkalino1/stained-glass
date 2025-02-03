export default defineEventHandler(async (event) => {
  const artBody = await readBody(event)

  const insertedArt = await useDrizzle().insert(tables.arts).values({
    resolution: artBody.resolution,
    shapes: JSON.stringify(artBody.shapes),
    createdAt: new Date()
  }).returning().get()
  
  console.log(`Art with ${insertedArt.shapes.length} shapes inserted`)  

  return 'success'
})
