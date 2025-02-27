export const useShapesStore = defineStore('shapes', () => {
  const { shapeName, color, rotation, resolution } = storeToRefs(useArtControlsStore())
  const { shapes, cantUndo, cantRedo, pushHistory, undoHistory, redoHistory } = useShapeHistory()
  const idAutoIncrement = ref(0)
  const shapeToDeleteId = ref(-1)
  const { $toast } = useNuxtApp()

  function addShape(column: number, row: number) {
    if (!collisionDetected(column, row)) {
      shapes.value.push(buildShape(shapeName.value, column, row, color.value, rotation.value, idAutoIncrement.value))
      idAutoIncrement.value += 1
      pushHistory()
    } else {
      $toast.warning('Cannot place this shape here')
    }
  }

  function deleteShape() {
    shapes.value = shapes.value.filter(shape => shape.id !== shapeToDeleteId.value)
    shapeToDeleteId.value = -1
    pushHistory()
  }

  const shapesMap = computed(() => {
    const shapesMap = new Map<string, Shape[]>()
    shapes.value.forEach((shape) => {
      const key = `${shape.column}-${shape.row}`
      if (shapesMap.has(key)) {
        shapesMap.get(key)?.push(shape)
      } else {
        shapesMap.set(key, [shape])
      }
    })
    return shapesMap
  })
  
  const tileFullnessMap = computed(() => {
    const tileFullness = new Map<string, boolean>()
    shapesMap.value.forEach((shape, key) => {
      const isFull = shape.reduce((sum, shape) => 
        sum + getCollisionPoints(shape.name, shape.rotation).size
      , 0) === 5
      tileFullness.set(key, isFull)
    })
    return tileFullness
  })

  const isCanvasFull = computed(() => {
    if(tileFullnessMap.value.size < resolution.value ** 2) {
      return false
    }
    return [...tileFullnessMap.value.entries()].filter(([key, isFull]) => {
      return isFull && key.split('-').every(axis => Number(axis) <= resolution.value)
    }).length === resolution.value ** 2
  })

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

  return { shapes, shapesMap, tileFullnessMap, isCanvasFull, cantUndo, cantRedo, addShape, deleteShape, undoHistory, redoHistory, shapeToDeleteId}
})
