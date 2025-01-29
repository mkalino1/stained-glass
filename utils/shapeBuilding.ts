function buildShape(shapeName: ShapeName, column: number, row: number, color: string, rotation: Rotation, id: number): Shape {
  return buildShapeInternal(shapeName, column, row, color, rotation, false, id)
}

function buildShadowShape(shapeName: ShapeName, column: number, row: number, color: string, rotation: Rotation): Shape {
  return buildShapeInternal(shapeName, column, row, color, rotation, true, -1)
}

function buildDisplayShape(shapeName: ShapeName): Shape {
  return buildShapeInternal(shapeName, 0, 0, '#336633', 0, false, -1)
}

function buildShapeInternal(shapeName: ShapeName, column: number, row: number, color: string, rotation: Rotation, shadow: boolean, id: number): Shape {
  return ({
    id: id,
    column: column,
    row: row,
    angle: 90 * rotation,
    path: buildPath(shapeName),
    opacity: shadow ? 0.3 : 1,
    isShadow: shadow,
    color: color,
    collisionPoints: buildCollisionPoints(shapeName, rotation)
  })
}

function buildPath(shapeName: ShapeName) {
  switch (shapeName) {
    case 'moon':
      return `
        M 0,0
        a 60 60 0 0 0 60 60
        h -60 Z`
    case 'arc':
      return `
        M 0,0
        a 60 60 0 0 1 60 60
        h -60 Z`
    case 'marquise':
      return `
        M 0,0
        a 60 60 0 0 1 60 60
        a -60 -60 0 0 1 -60 -60 Z`
  }
  // d = "M 25 1.5 a 23.5 23.5 0 0 0 -23.5 23.5 h 23.5 Z"
}

function buildCollisionPoints(shapeName: ShapeName, rotation: Rotation): Set<CollisionPoint> {
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

export { buildShape, buildShadowShape, buildDisplayShape, buildCollisionPoints }
