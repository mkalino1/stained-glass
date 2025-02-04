<template>
  <fieldset class="border rounded border-zinc-400 flex gap-4 p-3">
    <legend class="text-center px-3">Shapes</legend>
    <svg height="60" width="60" class="cursor-pointer" @click="shapeName = 'moon'">
      <Shape :shape="buildDisplayShape('moon')" />
    </svg>
    <svg height="60" width="60" class="cursor-pointer" @click="shapeName = 'arc'">
      <Shape :shape="buildDisplayShape('arc')" />
    </svg>
    <svg height="60" width="60" class="cursor-pointer" @click="shapeName = 'marquise'">
      <Shape :shape="buildDisplayShape('marquise')" />
    </svg>
  </fieldset>
</template>

<script lang="ts" setup>
const { shapeName } = storeToRefs(useArtControlsStore())
</script>