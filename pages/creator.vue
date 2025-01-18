<template>
  <div class="flex flex-col items-center gap-8 mt-6">
    <ArtControls @redo-history="redoHistory" @undo-history="undoHistory" v-model:shape-name="shapeName"
      v-model:resolution="resolution" v-model:color="color" :can-undo="historyIndex <= 0"
      :can-redo="historyIndex >= history.length - 1" />
    <ArtCanvas @wheel="handleWheel" @add-shape="addShape" :shapes="shapes" :resolution="resolution"
      :shape-name="shapeName" :rotation-counter="rotationCounter" :color="color" />
  </div>
</template>

<script lang="ts" setup>
//Shapes
const shapes = ref<Shape[]>([])
function addShape(column: number, row: number) {
  shapes.value.push(buildShape(shapeName.value, column, row, color.value, rotationCounter.value))
  pushHistory()
}

//Controls
const shapeName = ref<ShapeName>('moon')
const resolution = ref(5)
const color = ref('#b0914d')

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
