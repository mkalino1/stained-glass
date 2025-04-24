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
        a 120 120 0 0 0 120 120
        h -120 Z`
    case 'arc':
      return `
        M 0,0
        a 120 120 0 0 1 120 120
        h -120 Z`
    case 'marquise':
      return `
        M 0,0
        a 120 120 0 0 1 120 120
        a -120 -120 0 0 1 -120 -120 Z`
  }
}

function getCamePaths(shapeName: ShapeName) {
  switch (shapeName) {
    case 'moon':
      return [
        'M 0,0 a 120 120 0 0 0 120 120',
        'M 0,120 h 120',
        'M 0,0 v 120',
      ]
    case 'arc':
      return [
        'M 0,0 a 120 120 0 0 1 120 120',
        'M 0,120 h 120',
        'M 0,0 v 120',
      ]
    case 'marquise':
      return [
        'M 0,0 a 120 120 0 0 0 120 120',
        'M 0,0 a 120 120 0 0 1 120 120'
      ]
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
        (CollisionPoint.TopLeft + rotation) % 4,
        (CollisionPoint.BottomRight + rotation) % 4,
        CollisionPoint.Center
      ])
  } 
}

export { buildShape, buildShadowShape, buildDisplayShape, getPath, getCamePaths, getCollisionPoints }
