<template>
  <svg :width="110 * resolution + 220" :height="110 * resolution + 220" class="bg-gray-800">
    <template v-for="column in resolution">
      <svg v-for="row in resolution" @mouseover="buildShadowShape(column, row)" :x="110 * row" :y="110 * column">
        <rect @click="$emit('addShape', column, row)" class="fixed" width="100" height="100" :fill="'#66666620'" />
        <path v-for="el in shapesOnTile(column, row)" fill="#229922" stroke="#123712" stroke-width="5" :d="el.path"
          @contextmenu.prevent="console.log('preventing')" :style="{
            'transform-origin': '50px 50px',
            'transform': `rotate(${el.angle}deg)`,
            'opacity': el.opacity,
            'pointer-events': el.isShadow ? 'none' : 'auto'
          }" />
      </svg>
    </template>
  </svg>
</template>

<script setup lang="ts">
const { shapes, rotationCounter, bloatMode } = defineProps<{
  shapes: Shape[],
  resolution: number,
  rotationCounter: number,
  bloatMode: boolean
}>()
defineEmits<{
  addShape: [column: number, row: number]
}>()

const shadowShape = ref<Shape | null>()
const shapesToRender = computed(() => shadowShape.value ? [...shapes, shadowShape.value] : shapes)
function buildShadowShape(column: number, row: number) {
  shadowShape.value = buildShape(column, row, bloatMode, rotationCounter, true)
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