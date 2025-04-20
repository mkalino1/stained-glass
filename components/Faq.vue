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
  { value: 'item-1', title: 'Do I need to log in?', content: `No. You can browse and create arts without being logged in. You can't however rate arts anonymously.` },
  { value: 'item-2', title: 'Is my data stored?', content: `Only your github id is stored in the database to make sure you won't be able to rate the same art twice.` }
]
</script>