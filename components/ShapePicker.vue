<template>
  <div class="flex gap-6 bg-slate-600 p-2">
    <svg height="100" width="100">
      <component :is="ShapeBase" :shape="buildShape(0, 0, true, 0, '#444')" @click="bloatMode = true" />
    </svg>
    <svg height="100" width="100">
      <component :is="ShapeBase" :shape="buildShape(0, 0, false, 0, '#444')" @click="bloatMode = false" />
    </svg>
  </div>
</template>

<script lang="ts" setup>
const ShapeBase = resolveComponent('ShapeBase')
const bloatMode = defineModel()
</script>