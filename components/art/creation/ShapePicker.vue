<template>
  <fieldset class="border rounded border-zinc-400 flex gap-4 px-3 py-4">
    <legend class="text-center px-3">Shape</legend>
    <svg viewBox="-2 -2 124 124" class="cursor-pointer" @click="shapeName = 'moon'">
      <Shape :shape="buildDisplayShape('moon', shapeName == 'moon' ? color : '')" />
    </svg>
    <svg viewBox="-2 -2 124 124" class="cursor-pointer" @click="shapeName = 'arc'">
      <Shape :shape="buildDisplayShape('arc', shapeName == 'arc' ? color : '')" />
    </svg>
    <svg viewBox="-2 -2 124 124" class="cursor-pointer" @click="shapeName = 'marquise'">
      <Shape :shape="buildDisplayShape('marquise', shapeName == 'marquise' ? color : '')" />
    </svg>
  </fieldset>
</template>

<script lang="ts" setup>
const { shapeName, color } = storeToRefs(useArtControlsStore())
</script>