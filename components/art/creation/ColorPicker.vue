<template>
  <fieldset class="border rounded border-zinc-400 p-3 gap-2 grid grid-cols-5">
    <legend class="text-center px-3">Colors</legend>
    <span v-for="presetColor in presetColors" :key="presetColor" :style="{ backgroundColor: presetColor }"
      class="w-8 h-8 rounded-md" @click="changeColor(presetColor)" />
    <input v-model="color" type="color" class="w-8 h-8 rounded-md bg-zinc-700">
  </fieldset>
</template>

<script lang="ts" setup>
const presetColors = ["#711415", "#ae311e", "#f37324", "#f6a020", "#f8cc1b", "#b5be2f", "#72b043", "#007f4e"]

const { color } = storeToRefs(useArtControlsStore())
function changeColor(newColor: string) {
  color.value = newColor
}
</script>