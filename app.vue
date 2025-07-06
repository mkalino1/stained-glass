<template>
  <UApp>
    <div class="text-zinc-400 max-w-6xl mx-auto min-h-screen flex flex-col">
      <NuxtRouteAnnouncer />
      <NavBar />
      <NuxtPage class="pb-10 px-1 grow"/>
      <div class="mx-auto w-fit flex items-center gap-1.5">
        Made with <Icon name="tabler:heart-filled" class="text-red-700"/> by Mateusz Kalinowski
      </div>
      <Toaster theme="dark" :toast-options="{
        classes: {
          toast: 'font-mono !bg-zinc-800 text-zinc-400 rounded-md',
          actionButton: '!bg-zinc-500',
        }
      }" />
    </div>
  </UApp>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en'
  },
})

useSeoMeta({
  title: 'Stained Glass Creator',
  ogTitle: 'Stained Glass Creator',
  description: 'Create stained glass arts and share them with the world!',
  ogDescription: 'Create stained glass arts and share them with the world!',
  twitterCard: 'summary_large_image',
})
</script>

<style>
body {
  background-color: var(--color-zinc-900);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.10s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>