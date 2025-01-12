<template>
  <div class="flex flex-col items-center gap-8 mt-6">
    <ArtControls @redo-history="redoHistory" @undo-history="undoHistory" v-model:bloat-mode="bloatMode"
      v-model:resolution="resolution" :can-undo="historyIndex <= 0" :can-redo="historyIndex >= history.length - 1" />
    <ArtCanvas @wheel="handleWheel" @add-shape="addShape" :shapes="shapes" :resolution="resolution"
      :bloat-mode="bloatMode" :rotation-counter="rotationCounter" />
  </div>
</template>

<script lang="ts" setup>
//Shapes
const shapes = ref<Shape[]>([])
function addShape(column: number, row: number) {
  shapes.value.push(buildShape(column, row, bloatMode.value, rotationCounter.value))
  pushHistory()
}

//Modes
const bloatMode = ref(true)
const resolution = ref(5)

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

//Rotations
const rotationCounter = ref(0)
function handleWheel(event: WheelEvent) {
  rotationCounter.value += event.deltaY < 0 ? 1 : -1
}
</script>
