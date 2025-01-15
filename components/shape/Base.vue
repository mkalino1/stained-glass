<template>
  <path :fill="shape.color" stroke="#123712" stroke-width="5" :d="shape.path"
    @contextmenu.prevent="console.log('preventing')" :style="{
      'transform-origin': '50px 50px',
      'transform': `rotate(${shape.angle}deg)`,
      'opacity': shape.opacity,
      'pointer-events': shape.isShadow ? 'none' : 'auto'
    }" />
</template>

<script lang="ts" setup>
defineProps<{ shape: Shape }>()
</script>