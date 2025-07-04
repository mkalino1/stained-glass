<template>
  <UModal
    title="Upload your art"
    color="primary"
    :close="{
      variant: 'soft',
      class: 'rounded-full'
    }"
    :ui="{
      title: 'text-zinc-300',
      overlay: 'bg-zinc-700/40'
    }"
  >
    <div class="mx-auto mt-5">
      <UTooltip text="Open upload panel">
        <UButton label="Upload panel" variant="solid"/>
      </UTooltip>
    </div>

    <template #body>
      <div class="w-full p-1">
        <UStepper ref="stepper" :items="items" color="primary">
          <template #download>
            <ArtDownload/>
          </template>

          <template #link>
            <ArtAccountLink v-model="isGithubLinked"/>
          </template>

          <template #upload>
            <ArtUpload :is-github-linked="isGithubLinked"/>
          </template>
        </UStepper>

        <div class="flex gap-2 justify-between mt-6">
          <UButton leading-icon="i-lucide-arrow-left" variant="soft" :disabled="!stepper?.hasPrev" @click="stepper?.prev()">
            Prev
          </UButton>

          <UButton trailing-icon="i-lucide-arrow-right" variant="soft" :disabled="!stepper?.hasNext" @click="stepper?.next()">
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

const isGithubLinked = ref(false)
</script>