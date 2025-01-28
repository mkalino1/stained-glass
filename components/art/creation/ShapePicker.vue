<template>
  <div class="flex gap-6 bg-slate-600 p-2">
    <svg height="60" width="60">
      <Shape :shape="buildDisplayShape('moon')" @click="shapeName = 'moon'" />
    </svg>
    <svg height="60" width="60">
      <Shape :shape="buildDisplayShape('arc')" @click="shapeName = 'arc'" />
    </svg>
    <svg height="60" width="60">
      <Shape :shape="buildDisplayShape('marquise')" @click="shapeName = 'marquise'" />
    </svg>
  </div>
</template>

<script lang="ts" setup>
const { shapeName } = storeToRefs(useArtControlsStore())
</script>