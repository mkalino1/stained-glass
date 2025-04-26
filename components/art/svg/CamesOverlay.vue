<template>
  <g v-for="column in resolution" :key="column">
    <svg v-for="row in resolution" :key="row"
      :viewBox="`${-VIEWBOX_PADDING} ${-VIEWBOX_PADDING} ${120 * resolution} ${120 * resolution}`"
      :x="120 * (row - 1) - VIEWBOX_PADDING" :y="120 * (column - 1) - VIEWBOX_PADDING">
      <Cames v-for="shape in shapesMap.get(`${column}-${row}`)" :key="shape.id" :shape="shape" :cames-visibility="getCamesVisibility(column, row, shape, shapesMap)" />
    </svg>
  </g>
</template>

<script setup lang="ts">
const { resolution, shapesMap } = defineProps<{ resolution: number, shapesMap: Map<string, Shape[]> }>()
</script>