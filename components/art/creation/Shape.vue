<template>
  <path :fill="shape.color" stroke="#123712" stroke-width="2" :d="getPath(shape.name)"
    :style="{
      'transform-origin': '30px 30px',
      'transform': `rotate(${shape.rotation * 90}deg)`,
      'opacity': shape.isShadow ? 0.3 : 1,
      'pointer-events': shape.isShadow ? 'none' : 'auto'
    }" @contextmenu.prevent="openDeleteShapeDialog" />
</template>

<script lang="ts" setup>
const { shape } = defineProps<{ shape: Shape }>()
const shapesStore = useShapesStore()

function openDeleteShapeDialog() {
  shapesStore.shapeToDeleteId = shape.id
}
</script>