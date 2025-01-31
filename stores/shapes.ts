export const useShapesStore = defineStore('shapes', () => {
  const { shapeName, color, rotation } = storeToRefs(useArtControlsStore())
  const { shapes, canUndo, canRedo, pushHistory, undoHistory, redoHistory } = useShapeHistory()
  const idAutoIncrement = ref(0)
  const shapeToDeleteId = ref(-1)

  function addShape(column: number, row: number) {
    if (!collisionDetected(column, row)) {
      shapes.value.push(buildShape(shapeName.value, column, row, color.value, rotation.value, idAutoIncrement.value))
      idAutoIncrement.value += 1
      pushHistory()
    }
  }

  function deleteShape() {
    shapes.value = shapes.value.filter(shape => shape.id !== shapeToDeleteId.value)
    shapeToDeleteId.value = -1
    pushHistory()
  }

  // Collisions
  function collisionDetected(column: number, row: number) {
    const collisionPoints = getCollisionPoints(shapeName.value, rotation.value)
    const roommates = shapes.value.filter(el => el.row === row && el.column === column)
    return roommates.some(neighbour => {
      const neighbourCollisionPoints = getCollisionPoints(neighbour.name, neighbour.rotation)
      return !collisionPoints.isDisjointFrom(neighbourCollisionPoints) || isNeighbouringMoon(collisionPoints, neighbourCollisionPoints)
    })
  }
  function isNeighbouringMoon(currentShapeCollisionPoints: Set<CollisionPoint>, neighbourCollisionPoints: Set<CollisionPoint>) {
    return shapeName.value == 'moon'
      && neighbourCollisionPoints.size == 1
      && (neighbourCollisionPoints.has((currentShapeCollisionPoints.values().next().value! + 1 + 4) % 4)
        || neighbourCollisionPoints.has((currentShapeCollisionPoints.values().next().value! - 1 + 4) % 4))
  }

  return { shapes, canUndo, canRedo, addShape, deleteShape, undoHistory, redoHistory, shapeToDeleteId}
})
