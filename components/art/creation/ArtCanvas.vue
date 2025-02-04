<template>
  <svg id="canvas" class="bg-zinc-800 cursor-pointer"
    xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${60 * resolution} ${60 * resolution}`">
    <template v-for="column in resolution" :key="column">
      <svg v-for="row in resolution" :key="row" :x="60 * (row-1)" :y="60 * (column-1)"
        @mouseover="setShadowShape(column, row)" @mouseleave="resetShadowShape()">
        <rect width="1" height="1" fill="#09090b" />
        <rect width="1" height="1" x="59" y="59" fill="#09090b" />
        <rect width="1" height="1" x="59" y="0" fill="#09090b" />
        <rect width="1" height="1" x="0" y="59" fill="#09090b" />
        <rect width="60" height="60" :fill="'#66666620'" @click="addShape(column, row)" />
        <Shape v-for="shape in shapesMap.get(`${column}-${row}`)" :key="shape.id" :shape="shape" />
        <Shape v-if="shadowShape && shadowShape.column == column && shadowShape.row == row" :shape="shadowShape" />
      </svg>
    </template>
  </svg>
</template>

<script setup lang="ts">
defineEmits<{ addShape: [column: number, row: number] }>()
const { shapeName, resolution, color, rotation } = storeToRefs(useArtControlsStore())
const { shapes } = storeToRefs(useShapesStore())
const { addShape } = useShapesStore()

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

// Shadow shape
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