<template>
    <fieldset class="border rounded border-zinc-400 flex gap-4 p-3">
      <legend class="text-center px-3">Resolution</legend>
      <input v-model.number="resolution" type="number" class="w-12 px-1 text-center rounded-sm bg-zinc-700" >
    </fieldset>
</template>

<script lang="ts" setup>
const { resolution } = storeToRefs(useArtControlsStore())
</script>