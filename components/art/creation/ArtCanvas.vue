<template>
  <svg id="canvas" :width="110 * resolution + 220" :height="110 * resolution + 220" class="bg-gray-800"
    xmlns="http://www.w3.org/2000/svg">
    <template v-for="column in resolution" :key="column">
      <svg v-for="row in resolution" :key="row" :x="110 * row" :y="110 * column"
        @mouseover="setShadowShape(column, row)" @mouseleave="resetShadowShape()">
        <rect class="fixed" width="100" height="100" :fill="'#66666620'" @click="addShape(column, row)" />
        <Shape v-for="shape in shapesOnTile(column, row)" :key="shape.id" :shape="shape" />
      </svg>
    </template>
  </svg>
</template>

<script setup lang="ts">
defineEmits<{ addShape: [column: number, row: number] }>()
const { shapeName, resolution, color, rotationCounter } = storeToRefs(useArtControlsStore())
const { shapes } = storeToRefs(useShapesStore())
const { addShape } = useShapesStore()

// Shadow shape
const shadowShape = ref<Shape | null>()
const shapesToRender = computed(() => shadowShape.value ? [...shapes.value, shadowShape.value] : shapes.value)
function setShadowShape(column: number, row: number) {
  shadowShape.value = buildShadowShape(shapeName.value, column, row, color.value, rotationCounter.value)
}
function resetShadowShape() {
  shadowShape.value = null
}
watch(rotationCounter, () => {
  if (shadowShape.value) {
    shadowShape.value.angle = 90 * (rotationCounter.value % 4)
  }
})

function shapesOnTile(column: number, row: number) {
  return shapesToRender.value.filter((el) => el.column === column && el.row == row)
}
</script>