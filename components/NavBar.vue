<template>
  <div class="flex justify-between py-6 px-2 text-lg">
    <div class="w-6"/>
    <div class="flex gap-6">
      <NuxtLink to="/" active-class="text-zinc-200">Gallery</NuxtLink>
      <NuxtLink to="/creator" active-class="text-zinc-200">Creator</NuxtLink>
      <NuxtLink to="/about" active-class="text-zinc-200">About</NuxtLink>
    </div>
    <template v-if="!user">
      <UButton label="Login" variant="subtle" color="neutral" class="bg-zinc-300" @click="openInPopup('/api/login')">
        Login
      </UButton>
    </template>
    <template v-else>
      <UDropdownMenu :items="items" :content="{ align: 'end' }" :ui="{ content: 'min-w-36 bg-zinc-50' }">
        <UAvatar :src="user.avatar" class="cursor-pointer" size="lg"/>
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
      label: 'GitHub',
      icon: 'lucide:user',
      to: user.value?.url,
      target: '_blank'
    },
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
