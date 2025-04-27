<template>
  <svg v-if="shadowShape" :viewBox="`${-VIEWBOX_PADDING} ${-VIEWBOX_PADDING} ${120 * resolution} ${120 * resolution}`"
    :x="120 * (shadowShape.row - 1) - VIEWBOX_PADDING" :y="120 * (shadowShape.column - 1) - VIEWBOX_PADDING">
    <Shape :shape="shadowShape"/>
    <Cames :shape="shadowShape" />
  </svg>
</template>

<script setup lang="ts">
const { shadowShape } = defineProps<{ shadowShape: Shape | null }>()
const { resolution } = storeToRefs(useArtControlsStore())
</script>