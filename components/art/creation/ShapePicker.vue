<template>
  <fieldset class="border rounded border-zinc-400 flex gap-4 px-3 py-4">
    <legend class="text-center px-3">Shape</legend>
    <svg viewBox="0 0 120 120" class="cursor-pointer" @click="shapeName = 'moon'">
      <Shape :shape="buildDisplayShape('moon')" />
    </svg>
    <svg viewBox="0 0 120 120" class="cursor-pointer" @click="shapeName = 'arc'">
      <Shape :shape="buildDisplayShape('arc')" />
    </svg>
    <svg viewBox="0 0 120 120" class="cursor-pointer" @click="shapeName = 'marquise'">
      <Shape :shape="buildDisplayShape('marquise')" />
    </svg>
  </fieldset>
</template>

<script lang="ts" setup>
const { shapeName } = storeToRefs(useArtControlsStore())
</script>