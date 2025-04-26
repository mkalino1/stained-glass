<template>
  <fieldset class="border rounded border-zinc-400 flex gap-4 px-3 py-4 items-start">
    <legend class="text-center px-3">Shape</legend>
    <svg v-for="shape in shapesToDisplay" :key="shape.name" viewBox="-2 -2 124 124" class="cursor-pointer" @click="shapeName = shape.name">
      <Shape :shape="shape" class="md:!transform-none"/>
      <Cames :shape="shape" class="md:!transform-none"/>
    </svg>
    <div class="flex flex-col md:hidden gap-2 border border-zinc-500 rounded">
      <UButton class="text-zinc-400" size="xl" icon="lucide:rotate-ccw" color="neutral" variant="ghost" :ui="{ leadingIcon: '!size-5' }" @click="rotate(1)"/>
      <UButton class="text-zinc-400" size="xl" icon="lucide:rotate-cw" color="neutral" variant="ghost" :ui="{ leadingIcon: '!size-5' }" @click="rotate(-1)"/>
    </div>
  </fieldset>
</template>

<script lang="ts" setup>
const shapeNames: ShapeName[] = ['moon', 'arc', 'marquise']
const shapesToDisplay = computed(() => shapeNames.map(name => buildDisplayShape(name, shapeName.value == name ? color.value : '', rotation.value)))
const store = useArtControlsStore()
const { rotate } = store
const { shapeName, color, rotation } = storeToRefs(store)
</script>