<template>
  <path :fill="shape.color" stroke="#27272a" stroke-width="2" :d="getPath(shape.name)"
    :style="{
      'transform-origin': '30px 30px',
      'transform': `rotate(${shape.rotation * 90}deg)`,
      'opacity': shape.id == -1 ? 0.3 : 1,
      'pointer-events': shape.id == -1 ? 'none' : 'auto'
    }" @contextmenu="chooseShape" />
</template>

<script lang="ts" setup>
const { shape } = defineProps<{ shape: Shape }>()
const shapesStore = useShapesStore()

function chooseShape() {
  shapesStore.chosenShapeId = shape.id
}
</script>