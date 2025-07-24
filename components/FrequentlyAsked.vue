<template>
  <UAccordion :items="items" :ui="{trigger: 'cursor-pointer'}"/>
</template>

<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'

const items = ref<AccordionItem[]>([
  {
    label: 'Do I need to log in?',
    content: `No login is required. You can browse, create, and upload art without logging in. However, only logged-in users can rate artworks.`
  },
  {
    label: 'Is my data stored?',
    content: `Only your GitHub ID is stored if you decide to log in. This ensures you can't rate the same artwork multiple times and allows you to link your GitHub account to your artwork.`
  },
  {
    label: 'Can I use this on mobile?',
    content: `Yes! The creator works on both desktop and mobile devices. For the best experience, I recommend using desktop.`
  },
  {
    label: 'How does the creator work?',
    content: `Each time you add a new shape, the creator updates the data layer, which renders an SVG image. All data — such as shapes, colors, and rotations — is then saved in the database, so your artwork can be displayed in the gallery for others to enjoy.`
  }
])
</script>