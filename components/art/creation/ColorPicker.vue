<template>
  <fieldset class="border rounded border-zinc-500 p-2">
    <legend class="text-center px-3">Color</legend>
    <div class="flex md:flex-col gap-6 md:gap-1">
      <UColorPicker v-model="color" class="p-3"
        :ui="{ 
          trackThumb: 'size-5 pointer-fine:size-4',
          track: 'w-3 pointer-fine:w-2'
        }"/>
        <div class="grow">
          <USeparator label="Recent" class="mb-2" :ui="{ label: 'text-zinc-400', border: 'border-zinc-500' }" />
          <div class="gap-3 grid grid-cols-4 sm:grid-cols-5">
            <div v-for="(recentColor, index) in colorHistory" :key="recentColor.snapshot" class="flex flex-col">
              <div :style="{ backgroundColor: recentColor.snapshot }" :class="{'ring ring-zinc-600': recentColor.snapshot == color}"
                class="h-10 sm:h-8 rounded cursor-pointer" @click="changeColor(recentColor.snapshot)" />
              <div class="flex justify-center pointer-coarse:hidden">
                <UKbd :value="String(index + 1).slice(-1)" variant='outline' size="sm" class="mt-1 bg-zinc-800 text-zinc-400 ring-zinc-700"/>
              </div>
            </div>
          </div>
        </div>
    </div>
  </fieldset>
</template>

<script lang="ts" setup>
const { color } = storeToRefs(useArtControlsStore())
const { colorHistory } = storeToRefs(useShapesStore())

function changeColor(newColor: string) {
  color.value = newColor
}

const keys = useMagicKeys()
Array.from({ length: 9 }).forEach((_, index) => {
  whenever(keys[index + 1], () => {
    if (colorHistory.value[index] != undefined) {
      color.value = colorHistory.value[index].snapshot
    }
  })
})
whenever(keys[0], () => {
  if (colorHistory.value[9] != undefined) {
    color.value = colorHistory.value[9].snapshot
  }
})
</script>