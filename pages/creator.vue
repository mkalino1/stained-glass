<template>
  <div class="flex flex-col items-center gap-8 mt-6" @wheel="handleWheel">
    <div class="flex items-center">
      <ArtControls @redo-history="redoHistory" @undo-history="undoHistory" :can-undo="historyIndex <= 0"
        :can-redo="historyIndex >= history.length - 1" />
      <ArtDownload />
    </div>
    <ArtCanvas @add-shape="addShape" :shapes="shapes"/>
  </div>
</template>

<script lang="ts" setup>
//Shapes
const shapes = ref<Shape[]>([])
function addShape(column: number, row: number) {
  if (!collisionDetected(column, row)) {
    shapes.value.push(buildShape(shapeName.value, column, row, color.value, rotationCounter.value))
    pushHistory()
  }
}
function collisionDetected(column: number, row: number) {
  const collisionPoints = buildCollisionPoints(shapeName.value, rotationCounter.value)
  const roommates = shapes.value.filter(el => el.row === row && el.column === column)
  return roommates.some(shape => !collisionPoints.isDisjointFrom(shape.collisionPoints) || isNeighbouringMoon(collisionPoints, shape))
}
function isNeighbouringMoon(currentShapeCollisionPoints: Set<CollisionPoint>, neighbourShape: Shape) {
  return shapeName.value == 'moon'
    && neighbourShape.collisionPoints.size == 1
    && (neighbourShape.collisionPoints.has((currentShapeCollisionPoints.values().next().value! + 1) % 4)
      || neighbourShape.collisionPoints.has((currentShapeCollisionPoints.values().next().value! - 1) % 4))
}

//Controls
const { shapeName, color, rotationCounter } = storeToRefs(useArtControlsStore())
function handleWheel(event: WheelEvent) {
  rotationCounter.value += event.deltaY < 0 ? 1 : -1
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
</script>
