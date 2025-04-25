<template>
  <fieldset class="border rounded border-zinc-400 flex gap-4 px-3 py-4 items-start">
    <legend class="text-center px-3">Shape</legend>
    <svg v-for="shape in shapeNames" :key="shape"  viewBox="-2 -2 124 124" class="cursor-pointer" @click="shapeName = shape">
      <Shape :shape="buildDisplayShape(shape, shapeName == shape ? color : '', rotation)" class="md:!transform-none"/>
    </svg>
    <div class="flex flex-col md:hidden gap-2 border border-zinc-500 rounded">
      <UButton class="text-zinc-400" size="xl" icon="lucide:rotate-ccw" color="neutral" variant="ghost" :ui="{ leadingIcon: '!size-5' }" @click="rotate(1)"/>
      <UButton class="text-zinc-400" size="xl" icon="lucide:rotate-cw" color="neutral" variant="ghost" :ui="{ leadingIcon: '!size-5' }" @click="rotate(-1)"/>
    </div>
  </fieldset>
</template>

<script lang="ts" setup>
const shapeNames: ShapeName[] = ['moon', 'arc', 'marquise']
const store = useArtControlsStore()
const { rotate } = store
const { shapeName, color, rotation } = storeToRefs(store)
</script>