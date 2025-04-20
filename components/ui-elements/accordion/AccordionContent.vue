<template>
  <AccordionContent class="overflow-hidden text-sm transition-all accordion-content">
    <div class="pb-4 pt-0">
      <slot />
    </div>
  </AccordionContent>
</template>

<script setup lang="ts">
import { AccordionContent } from 'reka-ui'
</script>

<style scoped>
.accordion-content[data-state="open"] {
  animation: slideDown .2s ease-out;
}
.accordion-content[data-state="closed"] {
  animation: slideUp .2s ease-out;
}

@keyframes slideDown {
  from {
    height: 0;
  }
  to {
    height: var(--reka-accordion-content-height);
  }
}

@keyframes slideUp {
  from {
    height: var(--reka-accordion-content-height);
  }
  to {
    height: 0;
  }
}
</style>