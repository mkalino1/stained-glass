<template>
  <AccordionRoot type="single" class="w-full" collapsible>
    <AccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value" class="border-b">
      <AccordionTrigger>{{ item.title }}</AccordionTrigger>
      <AccordionContent>
        {{ item.content }}
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>

<script setup lang="ts">
import { AccordionRoot, AccordionItem } from 'reka-ui'

const accordionItems = [
  {
    value: 'item-1',
    title: 'Do I need to log in?',
    content: `No. You can browse, create and upload arts without being logged in. You can't however rate arts anonymously.`
  },
  {
    value: 'item-2',
    title: 'Is my data stored?',
    content: `Only your GitHub ID is stored in the database to make sure you won't be able to rate the same art twice or when you decide to link your GitHub account to the art.`
  },
  {
    value: 'item-3',
    title: 'Can I use it on mobile?',
    content: `Yes, creator fully supports desktops and mobiles. However it might be easier to use on desktop.`
  },
  {
    value: 'item-4',
    title: 'How does the creator work?',
    content: `The creator recalculates SVG image in your browser each time you add new shape. Then it stores all data (shapes, colors, rotations...) in the database to be able to render it in the gallery to let other people see your creation.`
  }
]
</script>