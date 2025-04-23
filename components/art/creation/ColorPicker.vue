<template>
  <fieldset class="border rounded border-zinc-400 p-2">
    <legend class="text-center px-3">Color</legend>
    <div class="flex md:flex-col gap-6 md:gap-1">
      <UColorPicker v-model="color" class="p-3"
        :ui="{ 
          selectorThumb: 'ring-zinc-300',
          trackThumb: 'ring-zinc-300'
        }"/>
        <div class="grow">
          <USeparator label="Recent" class="mb-2" :ui="{ label: 'text-zinc-400', border: 'border-zinc-500' }" />
          <div class="gap-3 grid grid-cols-5">
            <span v-for="recentColor in colorHistory" :key="recentColor.timestamp" :style="{ backgroundColor: recentColor.snapshot }"
              class="h-10 sm:h-8 rounded cursor-pointer" @click="changeColor(recentColor.snapshot)" />
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
</script>