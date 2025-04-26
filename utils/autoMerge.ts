const DIRECTIONS = [[-1, 0], [0, 1], [1, 0], [0, -1]]
const VIEWBOX_PADDING = 4

type LineData = {
  lookoutRotation: Rotation,
  lookoutCollisions: CollisionPoint[]
}

const horizontalLine: LineData = { lookoutRotation: Rotation.Angle180, lookoutCollisions: [CollisionPoint.TopLeft, CollisionPoint.TopRight] }
const verticalLine: LineData = { lookoutRotation: Rotation.Angle270, lookoutCollisions: [CollisionPoint.TopRight, CollisionPoint.BottomRight] }

function getCamesVisibility(column: number, row: number, shape: Shape, shapesMap: Map<string, Shape[]>) {
  if (shape.name == 'moon') {
    return [
      getArcCameVisibility(column, row, shape, shapesMap, 'arc'),
      getLineCameVisibility(horizontalLine, column, row, shape, shapesMap),
      getLineCameVisibility(verticalLine, column, row, shape, shapesMap),
    ]
  }

  else if (shape.name == 'arc') {
    return [
      getArcCameVisibility(column, row, shape, shapesMap, 'moon'),
      getLineCameVisibility(horizontalLine, column, row, shape, shapesMap),
      getLineCameVisibility(verticalLine, column, row, shape, shapesMap),
    ]
  }

  return [true, true, true]
}

function getArcCameVisibility(column: number, row: number, shape: Shape, shapesMap: Map<string, Shape[]>, otherShape: ShapeName) {
  let arcCameVisibility = true
  if (shapesMap.get(`${column}-${row}`)?.some(neighbour => neighbour.name == otherShape && shape.color == neighbour.color)) {
    arcCameVisibility = false
  }
  return arcCameVisibility
}

function getLineCameVisibility(line: LineData, column: number, row: number, shape: Shape, shapesMap: Map<string, Shape[]>): boolean {
  let lineCameVisibility = true
  const directionToLookAt = DIRECTIONS[(line.lookoutRotation + shape.rotation) % 4]
  const neighbouringShapes = shapesMap.get(`${column + directionToLookAt[0]}-${row + directionToLookAt[1]}`)

  if (neighbouringShapes != undefined && neighbouringShapes.length != 0) {
    const mergeDetected = neighbouringShapes.some(neighbour => {
      if (shape.color != neighbour.color) return false

      const collisions = getCollisionPoints(neighbour.name, neighbour.rotation)
      
      if (neighbour.name == 'moon') {
        return new Set(line.lookoutCollisions.map(coll => (coll + shape.rotation) % 4)).isSupersetOf(collisions)
      }
      else if (neighbour.name == 'arc') {
        return collisions.isSupersetOf(new Set(line.lookoutCollisions.map(coll => (coll + shape.rotation) % 4)))
      }
      return false
    })
    lineCameVisibility = !mergeDetected
  }
  return lineCameVisibility
}

export { getCamesVisibility, VIEWBOX_PADDING }