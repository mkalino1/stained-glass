<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from 'reka-ui'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui'

const props = defineProps<SliderRootProps>()
const emits = defineEmits<SliderRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <SliderRoot class="relative flex w-full touch-none select-none items-center pb-5 cursor-pointer" v-bind="forwarded" >
    <div class="absolute flex justify-between w-full px-2"><span v-for="x in 7" :key="x" class="border-l-2 border-zinc-800 h-3" /></div>
    <div class="absolute flex justify-between w-full top-3 text-zinc-600"><span v-for="x in 7" :key="x" class="w-5 text-center">{{ x + 3 }}</span></div>
    <SliderTrack class="bg-zinc-800 relative h-1.5 w-full grow overflow-hidden rounded-full">
      <SliderRange class="bg-zinc-600 absolute h-full" />
    </SliderTrack>
    <SliderThumb v-for="(_, key) in modelValue" :key="key"
      class="bg-zinc-800 block h-5 w-5 rounded-full border-2 border-zinc-600 bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400"/>
  </SliderRoot>
</template>