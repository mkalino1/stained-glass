<script setup lang="ts">
import {
  SwitchRoot,
  SwitchThumb
} from 'reka-ui'
</script>

<template>
  <SwitchRoot
    class="bg-zinc-600 peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center
      rounded-full border-2 border-transparent transition-colors focus-visible:outline-none
      focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
      focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50
      data-[state=checked]:bg-primary data-[state=unchecked]:bg-input">
    <SwitchThumb
      class="bg-zinc-200 text-zinc-700 pointer-events-none block h-5 w-5 rounded-full shadow-lg
      ring-0 transition-transform data-[state=checked]:translate-x-5">
      <slot name="thumb" />
    </SwitchThumb>
  </SwitchRoot>
</template>