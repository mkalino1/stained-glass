<template>
  <UAccordion :items="items" />
</template>

<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'

const items = ref<AccordionItem[]>([
  {
    label: 'Do I need to log in?',
    content: `No. You can browse, create and upload arts without being logged in. You can't however rate arts anonymously.`
  },
  {
    label: 'Is my data stored?',
    content: `Only your GitHub ID is stored in the database to make sure you won't be able to rate the same art twice or when you decide to link your GitHub account to the art.`
  },
  {
    label: 'Can I use it on mobile?',
    content: `Yes, creator fully supports desktops and mobiles. However it might be easier to use on desktop.`
  },
  {
    label: 'How does the creator work?',
    content: `The creator recalculates SVG image in your browser each time you add new shape. Then it stores all data (shapes, colors, rotations...) in the database to be able to render it in the gallery to let other people see your creation.`
  }
])
</script>