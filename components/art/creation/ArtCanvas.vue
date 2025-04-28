<template>
  <ContextMenu>
    <svg id="canvas" class="bg-zinc-800 cursor-pointer" xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${120 * resolution} ${120 * resolution}`">
      <g v-for="column in resolution" :key="column">
        <svg v-for="row in resolution" :key="row" :x="120 * (row - 1) - VIEWBOX_PADDING" :y="120 * (column - 1) - VIEWBOX_PADDING"
          :viewBox="`${-VIEWBOX_PADDING} ${-VIEWBOX_PADDING} ${120 * resolution} ${120 * resolution}`"
          @mouseover="setShadowShape(column, row)" @mouseleave="resetShadowShape()" @click="handleTileClick(column, row)">
          <rect width="120" height="120" fill="#00000000" />
          <GuidingPoints v-if="!tileFullnessMap.get(`${column}-${row}`)" />
          <Shape v-for="shape in shapesMap.get(`${column}-${row}`)" :key="shape.id" :shape="shape" />
        </svg>
      </g>
      <CamesOverlay :resolution="resolution" :shapes-map="shapesMap"/>
      <ShadowShapeOverlay v-if="showShadowShape" :shadow-shape="shadowShape" />
    </svg>
  </ContextMenu>
</template>

<script setup lang="ts">
defineEmits<{ addShape: [column: number, row: number] }>()
const { shapeName, resolution, color, rotation } = storeToRefs(useArtControlsStore())
const { shapesMap, tileFullnessMap, cantRedo } = storeToRefs(useShapesStore())
const { addShape } = useShapesStore()

const shadowShape = ref<Shape | null>(null)
const showShadowShape = ref(true)
function setShadowShape(column: number, row: number) {
  shadowShape.value = buildShadowShape(shapeName.value, column, row, color.value, rotation.value)
  showShadowShape.value = true
}
function resetShadowShape() {
  shadowShape.value = null
}
watch(rotation, () => {
  if (shadowShape.value) {
    shadowShape.value.rotation = rotation.value
  }
  showShadowShape.value = true
})
watch(cantRedo, (newValue) => {
  if (!newValue) showShadowShape.value = true
})

function handleTileClick(column: number, row: number) {
  const shapeAdded = addShape(column, row)
  if (shapeAdded) {
    setTimeout(() => showShadowShape.value = false)
  }
}
</script>