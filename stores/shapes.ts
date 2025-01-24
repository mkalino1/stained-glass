export const useShapesStore = defineStore('shapes', () => {
  const { shapeName, color, rotationCounter } = storeToRefs(useArtControlsStore())
  const shapes = ref<Shape[]>([])

  function addShape(column: number, row: number) {
    if (!collisionDetected(column, row)) {
      shapes.value.push(buildShape(shapeName.value, column, row, color.value, rotationCounter.value))
      pushHistory()
    }
  }

  // Collisions
  function collisionDetected(column: number, row: number) {
    const collisionPoints = buildCollisionPoints(shapeName.value, rotationCounter.value)
    const roommates = shapes.value.filter(el => el.row === row && el.column === column)
    return roommates.some(shape => !collisionPoints.isDisjointFrom(shape.collisionPoints) || isNeighbouringMoon(collisionPoints, shape))
  }
  // TODO: improve neighbour collision logic
  function isNeighbouringMoon(currentShapeCollisionPoints: Set<CollisionPoint>, neighbourShape: Shape) {
    return shapeName.value == 'moon'
      && neighbourShape.collisionPoints.size == 1
      && (neighbourShape.collisionPoints.has((currentShapeCollisionPoints.values().next().value! + 1) % 4)
        || neighbourShape.collisionPoints.has((currentShapeCollisionPoints.values().next().value! - 1) % 4))
  }

  //History
  const historyIndex = ref(0)
  const history = shallowReactive<Shape[][]>([[]])
  function pushHistory() {
    history.length = ++historyIndex.value
    history.push(clone(shapes.value))
  }
  function undoHistory() {
    shapes.value = clone(history[--historyIndex.value])
  }
  function redoHistory() {
    shapes.value = clone(history[++historyIndex.value])
  }
  function clone(shapes: Shape[]) {
    return shapes.map((s) => ({ ...s }))
  }
  const canUndo = computed(() => historyIndex.value <= 0)
  const canRedo = computed(() => historyIndex.value >= history.length - 1)

  return { shapes, addShape, undoHistory, redoHistory, canUndo, canRedo}
})
