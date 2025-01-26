export const useShapesStore = defineStore('shapes', () => {
  const { shapeName, color, rotation } = storeToRefs(useArtControlsStore())
  const { shapes, canUndo, canRedo, pushHistory, undoHistory, redoHistory } = useShapeHistory()
  const id = ref(0)

  function addShape(column: number, row: number) {
    if (!collisionDetected(column, row)) {
      shapes.value.push(buildShape(shapeName.value, column, row, color.value, rotation.value, id.value))
      id.value += 1
      pushHistory()
    }
  }

  // Collisions
  function collisionDetected(column: number, row: number) {
    const collisionPoints = buildCollisionPoints(shapeName.value, rotation.value)
    const roommates = shapes.value.filter(el => el.row === row && el.column === column)
    return roommates.some(shape => !collisionPoints.isDisjointFrom(shape.collisionPoints) || isNeighbouringMoon(collisionPoints, shape))
  }
  function isNeighbouringMoon(currentShapeCollisionPoints: Set<CollisionPoint>, neighbourShape: Shape) {
    return shapeName.value == 'moon'
      && neighbourShape.collisionPoints.size == 1
      && (neighbourShape.collisionPoints.has((currentShapeCollisionPoints.values().next().value! + 1 + 4) % 4)
        || neighbourShape.collisionPoints.has((currentShapeCollisionPoints.values().next().value! - 1 + 4) % 4))
  }

  return { shapes, canUndo, canRedo, addShape, undoHistory, redoHistory}
})
