<template>
  <div class="flex justify-between pt-6 pb-3 px-2 mb-4 text-lg border-b border-zinc-700 border-gradient">
    <div class="w-6"/>
    <div class="flex gap-6">
      <NuxtLink to="/" active-class="text-zinc-200">Gallery</NuxtLink>
      <NuxtLink to="/creator" active-class="text-zinc-200">Creator</NuxtLink>
      <NuxtLink to="/about" active-class="text-zinc-200">About</NuxtLink>
    </div>
    <template v-if="!user">
      <UTooltip text="Log in using GitHub account">
        <UButton label="Log in" variant="soft" @click="openInPopup('/api/login')" />
      </UTooltip>
    </template>
    <template v-else>
      <UDropdownMenu :items="items" :content="{ align: 'end' }" :ui="{ content: 'min-w-36' }">
        <UAvatar :src="`${user.avatar}&s=128`" class="cursor-pointer" size="lg"/>
      </UDropdownMenu>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { user, clear, openInPopup } = useUserSession()

const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: user.value?.name,
      avatar: {
        src: user.value?.avatar
      },
      type: 'label'
    }
  ],
  [
    {
      label: 'Logout',
      icon: 'lucide:log-out',
      kbds: ['ctrl', 'q'],
      color: 'error',
      onSelect() {
        clear()
      }
    }
  ]
])

defineShortcuts(extractShortcuts(items.value[1]))
</script>

<style>
.border-gradient {
  border-image: linear-gradient(to left, rgba(0, 0, 0, 0), var(--color-zinc-700), rgba(0, 0, 0, 0)) 1;
}
</style>