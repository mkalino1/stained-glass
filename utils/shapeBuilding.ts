function buildShape(shapeName: ShapeName, column: number, row: number, color: string, rotation: Rotation, id: number): Shape {
  return buildShapeInternal(shapeName, column, row, color, rotation, id)
}

function buildShadowShape(shapeName: ShapeName, column: number, row: number, color: string, rotation: Rotation): Shape {
  return buildShapeInternal(shapeName, column, row, color, rotation, -1)
}

function buildDisplayShape(shapeName: ShapeName): Shape {
  return buildShapeInternal(shapeName, 0, 0, '#3f3f46', 0, 0)
}

function buildShapeInternal(shapeName: ShapeName, column: number, row: number, color: string, rotation: Rotation, id: number): Shape {
  return ({
    id: id,
    column: column,
    row: row,
    rotation: rotation,
    name: shapeName,
    color: color
  })
}

function getPath(shapeName: ShapeName) {
  switch (shapeName) {
    case 'moon':
      return `
        M 0,0
        a 60 60 0 0 0 60 60
        h -60 Z`
    case 'arc':
      return `
        M 1,1
        a 58 58 0 0 1 58 58
        h -58 Z`
    case 'marquise':
      return `
        M 1,1
        a 58 58 0 0 1 58 58
        a -58 -58 0 0 1 -58 -58 Z`
  }
}

function getCollisionPoints(shapeName: ShapeName, rotation: Rotation): Set<CollisionPoint> {
  switch (shapeName) {
    case 'moon':
      return new Set([(CollisionPoint.BottomLeft + rotation) % 4])
    case 'arc':
      return new Set([
        (CollisionPoint.BottomLeft + rotation) % 4,
        (CollisionPoint.BottomRight + rotation) % 4,
        (CollisionPoint.TopLeft + rotation) % 4,
        CollisionPoint.Center
      ])
    case 'marquise':
      return new Set([
        (CollisionPoint.TopLeft + rotation) % 2,
        (CollisionPoint.BottomRight + rotation) % 2,
        CollisionPoint.Center
      ])
  } 
}

export { buildShape, buildShadowShape, buildDisplayShape, getPath, getCollisionPoints }
