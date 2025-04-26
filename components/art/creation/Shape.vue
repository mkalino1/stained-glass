<template>
  <path :fill="shape.color" :stroke="shape.color" stroke-width="2" :d="getPath(shape.name)" v-bind="$attrs"
    :style="{
      'transform-origin': '60px 60px',
      'transform': `rotate(${shape.rotation * 90}deg)`,
      'opacity': shape.id == -1 ? 0.3 : 1,
      'pointer-events': shape.id == -1 ? 'none' : 'auto'
    }" @contextmenu="chooseShape" />
  <path v-for="path in camesToDisplay" :key="path" fill="none" stroke="#222"
    stroke-width="5" stroke-linecap="square" :d="path" v-bind="$attrs"
    :style="{
      'transform-origin': '60px 60px',
      'transform': `rotate(${shape.rotation * 90}deg)`
    }"/>
</template>

<script lang="ts" setup>
const { shape, camesVisibility } = defineProps<{ shape: Shape, camesVisibility?: boolean[] }>()
const shapesStore = useShapesStore()

const camesBase = getCamePaths(shape.name)
const camesToDisplay = computed(() => camesVisibility != undefined ? camesBase.filter((_, index) => camesVisibility[index]) : camesBase)

function chooseShape() {
  shapesStore.chosenShapeId = shape.id
}
</script>