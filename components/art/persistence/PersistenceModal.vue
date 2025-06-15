<template>
  <UModal
    title="Upload your art"
    color="primary"
    :close="{
      variant: 'outline',
      class: 'rounded-full text-zinc-900 border-zinc-900 bg-zinc-300'
    }"
    :ui="{
      content: 'bg-zinc-800 text-zinc-300 ring-zinc-600',
      title: 'text-zinc-300 border-zinc-900',
      header: 'border-zinc-500',
      overlay: 'bg-zinc-700/40'
    }"
  >
    <div class="mx-auto mt-5">
      <UTooltip text="Open upload panel">
        <UButton label="Upload panel" color="neutral" variant="subtle" class="bg-zinc-300"/>
      </UTooltip>
    </div>

    <template #body>
      <div class="w-full">
        <UStepper ref="stepper" :items="items" color="primary">
          <template #download>
            <ArtDownload/>
          </template>

          <template #link>
            <ArtAccountLink />
          </template>

          <template #upload>
            <ArtUpload class="mx-auto mt-3" />
          </template>
        </UStepper>

        <div class="flex gap-2 justify-between mt-6">
          <UButton leading-icon="i-lucide-arrow-left" :disabled="!stepper?.hasPrev" @click="stepper?.prev()">
            Prev
          </UButton>

          <UButton trailing-icon="i-lucide-arrow-right" :disabled="!stepper?.hasNext" @click="stepper?.next()">
            Next
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'

const items: StepperItem[] = [
  {
    title: 'Download',
    icon: 'i-lucide-download',
    slot: 'download' as const
  }, {
    title: 'Link',
    icon: 'i-lucide-github',
    slot: 'link' as const
  }, {
    title: 'Upload',
    icon: 'i-lucide-upload',
    slot: 'upload' as const
  }
]

const stepper = useTemplateRef('stepper')
</script>