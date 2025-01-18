<template>
  <svg :width="110 * resolution + 220" :height="110 * resolution + 220" class="bg-gray-800">
    <template v-for="column in resolution">
      <svg v-for="row in resolution" @mouseover="setShadowShape(column, row)" @mouseleave="resetShadowShape()"
        :x="110 * row" :y="110 * column">
        <rect @click="$emit('addShape', column, row)" class="fixed" width="100" height="100" :fill="'#66666620'" />
        <Shape v-for="shape in shapesOnTile(column, row)" :shape="shape" />
      </svg>
    </template>
  </svg>
</template>

<script setup lang="ts">
const { shapes, rotationCounter, shapeName, color } = defineProps<{
  shapes: Shape[],
  resolution: number,
  rotationCounter: number,
  shapeName: string,
  color: string
}>()
defineEmits<{
  addShape: [column: number, row: number]
}>()

const shadowShape = ref<Shape | null>()
const shapesToRender = computed(() => shadowShape.value ? [...shapes, shadowShape.value] : shapes)
function setShadowShape(column: number, row: number) {
  shadowShape.value = buildShadowShape(shapeName, column, row, color, rotationCounter)
}
function resetShadowShape() {
  shadowShape.value = null
}
watch(() => rotationCounter, () => {
  if (shadowShape.value) {
    shadowShape.value.angle = 90 * (rotationCounter % 4)
  }
})

function shapesOnTile(column: number, row: number) {
  return shapesToRender.value.filter((el) => el.column === column && el.row == row)
}
</script>