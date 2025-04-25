<template>
  <path :fill="shape.color" :stroke="shape.color" stroke-width="2" :d="getPath(shape.name)" v-bind="$attrs"
    :style="{
      'transform-origin': '60px 60px',
      'transform': `rotate(${shape.rotation * 90}deg)`,
      'opacity': shape.id == -1 ? 0.3 : 1,
      'pointer-events': shape.id == -1 ? 'none' : 'auto'
    }" @contextmenu="chooseShape" />
  <path v-for="path in getCamePaths(shape.name)" :key="path" fill="none" stroke="#222"
    stroke-width="3" stroke-linecap="square" :d="path" v-bind="$attrs"
    :style="{
      'transform-origin': '60px 60px',
      'transform': `rotate(${shape.rotation * 90}deg)`
    }"/>
</template>

<script lang="ts" setup>
const { shape } = defineProps<{ shape: Shape }>()
const shapesStore = useShapesStore()

function chooseShape() {
  shapesStore.chosenShapeId = shape.id
}
</script>