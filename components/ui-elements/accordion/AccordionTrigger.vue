<template>
  <AccordionHeader class="flex">
    <AccordionTrigger class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>span]:rotate-180">
      <slot />
      <slot name="icon">
        <Icon name="tabler:chevron-down" size="18" class="bg-zinc-600 transition-all"/>
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>

<script setup lang="ts">
import { AccordionHeader, AccordionTrigger } from 'reka-ui'
</script>