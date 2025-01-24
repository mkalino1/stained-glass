<template>
  <div class="flex gap-2">
    <span v-for="color in defaultColors" :key="color" :style="{ backgroundColor: color }"
      class="w-8 h-8 rounded-md border border-slate-400" @click="changeColor(color)" />
    <input v-model="color" type="color" class="w-8 h-8 rounded-md border border-slate-400">
  </div>
</template>

<script lang="ts" setup>
const defaultColors = ["#711415", "#ae311e", "#f37324", "#f6a020", "#f8cc1b", "#b5be2f", "#72b043", "#007f4e"]

const { color } = storeToRefs(useArtControlsStore())
function changeColor(newColor: string) {
  color.value = newColor
}
</script>