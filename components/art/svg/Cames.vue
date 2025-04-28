<template>
  <path v-for="path in camesToDisplay" :key="path" fill="none" stroke="#141417" v-bind="$attrs"
    stroke-width="4" stroke-linecap="square" :d="path"
    :style="{
      'transform-origin': '60px 60px',
      'transform': `rotate(${shape.rotation * 90}deg)`,
      'pointer-events': 'none'
    }"/>
</template>

<script lang="ts" setup>
const { shape, camesVisibility } = defineProps<{ shape: Shape, camesVisibility?: boolean[] }>()

const camesBase = computed(() => getCamePaths(shape.name))
const camesToDisplay = computed(() => camesVisibility != undefined ? camesBase.value.filter((_, index) => camesVisibility[index]) : camesBase.value)
</script>