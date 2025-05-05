import { z } from 'zod'
import type { Rotation } from '~/utils/enums/Rotation'

const artUploadSchema = z.object({
  resolution: z.number().min(4).max(10),
  shapes: z.array(
    z.object({
      id: z.number().nonnegative(),
      column: z.number().min(1).max(10),
      row: z.number().min(1).max(10),
      rotation: z.custom<Rotation>(),
      name: z.custom<ShapeName>(),
      color: z.string().regex(/#[A-Fa-f0-9]{6}/)
    })
  )
}).transform((schema) => {
    schema.shapes = schema.shapes.filter(shape => shape.row <= schema.resolution && shape.column <= schema.resolution)
    return schema
  })
  .refine((schema) => schema.shapes.reduce((sum, shape) => {
    switch (shape.name) {
      case 'moon': return sum + 1
      case 'arc': return sum + 4
      case 'marquise': return sum + 3
    }
  }, 0) == 5 * (schema.resolution ** 2), {
    message: "Wrong number of shapes",
  })

export default defineEventHandler(async (event) => {

  const artBody = await readValidatedBody(event, body => artUploadSchema.parse(body))  

  await useDrizzle().insert(tables.arts).values({
    resolution: artBody.resolution,
    shapes: JSON.stringify(artBody.shapes),
    createdAt: new Date(),
    location: [event.context.cf?.city, event.context.cf?.country].filter(Boolean).join(', ') || null
  }).returning().get()

  return 'success'
})
