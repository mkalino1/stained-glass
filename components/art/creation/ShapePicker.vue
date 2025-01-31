<template>
  <fieldset class="border border-zinc-400 flex gap-4 p-3">
    <legend class="text-center px-3">Shapes</legend>
    <svg height="60" width="60">
      <Shape :shape="buildDisplayShape('moon')" @click="shapeName = 'moon'" />
    </svg>
    <svg height="60" width="60">
      <Shape :shape="buildDisplayShape('arc')" @click="shapeName = 'arc'" />
    </svg>
    <svg height="60" width="60">
      <Shape :shape="buildDisplayShape('marquise')" @click="shapeName = 'marquise'" />
    </svg>
  </fieldset>
</template>

<script lang="ts" setup>
const { shapeName } = storeToRefs(useArtControlsStore())
</script>