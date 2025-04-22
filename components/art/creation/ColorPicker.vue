<template>
  <fieldset class="border rounded border-zinc-400 p-4 sm:p-3">
    <legend class="text-center px-3">Colors</legend>
    <UColorPicker v-model="color" class="p-3"
      :ui="{ 
        selectorThumb: 'ring-zinc-300',
        trackThumb: 'ring-zinc-300'
      }"/>
    <div class="gap-10 sm:gap-3 grid grid-cols-5">
      <!-- <span v-for="presetColor in presetColors" :key="presetColor" :style="{ backgroundColor: presetColor }"
        class="h-10 sm:h-8 rounded cursor-pointer" @click="changeColor(presetColor)" /> -->
      <!-- <input v-model="color" type="color" class="rounded bg-zinc-700 cursor-pointer w-full py-5 sm:py-4 col-span-2"
        style="background-image: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);"> -->
    </div>
  </fieldset>
</template>

<script lang="ts" setup>
// const presetColors = ["#711415", "#ae311e", "#f37324", "#f6a020", "#f8cc1b", "#b5be2f", "#72b043", "#007f4e"]

// const chip = computed(() => ({ backgroundColor: color.value }))

const { color } = storeToRefs(useArtControlsStore())
// function changeColor(newColor: string) {
//   color.value = newColor
// }
</script>
