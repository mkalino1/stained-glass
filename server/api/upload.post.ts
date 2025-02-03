export default defineEventHandler(async (event) => {
  const artBody = await readBody(event)
  // TODO: store it in database
  console.log(artBody);
  return 'success'
})
