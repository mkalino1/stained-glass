<template>
  <fieldset class="border rounded border-zinc-500 flex gap-4 px-3 py-4 items-start">
    <legend class="text-center px-3">Shape</legend>
    <div v-for="(shape, index) in shapesToDisplay" :key="shape.name" class="grow">
      <svg viewBox="-2 -2 124 124" class="cursor-pointer" @click="shapeName = shape.name">
        <Shape :shape="shape" class="pointer-fine:!transform-none"/>
        <Cames :shape="shape" class="pointer-fine:!transform-none"/>
      </svg>
      <div class="flex justify-center mt-1.5 pointer-coarse:hidden">
        <UKbd :value="keyboardKeys[index]" variant='outline' size="sm" class="bg-zinc-800 text-zinc-400 ring-zinc-700"/>
      </div>
    </div>
    <div class="flex flex-col pointer-fine:hidden gap-2 border border-zinc-500 rounded">
      <UButton class="text-zinc-400" size="xl" icon="lucide:rotate-ccw" color="neutral" variant="ghost" :ui="{ leadingIcon: '!size-5' }" @click="rotate(1)"/>
      <UButton class="text-zinc-400" size="xl" icon="lucide:rotate-cw" color="neutral" variant="ghost" :ui="{ leadingIcon: '!size-5' }" @click="rotate(-1)"/>
    </div>
  </fieldset>
</template>

<script lang="ts" setup>
const keyboardKeys: string[] = ['a', 's', 'd']
const shapeNames: ShapeName[] = ['moon', 'arc', 'marquise']
const shapesToDisplay = computed(() => shapeNames.map(name => buildDisplayShape(name, shapeName.value == name ? color.value : '', rotation.value)))
const store = useArtControlsStore()
const { rotate } = store
const { shapeName, color, rotation } = storeToRefs(store)

const { a, s, d } = useMagicKeys()
whenever(a, () => shapeName.value = 'moon')
whenever(s, () => shapeName.value = 'arc')
whenever(d, () => shapeName.value = 'marquise')
</script>