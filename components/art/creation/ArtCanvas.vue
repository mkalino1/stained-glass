<template>
  <svg id="canvas" width="600" height="600" class="bg-gray-800"
    xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${60 * resolution} ${60 * resolution}`">
    <template v-for="column in resolution" :key="column">
      <svg v-for="row in resolution" :key="row" :x="60 * (row-1)" :y="60 * (column-1)"
        @mouseover="setShadowShape(column, row)" @mouseleave="resetShadowShape()">
        <rect width="1" height="1" fill="#111111" />
        <rect width="1" height="1" x="59" y="59" fill="#111111" />
        <rect width="1" height="1" x="59" y="0" fill="#111111" />
        <rect width="1" height="1" x="0" y="59" fill="#111111" />
        <rect width="60" height="60" :fill="'#66666620'" @click="addShape(column, row)" />
        <Shape v-for="shape in shapesOnTile(column, row)" :key="shape.id" :shape="shape" />
      </svg>
    </template>
  </svg>
</template>

<script setup lang="ts">
defineEmits<{ addShape: [column: number, row: number] }>()
const { shapeName, resolution, color, rotation } = storeToRefs(useArtControlsStore())
const { shapes } = storeToRefs(useShapesStore())
const { addShape } = useShapesStore()

// Shadow shape
const shadowShape = ref<Shape | null>()
const shapesToRender = computed(() => shadowShape.value ? [...shapes.value, shadowShape.value] : shapes.value)
function setShadowShape(column: number, row: number) {
  shadowShape.value = buildShadowShape(shapeName.value, column, row, color.value, rotation.value)
}
function resetShadowShape() {
  shadowShape.value = null
}
watch(rotation, () => {
  if (shadowShape.value) {
    shadowShape.value.rotation = rotation.value
  }
})

function shapesOnTile(column: number, row: number) {
  return shapesToRender.value.filter((el) => el.column === column && el.row == row)
}
</script>