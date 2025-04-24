<template>
  <ContextMenu>
    <svg id="canvas" class="bg-zinc-800 cursor-pointer" xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${120 * resolution} ${120 * resolution}`">
    <template v-for="column in resolution" :key="column">
      <svg v-for="row in resolution" :key="row" :x="120 * (row - 1)" :y="120 * (column - 1)"
        @mouseover="setShadowShape(column, row)" @mouseleave="resetShadowShape()" @click="addShape(column, row)">
        <template v-if="!tileFullnessMap.get(`${column}-${row}`)">
          <rect width="2" height="2" fill="#09090b" />
          <rect width="2" height="2" x="120" y="120" fill="#09090b" />
          <rect width="2" height="2" x="120" y="0" fill="#09090b" />
          <rect width="2" height="2" x="0" y="120" fill="#09090b" />
        </template>
        <rect width="120" height="120" fill="#00000000" />
        <Shape v-for="shape in shapesMap.get(`${column}-${row}`)" :key="shape.id" :shape="shape" />
        <Shape v-if="shadowShape && shadowShape.column == column && shadowShape.row == row" :shape="shadowShape" />
      </svg>
    </template>
  </svg>
</ContextMenu>
</template>

<script setup lang="ts">
defineEmits<{ addShape: [column: number, row: number] }>()
const { shapeName, resolution, color, rotation } = storeToRefs(useArtControlsStore())
const { shapesMap, tileFullnessMap } = storeToRefs(useShapesStore())
const { addShape } = useShapesStore()

const shadowShape = ref<Shape | null>()
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
</script>